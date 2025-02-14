import { Avatar } from './Avatar';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export const FollowingModal = ({ isOpen, onClose, following }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md">
                <div className="p-4 border-b">
                    <h3 className="text-lg font-medium">Following</h3>
                </div>
                <div className="max-h-96 overflow-y-auto p-4">
                    {following.length > 0 ? (
                        following.map(user => (
                            <div key={user.id} className="flex items-center justify-between py-2">
                                <Link 
                                    to={`/users/${user.username}`}
                                    className="flex items-center gap-3"
                                    onClick={onClose}
                                >
                                    <Avatar src={user.avatar_url} alt={user.full_name} />
                                    <div>
                                        <p className="font-medium">{user.full_name}</p>
                                        <p className="text-sm text-gray-500">@{user.username}</p>
                                    </div>
                                </Link>
                                {user.is_requested && (
                                    <span className="text-sm text-gray-500">Requested</span>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">Not following anyone yet</p>
                    )}
                </div>
                <div className="p-4 border-t">
                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}; 