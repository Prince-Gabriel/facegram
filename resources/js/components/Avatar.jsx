export const Avatar = ({ src, size = 'default', alt = '' }) => {
    const sizeClasses = {
        small: 'w-8 h-8',
        default: 'w-10 h-10',
        large: 'w-16 h-16',
        xlarge: 'w-24 h-24'
    };

    return (
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex-shrink-0`}>
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = '/images/default-avatar.png';
                    }}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600">
                    <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </div>
    );
}; 