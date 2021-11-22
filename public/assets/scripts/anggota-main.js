window.onpopstate = function(e){
    window.location.pathname = location.pathname
}

$(window).on('load', function(){
    if (location.pathname == '/anggota') {
        $('title').html('Anggota | Dashboard')
        anggotaDashboard()
        $('#lihat-semua-buku').on('click', function(e){
            e.preventDefault()
            $('#semua-buku').click()
        })
    }else if(location.pathname == '/anggota/buku'){
        $('title').html('Anggota | Buku')
        $('.datePicker').datetimepicker({
            timepicker: false,
            datepicker: true,
            format: 'd M Y',
        })
        bukuData()
        pinjamBuku()
    }
})

// ===== Sidebar Links
$('.sidebar-link').on('click', function(e){
    e.preventDefault()
    $('.sidebar-link').removeClass('active')
    $(this).addClass('active')
    let request = $(this).attr('href')
    if (request != location.pathname) {
        window.history.pushState('', '', request)
        $('title').html($(this).data('title'))
        if (request == '/anggota') {
            anggotaDashboardUiComponent()
            anggotaDashboard()
        }else if(request == '/anggota/buku'){
            bukuUiComponent()
            bukuData()
            pinjamBuku()
        }
    }
})

// ===== Anggota Dashboard Function =====
function anggotaDashboard() {
    $.ajax({
        type:'get',
        url:'/anggota/dashboard',
        success:function(response){
            $('#nama-pengguna').html(response.anggota_info.nama)
            $('#info-email').html(response.anggota_info.email)
            $('#info-telepon').html(response.anggota_info.telepon)
            $('#info-alamat').html(response.anggota_info.alamat)
            $('#informasi-pengguna li span').removeClass('loading')
            $('#new-book').empty()
            $.each(response.new_book, function(i, v){
                $('#new-book').append(`<div class="col-md-4">
                                            <br>
                                            <i class="far fa-books" style="font-size: 4.5rem"></i>
                                            <br><br>
                                            <h5><b>${v.judul_buku}</b></h5>
                                            <h5>Penulis : ${v.penulis}</h5>
                                            <h5>Tahun Terbit : ${v.tahun_terbit}</h5>
                                        </div>`)
            })
            if (response.peminjaman.length != 0) {
                $('#peminjaman-buku').html(`<table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>Kode Buku</th>
                                                        <th>Judul Buku</th>
                                                        <th>Tanggal Peminjaman</th>
                                                        <th>Tanggal Pengembalian</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="peminjaman-buku-data">

                                                </tbody>
                                            </table>`)
                $.each(response.peminjaman, function(i, v){
                    $('#peminjaman-buku-data').append(`<tr>
                                                            <td>${v.kode_buku}</td>
                                                            <td>${v.judul_buku}</td>
                                                            <td>${v.tgl_peminjaman}</td>
                                                            <td>${v.tgl_pengembalian}</td>
                                                            <td>${v.status}</td>
                                                        </tr>`)
                })
            }else{
                $('#peminjaman-buku').html(`<div style="padding: 3rem 0">
                                                <h5 style="text-align: center"><i>Belum ada buku yang dipinjam</i></h5>
                                            </div>`)
            }
        }
    })
}
// ===== End Anggota Dashboard Function =====

// ===== Buku Function =====
function bukuData() {
    let table = $('#table-buku').DataTable({
        'ajax' : '/api/books',
        'columns' : [
            {'data':'kode_buku'},
            {'data':'judul_buku'},
            {'data':'tahun_terbit'},
            {'data':'penulis'},
            {'data':'stok'},
            {
                data: null,
                render:function(data, type, row){
                    return `<button id="pinjamBuku" class="btn-table-action edit" data-toggle="modal" data-target="#modalPinjamBuku"><i class="fas fa-exchange"></i>&nbsp; Pinjam</button>`
                }
            }
        ]
    })
    $('#table-buku tbody').on('click', '[id*=pinjamBuku]', function(){
        let data = table.row($(this).parents('tr')).data();

        $('#judul_buku').html(data['judul_buku'])
        $('#penulis').html(data['penulis'])
        $('#tahun_terbit').html(data['tahun_terbit'])
        $('#pinjamKodeBuku').val(data['kode_buku'])
    })
}

function pinjamBuku() {
    $('#btn-pinjam-buku').on('click', function(){
        if ($('#pinjamTglPeminjaman').val().length == 0) {
            alert('Masukkan tanggal peminjaman')
        }else if($('#pinjamTglPengembalian').val().length == 0){
            alert('Masukkan tanggal pengembalian')
        }else{
            $('#btn-pinjam-buku').attr('disabled', 'disabled')
            $.ajax({
                type:'post',
                url:'/anggota/buku/pinjam',
                headers:{
                    'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
                },
                data:{
                    kode_buku:$('#pinjamKodeBuku').val(),
                    tgl_peminjaman:$('#pinjamTglPeminjaman').val(),
                    tgl_pengembalian:$('#pinjamTglPengembalian').val()
                },
                success:function(response){
                    $('#btn-pinjam-buku').removeAttr('disabled')
                    toastr.option = {
                        "timeout":"5000"
                    }
                    toastr["success"](response.message)
                    $('#modalPinjamBuku').modal('toggle')
                    $('#pinjamTglPeminjaman').val('')
                    $('#pinjamTglPengembalian').val('')
                }
            })
        }
    })
}
// ===== End Buku Function =====

// ===== USER LOGOUT =====
$('#user-logout').on('click', function(e){
    e.preventDefault()
    window.history.pushState('', '', '/')
    $.ajax({
        type:'get',
        url:'/logout',
        success:function(){
            location.reload()
        }
    })
})