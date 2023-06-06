function initArticle(data) {
    var head = "<h3>" + data.name + " ( <a class='person' \ href='blog.html?account=" + data.account + "'>" + data.account + "</a> ) " + "</h3>";
    $('#a_head').append(head);
    var a_date = new Date(data.postdate);
    var date = (a_date.getMonth() + 1) + '月' + a_date.getDate() + '日' + a_date.getHours() + ':' + a_date.getMinutes();
    var content = `
    <div class="title">
        <h1>${data.title}</h1>
    </div>
    <div class="why">
        <div class="image-container">
        <div class="image-wrapper">            
            <p class="image-caption">
                ${data.content}
                <br>
                <a href="${data.aaa}"
                    target="_blank" class="link">
                    ${data.aaa}</a>
                </p>
            <img class="threetwo"src="../photos/${data.ipth}">
            <div class="vid">${data.yt}
                
            </div>
        </div>           
        </div>        
    </div>
    `;
    
    $('#a_content').append(content);
}
//時間 ${date}
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

function getArticleById() {
    if (!getUrlVal("_id")) {
        //alert("查無文章");
        //location.href = '/lostupdate';
        return;
    }
    $.get("/getArticleById?_id=" + getUrlVal("_id"),
    function (res, status) {
        if (res.status != 0) {
            location.href = '/lost';
        }
        else {
            initArticle(res.data);
        }
    });
}

function show(){
    $.get("/content",
    function (res, status) {
        if (res.status != 0) {
            location.href = 'lost';
        }
        else {
            initArticle(res.data);
        }
    });
    
}
getArticleById();

