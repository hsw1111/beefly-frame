/*! lte index.js
* ================
*/

// Make sure jQuery has been loaded
if (typeof jQuery === 'undefined') {
	throw new Error('lte requires jQuery')
}

var apiPath = "http://47.93.48.250:7080/";

var localStore = Jeselvmo.localStore;

/* Layout()
 * ========
 * Implements AdminLTE layout.
 * Fixes the layout height in case min-height fails.
 *
 * @usage activated automatically upon window load.
 *        Configure any options by passing data-option="value"
 *        to the body tag.
 */
+function ($) {
	'use strict';

	var DataKey = 'lte.layout';

	var Default = {
		slimscroll: true,
		resetHeight: true
	};

	var Selector = {
		wrapper: '.wrapper',
		contentWrapper: '.content-wrapper',
		layoutBoxed: '.layout-boxed',
		mainFooter: '.main-footer',
		mainHeader: '.main-header',
		sidebar: '.sidebar',
		controlSidebar: '.control-sidebar',
		fixed: '.fixed',
		sidebarMenu: '.sidebar-menu',
		logo: '.main-header .logo'
	};

	var ClassName = {
		fixed: 'fixed',
		holdTransition: 'hold-transition'
	};

	var Layout = function (options) {
		this.options = options;
		this.bindedResize = false;
		this.activate();
	};

	Layout.prototype.activate = function () {
		this.fix();
		this.fixSidebar();
		this.init();

		$('body').removeClass(ClassName.holdTransition);

		if (this.options.resetHeight) {
			$('body, html, ' + Selector.wrapper).css({
				'height': 'auto',
				'min-height': '100%'
			});
		}

		if (!this.bindedResize) {
			$(window).resize(function () {
				this.fix();
				this.fixSidebar();

				$(Selector.logo + ', ' + Selector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
					this.fix();
					this.fixSidebar();
				}.bind(this));
			}.bind(this));

			this.bindedResize = true;
		}

		$(Selector.sidebarMenu).on('expanded.tree', function () {
			this.fix();
			this.fixSidebar();
		}.bind(this));

		$(Selector.sidebarMenu).on('collapsed.tree', function () {
			this.fix();
			this.fixSidebar();
		}.bind(this));
	};

	Layout.prototype.fix = function () {
		// Remove overflow from .wrapper if layout-boxed exists
		$(Selector.layoutBoxed + ' > ' + Selector.wrapper).css('overflow', 'hidden');

		// Get window height and the wrapper height
		var footerHeight = $(Selector.mainFooter).outerHeight() || 0;
		var neg = $(Selector.mainHeader).outerHeight() + footerHeight;
		var windowHeight = $(window).height();
		var sidebarHeight = $(Selector.sidebar).height() || 0;

		// Set the min-height of the content and sidebar based on
		// the height of the document.
		if ($('body').hasClass(ClassName.fixed)) {
			$(Selector.contentWrapper).css('height', windowHeight - footerHeight);
		} else {
			var postSetHeight;

			if (windowHeight >= sidebarHeight) {
				$(Selector.contentWrapper).css('min-height', windowHeight - neg);
				postSetHeight = windowHeight - neg;
			} else {
				$(Selector.contentWrapper).css('min-height', sidebarHeight);
				postSetHeight = sidebarHeight;
			}

			// Fix for the control sidebar height
			var $controlSidebar = $(Selector.controlSidebar);
			if (typeof $controlSidebar !== 'undefined') {
				if ($controlSidebar.height() > postSetHeight)
					$(Selector.contentWrapper).css('min-height', $controlSidebar.height());
			}
		}
	};

	Layout.prototype.fixSidebar = function () {
		// Make sure the body tag has the .fixed class
		if (!$('body').hasClass(ClassName.fixed)) {
			if (typeof $.fn.slimScroll !== 'undefined') {
				$(Selector.sidebar).slimScroll({destroy: true}).height('auto');
			}
			return;
		}

		// Enable slimscroll for fixed layout
		if (this.options.slimscroll) {
			if (typeof $.fn.slimScroll !== 'undefined') {
				// Destroy if it exists
				// $(Selector.sidebar).slimScroll({ destroy: true }).height('auto')

				// Add slimscroll
				$(Selector.sidebar).slimScroll({
					height: ($(window).height() - $(Selector.mainHeader).height()) + 'px'
				});
			}
		}
	};

	Layout.prototype.init = function () {

		// footer info
		$('#platform').text(beefly.platform);
		$('#company').text(beefly.company);
		$('#version').text(beefly.version);
	};

	// Plugin Definition
	// =================
	function Plugin(option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data(DataKey);

			if (!data) {
				var options = $.extend({}, Default, $this.data(), typeof option === 'object' && option);
				$this.data(DataKey, (data = new Layout(options)));
			}

			if (typeof option === 'string') {
				if (typeof data[option] === 'undefined') {
					throw new Error('No method named ' + option);
				}
				data[option]();
			}
		});
	}

	var old = $.fn.layout;

	$.fn.layout = Plugin;
	$.fn.layout.Constuctor = Layout;

	// No conflict mode
	// ================
	$.fn.layout.noConflict = function () {
		$.fn.layout = old;
		return this;
	};

	// Layout DATA-API
	// ===============
	$(window).on('load', function () {
		Plugin.call($('body'));
	});
}(jQuery);


