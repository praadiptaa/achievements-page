import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useWpPosts from '../hooks/useWpPosts';
import { useEffect } from 'react';
import { Copy, Twitter, MessageSquare, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function WpPostsDemo({ baseUrl = 'https://cms.example.com', onOpenPost, perPage = 6 }) {
  const [page, setPage] = useState(1);
  const { posts, loading, error, totalPages, refresh, fetchSingle } = useWpPosts(baseUrl, { perPage, page, embed: true });
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

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // Refresh should reset pagination
  const handleRefresh = useCallback(() => {
    setPage(1);
    refresh();
  }, [refresh]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 300000); // 5 minutes = 300000 ms

    return () => clearInterval(interval);
  }, [handleRefresh]);

  return (
    <div className="w-full relative">
      {/* Loading overlay */}
      {loading && posts && posts.length > 0 && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center gap-3">
            <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-sm font-medium text-gray-700">Loading posts...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {posts && posts.length === 0 && !loading && <p>No posts found.</p>}

        {/* Initial skeletons */}
        {loading && (!posts || posts.length === 0) && (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={`skel-${i}`} className="overflow-hidden bg-white rounded-xl shadow-md animate-pulse">
              <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300" />
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))
        )}

        {posts && posts.map((post) => {
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
          const categoryTerms = flatTerms.filter(t => t.taxonomy === 'category' && t.name !== 'Uncategorized' && t.name !== 'uncategorized' && t.name !== 'Tak Berkategori' && t.name !== 'tak berkategori');
          const tagTerms = flatTerms.filter(t => t.taxonomy === 'post_tag' || t.taxonomy === 'tag');

          const handleClick = () => {
            if (typeof onOpenPost === 'function') return onOpenPost(post.id);
            return openPost(post.id);
          };

          const content = (
            <article id={`post-${post.id}`} key={post.id} className="group overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-gray-100">
              <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img 
                  src={displayImg} 
                  loading="lazy" 
                  alt={post.title && post.title.rendered ? post.title.rendered.replace(/<[^>]*>/g,'') : 'Post image'} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  onError={(e) => { e.target.src = placeholder; }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Category / Tag chips */}
                {(flatTerms && flatTerms.length > 0) && (
                  <div className="absolute left-4 top-4 flex items-center gap-2 flex-wrap">
                    {categoryTerms.slice(0,2).map(ct => (
                      <span key={`cat-${ct.id}`} className="text-xs font-semibold bg-blue-500 text-white px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                        {ct.name}
                      </span>
                    ))}
                    {categoryTerms.length === 0 && tagTerms.slice(0,2).map(tg => (
                      <span key={`tag-${tg.id}`} className="text-xs font-semibold bg-purple-500 text-white px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                        {tg.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="absolute left-4 bottom-4 flex items-center gap-2 bg-white/95 text-xs font-medium text-gray-700 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>

              <div className="p-6">
                <h4 
                  className="text-xl font-bold mb-3 leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2" 
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                />
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">{excerptText}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button 
                    onClick={handleClick} 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group-hover:gap-3 transition-all duration-300"
                  >
                    Read Full Article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 space-y-4">
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1 || loading}
              className="group flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-600 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <ChevronLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="font-semibold">Previous</span>
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setPage(index + 1)}
                  disabled={loading}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed ${
                    page === index + 1
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-sm border-2 border-blue-200 text-gray-700 hover:border-blue-400'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages || loading}
              className="group flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-600 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <span className="font-semibold">Next</span>
              <ChevronRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
          
          {/* Page Info */}
          <div className="flex justify-center">
            <p className="text-sm text-gray-600 font-medium">
              Page <span className="text-blue-600 font-bold">{page}</span> of <span className="text-blue-600 font-bold">{totalPages}</span>
            </p>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl my-8 max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 z-10">
              <div className="flex justify-between items-start gap-4">
                <h3 
                  className="text-2xl sm:text-3xl font-bold text-gray-900 flex-1" 
                  dangerouslySetInnerHTML={{ __html: selectedPost.title.rendered }} 
                />
                <button 
                  onClick={closeModal} 
                  className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              
              {/* Share Actions */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={async () => { 
                    try { 
                      await navigator.clipboard.writeText(window.location.origin + `/posts/${selectedPost.id}`); 
                      setToast('Link copied to clipboard!'); 
                      setTimeout(() => setToast(null), 2000); 
                    } catch { 
                      setToast('Failed to copy link'); 
                      setTimeout(() => setToast(null), 2000); 
                    } 
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:border-blue-400 hover:text-blue-600 transition-all duration-300 hover:shadow-md"
                >
                  <Copy size={16} />
                  <span className="font-semibold">Copy Link</span>
                </button>

                <a 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg" 
                  target="_blank" 
                  rel="noreferrer" 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + `/posts/${selectedPost.id}`)}&text=${encodeURIComponent(selectedPost.title && selectedPost.title.rendered ? selectedPost.title.rendered.replace(/<[^>]*>/g,'') : '')}`}
                >
                  <Twitter size={16} />
                  <span className="font-semibold">Twitter</span>
                </a>

                <a 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg" 
                  target="_blank" 
                  rel="noreferrer" 
                  href={`https://wa.me/?text=${encodeURIComponent((selectedPost.title && selectedPost.title.rendered ? selectedPost.title.rendered.replace(/<[^>]*>/g,'') : '') + ' ' + (window.location.origin + `/posts/${selectedPost.id}`))}`}
                >
                  <MessageSquare size={16} />
                  <span className="font-semibold">WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {modalLoading && (
                <div className="flex items-center justify-center py-12">
                  <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
              
              {modalError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 font-medium">
                  {modalError}
                </div>
              )}

              {!modalLoading && !modalError && (
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg prose-strong:text-gray-900" 
                  dangerouslySetInnerHTML={{ __html: selectedPost.content.rendered }} 
                />
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl backdrop-blur-sm animate-fade-in z-50">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
