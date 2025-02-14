<?php

use Illuminate\Support\Facades\Route;

// Route untuk SPA React
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '^(?!api).*$');