/* PushMenu()
 * ==========
 * Adds the push menu functionality to the sidebar.
 *
 * @usage: $('.btn').pushMenu(options)
 *          or add [data-toggle="push-menu"] to any button
 *          Pass any option as data-option="value"
 */
+function ($) {
	'use strict';

	var DataKey = 'lte.pushmenu';

	var Default = {
		collapseScreenSize: 767,
		expandOnHover: false,
		expandTransitionDelay: 200
	};

	var Selector = {
		collapsed: '.sidebar-collapse',
		open: '.sidebar-open',
		mainSidebar: '.main-sidebar',
		contentWrapper: '.content-wrapper',
		searchInput: '.sidebar-form .form-control',
		button: '[data-toggle="push-menu"]',
		mini: '.sidebar-mini',
		expanded: '.sidebar-expanded-on-hover',
		layoutFixed: '.fixed'
	};

	var ClassName = {
		collapsed: 'sidebar-collapse',
		open: 'sidebar-open',
		mini: 'sidebar-mini',
		expanded: 'sidebar-expanded-on-hover',
		expandFeature: 'sidebar-mini-expand-feature',
		layoutFixed: 'fixed'
	};

	var Event = {
		expanded: 'expanded.pushMenu',
		collapsed: 'collapsed.pushMenu'
	};

	// PushMenu Class Definition
	// =========================
	var PushMenu = function (options) {
		this.options = options;
		this.init();
	};

	PushMenu.prototype.init = function () {
		if (this.options.expandOnHover
			|| ($('body').is(Selector.mini + Selector.layoutFixed))) {
			this.expandOnHover();
			$('body').addClass(ClassName.expandFeature);
		}

		$(Selector.contentWrapper).click(function () {
			// Enable hide menu when clicking on the content-wrapper on small screens
			if ($(window).width() <= this.options.collapseScreenSize && $('body').hasClass(ClassName.open)) {
				this.close();
			}
		}.bind(this));

		// __Fix for android devices
		$(Selector.searchInput).click(function (e) {
			e.stopPropagation();
		});
	};

	PushMenu.prototype.toggle = function () {
		var windowWidth = $(window).width();
		var isOpen = !$('body').hasClass(ClassName.collapsed);

		if (windowWidth <= this.options.collapseScreenSize) {
			isOpen = $('body').hasClass(ClassName.open);
		}

		if (!isOpen) {
			this.open();
		} else {
			this.close();
		}
	};

	PushMenu.prototype.open = function () {
		var windowWidth = $(window).width();

		if (windowWidth > this.options.collapseScreenSize) {
			$('body').removeClass(ClassName.collapsed)
				.trigger($.Event(Event.expanded));
		}
		else {
			$('body').addClass(ClassName.open)
				.trigger($.Event(Event.expanded));
		}
	};

	PushMenu.prototype.close = function () {
		var windowWidth = $(window).width();
		if (windowWidth > this.options.collapseScreenSize) {
			$('body').addClass(ClassName.collapsed)
				.trigger($.Event(Event.collapsed));
		} else {
			$('body').removeClass(ClassName.open + ' ' + ClassName.collapsed)
				.trigger($.Event(Event.collapsed));
		}
	};

	PushMenu.prototype.expandOnHover = function () {
		$(Selector.mainSidebar).hover(function () {
			if ($('body').is(Selector.mini + Selector.collapsed)
				&& $(window).width() > this.options.collapseScreenSize) {
				this.expand();
			}
		}.bind(this), function () {
			if ($('body').is(Selector.expanded)) {
				this.collapse();
			}
		}.bind(this));
	};

	PushMenu.prototype.expand = function () {
		setTimeout(function () {
			$('body').removeClass(ClassName.collapsed)
				.addClass(ClassName.expanded);
		}, this.options.expandTransitionDelay);
	};

	PushMenu.prototype.collapse = function () {
		setTimeout(function () {
			$('body').removeClass(ClassName.expanded)
				.addClass(ClassName.collapsed);
		}, this.options.expandTransitionDelay);
	};

	// PushMenu Plugin Definition
	// ==========================
	function Plugin(option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data(DataKey);

			if (!data) {
				var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
				$this.data(DataKey, (data = new PushMenu(options)));
			}

			if (option === 'toggle') data.toggle();
		});
	}

	var old = $.fn.pushMenu;

	$.fn.pushMenu = Plugin;
	$.fn.pushMenu.Constructor = PushMenu;

	// No Conflict Mode
	// ================
	$.fn.pushMenu.noConflict = function () {
		$.fn.pushMenu = old;
		return this;
	};

	// Data API
	// ========
	$(document).on('click', Selector.button, function (e) {
		e.preventDefault();
		Plugin.call($(this), 'toggle');
	});
	$(window).on('load', function () {
		Plugin.call($(Selector.button));
	});
}(jQuery);


