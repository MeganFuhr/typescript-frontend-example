import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Error from '@mui/icons-material/Error';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to monitoring service in production (e.g., Sentry, LogRocket)
    // Never expose stack traces to users in production
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 4,
            textAlign: 'center',
          }}
        >
          <Error sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: '600px' }}>
            We're sorry for the inconvenience. The application encountered an unexpected error.
            Please try refreshing the page or contact support if the problem persists.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={this.handleReset}>
              Try Again
            </Button>
            <Button variant="outlined" onClick={() => window.location.href = '/'}>
              Go to Home
            </Button>
          </Box>
          {import.meta.env.DEV && this.state.error && (
            <Box
              sx={{
                mt: 4,
                p: 2,
                backgroundColor: 'grey.100',
                borderRadius: 1,
                maxWidth: '800px',
                overflow: 'auto',
              }}
            >
              <Typography variant="caption" component="pre" sx={{ textAlign: 'left' }}>
                {this.state.error.toString()}
              </Typography>
            </Box>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
