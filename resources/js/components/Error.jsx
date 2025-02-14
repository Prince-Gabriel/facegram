import { Link } from 'react-router-dom';

export const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-red-700">{message}</p>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
                        >
                            Try again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ErrorPage = ({ title, message, actionText, actionLink }) => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                {actionText && actionLink && (
                    <Link
                        to={actionLink}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        {actionText}
                    </Link>
                )}
            </div>
        </div>
    );
}; 