/* Tree()
 * ======
 * Converts a nested list into a multilevel
 * tree view menu.
 *
 * @Usage: $('.my-menu').tree(options)
 *         or add [data-widget="tree"] to the ul element
 *         Pass any option as data-option="value"
 */
+function ($) {
	'use strict';

	var DataKey = 'lte.tree';

	var Default = {
		animationSpeed: 500,
		accordion: true,
		followLink: false,
		trigger: '.treeview a'
	};

	var Selector = {
		tree: '.tree',
		treeview: '.treeview',
		treeviewMenu: '.treeview-menu',
		open: '.menu-open, .active',
		li: 'li',
		activeLi: 'li.active',
		data: '[data-widget="tree"]',
		active: '.active',
		openedLink: '.menu-open > a'
	};

	var ClassName = {
		open: 'menu-open',
		tree: 'tree',
		active: 'active'
	};

	var Event = {
		collapsed: 'collapsed.tree',
		expanded: 'expanded.tree'
	};

	// Tree Class Definition
	// =====================
	var Tree = function (element, options) {
		this.element = element;
		this.options = options;

		$(this.element).addClass(ClassName.tree);

		$(Selector.treeview + Selector.active, this.element).addClass(ClassName.open);

		this._setUpListeners();

		this.loadData();
	};

	Tree.prototype.loadData = function () {
		var that = this;

		$.ajax({
			type: 'get',
			url: 'data/menus.json'
		}).then(function (result) {
			that.renderTree(result);
		})
	};

	Tree.prototype.renderTree = function (menus) {

		var str = '';
		for (var menu of menus) {
			str += `<li class="treeview">`;
			str += `	<a href="#">`;
			str += `		<i class="fa ${menu.icon}"></i> <span>${menu.name}</span>`;
			str += `		<span class="pull-right-container">`;
			str += `      <i class="fa fa-angle-left pull-right"></i>`;
			str += `    </span>`;
			str += `	</a>`;
			str += `	<ul class="treeview-menu">`;
			for (var child of menu.child) {
				str += `		<li><a href="${child.path}" target="_blank"><i class="fa fa-circle-o"></i> ${child.name} </a></li>`;
			}
			str += `	</ul>`;
			str += `</li>`;
		}

		$(this.element).append(str);

	};

	Tree.prototype.toggle = function (link, event) {
		var treeviewMenu = link.next(Selector.treeviewMenu);
		var parentLi = link.parent();
		var isOpen = parentLi.hasClass(ClassName.open);

		if (!parentLi.is(Selector.treeview)) {
			return;
		}

		if (!this.options.followLink || link.attr('href') === '#') {
			event.preventDefault();
		}

		if (isOpen) {
			this.collapse(treeviewMenu, parentLi);
		} else {
			this.expand(treeviewMenu, parentLi);
		}
	};

	Tree.prototype.expand = function (tree, parent) {
		var expandedEvent = $.Event(Event.expanded);

		if (this.options.accordion) {
			var openMenuLi = parent.siblings(Selector.open);
			var openTree = openMenuLi.children(Selector.treeviewMenu);
			this.collapse(openTree, openMenuLi);
		}

		parent.addClass(ClassName.open);
		tree.slideDown(this.options.animationSpeed, function () {
			$(this.element).trigger(expandedEvent);
		}.bind(this));
	};

	Tree.prototype.collapse = function (tree, parentLi) {
		var collapsedEvent = $.Event(Event.collapsed);

		tree.find(Selector.open).removeClass(ClassName.open);
		parentLi.removeClass(ClassName.open);
		tree.slideUp(this.options.animationSpeed, function () {
			tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
			$(this.element).trigger(collapsedEvent);
		}.bind(this));
	};

	Tree.prototype.open = function (link, event) {
		var parentLi = link.parent();
		var treeviewLi = parentLi.closest(Selector.treeview);
		var tree = $(this.element);

		if (treeviewLi.length == 0) {
			this.toggle($(Selector.openedLink), event);
		}

		tree.find(Selector.activeLi).removeClass(ClassName.active);
		treeviewLi.addClass(ClassName.active);
		parentLi.addClass(ClassName.active);


		var tabs = $('#tabs').tabs();
		tabs.addTab({
			name: link.text(),
			path: link.attr('href')
		})

		event.preventDefault();
	};

	// Private
	Tree.prototype._setUpListeners = function () {
		var that = this;

		$(this.element).on('click', this.options.trigger, function (event) {
			that.toggle($(this), event);
		});

		$(this.element).on('click', "li a[href!='#']", function (event) {
			that.open($(this), event);
		});
	};

	// Plugin Definition
	// =================
	function Plugin(option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data(DataKey);

			if (!data) {
				var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
				$this.data(DataKey, new Tree($this, options));
			}
		});
	}

	var old = $.fn.tree;

	$.fn.tree = Plugin;
	$.fn.tree.Constructor = Tree;

	// No Conflict Mode
	// ================
	$.fn.tree.noConflict = function () {
		$.fn.tree = old;
		return this;
	};

	// Tree Data API
	// =============
	$(window).on('load', function () {
		$(Selector.data).each(function () {
			Plugin.call($(this));
		});
	});

}(jQuery);


