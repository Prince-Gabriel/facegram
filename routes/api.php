<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\FollowController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        
        // Protected routes
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [AuthController::class, 'logout']);
        });
    });

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('posts', PostController::class)->only(['index', 'store', 'destroy']);
        Route::get('users', [UserController::class, 'index']);
        Route::get('users/{username}', [UserController::class, 'show']);

        //following routes
        Route::post('users/{username}/follow', [FollowController::class, 'follow']);
        Route::delete('users/{username}/unfollow', [FollowController::class, 'unfollow']);
        Route::get('following', [FollowController::class, 'following']);
        Route::get('users/{username}/followers', [FollowController::class, 'followers']);
    });


    

});
