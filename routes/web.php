<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\NewsController;

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

Route::get('/', [NewsController::class, 'index'])->name('homepage');

Route::middleware(['auth', 'verified'])->group(function() {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::post('/news', [NewsController::class, 'store'])->name('create.news');
    Route::get('/news', [NewsController::class, 'show'])->name('my.news');
    Route::get('/news/edit/', [NewsController::class, 'edit'])->name('edit.news');
    Route::post('/news/update/', [NewsController::class, 'update'])->name('update.news');
    Route::post('/news/delete/', [NewsController::class, 'destroy'])->name('delete.news');

});



require __DIR__.'/auth.php';
