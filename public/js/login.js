/*! lte login.js
* ================
*/

// Make sure jQuery has been loaded
if (typeof jQuery === 'undefined') {
	throw new Error('lte requires jQuery')
}

var apiPath = "http://47.93.48.250:7080/";

var localStore = Jeselvmo.localStore;


/* Login()
 * ======
 */
+function ($) {
	'use strict';

	var DataKey = 'lte.login';

	var Default = {};

	var Selector = {
		data: '[data-widget="login"]',
		username: '#username',
		password: '#password',
		btnLogin: '#btnLogin',
	};

	var ClassName = {};

	var Event = {};

	// Login Class Definition
	// =====================
	var Login = function (element, options) {
		this.element = element;
		this.options = options;

		this._setUpListeners();
	};


	Login.prototype.login = function () {
		var username = $(Selector.username).val();
		var password = $(Selector.password).val();

		if (username === "") {
			alert('帐号不能为空！');
			return;
		}
		if (password === "") {
			alert('密码不能为空！');
			return;
		}

		$.ajax({
			url: apiPath + "system/login",
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			data: {
				userName: username,
				passWord: password
			},
			success: function (result) {
				if (result.resultCode === 1) {
					localStore.set('loginUser', result.data);
					location = "index.html";
				} else {
					alert(result.message)
				}
			}
		});
	};

	// Private
	Login.prototype._setUpListeners = function () {
		var that = this;

		$(this.element).on('click', Selector.btnLogin, function (event) {
			that.login();
		});

	};


	// Plugin Definition
	// =================
	function Plugin(option) {
		var $this = $(this[0]);
		var data = $this.data(DataKey);

		if (!data) {
			var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
			var login = new Login($this, options);
			$this.data(DataKey, login);
			return login
		} else {
			return data
		}
	}

	var old = $.fn.login;

	$.fn.login = Plugin;
	$.fn.login.Constructor = Login;

	// No Conflict Mode
	// ================
	$.fn.login.noConflict = function () {
		$.fn.login = old;
		return this;
	};

	// Login Data API
	// =============
	$(window).on('load', function () {
		$(Selector.data).each(function () {
			Plugin.call($(this));
		});
	});

}(jQuery);

