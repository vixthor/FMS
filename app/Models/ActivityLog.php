<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory;

    protected $table = 'activity_logs';

    protected $fillable = [
        'user_id',
        'action',
        'timestamp',
        'details',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function logAction($userId, $action, $details = null)
    {
        self::create([
            'user_id' => $userId,
            'action' => $action,
            'details' => $details,
            'timestamp' => now(),
        ]);
    }
}
