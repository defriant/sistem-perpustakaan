<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    use HasFactory;

    protected $table = 'buku';

    protected $fillable = [
        'kode_buku',
        'judul_buku',
        'tahun_terbit',
        'penulis',
        'stok'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public $incrementing = 'false';

    public function peminjaman_buku()
    {
        return $this->hasMany(PeminjamanBuku::class, 'id_buku', 'kode_buku');
    }
}
