import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, info) {
    // You can log the error to a service or perform other actions
    // ...
    console.error("ErrorBoundary caught an error:", error);
    // You can set this state to `hasError: true` if needed, and it will be set on the instance.
    // this.setState({hasError: true})
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>
            The application encountered an error. Please check the console for more details.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