/* Tabs()
 * ======
 * Converts a nested list into a multilevel
 * tabs view menu.
 *
 * @Usage: $('.my-menu').tabs(options)
 *         or add [data-widget="tabs"] to the ul element
 *         Pass any option as data-option="value"
 */
+function ($) {
	'use strict';

	var DataKey = 'lte.tabs';

	var Default = {
		animationSpeed: 500,
		accordion: true,
		followLink: false,
		trigger: '.tabsview a'
	};

	var Selector = {
		data: '[data-widget="tabs"]',
		tabs: '.tabs',
		tabHeader: '.tab-header',
		tabContent: '.tab-content',
		tabUl: '.tab-ul',
		li: '.tab-ul li',
		link: '.tab-ul li a'
	};

	var ClassName = {
		active: 'active'
	};

	var Event = {
		collapsed: 'collapsed.tabs',
		expanded: 'expanded.tabs'
	};

	// Tabs Class Definition
	// =====================
	var Tabs = function (element, options) {
		this.element = element;
		this.options = options;

		$(this.element).addClass(ClassName.tabs);

		this.tabHeader = $(this.element).find(Selector.tabHeader);
		this.tabContent = $(this.element).find(Selector.tabContent);
		this.tabUl = $(this.element).find(Selector.tabUl);

		this._setUpListeners();

	};

	// 添加标签页
	Tabs.prototype.addTab = function (tab) {
		// 带参数
		var queryString = '';
		if (tab.params) {
			var params = tab.params;
			var paramsArray = [];
			for (var key in params) {
				paramsArray.push(key + '=' + encodeURIComponent(params[key]));
			}
			if (paramsArray.length > 0)
				queryString = '?' + paramsArray.join('&');
		}
		var url = `module/index.html${queryString}#${tab.path}`;

		var li = this.tabUl.find(`li[data-path="${url}"]`);
		if (li.length == 0) {
			this.tabUl.children().removeClass(ClassName.active);
			this.tabContent.children().removeClass(ClassName.active);


			this.tabUl.append(`<li class="active" data-path="${url}">
				<a href="javascript:">
					${tab.name}
					<i class="fa fa-fw fa-close"></i>
				</a>
			</li>`)

			var frameHeight = $('.content-wrapper').height() - 55;
			this.tabContent.append(`<div class="tab-pane active">
				<iframe src="${url}" width="100%" height="${frameHeight}" frameborder="0"></iframe>
			</div>`);
		} else {
			this.tabUl.children().removeClass(ClassName.active);
			this.tabContent.children().removeClass(ClassName.active);
			var index = this.tabUl.children().index(li);
			li.addClass(ClassName.active);
			this.tabContent.children().eq(index).addClass(ClassName.active);
		}

		this.scrollTab()
	};

	// 关闭标签页
	Tabs.prototype.scrollTab = function () {
		var that = this;

		this.initScrollShow();

		var index = this.getActiveIndex();
		var activeLi = this.tabUl.children().eq(index);

		var marginLeft = 0;

		// 滚动到可视区域:在左侧
		if (activeLi.position().left < marginLeft) {
			var left = this.tabUl.scrollLeft() + activeLi.position().left - marginLeft;
			this.tabUl.animate({scrollLeft: left}, 200, function () {
				that.initScrollState();
			});
		}
		// 滚动到可视区域:在右侧
		if ((activeLi.position().left + activeLi.width() - marginLeft) > this.tabUl[0].clientWidth) {
			var left = this.tabUl.scrollLeft() + ((activeLi.position().left + activeLi.width() - marginLeft) - this.tabUl[0].clientWidth);
			this.tabUl.animate({scrollLeft: left}, 200, function () {
				that.initScrollState();
			});
		}

	}

	// 关闭标签页
	Tabs.prototype.closeTab = function (li) {
		var index = -1;

		if (li) {
			if (typeof li == 'number') {		// 传索引
				index = li;
			} else {
				index = this.tabUl.children().index(li); // 传$(li)
			}
		} else {
			index = this.getActiveIndex();		// 不传，关闭当前
		}

		if (index == 0) {
			// alert('首页不能关闭哦！')
			return;
		}

		this.tabUl.children().eq(index).remove();
		this.tabContent.children().eq(index).remove();

		if (index > this.tabUl.children().length - 1) {
			index--
		}

		this.switchTab(index);
	}

	// index or link
	Tabs.prototype.switchTab = function (link) {
		var li = null, index = 0;
		if (typeof link == 'number') {
			index = link;
			li = this.tabUl.children().eq(index);
		} else {
			li = link.parent();
			index = this.tabUl.children().index(li);
		}

		this.tabUl.children().removeClass(ClassName.active);
		li.addClass(ClassName.active);
		this.tabContent.children().removeClass(ClassName.active);
		this.tabContent.children().eq(index).addClass(ClassName.active);

		this.scrollTab()
	}

	// 所有当前活动页索引
	Tabs.prototype.getActiveIndex = function () {
		var li = this.tabUl.find('li.active');
		return this.tabUl.children().index(li);
	}

	// 重新加载当前页
	Tabs.prototype.reloadTab = function () {
		var index = this.getActiveIndex();
		var iframe = this.tabContent.children().eq(index).find('iframe')[0];
		iframe.contentWindow.location.reload()
	}

	// 关闭所有
	Tabs.prototype.closeAllTab = function () {
		var len = this.tabUl.children().length;

		this.tabUl.children().slice(1).remove();
		this.tabContent.children().slice(1).remove();
		this.switchTab(0);
	}

	// 关闭所有
	Tabs.prototype.scrollLeft = function () {
		var that = this;
		this.tabUl.animate({scrollLeft: this.tabUl.scrollLeft() - 300}, 200, function () {
			that.initScrollState();
		});
	}

	// 关闭所有
	Tabs.prototype.scrollRight = function () {
		var that = this;
		this.tabUl.animate({scrollLeft: this.tabUl.scrollLeft() + 300}, 200, function () {
			that.initScrollState();
		});
	}

	Tabs.prototype.initScrollState = function () {
		var lnkLeft = $(this.element).find('#lnkLeft');
		var lnkRight = $(this.element).find('#lnkRight');

		if (this.tabUl.scrollLeft() == 0) {
			lnkLeft.removeClass(ClassName.active);
		} else {
			lnkLeft.addClass(ClassName.active);
		}
		if ((this.tabUl.scrollLeft() + this.tabUl[0].clientWidth) >= this.tabUl[0].scrollWidth) {
			lnkRight.removeClass(ClassName.active);
		} else {
			lnkRight.addClass(ClassName.active);
		}
	}


	Tabs.prototype.initScrollShow = function () {
		if (this.tabUl[0].scrollWidth > this.tabUl[0].clientWidth) {
			$(this.element).addClass('scroll');
		} else {
			$(this.element).removeClass('scroll');
		}
	}

	Tabs.prototype.resizeFrameHeight = function () {

		var footerHeight = $('.main-footer').outerHeight() || 0;
		var windowHeight = $(window).height();

		$('.content-wrapper').css('height', windowHeight - footerHeight);

		var frameHeight = windowHeight - footerHeight - 100;
		this.tabContent.find('iframe').attr('height', frameHeight);
	}

	// Private
	Tabs.prototype._setUpListeners = function () {
		var that = this;

		$(this.element).on('click', Selector.link, function (event) {
			that.switchTab($(this));
		});

		$(this.element).on('click', '.tab-ul li a .fa-close', function (event) {
			that.closeTab();
			event.preventDefault();
			event.stopPropagation();
		});

		$(this.element).on('click', '#lnkReload', function (event) {
			that.reloadTab($(this));
		});

		$(this.element).on('click', '#lnkClose', function (event) {
			that.closeTab();
		});

		$(this.element).on('click', '#lnkCloseAll', function (event) {
			that.closeAllTab();
		});

		// 控制选项卡滚动位置
		$(this.element).on('click', '#lnkLeft', function () {
			that.scrollLeft()
		});
		// 向右箭头
		$(this.element).on('click', '#lnkRight', function () {
			that.scrollRight()
		});

		$(this.element).find('.tab-ul').contextMenu({
			menuSelector: "#contextMenu",
			menuSelected: function (invokedOn, selectedMenu) {
				console.log($.trim(invokedOn.text()), $.trim(selectedMenu.text()))
				var action = selectedMenu.attr('data-action');
				if (action === 'refresh') {
					that.reloadTab()
				} else if (action === 'close') {
					that.closeTab(invokedOn.parent())
				} else if (action === 'closeAll') {
					that.closeAllTab()
				}
			}
		});


		$(window).on('resize', function () {
			that.resizeFrameHeight();
			that.initScrollShow();
			that.initScrollState();
		});

		that.resizeFrameHeight();
	};

	// Plugin Definition
	// =================
	function Plugin(option) {
		var $this = $(this[0]);
		var data = $this.data(DataKey);

		if (!data) {
			var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
			var tabs = new Tabs($this, options);
			$this.data(DataKey, tabs);
			return tabs
		} else {
			return data
		}
	}

	var old = $.fn.tabs;

	$.fn.tabs = Plugin;
	$.fn.tabs.Constructor = Tabs;

	// No Conflict Mode
	// ================
	$.fn.tabs.noConflict = function () {
		$.fn.tabs = old;
		return this;
	};

	// Tabs Data API
	// =============
	$(window).on('load', function () {
		$(Selector.data).each(function () {
			Plugin.call($(this));
		});

		// 添加Tab页
		beefly.addTab = function (tab) {
			var tabs = $('#tabs').tabs();
			tabs.addTab(tab)
		};

		// 关闭当前活动Tab页
		beefly.closeTab = function () {
			var tabs = $('#tabs').tabs();
			tabs.closeTab()
		};
	});

}(jQuery);


