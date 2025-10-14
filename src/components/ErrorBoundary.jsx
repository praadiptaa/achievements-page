import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // You could also log to an external service here
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      const err = this.state.error;
      const info = this.state.info && this.state.info.componentStack ? this.state.info.componentStack : null;
      return (
        <div style={{ padding: 24, fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
          <h1 style={{ color: '#b91c1c' }}>Something went wrong</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#111827', background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>{err && err.toString()}</pre>
          {info && (
            <details style={{ marginTop: 12, background: '#f8fafc', padding: 12, borderRadius: 6 }}>
              <summary style={{ cursor: 'pointer' }}>Component stack (click to expand)</summary>
              <pre style={{ whiteSpace: 'pre-wrap', color: '#111827' }}>{info}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
