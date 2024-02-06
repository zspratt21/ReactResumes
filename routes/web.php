<?php

use App\Http\Controllers\BrowserShotTestController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResumeController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [ProfileController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::patch('/resume-profile', [ResumeController::class, 'updateResumeProfile'])->name('resume-profile.update');
});

Route::middleware('RestrictToAdmin')->group(function () {
    Route::get('/php-info', function () {
        return new Response(phpinfo(), 200, ['Content-Type' => 'text/html']);
    })->name('php-info');

    Route::get('/browser-shot-test', [BrowserShotTestController::class, 'show'])->name('browser-shot-test');
});

require __DIR__.'/auth.php';
