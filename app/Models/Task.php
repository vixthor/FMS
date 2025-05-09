<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['complaint_id', 'personnel_id', 'assigned_date', 'completion_date', 'status'];

    public function complaint()
    {
        return $this->belongsTo(Complaint::class);
    }

    public function personnel()
    {
        return $this->belongsTo(User::class, 'personnel_id');
    }
}
