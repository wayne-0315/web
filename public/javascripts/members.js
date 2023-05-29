window.addEventListener('load', function () {

    document.getElementById("sit1").onclick = function () {
        document.getElementById('get_sit').style.display = 'block';
        document.getElementById('get_point').style.display = 'none';
        document.getElementById('get_time').style.display = 'none';
        document.getElementById("countdown").style.display = 'none';
        document.getElementById("time2").style.display = 'none';
        console.log("clicksit");
    }

    document.getElementById('point1').onclick = function () {
        document.getElementById('get_sit').style.display = 'none';
        document.getElementById('get_point').style.display = 'block';
        document.getElementById('get_time').style.display = 'none';
        document.getElementById("countdown").style.display = 'none';
        document.getElementById("time2").style.display = 'none';
        console.log("clickpoint");
    }

    document.getElementById('time1').onclick = function () {
        document.getElementById('get_sit').style.display = 'none';
        document.getElementById('get_point').style.display = 'none';
        document.getElementById('get_time').style.display = 'block';
        console.log("clicktime");
    }

    let count = 10;
    let countdown;

    document.getElementById("time1").addEventListener("click", () => {
        // 在按下按鈕a時顯示倒數與按鈕b
        document.getElementById("countdown").style.display = "block";
        document.getElementById("countdown").innerHTML = `10:00`;
        document.getElementById("time2").style.display = "block";
        document.getElementById("time1").setAttribute('disabled', true); // 禁用按鈕
        document.getElementById("point1").setAttribute('disabled', true); // 禁用按鈕
        document.getElementById("sit1").setAttribute('disabled', true); // 禁用按鈕

        countdown = setInterval(() => {
            count--;

            const minutes = Math.floor(count / 60).toString().padStart(2, "0"); // 計算分鐘並添加前導零
            const seconds = (count % 60).toString().padStart(2, "0"); // 計算秒數並添加前導零

            document.getElementById("countdown").innerHTML = `${minutes}:${seconds}`;
            if (count === 0) {
                clearInterval(countdown);
                alert("記點一次 !");
                document.getElementById("time1").removeAttribute('disabled'); // 重新啟用按鈕

                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/members");
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify({
                    message: "倒數結束"
                }));

                location.reload();
            }
        }, 1000);

        document.getElementById("time2").addEventListener("click", () => {
            // 在按下按鈕b時取消倒數
            clearInterval(countdown);
            count = 10;
            document.getElementById("time1").removeAttribute('disabled'); // 重新啟用按鈕
            document.getElementById("point1").removeAttribute('disabled'); // 重新啟用按鈕
            document.getElementById("sit1").removeAttribute('disabled'); // 重新啟用按鈕
        });

    });


    let count2 = document.getElementById('value').innerHTML;
    if (count2 > 0)
        if (count2 % 3 == 0) {
            alert("選擇區域 停用一周");
        }
});