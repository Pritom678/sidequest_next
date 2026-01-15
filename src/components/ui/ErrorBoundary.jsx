"use client";

import { Component } from "react";
import { AlertIcon } from "./Icons";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to monitoring service in production
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="text-6xl">
              <AlertIcon size={48} className="text-red-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-base-content dark:text-white mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-base-content/70">
                We encountered an unexpected error. Please try refreshing the
                page.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="btn btn-primary w-full"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-outline w-full"
              >
                Refresh Page
              </button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="text-left bg-base-200 p-4 rounded-lg">
                <summary className="cursor-pointer font-semibold text-sm">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 text-xs overflow-auto">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
