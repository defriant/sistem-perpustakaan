@if (Request::is('anggota'))
<div class="panel panel-profile">
    <div class="clearfix">
        <div class="profile-left">
            <div class="profile-header">
                <div class="overlay"></div>
                <div class="profile-main">
                    <img src="/assets/img/user.png" class="img-circle">
                    <h3 class="name" id="nama-pengguna"><span class="loading">Lorem, ipsum.</span></h3>
                </div>
            </div>
            <div class="profile-detail">
                <div class="profile-info">
                    <h4 class="heading">Informasi Pengguna</h4>
                    <ul class="list-unstyled list-justify" id="informasi-pengguna">
                        <li>Email <span class="loading" id="info-email">Lorem, ipsum dolor.</span></li>
                        <li>Telepon <span class="loading" id="info-telepon">(124) 823409234</span></li>
                        <li>Alamat <span class="loading" id="info-alamat">Lorem ipsum dolor sit amet.</span></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="profile-right">
            <h4 class="heading">Buku yang baru ditambahkan</h4>
            <div class="awards">
                <div class="row" id="new-book">
                    <div class="col-md-4">
                        <br>
                        <i class="far fa-books" style="font-size: 4.5rem"></i>
                        <br><br>
                        <h5><b class="loading">Lorem ipsum dolor sit amet.</b></h5>
                        <h5><span class="loading">Penulis : Lorem, ipsum.</span></h5>
                        <h5><span class="loading">Tahun Terbit : 10 January 2021</span></h5>
                    </div>
                    <div class="col-md-4">
                        <br>
                        <i class="far fa-books" style="font-size: 4.5rem"></i>
                        <br><br>
                        <h5><b class="loading">Lorem ipsum dolor sit amet.</b></h5>
                        <h5><span class="loading">Penulis : Lorem, ipsum.</span></h5>
                        <h5><span class="loading">Tahun Terbit : 10 January 2021</span></h5>
                    </div>
                    <div class="col-md-4">
                        <br>
                        <i class="far fa-books" style="font-size: 4.5rem"></i>
                        <br><br>
                        <h5><b class="loading">Lorem ipsum dolor sit amet.</b></h5>
                        <h5><span class="loading">Penulis : Lorem, ipsum.</span></h5>
                        <h5><span class="loading">Tahun Terbit : 10 January 2021</span></h5>
                    </div>
                </div>
                <br><br>
                <div class="text-center"><a href="#" class="btn btn-default" id="lihat-semua-buku">Lihat semua buku</a></div>
            </div>
            <h4 class="heading">Peminjaman Buku</h4>
            <div class="row">
                <div class="col-12" id="peminjaman-buku">
                    <table class="table">
                        <thead>
                            <tr>
                                <th><span class="loading">Kode Buku</span></th>
                                <th><span class="loading">Judul Buku</span></th>
                                <th><span class="loading">Tanggal Peminjaman</span></th>
                                <th><span class="loading">Tanggal Pengembalian</span></th>
                                <th><span class="loading">Status</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span class="loading">123</span></td>
                                <td><span class="loading">Steve</span></td>
                                <td><span class="loading">Jobs</span></td>
                                <td><span class="loading">@steve</span></td>
                                <td><span class="loading">Lorem, ipsum.</span></td>
                            </tr>
                            <tr>
                                <td><span class="loading">232</span></td>
                                <td><span class="loading">Simon</span></td>
                                <td><span class="loading">Philips</span></td>
                                <td><span class="loading">@simon</span></td>
                                <td><span class="loading">Lorem, ipsum.</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endif

@if (Request::is('anggota/buku'))
<div class="panel panel-headline">
    <div class="panel-heading">
        <h3 class="panel-title">Buku</h3>
    </div>
    <div class="panel-body">
        <table class="table table-striped" id="table-buku">
            <thead>
                <tr>
                    <th>Kode Buku</th>
                    <th>Judul Buku</th>
                    <th>Tahun Terbit</th>
                    <th>Penulis</th>
                    <th>Stok</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="buku-data">
                <tr class="table-loading">
                    <td><p>load</p></td>
                    <td><p>load</p></td>
                    <td><p>load</p></td>
                    <td><p>load</p></td>
                    <td><p>load</p></td>
                    <td><p>load</p></td>
                </tr>
                <tr class="table-loading">
                    <td><p>load</p></td>
                    <td><p>load</p></td>
                    <td><p>load</p></td>
                    <td><p>load</p></td>
                    <td><p>load</p></td>
                    <td><p>load</p></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
{{-- Modal Pinjam Buku --}}
<div class="modal fade" id="modalPinjamBuku" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Pengajuan Peminjaman Buku</h4>
            </div>
            <div class="modal-body">
                <div class="text-center">
                    <br>
                    <i class="far fa-books" style="font-size: 4.5rem"></i>
                    <br>
                    <h5><b id="judul_buku"></b></h5>
                    <h5>Penulis : <span id="penulis"></span></h5>
                    <h5>Tahun Terbit : <span id="tahun_terbit"></span></h5>
                    <br>
                </div>
                <hr>
                <input type="hidden" id="pinjamKodeBuku">
                <p>Tanggal Peminjaman :</p>
                <input type="text" id="pinjamTglPeminjaman" class="form-control datePicker" readonly style="background: #fff">
                <br>
                <p>Tanggal Pengembalian :</p>
                <input type="text" id="pinjamTglPengembalian" class="form-control datePicker" readonly style="background: #fff">
                <br>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btn-pinjam-buku">Pinjam</button>
            </div>
        </div>
    </div>
</div>
@endif