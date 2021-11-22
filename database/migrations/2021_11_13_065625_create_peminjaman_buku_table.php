<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeminjamanBukuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('peminjaman_buku', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('id_anggota', 10);
            $table->string('id_buku', 10);
            $table->date('tgl_peminjaman');
            $table->date('tgl_pengembalian');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('peminjaman_buku');
    }
}
