import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/Error';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
        fetchUsers();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/v1/posts');
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setError('Failed to load posts');
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/v1/users');
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async (username) => {
        try {
            await axios.post(`/api/v1/users/${username}/follow`);
            // Refresh users list setelah follow berhasil
            fetchUsers();
        } catch (error) {
            console.error('Error following user:', error);
            // Tampilkan pesan error ke user
            if (error.response?.status === 422) {
                // Handle specific error cases
                alert(error.response.data.message);
            } else {
                alert('Failed to follow user. Please try again.');
            }
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content - Posts */}
                <div className="lg:col-span-8 space-y-6">
                    {error ? (
                        <ErrorMessage message={error} onRetry={fetchPosts} />
                    ) : posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
                                {/* Post Header */}
                                <div className="p-4 border-b">
                                    <Link 
                                        to={`/users/${post.user.username}`}
                                        className="flex items-center gap-3"
                                    >
                                        <Avatar src={post.user.avatar_url} alt={post.user.full_name} />
                                        <div>
                                            <p className="font-medium text-gray-900">{post.user.full_name}</p>
                                            <p className="text-sm text-gray-500">@{post.user.username}</p>
                                        </div>
                                    </Link>
                                </div>

                                {/* Post Images */}
                                {post.attachments?.length > 0 && (
                                    <div className="relative">
                                        <img
                                            src={`/storage/${post.attachments[0].storage_path}`}
                                            alt="Post"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                )}

                                {/* Post Content */}
                                <div className="p-4">
                                    <p className="text-gray-800">{post.caption}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 bg-white rounded-lg shadow">
                            <p className="text-gray-500">No posts yet</p>
                        </div>
                    )}
                </div>

                {/* Sidebar - Explore People */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-lg shadow sticky top-4">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-medium text-gray-900">Explore People</h2>
                        </div>
                        <div className="p-4">
                            {users.length > 0 ? (
                                <div className="space-y-4">
                                    {users.map(user => (
                                        <div key={user.id} className="flex items-center justify-between">
                                            <Link 
                                                to={`/users/${user.username}`}
                                                className="flex items-center gap-3"
                                            >
                                                <Avatar src={user.avatar_url} alt={user.full_name} />
                                                <div>
                                                    <p className="font-medium text-gray-900">{user.full_name}</p>
                                                    <p className="text-sm text-gray-500">@{user.username}</p>
                                                </div>
                                            </Link>
                                            <Button
                                                variant="primary"
                                                size="small"
                                                onClick={() => handleFollow(user.username)}
                                            >
                                                Follow
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No users to explore</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 