"use client"
import React from "react"

interface Props {
    children?: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: string;
    stack: string;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        // Define a state variable to track whether is an error or not
        this.state = { hasError: false, error: '', stack: '' }
    }
    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error: error.message, stack: error.stack }
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // You can use your own error logging service here
        console.log({ error, errorInfo })
    }
    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            const message = '<p>' + this.state.error.replace("/\n/g", "<br/>") + '</p>';
            const stack = '<p>' + this.state.stack.replace("/\n/g", "<br/>") + '</p>';
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <h3>Details</h3>
                    <div>
                        Message: <div dangerouslySetInnerHTML={{ __html: message }}></div>
                    </div>
                    <div>
                        Stack: <div dangerouslySetInnerHTML={{ __html: stack }}></div>
                    </div>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again?
                    </button>
                </div>
            )
        }

        // Return children components in case of no error

        return this.props.children
    }
}

export default ErrorBoundary;