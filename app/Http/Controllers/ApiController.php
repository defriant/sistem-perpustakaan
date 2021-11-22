<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function books()
    {
        $buku = Buku::all();
        foreach ($buku as $b) {
            $b["tahun_terbit"] = date('d F Y', strtotime($b["tahun_terbit"]));
        }
        $data = [
            "response" => "success",
            "data" => $buku
        ];
        return response()->json($data);
    }

    public function detail_book($kode)
    {
        $buku = Buku::where('kode_buku', $kode)->first();
        $buku["tahun_terbit"] = date('d F Y', strtotime($buku["tahun_terbit"]));
        $response = [
            "response" => "success",
            "message" => "Berhasil mendapatkan data buku " . $kode,
            "data" => $buku
        ];
        return response()->json($response);
    }

    public function add_book(Request $request)
    {
        function random($type, $length)
        {
            $result = "";
            if ($type == 'char') {
                $char = 'ABCDEFGHJKLMNPRTUVWXYZ';
                $max        = strlen($char) - 1;
                for ($i = 0; $i < $length; $i++) {
                    $rand = mt_rand(0, $max);
                    $result .= $char[$rand];
                }
                return $result;
            } elseif ($type == 'num') {
                $char = '123456789';
                $max        = strlen($char) - 1;
                for ($i = 0; $i < $length; $i++) {
                    $rand = mt_rand(0, $max);
                    $result .= $char[$rand];
                }
                return $result;
            }
        }

        $kodeBuku = random('char', 1) . random('num', 4);
        while (true) {
            $cek = Buku::where('kode_buku', $kodeBuku)->first();
            if ($cek) {
                $kodeBuku = random('char', 1) . random('num', 4);
            }
            break;
        }

        $tahunTerbit = date('Y-m-d', strtotime($request->tahun_terbit));
        $addBuku = Buku::create([
            'kode_buku' => $kodeBuku,
            'judul_buku' => $request->judul_buku,
            'tahun_terbit' => $tahunTerbit,
            'penulis' => $request->penulis,
            'stok' => $request->stok
        ]);

        $response = [
            "response" => "success",
            "message" => "Buku " . $request->judul_buku . " berhasil ditambahkan",
            "data" => $addBuku
        ];
        return response()->json($response, 200);
    }

    public function edit_book(Request $request, $kode)
    {
        $tahunTerbit = date('Y-m-d', strtotime($request->tahun_terbit));
        Buku::where('kode_buku', $kode)->update([
            'judul_buku' => $request->judul_buku,
            'tahun_terbit' => $tahunTerbit,
            'penulis' => $request->penulis,
            'stok' => $request->stok
        ]);

        $response = [
            "response" => "success",
            "message" => "Buku " . $kode . " berhasil di edit"
        ];
        return response()->json($response, 200);
    }

    public function delete_book($kode)
    {
        Buku::where('kode_buku', $kode)->delete();
        $response = [
            "response" => "success",
            "message" => "Buku " . $kode . " berhasil dihapus"
        ];
        return response()->json($response, 200);
    }
}
