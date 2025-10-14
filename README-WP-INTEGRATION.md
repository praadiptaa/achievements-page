Headless WordPress integration (quick start)

This project is a Vite + React single-page landing app. The files added here are a small example to help you connect to a WordPress site (headless mode) using the WordPress REST API.

Files added
- src/hooks/useWpPosts.js : a simple React hook that fetches public posts from WordPress REST API.
- src/components/WpPostsDemo.jsx : a small demo component that displays posts fetched from WordPress.

Quick setup
1. WordPress side
   - Public posts: no plugin needed. The REST API is available at: https://your-site.com/wp-json/wp/v2/posts
   - If your WordPress is on a different domain than this app, ensure CORS allows requests from your app's origin.
   - If you need protected endpoints (create/update), consider Application Passwords (built-in) or JWT plugin.
   - Optionally install WPGraphQL if you prefer GraphQL.

2. In this React app
   - Import and use the demo component where you want to show posts, for example in `src/App.jsx`:

     import WpPostsDemo from './components/WpPostsDemo';
     ...
     <WpPostsDemo baseUrl="https://cms.example.com" />

   - Replace `https://cms.example.com` with your WordPress site URL (no trailing slash required).

CORS & security notes
- Don't store credentials in client-side code. For protected endpoints, use a server-side proxy, or serverless function, or configure Application Passwords and only call them from server side.

Next steps I can help with
- Add a posts listing page and single-post detail route that pulls full content.
- Integrate media (featured images) and custom fields (ACF) via REST or WPGraphQL.
- Set up SSR/SSG (Next.js) if SEO is critical for dynamic WP content.

If you'd like, I can: add the demo component into a page in this repo, add a small posts list page + route, or create an example serverless proxy for protected API calls. Tell me which next step you want.