/* Admin()
 * ======
 */
+function ($) {
	'use strict';

	var DataKey = 'lte.admin';

	var Default = {};

	var Selector = {
		data: '[data-widget="admin"]',
		username: '#username',
		password: '#password',
		btnAdmin: '#btnAdmin',
	};

	var ClassName = {};

	var Event = {};

	// Admin Class Definition
	// =====================
	var Admin = function (element, options) {
		this.element = element;
		this.options = options;

		this._setUpListeners();

		this.checkLogin(function (loginUser) {
			$('*[name=username]').text(loginUser.name)
		});
	};


	Admin.prototype.checkLogin = function (callback) {
		var loginUser = localStore.get('loginUser');
		if (loginUser) {
			// 测试登录状态
			$.ajax({
				url: apiPath + "customer/tripProblem/page",
				dataType: 'json',
				xhrFields: {
					withCredentials: true
				},
				data: {
					accessToken: loginUser.token,
				},
				success: function (result) {
					if (result.resultCode === 1) {
						callback(loginUser)
					} else {
						location = 'login.html'
					}
				}
			});
		} else {
			location = 'login.html'
		}
	};

	Admin.prototype.logoff = function () {
		localStore.remove('loginUser');
		location = 'login.html';
	};

	// Private
	Admin.prototype._setUpListeners = function () {
		var that = this;

		$(this.element).on('click', '#logoff', function (event) {
			that.logoff();
		});

	};


	// Plugin Definition
	// =================
	function Plugin(option) {
		var $this = $(this[0]);
		var data = $this.data(DataKey);

		if (!data) {
			var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
			var admin = new Admin($this, options);
			$this.data(DataKey, admin);
			return admin
		} else {
			return data
		}
	}

	var old = $.fn.admin;

	$.fn.admin = Plugin;
	$.fn.admin.Constructor = Admin;

	// No Conflict Mode
	// ================
	$.fn.admin.noConflict = function () {
		$.fn.admin = old;
		return this;
	};

	// Admin Data API
	// =============
	$(window).on('load', function () {
		$(Selector.data).each(function () {
			Plugin.call($(this));
		});
	});

}(jQuery);


