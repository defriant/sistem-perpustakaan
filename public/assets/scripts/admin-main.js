window.onpopstate = function(e){
    window.location.pathname = location.pathname
}

$(window).on('load', function(){
    if (location.pathname == '/admin') {
        $('title').html('Admin | Dashboard')
        dashboardData()
        $('#lihat-semua-buku').on('click', function(e){
            e.preventDefault()
            $('#semua-buku').click()
        })
    }else if(location.pathname == '/admin/master-buku'){
        $('title').html('Admin | Master Buku')
        $('.datePicker').datetimepicker({
            timepicker: false,
            datepicker: true,
            format: 'd M Y',
        })
        masterBukuData()
        addBuku()
        editBuku()
        deleteBuku()
    }else if(location.pathname == '/admin/peminjaman-buku'){
        $('title').html('Admin | Peminjaman Buku')
        peminjamanBukuData()
        pengajuanPeminjaman()
    }else if(location.pathname == '/admin/anggota'){
        $('title').html('Admin | Anggota')
        anggotaData()
        addAnggota()
        editAnggota()
        deleteAnggota()
    }
})

// ===== Sidebar Links
$('.sidebar-link').on('click', function(e){
    e.preventDefault()
    $('.sidebar-link').removeClass('active')
    $(this).addClass('active')

    let request = $(this).attr('href')
    window.history.pushState('', '', request)
    $('title').html($(this).data('title'))

    if (request == '/admin') {
        dashboardUiComponent()
        dashboardData()
    }else if(request == '/admin/master-buku'){
        masterBukuUiComponent()
        masterBukuData()
        addBuku()
        editBuku()
        deleteBuku()
    }else if(request == '/admin/peminjaman-buku'){
        peminjamanBukuUiComponent()
        peminjamanBukuData()
        pengajuanPeminjaman()
    }else if(request == '/admin/anggota'){
        anggotaUiComponent()
        anggotaData()
        addAnggota()
        editAnggota()
        deleteAnggota()
    }
})

// ===== ADMIN DASHBOARD FUNCTION =====
function dashboardData() {
    $.ajax({
        type:'get',
        url:'/admin/dashboard-data',
        success:function(response){
            $('#book-number').html(response.buku)
            $('#book-overview').html('Buku')

            $('#anggota-number').html(response.anggota)
            $('#anggota-overview').html('Anggota')
            
            $('#new-book').empty()
            $.each(response.new_book, function(i, v){
                $('#new-book').append(`<div class="col-md-3">
                                            <br>
                                            <i class="far fa-books" style="font-size: 4.5rem"></i>
                                            <br><br>
                                            <h5><b>${v.judul_buku}</b></h5>
                                            <h5>Penulis : ${v.penulis}</h5>
                                            <h5>Tahun Terbit : ${v.tahun_terbit}</h5>
                                        </div>`)
            })
        }
    })
}
// ===== END ADMIN DASHBOARD FUNCTION =====

// ===== MASTER BUKU FUNCTION =====
function masterBukuData() {
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
                    return `<button id="editBuku" class="btn-table-action edit" data-toggle="modal" data-target="#modalEditBuku"><i class="fas fa-cog"></i></button> &nbsp; 
                            <button id="deleteBuku" class="btn-table-action delete" data-toggle="modal" data-target="#modalDeleteBuku"><i class="fas fa-trash-alt"></i></button>`
                }
            }
        ]
    })
    $('#table-buku tbody').on('click', '[id*=editBuku]', function(){
        let data = table.row($(this).parents('tr')).data();

        $('#editKodeBuku').val(data['kode_buku'])
        $('#editJudulBuku').val(data['judul_buku'])
        $('#editTahunTerbit').val(data['tahun_terbit'])
        $('#editPenulis').val(data['penulis'])
        $('#editStok').val(data['stok'])
    })

    $('#table-buku tbody').on('click', '[id*=deleteBuku]', function(){
        let data = table.row($(this).parents('tr')).data()
        let kode = data['kode_buku']
        $('#delete-warning-message').html('Hapus buku '+kode+' ?')
        $('#deleteKodeBuku').val(kode)
    })
}

function addBuku() {
    $('#btn-tambah-buku').on('click', function(){
        if ($('#addJudulBuku').val().length == 0) {
            alert('Masukkan judul buku')
        }else if($('#addTahunTerbit').val().length == 0){
            alert('Masukkan tahun terbit')
        }else if($('#addPenulis').val().length == 0){
            alert('Masukkan penulis buku')
        }else if($('#addStok').val().length == 0){
            alert('Masukkan stok buku')
        }else{
            $('#btn-tambah-buku').attr('disabled', 'disabled')
            $.ajax({
                type:'post',
                url:'/api/books',
                data:{
                    judul_buku:$('#addJudulBuku').val(),
                    tahun_terbit:$('#addTahunTerbit').val(),
                    penulis:$('#addPenulis').val(),
                    stok:$('#addStok').val()
                },
                success:function(response){
                    $('#btn-tambah-buku').removeAttr('disabled')
                    toastr.option = {
                        "timeout":"5000"
                    }
                    toastr["success"](response.message)
                    $('#modalTambahBuku').modal('toggle')
                    $('#table-buku').DataTable().ajax.reload()
                    $('#addJudulBuku').val('')
                    $('#addTahunTerbit').val('')
                    $('#addPenulis').val('')
                    $('#addStok').val('')
                }
            })
        }
    })
}

