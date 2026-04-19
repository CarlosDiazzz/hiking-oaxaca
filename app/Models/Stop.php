<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Stop extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'time_display',
        'type',
        'cover_image_path',
        'latitude',
        'longitude',
        'map_embed_url',
    ];

    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class);
    }
}
