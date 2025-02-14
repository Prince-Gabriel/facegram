import { Avatar } from './Avatar';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export const FollowersModal = ({ isOpen, onClose, followers, onAccept, currentUser }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md">
                <div className="p-4 border-b">
                    <h3 className="text-lg font-medium">Followers</h3>
                </div>
                <div className="max-h-96 overflow-y-auto p-4">
                    {followers.length > 0 ? (
                        followers.map(follower => (
                            <div key={follower.id} className="flex items-center justify-between py-2">
                                <Link 
                                    to={`/users/${follower.username}`}
                                    className="flex items-center gap-3"
                                    onClick={onClose}
                                >
                                    <Avatar src={follower.avatar_url} alt={follower.full_name} />
                                    <div>
                                        <p className="font-medium">{follower.full_name}</p>
                                        <p className="text-sm text-gray-500">@{follower.username}</p>
                                    </div>
                                </Link>
                                {currentUser && follower.is_requested && (
                                    <Button
                                        variant="primary"
                                        size="small"
                                        onClick={() => onAccept(follower.username)}
                                    >
                                        Accept
                                    </Button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No followers yet</p>
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