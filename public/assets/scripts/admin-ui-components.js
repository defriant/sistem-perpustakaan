function dashboardUiComponent() {
    $('#main-content').html(`<div class="panel panel-headline">
                                <div class="panel-heading">
                                </div>
                                <div class="panel-body">
                                    <div class="row" id="overview">
                                        <div class="col-md-3">
                                            <div class="metric">
                                                <span class="icon"><i class="fas fa-books"></i></span>
                                                <p>
                                                    <span class="number" id="book-number"><span class="loading">1,252</span></span>
                                                    <span class="title" id="book-overview"><span class="loading">Buku</span></span>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="metric">
                                                <span class="icon"><i class="fas fa-users"></i></span>
                                                <p>
                                                    <span class="number" id="anggota-number"><span class="loading">203</span></span>
                                                    <span class="title" id="anggota-overview"><span class="loading">Anggota</span></span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel-heading">
                                    <h3 class="panel-title">Baru ditambahkan</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="awards">
                                            <div class="row" id="new-book">
                                                <div class="col-md-3">
                                                    <br>
                                                    <i class="far fa-books" style="font-size: 4.5rem"></i>
                                                    <br><br>
                                                    <h5><b class="loading">Lorem ipsum dolor sit amet.</b></h5>
                                                    <h5><span class="loading">Penulis : Lorem, ipsum.</span></h5>
                                                    <h5><span class="loading">Tahun Terbit : 10 January 2021</span></h5>
                                                </div>
                                                <div class="col-md-3">
                                                    <br>
                                                    <i class="far fa-books" style="font-size: 4.5rem"></i>
                                                    <br><br>
                                                    <h5><b class="loading">Lorem ipsum dolor sit amet.</b></h5>
                                                    <h5><span class="loading">Penulis : Lorem, ipsum.</span></h5>
                                                    <h5><span class="loading">Tahun Terbit : 10 January 2021</span></h5>
                                                </div>
                                                <div class="col-md-3">
                                                    <br>
                                                    <i class="far fa-books" style="font-size: 4.5rem"></i>
                                                    <br><br>
                                                    <h5><b class="loading">Lorem ipsum dolor sit amet.</b></h5>
                                                    <h5><span class="loading">Penulis : Lorem, ipsum.</span></h5>
                                                    <h5><span class="loading">Tahun Terbit : 10 January 2021</span></h5>
                                                </div>
                                                <div class="col-md-3">
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
                                    </div>
                                </div>
                            </div>`)
    $('#lihat-semua-buku').on('click', function(e){
        e.preventDefault()
        $('#semua-buku').click()
    })
}

function masterBukuUiComponent() {
    $('#main-content').html(`<div class="panel panel-headline">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Master Buku</h3>
                                    <div class="right">
                                        <button type="button" class="btn-right-panel" data-toggle="modal" data-target="#modalTambahBuku"><i class="fas fa-plus"></i>&nbsp; Tambah Buku</button>
                                    </div>
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div class="modal fade" id="modalTambahBuku" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                                    aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title" id="myModalLabel">Tambah Buku</h4>
                                        </div>
                                        <div class="modal-body">
                                            <p>Judul Buku :</p>
                                            <input type="text" id="addJudulBuku" class="form-control">
                                            <br>
                                            <p>Tahun Terbit :</p>
                                            <input type="text" id="addTahunTerbit" class="form-control datePicker" readonly style="background: #fff">
                                            <br>
                                            <p>Penulis :</p>
                                            <input type="text" id="addPenulis" class="form-control">
                                            <br>
                                            <p>Stok :</p>
                                            <input type="text" id="addStok" class="form-control">
                                            <br>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" id="btn-tambah-buku">Tambahkan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id="modalEditBuku" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">

                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                                aria-hidden="true">&times;</span></button>
                                        <h4 class="modal-title" id="myModalLabel">Edit Buku</h4>
                                    </div>
                                    <div class="modal-body">
                                        <input type="hidden" id="editKodeBuku">
                                        <p>Judul Buku :</p>
                                        <input type="text" id="editJudulBuku" class="form-control">
                                        <br>
                                        <p>Tahun Terbit :</p>
                                        <input type="text" id="editTahunTerbit" class="form-control datePicker" readonly style="background: #fff">
                                        <br>
                                        <p>Penulis :</p>
                                        <input type="text" id="editPenulis" class="form-control">
                                        <br>
                                        <p>Stok :</p>
                                        <input type="text" id="editStok" class="form-control">
                                        <br>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" id="btn-edit-buku">Simpan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal fade" id="modalDeleteBuku" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                            <div class="modal-dialog modal-sm" role="document">
                                <div class="modal-content">
                                    <div class="modal-body">
                                        <h4 class="text-center" style="margin-top: 3rem" id="delete-warning-message"></h4>
                                        <input type="hidden" id="deleteKodeBuku">
                                        <div style="margin-top: 5rem; text-align: center">
                                            <button type="button" class="btn btn-danger" id="btn-delete-buku">Hapus</button>
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Batal</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`)
    $('.xdsoft_datetimepicker').remove()
    $('.datePicker').datetimepicker({
        timepicker: false,
        datepicker: true,
        format: 'd M Y',
    })
}

