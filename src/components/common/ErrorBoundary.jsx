// App-level error boundary — never leaves a blank screen.
import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // In production this would report to an observability service.
    console.error("Uncaught error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
          <h1 className="text-xl font-bold text-ink">Something went wrong</h1>
          <p className="text-sm text-muted">Please refresh the page and try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-velvet px-5 py-2.5 text-sm font-semibold text-white"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
