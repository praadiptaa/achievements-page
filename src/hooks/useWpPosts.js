import { useState, useEffect, useCallback } from 'react';

// Simple hook to fetch public posts from a WordPress REST API endpoint
// Usage: const { posts, loading, error, refresh } = useWpPosts('https://cms.example.com');
export default function useWpPosts(baseUrl, { perPage = 5, page = 1, embed = true } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [totalCount, setTotalCount] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Support two kinds of baseUrl:
      // 1) a site root like https://example.com -> use /wp-json/wp/v2/posts
      // 2) a full REST posts endpoint like https://public-api.wordpress.com/wp/v2/sites/your-site/posts
      const cleaned = baseUrl.replace(/\/$/, '');
      let url;
      if (cleaned.includes('/wp-json') || cleaned.includes('/wp/v2')) {
        // baseUrl already points to a REST endpoint; append query params
        url = `${cleaned}${cleaned.includes('?') ? '&' : '?'}per_page=${perPage}&page=${page}${embed ? '&_embed' : ''}`;
      } else {
        url = `${cleaned}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}${embed ? '&_embed' : ''}`;
      }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

  // Read pagination headers if available
  const tp = res.headers.get('x-wp-totalpages');
  const tc = res.headers.get('x-wp-total');
  setTotalPages(tp ? parseInt(tp, 10) : null);
  setTotalCount(tc ? parseInt(tc, 10) : null);

  const data = await res.json();
  setPosts(data);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [baseUrl, perPage, page, embed]);

  // Helper to fetch a single post by ID with _embed
  const fetchSingle = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const cleaned = baseUrl.replace(/\/$/, '');
      let url;
      if (cleaned.includes('/wp-json') || cleaned.includes('/wp/v2')) {
        // If baseUrl already points to posts endpoint (ends with /posts) or site REST base
        if (cleaned.match(/\/posts(\/)?$/)) {
          url = `${cleaned}/${id}${embed ? '?_embed' : ''}`;
        } else {
          // e.g. public-api.wordpress.com/wp/v2/sites/your-site -> append /posts/{id}
          url = `${cleaned.replace(/\/$/, '')}/posts/${id}${embed ? '?_embed' : ''}`;
        }
      } else {
        url = `${cleaned}/wp-json/wp/v2/posts/${id}${embed ? '?_embed' : ''}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return await res.json();
    } catch (err) {
      setError(err.message || 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [baseUrl, embed]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  return { posts, loading, error, totalPages, totalCount, refresh: fetchPosts, fetchSingle };
}
