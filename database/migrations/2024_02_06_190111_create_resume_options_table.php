<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('resume_options', function (Blueprint $table) {
            $table->id();
            $table->string('font')->default('font-sans');
            $table->string('color_scheme')->default('light');
            $table->string('layout')->default('Modern');
            $table->integer('user_id');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resume_options');
    }
};
