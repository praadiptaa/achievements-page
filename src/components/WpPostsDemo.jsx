import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useWpPosts from '../hooks/useWpPosts';
import { useEffect } from 'react';
import { ExternalLink, Copy, Twitter, MessageSquare } from 'lucide-react';

export default function WpPostsDemo({ baseUrl = 'https://cms.example.com', onOpenPost }) {
  const [page, setPage] = useState(1);
  const { posts, loading, error, totalPages, refresh, fetchSingle } = useWpPosts(baseUrl, { perPage: 5, page, embed: true });
  const [allPosts, setAllPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [toast, setToast] = useState(null);

  const openPost = async (id) => {
    setModalError(null);
    setModalLoading(true);
    try {
      const full = await fetchSingle(id);
      setSelectedPost(full);
    } catch (err) {
      setModalError(err.message || 'Failed to load post');
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => setSelectedPost(null);

  // SEO update when modal opens
  useEffect(() => {
    if (!selectedPost) return;

    const prevTitle = document.title;
    const prevMeta = document.querySelector('meta[name="description"]');
    const prevMetaContent = prevMeta ? prevMeta.getAttribute('content') : null;

    const stripHtml = (html = '') => html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const titleText = stripHtml(selectedPost.title && selectedPost.title.rendered ? selectedPost.title.rendered : 'Post');
    const description = stripHtml(selectedPost.excerpt && selectedPost.excerpt.rendered ? selectedPost.excerpt.rendered : '');

    document.title = `${titleText} — POMI`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);

    const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: titleText, description, mainEntityOfPage: window.location.href };
    const script = document.createElement('script'); script.type = 'application/ld+json'; script.setAttribute('data-generated-by', 'pomi-seo'); script.text = JSON.stringify(ld); document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (prevMetaContent !== null && prevMeta) prevMeta.setAttribute('content', prevMetaContent);
      else if (meta && !prevMeta) meta.remove();
      const existing = document.querySelector('script[data-generated-by="pomi-seo"]'); if (existing) existing.remove();
    };
  }, [selectedPost]);

  // Append posts for load-more behavior
  useEffect(() => {
    if (!posts || posts.length === 0) return;
    // On first page replace, otherwise append unique posts
    if (page === 1) {
      setAllPosts(posts);
    } else {
      // compute new ones first so we can scroll to the first of them
      setAllPosts(prev => {
        const ids = new Set(prev.map(p => p.id));
        const newOnes = posts.filter(p => !ids.has(p.id));
        const updated = [...prev, ...newOnes];

        if (newOnes.length > 0) {
          // scroll after DOM updates, offset by navbar height so item isn't hidden
          setTimeout(() => {
            const el = document.getElementById(`post-${newOnes[0].id}`);
            if (el) {
              const nav = document.querySelector('nav');
              const offset = (nav ? nav.getBoundingClientRect().height : 0) + 12; // small margin
              const top = el.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top, behavior: 'smooth' });

              // temporary highlight so user notices newly-added content
              el.classList.add('ring-4', 'ring-blue-300', 'ring-opacity-40', 'rounded-lg');
              setTimeout(() => {
                el.classList.remove('ring-4', 'ring-blue-300', 'ring-opacity-40', 'rounded-lg');
              }, 1800);
            }
          }, 150);
        }

        return updated;
      });
    }
  }, [posts, page]);

  // Refresh should reset pagination
  const handleRefresh = () => {
    setAllPosts([]);
    setPage(1);
    refresh();
  };

  return (
    <div className="w-full my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Latest from POMI</h3>
        <div className="flex items-center gap-4">
          <button onClick={handleRefresh} className="text-sm text-blue-600 hover:underline">Refresh</button>
        </div>
      </div>

      {error && <p className="text-red-600">Error: {error}</p>}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allPosts && allPosts.length === 0 && !loading && <p>No posts found.</p>}

        {/* Initial skeletons */}
        {loading && allPosts.length === 0 && (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={`skel-${i}`} className="p-4 bg-white/80 rounded-lg shadow animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded mb-3" />
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))
        )}

        {allPosts && allPosts.map((post) => {
          // Robust featured image extraction. WordPress embeds may vary between self-hosted and WordPress.com public API.
          const tryGet = (obj, path) => path.split('.').reduce((s, k) => (s && s[k] !== undefined ? s[k] : null), obj);

          let imgSrc = null;

          // 1) Check embedded wp:featuredmedia
          const embedded = post._embedded || post._embedded || null;
          const featured = embedded && (embedded['wp:featuredmedia'] || embedded['featuredmedia'] || embedded['featured_media'] || embedded['media'] || embedded['wp:attachment'])
            ? (embedded['wp:featuredmedia'] || embedded['featuredmedia'] || embedded['featured_media'] || embedded['media'] || embedded['wp:attachment'])
            : null;

          if (featured && featured[0]) {
            const fm = featured[0];
            // try sizes: thumbnail, medium, full
            const sizes = tryGet(fm, 'media_details.sizes');
            if (sizes) {
              const pick = sizes.thumbnail || sizes.medium || sizes.full || Object.values(sizes)[0];
              imgSrc = pick && (pick.source_url || pick.sourceUrl) ? (pick.source_url || pick.sourceUrl) : null;
            }
            // fallback to top-level source_url
            if (!imgSrc) imgSrc = fm.source_url || fm.sourceUrl || fm.guid && fm.guid.rendered || null;
          }

          // 2) WordPress.com sometimes provides featured_image or featured_media_url
          if (!imgSrc) imgSrc = post.featured_image || post.featured_media_url || post.featured_media_src || null;

          // 3) fallback: check media_details on post if present
          if (!imgSrc && post.media_details && post.media_details.sizes) {
            const sizes = post.media_details.sizes;
            const pick = sizes.thumbnail || sizes.medium || sizes.full || Object.values(sizes)[0];
            imgSrc = pick && (pick.source_url || pick.sourceUrl) ? (pick.source_url || pick.sourceUrl) : null;
          }

          // 4) fallback: try to extract first <img> from post.content.rendered
          if (!imgSrc && post.content && post.content.rendered) {
            try {
              const html = post.content.rendered;
              const m = html.match(/<img[^>]+src=["']?([^"'>\s]+)["']?/i);
              if (m && m[1]) {
                imgSrc = m[1];
              }
            } catch {
              // ignore
            }
          }

          // final fallback placeholder
          const placeholder = 'https://via.placeholder.com/900x480?text=No+Image';
          const displayImg = imgSrc || placeholder;

          const excerptText = (post.excerpt && post.excerpt.rendered) ? post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160) + (post.excerpt.rendered.replace(/<[^>]*>/g, '').length > 160 ? '…' : '') : '';

          // Extract categories/tags from embedded terms if available
          const embeddedTerms = (post._embedded && (post._embedded['wp:term'] || post._embedded['term'])) ? (post._embedded['wp:term'] || post._embedded['term']) : null;
          // embeddedTerms is an array of arrays (each taxonomy), flatten and pick
          const flatTerms = embeddedTerms ? embeddedTerms.flat().filter(Boolean) : [];
          const categoryTerms = flatTerms.filter(t => t.taxonomy === 'category');
          const tagTerms = flatTerms.filter(t => t.taxonomy === 'post_tag' || t.taxonomy === 'tag');

          const handleClick = () => {
            if (typeof onOpenPost === 'function') return onOpenPost(post.id);
            return openPost(post.id);
          };

          const content = (
            <article id={`post-${post.id}`} key={post.id} className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-gray-100">
            <img src={displayImg} loading="lazy" alt={post.title && post.title.rendered ? post.title.rendered.replace(/<[^>]*>/g,'') : 'Post image'} className="w-full h-full object-cover" onError={(e) => { e.target.src = placeholder; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Category / Tag chips top-left */}
                {(flatTerms && flatTerms.length > 0) && (
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    {categoryTerms.slice(0,2).map(ct => (
                      <span key={`cat-${ct.id}`} className="text-xs bg-white/90 text-gray-800 px-2 py-0.5 rounded shadow">{ct.name}</span>
                    ))}
                    {categoryTerms.length === 0 && tagTerms.slice(0,2).map(tg => (
                      <span key={`tag-${tg.id}`} className="text-xs bg-white/90 text-gray-800 px-2 py-0.5 rounded shadow">{tg.name}</span>
                    ))}
                  </div>
                )}

                <div className="absolute left-4 bottom-4 bg-white/90 text-xs text-gray-800 px-2 py-1 rounded">{new Date(post.date).toLocaleDateString()}</div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2 leading-snug" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <p className="text-sm text-gray-700 mb-3">{excerptText}</p>
                <div className="flex items-center justify-end">
                  <button onClick={handleClick} className="text-sm font-medium text-blue-600 hover:text-blue-800">Read more →</button>
                </div>
              </div>
            </article>
          );

          return typeof onOpenPost === 'function' ? (
            <div onClick={handleClick}>{content}</div>
          ) : (
            <Link to={`/posts/${post.id}`} key={post.id} aria-label={`Open post ${post.title && post.title.rendered ? post.title.rendered.replace(/<[^>]*>/g, '') : post.id}`}>{content}</Link>
          );
        })}
      </div>
      {/* Load more controls */}
      <div className="mt-8 flex items-center justify-center">
        {totalPages && page < totalPages && (
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
          >{loading && page > 1 ? 'Loading...' : 'Load more'}</button>
        )}
        {(!totalPages || page >= totalPages) && allPosts.length > 0 && (
          <div className="text-sm text-gray-600">End of posts</div>
        )}
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-6 overflow-auto">
            <div className="bg-white rounded-lg max-w-3xl w-full shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold" dangerouslySetInnerHTML={{ __html: selectedPost.title.rendered }} />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.open(window.location.href + `posts/${selectedPost.id}`, '_blank')}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
                >
                  <ExternalLink size={16} /> Open
                </button>

                <button
                  onClick={async () => { try { await navigator.clipboard.writeText(window.location.href + `posts/${selectedPost.id}`); setToast('Link copied'); setTimeout(() => setToast(null), 1600); } catch { setToast('Copy failed'); setTimeout(() => setToast(null), 1600); } }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
                >
                  <Copy size={16} /> Copy
                </button>

                <a className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition" target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href + `posts/${selectedPost.id}`)}&text=${encodeURIComponent(selectedPost.title && selectedPost.title.rendered ? selectedPost.title.rendered.replace(/<[^>]*>/g,'') : '')}`}>
                  <Twitter size={16} /> Twitter
                </a>

                <a className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodeURIComponent((selectedPost.title && selectedPost.title.rendered ? selectedPost.title.rendered.replace(/<[^>]*>/g,'') : '') + ' ' + (window.location.href + `posts/${selectedPost.id}`))}`}>
                  <MessageSquare size={16} /> WhatsApp
                </a>

                <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">Close</button>
              </div>
            </div>

            {modalLoading && <p>Loading...</p>}
            {modalError && <p className="text-red-600">{modalError}</p>}

            <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: selectedPost.content.rendered }} />
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow">{toast}</div>
      )}
    </div>
  );
}
