<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostAttachment extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'post_id',
        'caption',
        'storage_path',
    ];

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
} 