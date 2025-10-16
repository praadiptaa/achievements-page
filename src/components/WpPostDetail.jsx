import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Copy, Twitter, MessageSquare, ChevronLeft, Calendar, Clock, User } from 'lucide-react';
import Footer from './Footer';

export default function WpPostDetail({ postId: propPostId, onBack, baseUrl = 'https://cms.example.com' }) {
  const params = useParams();
  const postId = propPostId || params?.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [relativeTime, setRelativeTime] = useState('');

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

  // Update relative time every minute
  useEffect(() => {
    if (!post?.date) return;

    const updateRelativeTime = () => {
      setRelativeTime(getRelativeTime(post.date));
    };

    updateRelativeTime(); // initial
    const interval = setInterval(updateRelativeTime, 60000); // every 1 minute

    return () => clearInterval(interval);
  }, [post?.date]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-700 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Article</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <ChevronLeft size={18} />
              Back to Blog
            </button>
          )}
        </div>
      </div>
    );
  }
  
  if (!post) return null;

  const img = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
  const imgSrc = img && (img.source_url || (img.media_details && img.media_details.sizes && (img.media_details.sizes.full || img.media_details.sizes.medium) && (img.media_details.sizes.full.source_url || img.media_details.sizes.medium.source_url)));

  // Extract categories and tags
  const embeddedTerms = (post._embedded && (post._embedded['wp:term'] || post._embedded['term'])) ? (post._embedded['wp:term'] || post._embedded['term']) : null;
  const flatTerms = embeddedTerms ? embeddedTerms.flat().filter(Boolean) : [];
  const categoryTerms = flatTerms.filter(t => t.taxonomy === 'category' && t.name !== 'Uncategorized' && t.name !== 'uncategorized' && t.name !== 'Tak Berkategori' && t.name !== 'tak berkategori');
  const tagTerms = flatTerms.filter(t => t.taxonomy === 'post_tag' || t.taxonomy === 'tag');

  // Extract author
  const author = post._embedded && post._embedded.author && post._embedded.author[0];
  const authorName = author ? (author.name || 'Unknown Author') : 'POMI';

  // Calculate relative time (posted X ago)
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    const intervals = {
      tahun: 31536000,
      bulan: 2592000,
      minggu: 604800,
      hari: 86400,
      jam: 3600,
      menit: 60,
      detik: 1
    };
    
    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return `Diposting ${interval} ${unit} yang lalu`;
      }
    }
    
    return 'Baru saja diposting';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* Header Navigation */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {onBack && (
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  aria-label="Back to blog"
                >
                  <ChevronLeft size={18} />
                  <span className="font-semibold">Back to Blog</span>
                </button>
              )}
              
              {/* Share Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => { 
                    try { 
                      await navigator.clipboard.writeText(window.location.href); 
                      setToast('Link copied to clipboard!'); 
                      setTimeout(() => setToast(null), 2000); 
                    } catch { 
                      setToast('Failed to copy link'); 
                      setTimeout(() => setToast(null), 2000); 
                    } 
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-blue-400 hover:text-blue-600 transition-all duration-300 hover:shadow-md hover:scale-105"
                  aria-label="Copy link"
                >
                  <Copy size={16} />
                  <span className="hidden sm:inline font-semibold">Copy</span>
                </button>

                <a
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post && post.title && post.title.rendered ? post.title.rendered.replace(/<[^>]*>/g,'') : '')}`}
                  aria-label="Share on Twitter"
                >
                  <Twitter size={16} />
                  <span className="hidden sm:inline font-semibold">Twitter</span>
                </a>

                <a
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/?text=${encodeURIComponent((post && post.title && post.title.rendered ? post.title.rendered.replace(/<[^>]*>/g,'') : '') + ' ' + window.location.href)}`}
                  aria-label="Share on WhatsApp"
                >
                  <MessageSquare size={16} />
                  <span className="hidden sm:inline font-semibold">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Categories */}
          {categoryTerms.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categoryTerms.map(cat => (
                <span 
                  key={cat.id} 
                  className="inline-flex items-center px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900" 
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
          />

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <User size={18} className="text-blue-600" />
              <span className="text-sm font-medium">Oleh: {authorName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} className="text-blue-600" />
              <span className="text-sm font-medium">{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={18} className="text-blue-600" />
              <span className="text-sm font-medium">{relativeTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          {imgSrc && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={imgSrc} 
                alt="Featured" 
                className="w-full h-auto object-cover" 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x600?text=No+Image'; }} 
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg md:prose-xl max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100" 
            dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
          />

          {/* Tags */}
          {tagTerms.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tagTerms.map(tag => (
                  <span 
                    key={tag.id} 
                    className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section at Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Share this article</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={async () => { 
                  try { 
                    await navigator.clipboard.writeText(window.location.href); 
                    setToast('Link copied to clipboard!'); 
                    setTimeout(() => setToast(null), 2000); 
                  } catch { 
                    setToast('Failed to copy link'); 
                    setTimeout(() => setToast(null), 2000); 
                  } 
                }}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-blue-400 hover:text-blue-600 transition-all duration-300 hover:shadow-md hover:scale-105"
              >
                <Copy size={18} />
                <span className="font-semibold">Copy Link</span>
              </button>

              <a
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post && post.title && post.title.rendered ? post.title.rendered.replace(/<[^>]*>/g,'') : '')}`}
              >
                <Twitter size={18} />
                <span className="font-semibold">Share on Twitter</span>
              </a>

              <a
                className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/?text=${encodeURIComponent((post && post.title && post.title.rendered ? post.title.rendered.replace(/<[^>]*>/g,'') : '') + ' ' + window.location.href)}`}
              >
                <MessageSquare size={18} />
                <span className="font-semibold">Share on WhatsApp</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      <Footer />

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

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
