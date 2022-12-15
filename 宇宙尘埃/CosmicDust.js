var canvas = document.getElementById('canvas'),
    ctx,
    cnt = 8000, //  发散宽度
    width = 20, //  粒子数目
    pointRadius = 0.6,  //  粒子大小(像素)
    l = 360, 
    t = 360, 
    r = 170, 
    i,
    len,
    random, 
    aryPoints = [],
    timer;
if(ctx = canvas.getContext('2d')) { 
    aryPoints = Array.apply(null, {length: cnt});
    for(var i = 0, len = aryPoints.length; i < len; i++) {
        var deg = 360 * Math.random();
        var aa = l + r * Math.cos(deg / 180 * Math.PI) + width * Math.sin(2 * Math.PI * Math.random()),
            bb = t - r * Math.sin(deg / 180 * Math.PI) + width * Math.sin(2 * Math.PI * Math.random());
        aryPoints[i] = [l + r * Math.cos(deg / 180 * Math.PI) + width * Math.sin(2 * Math.PI * Math.random()), t - r * Math.sin(deg / 180 * Math.PI) + width * Math.sin(2 * Math.PI * Math.random())];
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    for(var i = 0, len = aryPoints.length; i < len; i++) {
        ctx.fillRect(aryPoints[i][0], aryPoints[i][1], pointRadius, pointRadius);
    }
    timer = setInterval(function() {
        for(var i = 0, len = aryPoints.length, deg, x, y, d; i < len; i++) {
            y = aryPoints[i][1];
            x = aryPoints[i][0];
            d = Math.sqrt((x - l) * (x - l) + (y - t) * (y - t));
            deg = Math.round(Math.asin(Math.abs(y - t) / d) / Math.PI * 180);
            if(x >= l) {
                aryPoints[i][0] = x + 1 * Math.cos(deg / 180 * Math.PI);
            } else {
                aryPoints[i][0] = x - 1 * Math.cos(deg / 180 * Math.PI);
            }
            if(y <= t) {
                aryPoints[i][1] = y - 1 * Math.sin(deg / 180 * Math.PI);
            } else {
                aryPoints[i][1] = y + 1 * Math.sin(deg / 180 * Math.PI);
            }
            if(d > r + 50 + 50 * Math.sin(2 * Math.PI * Math.random())) {
                if(x >= l) {
                    aryPoints[i][0] = l + r * Math.cos(deg / 180 * Math.PI) + width * Math.sin(2 * Math.PI * Math.random());
                } else {
                    aryPoints[i][0] = l - r * Math.cos(deg / 180 * Math.PI) + width * Math.sin(2 * Math.PI * Math.random());
                }
                if(y <= t) {
                    aryPoints[i][1] = t - r * Math.sin(deg / 180 * Math.PI) + width * Math.sin(2 * Math.PI * Math.random());
                } else {
                    aryPoints[i][1] = t + r * Math.sin(deg / 180 * Math.PI) + width * Math.sin(2 * Math.PI * Math.random());
                }
            }
        }
        canvas.width = 720;
        canvas.height = 720;
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        for(var i = 0, len = aryPoints.length; i < len; i++) {
            ctx.fillRect(aryPoints[i][0], aryPoints[i][1], pointRadius, pointRadius);
        }
    }, 100);
}