<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WebController extends Controller
{
    public function index()
    {
        if (!Auth::guest()) {
            if (Auth::user()->role == 'admin') {
                return redirect('/admin');
            } elseif (Auth::user()->role == 'anggota') {
                return redirect('/anggota');
            }
        }
        return view('login');
    }

    public function login_attempt(Request $request)
    {
        $attempt = Auth::attempt(['email' => $request->email, 'password' => $request->password]);
        if ($attempt) {
            return response()->json([
                "response" => "success",
                "role" => Auth::user()->role
            ]);
        } else {
            return response()->json([
                "response" => "failed"
            ]);
        }
    }

    public function logout()
    {
        Auth::logout();
    }
}
