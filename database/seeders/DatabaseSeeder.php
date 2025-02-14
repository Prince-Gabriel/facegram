<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use App\Models\PostAttachment;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create users
        User::factory(10)->create()->each(function ($user) {
            // Create 3-5 posts for each user
            Post::factory(rand(3, 5))->create([
                'user_id' => $user->id
            ])->each(function ($post) {
                // Create 1-3 attachments for each post
                PostAttachment::factory(rand(1, 3))->create([
                    'post_id' => $post->id
                ]);
            });
        });
    }
}
