<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnggotaController;
use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\Route;

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

Route::get('/', [WebController::class, 'index'])->name('index');
Route::post('/login-attempt', [WebController::class, 'login_attempt']);
Route::get('/logout', [WebController::class, 'logout']);

Route::middleware(['auth', 'memberRole'])->group(function () {
    Route::get('/anggota', function () {
        return view('anggota.anggota-layouts');
    });
    Route::get('/anggota/dashboard', [AnggotaController::class, 'info_anggota']);

    Route::get('/anggota/buku', function () {
        return view('anggota.anggota-layouts');
    });
    Route::post('/anggota/buku/pinjam', [AnggotaController::class, 'pinjam_buku']);
});

Route::middleware(['auth', 'adminRole'])->group(function () {
    Route::get('/admin', function () {
        return view('admin.admin-layouts');
    });
    Route::get('/admin/dashboard-data', [AdminController::class, 'dashboard_data']);

    Route::get('/admin/master-buku', function () {
        return view('admin.admin-layouts');
    });
    Route::get('/admin/peminjaman-buku', function () {
        return view('admin.admin-layouts');
    });
    Route::get('/admin/peminjaman-buku/data', [AdminController::class, 'peminjaman_buku']);
    Route::get('/admin/pengajuan-buku/data', [AdminController::class, 'pengajuan_buku']);
    Route::post('/admin/peminjaman-buku/approve', [AdminController::class, 'approve_peminjaman']);
    Route::post('/admin/peminjaman-buku/reject', [AdminController::class, 'reject_peminjaman']);

    Route::get('/admin/anggota', function () {
        return view('admin.admin-layouts');
    });
    Route::get('/admin/anggota/get-anggota', [AdminController::class, 'get_anggota']);
    Route::post('/admin/anggota/add', [AdminController::class, 'add_anggota']);
    Route::post('/admin/anggota/edit', [AdminController::class, 'edit_anggota']);
    Route::get('/admin/anggota/delete/{id}', [AdminController::class, 'delete_anggota']);
});
