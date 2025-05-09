<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function complaints()
    {
        return $this->hasMany(Complaint::class);
    }
}