function editBuku() {
    $('#btn-edit-buku').on('click', function(){
        if ($('#editJudulBuku').val().length == 0) {
            alert('Masukkan judul buku')
        }else if($('#editTahunTerbit').val().length == 0){
            alert('Masukkan tahun terbit')
        }else if($('#editPenulis').val().length == 0){
            alert('Masukkan penulis buku')
        }else if($('#editStok').val().length == 0){
            alert('Masukkan stok buku')
        }else{
            $('#btn-edit-buku').attr('disabled', 'disabled')
            $.ajax({
                type:'put',
                url:'/api/books/'+$('#editKodeBuku').val(),
                data:{
                    judul_buku:$('#editJudulBuku').val(),
                    tahun_terbit:$('#editTahunTerbit').val(),
                    penulis:$('#editPenulis').val(),
                    stok:$('#editStok').val()
                },
                success:function(response){
                    $('#btn-edit-buku').removeAttr('disabled')
                    toastr.option = {
                        "timeout":"5000"
                    }
                    toastr["success"](response.message)
                    $('#modalEditBuku').modal('toggle')
                    $('#table-buku').DataTable().ajax.reload()
                }
            })
        }
    })
}

function deleteBuku() {
    $('#btn-delete-buku').on('click', function(){
        $('#btn-delete-buku').attr('disabled', 'disabled')
        $.ajax({
            type:'delete',
            url:'/api/books/'+$('#deleteKodeBuku').val(),
            success:function(response){
                $('#btn-delete-buku').removeAttr('disabled')
                toastr.option = {
                    "timeout":"5000"
                }
                toastr["success"](response.message)
                $('#modalDeleteBuku').modal('toggle')
                $('#table-buku').DataTable().ajax.reload()
            }
        })
    })
}
// ===== END MASTER BUKU FUNCTION =====

// ===== PEMINJAMAN BUKU FUNCTION =====
function peminjamanBukuData() {
    $('#table-peminjaman').DataTable({
        'ajax' : '/admin/peminjaman-buku/data',
        'columns' : [
            {'data':'id_peminjaman'},
            {'data':'nama_peminjam'},
            {'data':'kode_buku'},
            {'data':'judul_buku'},
            {'data':'tgl_pengambilan'},
            {'data':'tgl_pengembalian'},
            {'data':'status'}
        ]
    })
}

function pengajuanPeminjaman() {
    let tablePengejuan = $('#table-pengajuan').DataTable({
        'ajax' : '/admin/pengajuan-buku/data',
        'columns' : [
            {'data':'id_peminjaman'},
            {'data':'nama_peminjam'},
            {'data':'kode_buku'},
            {'data':'judul_buku'},
            {'data':'tgl_pengambilan'},
            {'data':'tgl_pengembalian'},
            {
                data: null,
                render:function(data, type, row){
                    return `<button id="approvePeminjaman" class="btn-table-action acc"><i class="fas fa-check"></i></button> &nbsp; 
                            <button id="rejectPeminjaman" class="btn-table-action delete"><i class="fas fa-ban"></i></button>`
                }
            }
        ]
    })
    
    $('#table-pengajuan tbody').on('click', '[id*=approvePeminjaman]', function(){
        let data = tablePengejuan.row($(this).parents('tr')).data();
        $.ajax({
            type:'post',
            url:'/admin/peminjaman-buku/approve',
            headers:{
                'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
            },
            data:{
                idPeminjaman:data['id_peminjaman'],
                kodeBuku:data['kode_buku']
            },
            success:function(response){
                if (response.response == "success") {
                    toastr.option = {
                        "timeout":"5000"
                    }
                    toastr["success"](response.message)
                    $('#table-pengajuan').DataTable().ajax.reload()
                    $('#table-peminjaman').DataTable().ajax.reload()
                }else if(response.response == "failed"){
                    toastr.option = {
                        "timeout":"5000"
                    }
                    toastr["error"](response.message)
                }
            }
        })
    })

    $('#table-peminjaman tbody').on('click', '[id*=rejectPeminjaman]', function(){
        let data = tablePengejuan.row($(this).parents('tr')).data();
        $.ajax({
            type:'post',
            url:'/admin/peminjaman-buku/reject',
            headers:{
                'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
            },
            data:{
                idPeminjaman:data['id_peminjaman']
            },
            success:function(response){
                toastr.option = {
                    "timeout":"5000"
                }
                toastr["info"](response.message)
                $('#table-pengajuan').DataTable().ajax.reload()
                $('#table-peminjaman').DataTable().ajax.reload()
            }
        })
    })
}

