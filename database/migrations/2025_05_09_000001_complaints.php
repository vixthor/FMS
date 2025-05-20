<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('complaints', function (Blueprint $table) {
            $table->text('pending_reason')->nullable()->after('status');
        });
    }

    public function down()
    {
        Schema::table('complaints', function (Blueprint $table) {
            $table->dropColumn('pending_reason');
        });
    }
};
