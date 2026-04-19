<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminGalleryController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/reservar', function () {
    return Inertia::render('Reservation/Create');
})->name('reservation.create');

Route::post('/reservar', [ReservationController::class, 'store'])->name('reservations.store');

Route::get('/api/availability', [ReservationController::class, 'checkAvailability'])->name('reservations.availability');



Route::get('/parada/{slug}', [GalleryController::class, 'show'])->name('gallery.show');

Route::get('/nosotros', function () {
    return Inertia::render('About');
})->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/admin/reservas', [AdminController::class, 'dashboard'])->name('admin.reservations.dashboard');
    Route::patch('/admin/reservas/{reservation}/status', [AdminController::class, 'updateReservationStatus'])->name('admin.reservations.status');
    Route::get('/admin/gallery', [AdminGalleryController::class, 'index'])->name('admin.gallery.index');
    Route::get('/admin/gallery/{stop}', [AdminGalleryController::class, 'show'])->name('admin.gallery.show');
    Route::post('/admin/gallery/photos', [AdminGalleryController::class, 'store'])->name('admin.gallery.store');
    Route::delete('/admin/gallery/photos/{photo}', [AdminGalleryController::class, 'destroy'])->name('admin.gallery.destroy');
    Route::patch('/admin/gallery/{stop}/coordinates', [AdminGalleryController::class, 'updateCoordinates'])->name('admin.gallery.coordinates');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
