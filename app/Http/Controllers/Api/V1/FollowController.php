<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Follow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FollowController extends Controller
{
    public function follow(Request $request, $username)
    {
        try {
            $userToFollow = User::where('username', $username)->firstOrFail();
            
            // Check if already following
            $existingFollow = Follow::where('follower_id', $request->user()->id)
                ->where('following_id', $userToFollow->id)
                ->first();

            if ($existingFollow) {
                return response()->json([
                    'message' => 'Already following this user',
                    'status' => 'following'
                ]);
            }

            // Create new follow
            Follow::create([
                'follower_id' => $request->user()->id,
                'following_id' => $userToFollow->id,
                'is_accepted' => !$userToFollow->is_private
            ]);

            return response()->json([
                'message' => $userToFollow->is_private ? 'Follow request sent' : 'Following successfully',
                'status' => $userToFollow->is_private ? 'requested' : 'following'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error following user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function unfollow(Request $request, $username)
    {
        try {
            $userToUnfollow = User::where('username', $username)->firstOrFail();
            
            Follow::where('follower_id', $request->user()->id)
                ->where('following_id', $userToUnfollow->id)
                ->delete();

            return response()->json([
                'message' => 'Unfollowed successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error unfollowing user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function followers($username)
    {
        try {
            $user = User::where('username', $username)->firstOrFail();
            
            $followers = $user->followers()
                ->with('follower')
                ->get()
                ->map(function ($follow) {
                    return [
                        'id' => $follow->follower->id,
                        'username' => $follow->follower->username,
                        'full_name' => $follow->follower->full_name,
                        'avatar_url' => $follow->follower->avatar_url,
                        'is_requested' => !$follow->is_accepted,
                        'created_at' => $follow->created_at
                    ];
                });

            return response()->json([
                'followers' => $followers
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching followers',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function following($username)
    {
        try {
            $user = User::where('username', $username)->firstOrFail();
            
            $following = $user->following()
                ->with('following')
                ->get()
                ->map(function ($follow) {
                    return [
                        'id' => $follow->following->id,
                        'username' => $follow->following->username,
                        'full_name' => $follow->following->full_name,
                        'avatar_url' => $follow->following->avatar_url,
                        'is_requested' => !$follow->is_accepted,
                        'created_at' => $follow->created_at
                    ];
                });

            return response()->json([
                'following' => $following
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching following',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function acceptFollow(Request $request, $username)
    {
        try {
            $follower = User::where('username', $username)->firstOrFail();
            
            $follow = Follow::where('follower_id', $follower->id)
                ->where('following_id', $request->user()->id)
                ->firstOrFail();

            $follow->update(['is_accepted' => true]);

            return response()->json([
                'message' => 'Follow request accepted'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error accepting follow request',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 