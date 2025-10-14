import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink, Copy, Twitter, MessageSquare, ChevronLeft } from 'lucide-react';

export default function WpPostDetail({ postId: propPostId, onBack, baseUrl = 'https://cms.example.com' }) {
  const params = useParams();
  const postId = propPostId || params?.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const cleaned = baseUrl.replace(/\/$/, '');
        let url;
        if (cleaned.includes('/wp-json') || cleaned.includes('/wp/v2')) {
          // If baseUrl already points to a posts endpoint or WP REST base
          if (cleaned.match(/\/posts(\/)?$/)) {
            url = `${cleaned}/${postId}?_embed`;
          } else if (cleaned.match(/\/posts\//)) {
            // base contains /posts/{something} already
            url = `${cleaned.replace(/\/$/, '')}/${postId}?_embed`;
          } else {
            // assume it's a REST base like https://example.com/wp-json
            url = `${cleaned.replace(/\/$/, '')}/wp/v2/posts/${postId}?_embed`;
          }
        } else if (cleaned.match(/\/posts(\/)?$/)) {
          // e.g. https://public-api.wordpress.com/wp/v2/sites/your-site/posts
          url = `${cleaned}/${postId}?_embed`;
        } else {
          // fallback to standard site-root construction
          url = `${cleaned}/wp-json/wp/v2/posts/${postId}?_embed`;
        }

        const res = await fetch(url);
        if (!res.ok) {
          // try to read response body for better error info
          let text = '';
          try { text = await res.text(); } catch { /* ignore */ }
          throw new Error(`${res.status} ${res.statusText} ${text ? '- ' + text : ''}`);
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [postId, baseUrl]);

  // SEO: set document title, meta description, and JSON-LD when post is loaded
  useEffect(() => {
    if (!post) return;

    const prevTitle = document.title;
    const prevMeta = document.querySelector('meta[name="description"]');
    const prevMetaContent = prevMeta ? prevMeta.getAttribute('content') : null;

    const stripHtml = (html = '') => {
      return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    };

    const titleText = stripHtml(post.title && post.title.rendered ? post.title.rendered : 'Post');
    const description = stripHtml(post.excerpt && post.excerpt.rendered ? post.excerpt.rendered : (post.content && post.content.rendered ? post.content.rendered.substring(0, 160) : ''));

    document.title = `${titleText} — POMI`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    // JSON-LD
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': titleText,
      'description': description,
      'datePublished': post.date || undefined,
      'mainEntityOfPage': window.location.href,
    };

    // Add image if available
    try {
      const img = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
      if (img) {
        ld.image = img.source_url || (img.media_details && img.media_details.sizes && img.media_details.sizes.full && img.media_details.sizes.full.source_url) || undefined;
      }
  } catch { /* ignore */ }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-generated-by', 'pomi-seo');
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);

    return () => {
      // restore
      document.title = prevTitle;
      if (prevMetaContent !== null && prevMeta) prevMeta.setAttribute('content', prevMetaContent);
      else if (meta && !prevMeta) meta.remove();

      // remove our JSON-LD
      const existing = document.querySelector('script[data-generated-by="pomi-seo"]');
      if (existing) existing.remove();
    };
  }, [post]);

  if (loading) return <div className="max-w-4xl mx-auto p-6">Loading post...</div>;
  if (error) return <div className="max-w-4xl mx-auto p-6 text-red-600">Error: {error}</div>;
  if (!post) return null;

  const img = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
  const imgSrc = img && (img.source_url || (img.media_details && img.media_details.sizes && (img.media_details.sizes.full || img.media_details.sizes.medium) && (img.media_details.sizes.full.source_url || img.media_details.sizes.medium.source_url)));

  return (
    <div className="max-w-4xl mx-auto my-12 p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
          aria-label="Back to list"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open(window.location.href, '_blank')}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
            aria-label="Open in new tab"
          >
            <ExternalLink size={16} /> Open
          </button>

          <button
            onClick={async () => { try { await navigator.clipboard.writeText(window.location.href); setToast('Link copied'); setTimeout(() => setToast(null), 1600); } catch { setToast('Copy failed'); setTimeout(() => setToast(null), 1600); } }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
            aria-label="Copy link"
          >
            <Copy size={16} /> Copy
          </button>

          <a
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post && post.title && post.title.rendered ? post.title.rendered.replace(/<[^>]*>/g,'') : '')}`}
            aria-label="Share on Twitter"
          >
            <Twitter size={16} /> Twitter
          </a>

          <a
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition"
            target="_blank"
            rel="noreferrer"
            href={`https://wa.me/?text=${encodeURIComponent((post && post.title && post.title.rendered ? post.title.rendered.replace(/<[^>]*>/g,'') : '') + ' ' + window.location.href)}`}
            aria-label="Share on WhatsApp"
          >
            <MessageSquare size={16} /> WhatsApp
          </a>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      {imgSrc && (
        <div className="mb-6">
          <img src={imgSrc} alt="featured" className="w-full h-auto rounded" onError={(e) => { e.target.src = 'https://via.placeholder.com/900x400?text=No+Image'; }} />
        </div>
      )}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black/85 text-white px-4 py-2 rounded-md shadow-lg backdrop-blur-sm">{toast}</div>
      )}
    </div>
  );
}
