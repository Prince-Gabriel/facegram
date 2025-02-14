// Export Loading component
export const Loading = ({ size = 'default' }) => {
    const sizeClasses = {
        small: 'h-6 w-6',
        default: 'h-12 w-12',
        large: 'h-16 w-16'
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600`}></div>
        </div>
    );
};

// Export LoadingOverlay component
export const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8">
                <Loading size="large" />
                <p className="mt-4 text-gray-600 text-center">Loading...</p>
            </div>
        </div>
    );
}; 