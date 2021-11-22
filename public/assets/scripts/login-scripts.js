window.onpopstate = function(e){
    window.location.pathname = location.pathname
}

$('#login-form').on('submit', function(e){
    e.preventDefault()
    $('.login-errors').hide()
    if ($('#signin-email').val().length == 0) {
        alert('Email required')
        return false
    }else if ($('#signin-password').val().length == 0) {
        alert('Password required')
        return false
    }else{
        let email = $('#signin-email').val()
        let password = $('#signin-password').val()
        $('#btn-login-attempt').attr('disabled', 'disabled')
        $.ajax({
            type:'post',
            url:'/login-attempt',
            data:{
                email:email,
                password:password
            },
            headers:{
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success:function(response){
                $('#btn-login-attempt').removeAttr('disabled')
                if (response.response == 'success') {
                    if (response.role == 'admin') {
                        window.history.pushState('', '', '/admin')
                        location.reload()
                    }else if(response.role == 'anggota'){
                        window.history.pushState('', '', '/anggota')
                        location.reload()
                    }
                }else if(response.response == 'failed'){
                    $('.login-errors').show()
                }
            }
        })
    }
})