// ===== ANGGOTA FUNCTION =====
function anggotaData() {
    let table = $('#table-anggota').DataTable({
        'ajax' : '/admin/anggota/get-anggota',
        'columns' : [
            {'data':'id'},
            {'data':'name'},
            {'data':'email'},
            {'data':'telepon'},
            {'data':'alamat'},
            {
                data:null,
                render:function(data, type, row){
                    return `<button id="editAnggota" class="btn-table-action edit" data-toggle="modal" data-target="#modalEditAnggota"><i class="fas fa-cog"></i></button> &nbsp; 
                            <button id="deleteAnggota" class="btn-table-action delete" data-toggle="modal" data-target="#modalDeleteAnggota"><i class="fas fa-trash-alt"></i></button>`
                }
            }
        ]
    })

    $('#table-anggota tbody').on('click', '[id*=editAnggota]', function(){
        let data = table.row($(this).parents('tr')).data()
        $('#editIdAnggota').val(data['id'])
        $('#editNama').val(data['name']),
        $('#editEmail').val(data['email']),
        $('#editTelepon').val(data['telepon']),
        $('#editAlamat').val(data['alamat'])
    })

    $('#table-anggota tbody').on('click', '[id*=deleteAnggota]', function(){
        let data = table.row($(this).parents('tr')).data()
        $('#delete-warning-message').html('Hapus anggota '+data['name'])
        $('#deleteIdAnggota').val(data['id'])
    })
}

function addAnggota() {
    $('#btn-tambah-anggota').on('click', function(){
        if ($('#addNama').val().length == 0) {
            alert('Masukkan nama anggota')
        }else if($('#addEmail').val().length == 0){
            alert('Masukkan email')
        }else if($('#addTelepon').val().length == 0){
            alert('Masukkan telepon')
        }else if($('#addAlamat').val().length == 0){
            alert('Masukkan alamat')
        }else{
            $('#btn-tambah-anggota').attr('disabled', 'disabled')
            $.ajax({
                type:'post',
                url:'/admin/anggota/add',
                data:{
                    nama:$('#addNama').val(),
                    email:$('#addEmail').val(),
                    telepon:$('#addTelepon').val(),
                    alamat:$('#addAlamat').val()
                },
                headers:{
                    'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
                },
                success:function(response){
                    $('#btn-tambah-anggota').removeAttr('disabled')
                    $('#modalTambahAnggota').modal('toggle')
                    $('#table-anggota').DataTable().ajax.reload()
                    toastr.option = {
                        "timeout":"5000"
                    }
                    toastr["success"](response.message)
                    $('#addNama').val(''),
                    $('#addEmail').val(''),
                    $('#addTelepon').val(''),
                    $('#addAlamat').val('')
                }
            }) 
        }
    })
}

function editAnggota() {
    $('#btn-edit-anggota').on('click', function(){
        if ($('#editNama').val().length == 0) {
            alert('Masukkan nama anggota')
        }else if($('#editEmail').val().length == 0){
            alert('Masukkan email')
        }else if($('#editTelepon').val().length == 0){
            alert('Masukkan telepon')
        }else if($('#editAlamat').val().length == 0){
            alert('Masukkan alamat')
        }else{
            $('#btn-edit-anggota').attr('disabled', 'disabled')
            $.ajax({
                type:'post',
                url:'/admin/anggota/edit',
                data:{
                    id:$('#editIdAnggota').val(),
                    nama:$('#editNama').val(),
                    email:$('#editEmail').val(),
                    telepon:$('#editTelepon').val(),
                    alamat:$('#editAlamat').val()
                },
                headers:{
                    'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
                },
                success:function(response){
                    $('#btn-edit-anggota').removeAttr('disabled')
                    $('#modalEditAnggota').modal('toggle')
                    $('#table-anggota').DataTable().ajax.reload()
                    toastr.option = {
                        "timeout":"5000"
                    }
                    toastr["success"](response.message)
                }
            }) 
        }
    })
}

function deleteAnggota() {
    $('#btn-delete-anggota').on('click', function(){
        $('#btn-delete-anggota').attr('disabled', 'disabled')
        $.ajax({
            type:'get',
            url:'/admin/anggota/delete/'+$('#deleteIdAnggota').val(),
            success:function(response){
                $('#btn-delete-anggota').removeAttr('disabled')
                $('#modalDeleteAnggota').modal('toggle')
                $('#table-anggota').DataTable().ajax.reload()
                toastr.option = {
                    "timeout":"5000"
                }
                toastr["success"](response.message)
            }
        })
    })
}
// ===== END ANGGOTA FUNCTION =====

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