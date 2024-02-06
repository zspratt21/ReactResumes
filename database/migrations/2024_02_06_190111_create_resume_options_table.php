<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('resume_options', function (Blueprint $table) {
            $table->id();
            $table->string('font');
            $table->string('color_scheme');
            $table->string('layout');
            $table->integer('user_id');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resume_options');
    }
};
