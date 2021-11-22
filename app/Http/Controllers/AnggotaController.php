<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\PeminjamanBuku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnggotaController extends Controller
{
    public function info_anggota()
    {
        $anggota_info = [
            "nama" => Auth::user()->name,
            "email" => Auth::user()->email,
            "telepon" => Auth::user()->telepon,
            "alamat" => Auth::user()->alamat
        ];

        $new_book = Buku::orderBy('created_at', 'DESC')->take(3)->get();
        foreach ($new_book as $b) {
            $b["tahun_terbit"] = date('d F Y', strtotime($b["tahun_terbit"]));
        }

        $peminjaman = [];
        foreach (Auth::user()->peminjaman_buku as $p) {
            $peminjaman[] = [
                "kode_buku" => $p->id_buku,
                "judul_buku" => $p->buku->judul_buku,
                "tgl_peminjaman" => date('d F Y', strtotime($p->tgl_peminjaman)),
                "tgl_pengembalian" => date('d F Y', strtotime($p->tgl_pengembalian)),
                "status" => $p->status
            ];
        }

        $response = [
            "anggota_info" => $anggota_info,
            "new_book" => $new_book,
            "peminjaman" => $peminjaman
        ];

        return response()->json($response);
    }

    public function pinjam_buku(Request $request)
    {
        PeminjamanBuku::create([
            'id_anggota' => Auth::user()->id,
            'id_buku' => $request->kode_buku,
            'tgl_peminjaman' => date('Y-m-d', strtotime($request->tgl_peminjaman)),
            'tgl_pengembalian' => date('Y-m-d', strtotime($request->tgl_pengembalian)),
            'status' => 'pengajuan'
        ]);

        $buku = Buku::where('kode_buku', $request->kode_buku)->first();
        $response = [
            "response" => "success",
            "message" => "Berhasil mengajukan pinjaman buku " . $buku->judul_buku
        ];
        return response()->json($response);
    }
}
