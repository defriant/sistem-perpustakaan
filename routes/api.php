<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/books', [ApiController::class, 'books']);
Route::get('/books/{kode}', [ApiController::class, 'detail_book']);
Route::post('/books', [ApiController::class, 'add_book']);
Route::put('/books/{kode}', [ApiController::class, 'edit_book']);
Route::delete('/books/{kode}', [ApiController::class, 'delete_book']);