function peminjamanBukuUiComponent() {
    $('#main-content').html(`<div class="panel panel-headline">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Pengajuan Peminjaman</h3>
                                </div>
                                <div class="panel-body">
                                    <table class="table table-striped" id="table-pengajuan">
                                        <thead>
                                            <tr>
                                                <th>ID Peminjaman</th>
                                                <th>Nama Peminjam</th>
                                                <th>Kode Buku</th>
                                                <th>Judul Buku</th>
                                                <th>Tgl Pengambilan</th>
                                                <th>Tgl Pengembalian</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="pengajuan-data">
                                            <tr class="table-loading">
                                                <td><p>load</p></td>
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
                                                <td><p>load</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div class="panel panel-headline">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Peminjaman Buku</h3>
                                </div>
                                <div class="panel-body">
                                    <table class="table table-striped" id="table-peminjaman">
                                        <thead>
                                            <tr>
                                                <th>ID Peminjaman</th>
                                                <th>Nama Peminjam</th>
                                                <th>Kode Buku</th>
                                                <th>Judul Buku</th>
                                                <th>Tgl Pengambilan</th>
                                                <th>Tgl Pengembalian</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody id="peminjaman-data">
                                            <tr class="table-loading">
                                                <td><p>load</p></td>
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
                                                <td><p>load</p></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>`)
}

function anggotaUiComponent() {
    $('#main-content').html(`<div class="panel panel-headline">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Anggota</h3>
                                    <div class="right">
                                        <button type="button" class="btn-right-panel" data-toggle="modal" data-target="#modalTambahAnggota"><i class="fas fa-plus"></i>&nbsp; Tambah Anggota</button>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <table class="table table-striped" id="table-anggota">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nama</th>
                                                <th>Email</th>
                                                <th>Telepon</th>
                                                <th>Alamat</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="anggota-data">
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
                            
                            <div class="modal fade" id="modalTambahAnggota" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                                    aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title" id="myModalLabel">Tambah Anggota</h4>
                                        </div>
                                        <div class="modal-body">
                                            <p>Nama :</p>
                                            <input type="text" id="addNama" class="form-control">
                                            <br>
                                            <p>Email :</p>
                                            <input type="email" id="addEmail" class="form-control datePicker">
                                            <br>
                                            <p>Password :</p>
                                            <input type="text" class="form-control" value="Default Password : anggota123" disabled>
                                            <br>
                                            <p>Telepon :</p>
                                            <input type="number" id="addTelepon" class="form-control">
                                            <br>
                                            <p>Alamat :</p>
                                            <input type="text" id="addAlamat" class="form-control">
                                            <br>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" id="btn-tambah-anggota">Tambahkan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="modal fade" id="modalEditAnggota" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                                    aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title" id="myModalLabel">Edit Anggota</h4>
                                        </div>
                                        <div class="modal-body">
                                            <input type="hidden" id="editIdAnggota">
                                            <p>Nama :</p>
                                            <input type="text" id="editNama" class="form-control">
                                            <br>
                                            <p>Email :</p>
                                            <input type="email" id="editEmail" class="form-control datePicker">
                                            <br>
                                            <p>Password :</p>
                                            <input type="text" class="form-control" value="Default Password : anggota123" disabled>
                                            <br>
                                            <p>Telepon :</p>
                                            <input type="number" id="editTelepon" class="form-control">
                                            <br>
                                            <p>Alamat :</p>
                                            <input type="text" id="editAlamat" class="form-control">
                                            <br>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" id="btn-edit-anggota">Simpan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="modal fade" id="modalDeleteAnggota" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div class="modal-dialog modal-sm" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <h4 class="text-center" style="margin-top: 3rem" id="delete-warning-message"></h4>
                                            <input type="hidden" id="deleteIdAnggota">
                                            <div style="margin-top: 5rem; text-align: center">
                                                <button type="button" class="btn btn-danger" id="btn-delete-anggota">Hapus</button>
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Batal</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`)
}