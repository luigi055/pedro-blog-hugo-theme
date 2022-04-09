/**
 * @license MIT
 * topbar 1.0.0, 2021-01-06
 * http://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
(function (window, document) {
	"use strict";
	!(function () {
		for (
			var lastTime = 0, vendors = ["ms", "moz", "webkit", "o"], x = 0;
			x < vendors.length && !window.requestAnimationFrame;
			++x
		)
			(window.requestAnimationFrame =
				window[vendors[x] + "RequestAnimationFrame"]),
				(window.cancelAnimationFrame =
					window[vendors[x] + "CancelAnimationFrame"] ||
					window[vendors[x] + "CancelRequestAnimationFrame"]);
		window.requestAnimationFrame ||
			(window.requestAnimationFrame = function (callback, element) {
				var currTime = new Date().getTime(),
					timeToCall = Math.max(0, 16 - (currTime - lastTime)),
					id = window.setTimeout(function () {
						callback(currTime + timeToCall);
					}, timeToCall);
				return (lastTime = currTime + timeToCall), id;
			}),
			window.cancelAnimationFrame ||
				(window.cancelAnimationFrame = function (id) {
					clearTimeout(id);
				});
	})();
	function repaint() {
		(canvas.width = window.innerWidth),
			(canvas.height = 5 * options.barThickness);
		var ctx = canvas.getContext("2d");
		(ctx.shadowBlur = options.shadowBlur),
			(ctx.shadowColor = options.shadowColor);
		var stop,
			lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
		for (stop in options.barColors)
			lineGradient.addColorStop(stop, options.barColors[stop]);
		(ctx.lineWidth = options.barThickness),
			ctx.beginPath(),
			ctx.moveTo(0, options.barThickness / 2),
			ctx.lineTo(
				Math.ceil(currentProgress * canvas.width),
				options.barThickness / 2
			),
			(ctx.strokeStyle = lineGradient),
			ctx.stroke();
	}
	var canvas,
		progressTimerId,
		fadeTimerId,
		currentProgress,
		showing,
		options = {
			autoRun: !0,
			barThickness: 3,
			barColors: {
				0: "rgba(26,  188, 156, .9)",
				".25": "rgba(52,  152, 219, .9)",
				".50": "rgba(241, 196, 15,  .9)",
				".75": "rgba(230, 126, 34,  .9)",
				"1.0": "rgba(211, 84,  0,   .9)",
			},
			shadowBlur: 10,
			shadowColor: "rgba(0,   0,   0,   .6)",
			className: null,
		},
		topbar = {
			config: function (opts) {
				for (var key in opts)
					options.hasOwnProperty(key) && (options[key] = opts[key]);
			},
			show: function () {
				var type, handler, elem;
				showing ||
					((showing = !0),
					null !== fadeTimerId && window.cancelAnimationFrame(fadeTimerId),
					canvas ||
						(((elem = (canvas = document.createElement("canvas"))
							.style).position = "fixed"),
						(elem.top =
							elem.left =
							elem.right =
							elem.margin =
							elem.padding =
								0),
						(elem.zIndex = 100001),
						(elem.display = "none"),
						options.className && canvas.classList.add(options.className),
						document.body.appendChild(canvas),
						(type = "resize"),
						(handler = repaint),
						(elem = window).addEventListener
							? elem.addEventListener(type, handler, !1)
							: elem.attachEvent
							? elem.attachEvent("on" + type, handler)
							: (elem["on" + type] = handler)),
					(canvas.style.opacity = 1),
					(canvas.style.display = "block"),
					topbar.progress(0),
					options.autoRun &&
						(function loop() {
							(progressTimerId = window.requestAnimationFrame(loop)),
								topbar.progress(
									"+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2)
								);
						})());
			},
			progress: function (to) {
				return (
					void 0 === to ||
						("string" == typeof to &&
							(to =
								(0 <= to.indexOf("+") || 0 <= to.indexOf("-")
									? currentProgress
									: 0) + parseFloat(to)),
						(currentProgress = 1 < to ? 1 : to),
						repaint()),
					currentProgress
				);
			},
			hide: function () {
				showing &&
					((showing = !1),
					null != progressTimerId &&
						(window.cancelAnimationFrame(progressTimerId),
						(progressTimerId = null)),
					(function loop() {
						return 1 <= topbar.progress("+.1") &&
							((canvas.style.opacity -= 0.05), canvas.style.opacity <= 0.05)
							? ((canvas.style.display = "none"), void (fadeTimerId = null))
							: void (fadeTimerId = window.requestAnimationFrame(loop));
					})());
			},
		};
	"object" == typeof module && "object" == typeof module.exports
		? (module.exports = topbar)
		: "function" == typeof define && define.amd
		? define(function () {
				return topbar;
		  })
		: (this.topbar = topbar);
}.call(this, window, document));
