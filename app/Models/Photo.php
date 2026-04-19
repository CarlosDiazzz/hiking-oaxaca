<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Photo extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'stop_id',
        'uploader_name',
        'title',
        'description',
        'original_path',
        'blur_placeholder_path',
    ];

    public function stop(): BelongsTo
    {
        return $this->belongsTo(Stop::class);
    }
}
