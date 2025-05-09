<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'building_id',
        'room_number',
        'issue_type',
        'details',
        'priority',
        'status',
        'user_approved', // Tracks user approval
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function building()
    {
        return $this->belongsTo(Building::class);
    }

    public function assignment()
    {
        return $this->hasOne(RequestAssignment::class);
    }

    public function assignedTechnician()
    {
        return $this->hasOneThrough(
            Technician::class,
            RequestAssignment::class,
            'complaint_id',
            'id',
            'id',
            'technician_id'
        );
    }
}
