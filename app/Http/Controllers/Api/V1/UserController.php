<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $currentUser = request()->user();
        
        $users = User::where('id', '!=', $currentUser->id)
            ->whereDoesntHave('followers', function ($query) use ($currentUser) {
                $query->where('follower_id', $currentUser->id);
            })
            ->get();

        return response()->json([
            'users' => $users
        ]);
    }

    public function show(Request $request, $username)
    {
        $currentUser = $request->user();
        $user = User::where('username', $username)
            ->withCount('posts')
            ->firstOrFail();

        $response = [
            ...$user->toArray(),
            'is_your_account' => $user->id === $currentUser->id,
        ];

        // Jika bukan akun private atau akun sendiri, tampilkan posts
        if (!$user->is_private || $user->id === $currentUser->id) {
            $response['posts'] = $user->posts()
                ->with('attachments')
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json($response);
    }
} 