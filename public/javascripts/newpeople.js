function newnewpeople (data) {
    var content = document. createElement ('div');
    content.className = "card";
    var dat = new Date (data. postdate);
    var crt_date = (dat.getMonth () + 1) + '/' + dat.getDate () + '  ' + (dat .getHours() < 10 ? '0' + dat.getHours() : dat .getHours()) + ':' + (dat .getMinutes() < 10 ? '0' + dat.getMinutes() : dat.getMinutes()) ;
    var addHtml = 
    `
    
            
                <div class="card-body">
                    <a href="/newpeople-in?_id=${data._id}">
                    <img class="" src="../photos/${data.ipth}">
                    </a>
                    <h5 class="card-title">${data.title}</h5>
                    <a href="/newpeople-in?_id=${data._id}" class="ywbtn btn btn-bottom-right">了解更多</a>
                </div>
            
    
    `;
    content.insertAdjacentHTML('beforeend', addHtml);
    $('#newpeople').append(content);
    }
    
    function getUrlVal(val) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0; i<vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == val) {
                return pair[1];
            }
        }
        return (false);
    }
    
    function getnewpeople() {
        var search = '';
    // if (getUrlVal ("type")) {
    // search += "type=" + getUrlVal ("type") + '&';
    // }
    // if (getUrlVal ("account")) {
    // search += "account=" + getUrlVal ("account") + '&';
    // }
    if (getUrlVal ("title")) {
    search += "title=" + getUrlVal ("title") + '&';
    }
    $.get("/getnewpeople?" + search, function (res, status) {
    $('#type').val(res.type) ;
    for (var i = 0; i < res.data.length; i++) {
    newnewpeople(res.data[i]);
    }
    });
    }
    
    getnewpeople();

