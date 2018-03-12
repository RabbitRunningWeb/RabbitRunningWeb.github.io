//运动对象，属性，持续时间，运动方式，回调函数
function startMove(obj, attrs, duration, fx, callback) {
	clearInterval(obj.timer);
	var startTime = new Date();
	var j = {};
	for (var attr in attrs) {
		j[attr] = {};
		//计算初始值
		if (attr == 'opacity') {
			j[attr].b = Math.round(getStyle(obj, attr) * 100);
		} else {
			j[attr].b = parseInt(getStyle(obj, attr));
		}
		//计算初始值与目标值的差值
		j[attr].c = attrs[attr] - j[attr].b;
	}
	var d = duration;
	obj.timer = setInterval(function() {
		var t = new Date() - startTime;
		//当第一进入方法的时间与当前时间差值大于动画的执行时间，停止定时器。
		if (t >= d) {
			t = d;
			clearInterval(obj.timer);
		}
		for (var attr in attrs) {
			var curValue = Tween[fx](t, j[attr].b, j[attr].c, d);
			if (attr == 'opacity') {
				obj.style.opacity = curValue / 100;
				obj.style.filter = 'alpha(opacity=' + curValue + ')';
			} else {
				obj.style[attr] = curValue + 'px';
			}
		}
		if (t == d) {
			callback && callback();
		}
	}, 15);
}