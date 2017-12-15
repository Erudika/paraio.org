
$(".api-body").hide();
$("a.collapse-expand-link").click(function () {
	$('.api-body').toggle();
	return false;
});

// Collapsible articles
$("article").each(function () {
	var that = $(this);
	var header = that.children("a");
	var body = that.children(".api-body");
	header.click(function (argument) {
		body.toggle();
		return false;
	});
});

// Expanding the article on link click and scrolling down to it
$("#sidebar a").each(function () {
	var that = $(this);
	var id = that.attr("href").substring(that.attr("href").indexOf("#") + 1);
	that.click(function (e) {
		if (id) {
			var header = $("a#" + id);
			if (header && header.offset()) {
				$("html, body").animate({scrollTop: header.offset().top}, "fast");
			}
		}
	});
});


/// TEXT ROTATOR
$.fn.extend({
	rotaterator: function (options) {
		var defaults = {
			fadeSpeed: 500,
			pauseSpeed: 1000,
			child: null
		};
		var options = $.extend(defaults, options);

		return this.each(function () {
			var o = options;
			var obj = $(this);
			var items = $(obj.children(), obj);
			items.each(function () {
				$(this).hide();
			});
			if (!o.child) {
				var next = $(obj).children(':first');
			} else {
				var next = o.child;
			}
			$(next).fadeIn(o.fadeSpeed, function () {
				$(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function () {
					var next = $(this).next();
					if (next.length === 0) {
						next = $(obj).children(':first');
					}
					$(obj).rotaterator({child: next, fadeSpeed: o.fadeSpeed, pauseSpeed: o.pauseSpeed});
				});
			});
		});
	}
});

$(".intro-text").rotaterator({fadeSpeed: 150, pauseSpeed: 2000});

function saveSettings(obj) {
	window.localStorage.setItem('para-docs', JSON.stringify(obj));
};
function loadSettings() {
	return JSON.parse(window.localStorage.getItem('para-docs') || '{}');
};
function setTheme(t) {
	var href, logohref, theme;
	var settings = loadSettings();
	if (t) {
		theme = t;
	} else {
		theme = settings.theme === 'light' ? 'dark' : 'light';
	}
	if (theme === 'light') {
		href = "css/main.css";
		logohref = "/img/logo.svg";
		settings.theme = 'light';
		$('#dark-theme').remove();
		$("#theme-switch-btn").text("Dark Theme");
	} else {
		href = "css/dark.css";
		logohref = "/img/logodark.svg";
		settings.theme = 'dark';
		$("#theme-switch-btn").text("Light Theme");
		$('#theme').after('<link href="/css/dark.css?v=5" rel="stylesheet" id="dark-theme">');
	}
	saveSettings(settings);
	$('#logo').attr('src', logohref);
};

$("#theme-switch-btn").click(function () {
	setTheme();
	return false;
});

var settings = loadSettings();

setTheme(settings.theme);

if (settings.expandedCategories) {
	$(Object.keys(settings.expandedCategories).join(',')).collapse();
}

$("a.docs-category").click(function () {
	if (!settings.expandedCategories) {
		settings.expandedCategories = {};
	}
	if ($(this).attr("aria-expanded") === "false") {
		settings.expandedCategories[$(this).attr("href")] = 1;
	} else {
		delete settings.expandedCategories[$(this).attr("href")];
	}
	saveSettings(settings);
});

$(".docs-category-child a").click(function () {
	if (window.matchMedia('(max-width: 767px)').matches) {
		$('#dismiss').click();
	}
});

$(".wrapper").fadeIn(100);

$("#sidebar").mCustomScrollbar({
	theme: "minimal"
});

$('#sidebarCollapse, #dismiss').on('click', function () {
	$('#sidebar, #content').toggleClass('active');
//	$('.collapse.in').toggleClass('in');
//	$('a[aria-expanded=true]').attr('aria-expanded', 'false');
	return false;
});