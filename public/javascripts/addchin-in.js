function addchin() {
    if ($('#title').val() == '' || $('#title').val() == null){
        alert('請輸入標題');
        return;
    }
    if ($('#content').val() == '' || $('#content').val() == null){
        alert('請輸入內文');
        return;
    }

    var postdata = {
        title: $('#title').val(),
        content: $('#content').val().replace(/ /g, '&nbsp;').replace(/\n/g, "<br />"),
        ipth: $('#ipth').val(),
        aaa: $('#aaa').val(),
    }

    var img = document.getElementById('u_img_file');
    if (!/.(gif|jpg|jpeg|png|GIF|JPG|PNG|JPEG)$/.test(img.value)) {
        alert("圖片類型不正確");
        return;
    }
    var fromData = new FormData();
    fromData.append('file', img.files[0]);
    var url = "/upload?id=" + $.cookie('userID');
    $.ajax({
        url: url,
        type: "POST",
        data: fromData,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.status == 0) {
                //alert("上傳成功");
                //history.go(0);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });

    $.post("/chinupdate", postdata, function (res) {
        if (res.status == 0) {
            alert('發文成功');
            location.href = '/chin';
        }
    });
}

$("#u_img_file").change(function () {
    readURL(this);
});
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#u_img").attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}