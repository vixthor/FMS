<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestAssignment extends Model
{
    protected $fillable = [
        'complaint_id',
        'technician_id',
        'assigned_at',
        'completed_at',
        'repair_time',
    ];

    public function complaint()
    {
        return $this->belongsTo(Complaint::class);
    }

    public function technician()
    {
        return $this->belongsTo(Technician::class);
    }
}
