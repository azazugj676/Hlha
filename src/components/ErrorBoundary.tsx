import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fbfbfd] flex items-center justify-center p-4 text-right" dir="rtl">
          <div className="bg-white p-8 rounded-3xl border border-[#e8e8ed] shadow-lg max-w-md w-full text-center">
            <span className="text-4xl mb-3 inline-block">🛠️</span>
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-2 font-heading">
              حدث خطأ غير متوقع
            </h2>
            <p className="text-sm text-[#6e6e73] mb-6">
              تم تسجيل الخطأ، اضغط على الزر أدناه لإعادة تحميل الصفحة.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-[#0071e3] text-white rounded-full font-semibold text-sm hover:bg-[#0077ed] transition-colors"
            >
              إعادة تحميل التطبيق
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
