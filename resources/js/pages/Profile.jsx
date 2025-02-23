import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/Error';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { FollowersModal } from '../components/FollowersModal';
import { FollowingModal } from '../components/FollowingModal';

export const Profile = () => {
    const { username } = useParams();
    const { user: currentUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [followStatus, setFollowStatus] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    useEffect(() => {
        fetchProfile();
        fetchFollowers();
    }, [username]);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`/api/v1/users/${username}`);
            setProfile(response.data);
            setFollowStatus(response.data.follow_status);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || 'Error loading profile');
        } finally {
            setLoading(false);
        }
    };

    const fetchFollowers = async () => {
        try {
            const response = await axios.get(`/api/v1/users/${username}/followers`);
            setFollowers(response.data.followers);
        } catch (error) {
            console.error('Error fetching followers:', error);
        }
    };

    const handleFollow = async () => {
        try {
            const response = await axios.post(`/api/v1/users/${username}/follow`);
            setFollowStatus(response.data.status);
            fetchFollowers();
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await axios.delete(`/api/v1/users/${username}/unfollow`);
            setFollowStatus(null);
            fetchFollowers();
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    const handleAcceptFollow = async (followerUsername) => {
        try {
            await axios.put(`/api/v1/users/${followerUsername}/accept`);
            fetchFollowers();
        } catch (error) {
            console.error('Error accepting follow request:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Profile Header */}
                <div className="p-6 sm:p-8 border-b">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <Avatar size="xlarge" src={profile.profile_picture} alt={profile.full_name} />
                        <div className="flex-grow">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
                                {!profile.is_your_account && (
                                    <div className="flex gap-4">
                                        {followStatus === 'following' ? (
                                            <Button
                                                variant="secondary"
                                                onClick={handleUnfollow}
                                            >
                                                Unfollow
                                            </Button>
                                        ) : followStatus === 'requested' ? (
                                            <Button
                                                variant="ghost"
                                                disabled
                                            >
                                                Requested
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="primary"
                                                onClick={handleFollow}
                                            >
                                                Follow
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                            <p className="text-gray-500 mt-1">@{profile.username}</p>
                            <p className="mt-4 text-gray-700">{profile.bio}</p>
                            
                            <div className="mt-4 flex gap-6">
                                <button
                                    onClick={() => setShowFollowers(true)}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    <span className="font-medium">{followers.length}</span> followers
                                </button>
                                <button
                                    onClick={() => setShowFollowing(true)}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    <span className="font-medium">{profile.following_count}</span> following
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Grid */}
                {(!profile.is_private || profile.is_your_account || followStatus === 'following') ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {profile.posts?.map(post => (
                            <div key={post.id} className="aspect-square group relative overflow-hidden bg-gray-100 rounded-lg">
                                {post.attachments.map((attachment, index) => (
                                    <img
                                        key={attachment.id}
                                        src={`/storage/${attachment.storage_path}`}
                                        alt={`Post ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                ))}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <p className="text-white text-sm px-4 text-center">
                                            {post.caption}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-16 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Private Account</h3>
                        <p className="mt-1 text-sm text-gray-500">Follow this account to see their posts.</p>
                    </div>
                )}
            </div>

            {/* Use imported FollowersModal */}
            <FollowersModal
                isOpen={showFollowers}
                onClose={() => setShowFollowers(false)}
                followers={followers}
                onAccept={handleAcceptFollow}
                currentUser={currentUser}
            />

            {/* Use imported FollowingModal */}
            <FollowingModal
                isOpen={showFollowing}
                onClose={() => setShowFollowing(false)}
                following={profile?.following || []}
            />
        </div>
    );
}; 