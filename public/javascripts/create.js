function newcreate (data) {
    var content = document. createElement ('div');
    content.className = "";
    var dat = new Date (data. postdate);
    var crt_date = (dat.getMonth () + 1) + '/' + dat.getDate () + '  ' + (dat .getHours() < 10 ? '0' + dat.getHours() : dat .getHours()) + ':' + (dat .getMinutes() < 10 ? '0' + dat.getMinutes() : dat.getMinutes()) ;
    var addHtml = 
    `
        <div class="title">
            <h1>${data.title}</h1>
        </div>

   <div class="why">
        <div class="image-container">
        <div class="image-wrapper">            
            <p class="image-caption">${data.content}</p>
            <img class="threetwo"src="../photos/${data.ipth}">
        </div>           
        </div>        
    </div>   
    
    `;
    content.insertAdjacentHTML('beforeend', addHtml);
    $('#create').append(content);
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
    
    function getcreate() {
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
    $.get("/getcreate?" + search, function (res, status) {
    $('#type').val(res.type) ;
    for (var i = 0; i < res.data.length; i++) {
    newcreate(res.data[i]);
    }
    });
    }
    
    getcreate();