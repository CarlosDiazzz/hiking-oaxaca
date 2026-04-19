<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'lead_name',
        'lead_email',
        'lead_phone',
        'tour_date',
        'payment_method',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'tour_date' => 'date',
        ];
    }

    public function passengers(): HasMany
    {
        return $this->hasMany(Passenger::class);
    }
}
