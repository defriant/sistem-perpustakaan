<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeminjamanBuku extends Model
{
    use HasFactory;

    protected $table = 'peminjaman_buku';
    protected $fillable = [
        'id_anggota',
        'id_buku',
        'tgl_peminjaman',
        'tgl_pengembalian',
        'status'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id_anggota');
    }

    public function buku()
    {
        return $this->hasOne(Buku::class, 'kode_buku', 'id_buku');
    }
}
