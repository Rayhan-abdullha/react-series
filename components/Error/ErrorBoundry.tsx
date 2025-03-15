import React, { Component, ErrorInfo } from 'react';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state to display the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log error details to an external service like Sentry
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-red-500">Something went wrong.</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
