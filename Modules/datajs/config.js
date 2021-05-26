var nama = document.getElementById("nama");
var email = document.getElementById("emaill");
var pass = document.getElementById("pass");
var alamat = document.getElementById("alamat");
var notlpn = document.getElementById("notlpn");
function prosesCari() {
    alertProses();
    $("#email").val("");
    $.ajax({
        type: "POST",
        url: baseurl + "Data_user/data/pencarian",
        data: { email: $("#email").val() },
        dataType: "json",
        beforeSend: function (e) {
            if (e && e.overrideMimeType) {
                e.overrideMimeType("application/json;charset=UTF-8");
            }
        },
        success: function (response) {
            if (response.status == "success") {
                $("#card_hasil").show();
                nama.innerHTML = response.nama;
                email.innerHTML = "Email : " + response.email;
                pass.innerHTML = "Password Enkripsi : " + response.pass;
                alamat.innerHTML = "Alamat : " + response.alamat;
                notlpn.innerHTML = "Nomor Tlpn : " + response.notlpn;

            } else {
                $("#card_hasil").hide();
                alertTidakAda();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
        }
    });
}

function alertProses() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Sedang mencari data...'
    })
}
function alertTidakAda() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'error',
        title: 'Data User Tidak Ditemukan'
    })
}
$(document).ready(function () {
    $("#btn-search").click(function () {
        prosesCari();
    });

    $("#card_hasil").hide();
    $("#email").keyup(function () {
        if (event.keyCode == 13) {
            prosesCari();
        }
    });
});