(function ($, window) {

	$.fn.contextMenu = function (settings) {

		return this.each(function () {

			// Open context menu
			$(this).on("contextmenu", 'a', function (e) {
				// return native menu if pressing control
				if (e.ctrlKey) return;

				//open menu
				var $menu = $(settings.menuSelector)
					.data("invokedOn", $(e.target))
					.show()
					.css({
						position: "absolute",
						left: getMenuPosition(e.clientX, 'width', 'scrollLeft'),
						top: getMenuPosition(e.clientY, 'height', 'scrollTop')
					})
					.off('click')
					.on('click', 'a', function (e) {
						$menu.hide();

						var $invokedOn = $menu.data("invokedOn");
						var $selectedMenu = $(e.target);

						settings.menuSelected.call(this, $invokedOn, $selectedMenu);
					});

				return false;
			});

			//make sure menu closes on any click
			$('body').click(function () {
				$(settings.menuSelector).hide();
			});
		});

		function getMenuPosition(mouse, direction, scrollDir) {
			var win = $(window)[direction](),
				scroll = $(window)[scrollDir](),
				menu = $(settings.menuSelector)[direction](),
				position = mouse + scroll;

			// opening menu would pass the side of the page
			if (mouse + menu > win && menu < mouse)
				position -= menu;

			return position;
		}

	};
})(jQuery, window);
