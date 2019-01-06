var paint = document.getElementById("canvas");
var content = paint.getContext("2d");
var app = document.getElementById("app");
var using = false;
var lastPoint = { x: undefined, y: undefined };
//画笔和橡皮擦
var action = document.getElementById("actions");
var pen = document.getElementById('pen')
var erase = document.getElementById('erase')
var black = document.getElementById('black')
var red = document.getElementById('red')
var green = document.getElementById('green')
var blue = document.getElementById('blue')
var clear = document.getElementById('clear')
var download = document.getElementById('download')
var range =document.getElementById('range')
var lineWidth = range.value
// var brush = document.getElementById("brush");
// var erase = document.getElementById("erase");

// 设置canvas宽高
autoSetCanvasSize();

//监听用戶操作
lisenToUseing();

// 画笔和橡皮擦切换
var eraseing = false;
erase.onclick = function () {
    eraseing = true;
    erase.classList.add('active')
    pen.classList.remove('active')
};
pen.onclick = function () {
    eraseing = false;
    pen.classList.add('active')
    erase.classList.remove('active')
};
// 切换画笔颜色
black.onclick = function () {
    content.strokeStyle = "black";    
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function () {
    content.strokeStyle = "red";    
    red.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function () {
    content.strokeStyle = "green";    
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
}
blue.onclick = function () {
    content.strokeStyle = "blue";
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
}
// 保存和下载
clear.onclick = function () {
    content.clearRect(0, 0, paint.width, paint.height);
}
download.onclick = function () {
    var url = paint.toDataURL("image/png")
    var a = document.createElement('a');
    app.appendChild(a);
    a.href = url;
    a.download = '超好看'
    a.click()
    app.removeChild(a)
}
// 画笔粗细
range.onchange = function () {
    lineWidth = range.value
}
//画圆
function drawCircle(x, y, radius) {
    content.beginPath();
    content.fillStyle = "red";
    content.arc(x, y, radius, 0, Math.PI * 2);
    content.fill();
    content.closePath();
}
// 划线
function drawLine(x1, y1, x2, y2) {
    content.beginPath();
    content.lineWidth = lineWidth;
    content.moveTo(x1, y1);
    content.lineTo(x2, y2);
    content.stroke();
}
// 设置canvas宽高
function autoSetCanvasSize() {
    canvasSize();
    window.onresize = function () {
        canvasSize();
    };
    function canvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        paint.width = pageWidth;
        paint.height = pageHeight;
    }
}
// 监听鼠标事件和觸屏時間
function lisenToUseing() {
    if ('ontouchstart' in document.body) {
        app.ontouchstart = function (e) {
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            using = true;
            if (eraseing) {
                content.clearRect(x - 5, y - 5, 10, 10);
            } else {
                // drawCircle(x, y, 1);
                lastPoint = { x: x, y: y };
            }
        }
        app.ontouchmove = function (e) {
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            if (!using) {
                return;
            }
            if (eraseing) {
                content.clearRect(x - 5, y - 5, 10, 10);
            } else {
                var newPoint = { x: x, y: y };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                // drawCircle(x, y, 1);
                lastPoint = newPoint;
            }
        }
        app.ontouchend = function (e) {
            using = false;
        }
    }
    app.onmousedown = function (e) {
        var x = e.clientX;
        var y = e.clientY;
        using = true;
        if (eraseing) {
            content.clearRect(x - 5, y - 5, 10, 10);
        } else {
            // drawCircle(x, y, 1);
            lastPoint = { x: x, y: y };
        }
    };

    app.onmousemove = function (e) {
        var x = e.clientX;
        var y = e.clientY;
        if (!using) {
            return;
        }
        if (eraseing) {
            content.clearRect(x - 5, y - 5, 10, 10);
        } else {
            var newPoint = { x: x, y: y };
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            // drawCircle(x, y, 1);
            lastPoint = newPoint;
        }
    };
    app.onmouseup = function (e) {
        using = false;
    };
}