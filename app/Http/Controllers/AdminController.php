<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\PeminjamanBuku;

class AdminController extends Controller
{
    public function dashboard_data()
    {
        $buku = Buku::all();
        $buku = count($buku);

        $anggota = User::where('role', 'anggota')->get();
        $anggota = count($anggota);

        $new_book = Buku::orderBy('created_at', 'DESC')->take(4)->get();
        $response = [
            "response" => "success",
            "buku" => $buku,
            "anggota" => $anggota,
            "new_book" => $new_book
        ];

        return response()->json($response);
    }

    public function peminjaman_buku()
    {
        $dataPeminjaman = PeminjamanBuku::orderBy('created_at', 'DESC')->get();
        $peminjaman = [];
        foreach ($dataPeminjaman as $p) {
            $peminjaman[] = [
                "id_peminjaman" => $p->id,
                "nama_peminjam" => $p->user->name,
                "kode_buku" => $p->id_buku,
                "judul_buku" => $p->buku->judul_buku,
                "tgl_pengambilan" => date('d F Y', strtotime($p->tgl_peminjaman)),
                "tgl_pengembalian" => date('d F Y', strtotime($p->tgl_pengembalian)),
                "status" => $p->status
            ];
        }
        $response = [
            "response" => "success",
            "data" => $peminjaman
        ];
        return response()->json($response);
    }

    public function pengajuan_buku()
    {
        $dataPeminjaman = PeminjamanBuku::where('status', 'pengajuan')->orderBy('created_at', 'ASC')->get();
        $peminjaman = [];
        foreach ($dataPeminjaman as $p) {
            $peminjaman[] = [
                "id_peminjaman" => $p->id,
                "nama_peminjam" => $p->user->name,
                "kode_buku" => $p->id_buku,
                "judul_buku" => $p->buku->judul_buku,
                "tgl_pengambilan" => date('d F Y', strtotime($p->tgl_peminjaman)),
                "tgl_pengembalian" => date('d F Y', strtotime($p->tgl_pengembalian))
            ];
        }
        $response = [
            "response" => "success",
            "data" => $peminjaman
        ];
        return response()->json($response);
    }

    public function approve_peminjaman(Request $request)
    {
        $buku = Buku::where('kode_buku', $request->kodeBuku)->first();
        if ($buku->stok > 0) {
            Buku::where('kode_buku', $request->kodeBuku)->update([
                "stok" => $buku->stok - 1
            ]);
            PeminjamanBuku::where('id', $request->idPeminjaman)->update([
                "status" => "diterima"
            ]);
            $response = [
                "response" => "success",
                "message" => "Pinjaman dengan ID " . $request->idPeminjaman . " berhasil di approve"
            ];
            return response()->json($response);
        } else {
            $response = [
                "response" => "failed",
                "message" => "Stok buku " . $buku->judul_buku . " tidak mencukupi"
            ];
            return response()->json($response);
        }
    }

    public function reject_peminjaman(Request $request)
    {
        PeminjamanBuku::where('id', $request->idPeminjaman)->update([
            "status" => "ditolak"
        ]);
        $response = [
            "response" => "success",
            "message" => "Pengajuan peminjaman ID " . $request->idPeminjaman . " ditolak"
        ];
        return response()->json($response);
    }

    public function get_anggota()
    {
        $anggota = User::where('role', '!=', 'admin')->get();
        return response()->json(["data" => $anggota]);
    }

    public function add_anggota(Request $request)
    {
        User::create([
            'name' => $request->nama,
            'email' => $request->email,
            'password' => bcrypt('anggota123'),
            'telepon' => $request->telepon,
            'alamat' => $request->alamat,
            'role' => 'anggota'
        ]);

        $response = [
            "response" => "success",
            "message" => "Berhasil menambahkan anggota " . $request->nama
        ];
        return response()->json($response);
    }

    public function edit_anggota(Request $request)
    {
        $editAnggota = User::where('id', $request->id)->update([
            'name' => $request->nama,
            'email' => $request->email,
            'telepon' => $request->telepon,
            'alamat' => $request->alamat
        ]);
        if ($editAnggota) {
            $response = [
                "response" => "success",
                "message" => $request->nama . " berhasil di edit"
            ];
            return response()->json($response);
        }
    }

    public function delete_anggota($id)
    {
        User::where('id', $id)->delete();
        $response = [
            "response" => "success",
            "message" => "Anggota dengan ID " . $id . " berhasil dihapus"
        ];
        return response()->json($response);
    }
}
