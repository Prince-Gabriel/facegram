<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        try {
            $posts = Post::with(['user', 'attachments'])
                ->latest()
                ->get()
                ->map(function ($post) {
                    return [
                        'id' => $post->id,
                        'caption' => $post->caption,
                        'created_at' => $post->created_at,
                        'user' => [
                            'id' => $post->user->id,
                            'username' => $post->user->username,
                            'full_name' => $post->user->full_name,
                            'avatar_url' => $post->user->avatar_url
                        ],
                        'attachments' => $post->attachments->map(function ($attachment) {
                            return [
                                'id' => $attachment->id,
                                'storage_path' => $attachment->storage_path
                            ];
                        })
                    ];
                });

            return response()->json([
                'posts' => $posts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching posts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'caption' => 'required|string|max:1000',
            'attachments' => 'required|array|min:1',
            'attachments.*' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        try {
            $post = Post::create([
                'user_id' => $request->user()->id,
                'caption' => $request->caption
            ]);

            foreach ($request->file('attachments') as $file) {
                $path = $file->store('posts', 'public');
                $post->attachments()->create([
                    'storage_path' => asset('/storage' . $path)
                ]);
            }

            return response()->json([
                'message' => 'Post created successfully',
                'post' => $post->load('attachments')
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating post',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Post $post)
    {
        return response()->json([
            'post' => $post->load(['user', 'attachments'])
        ]);
    }
} 