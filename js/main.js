
$(document).ready(function () {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie;
	}
	if (isIE()) {
		$('body').addClass('ie');
	}
	if (isMobile.any()) {
		$('body').addClass('touch');
	}
	//FORMS
	function forms() {
		//SELECT
		if ($('select').length > 0) {
			function selectscrolloptions() {
				var scs = 100;
				var mss = 50;
				if (isMobile.any()) {
					scs = 10;
					mss = 1;
				}
				var opt = {
					cursorcolor: "#9B4E7C",
					cursorwidth: "12px",
					background: "",
					autohidemode: false,
					bouncescroll: false,
					cursorborderradius: "10px",
					scrollspeed: scs,
					mousescrollstep: mss,
					directionlockdeadzone: 0,
					cursorborder: "0px solid #fff",
				};
				return opt;
			}

			function select() {
				$.each($('select'), function (index, val) {
					var ind = index;
					$(this).hide();
					if ($(this).parent('.select-block').length == 0) {
						$(this).wrap("<div class='select-block " + $(this).attr('class') + "-select-block'></div>");
					} else {
						$(this).parent('.select-block').find('.select').remove();
					}
					let cl = '';
					var milti = '';
					var check = '';
					var sblock = $(this).parent('.select-block');
					var soptions = "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
					if ($(this).attr('multiple') == 'multiple') {
						milti = 'multiple';
						check = 'check';
					}
					$.each($(this).find('option'), function (index, val) {
						if ($(this).attr('class') != '' && $(this).attr('class') != null) {
							let cl = $(this).attr('class');
						}
						if ($(this).attr('value') != '') {
							if ($(this).attr('data-icon') != '' && $(this).attr('data-icon') != null) {
								soptions = soptions + "<div data-value='" + $(this).attr('value') + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + cl + " " + check + "'><div><img src=" + $(this).attr('data-icon') + " alt=\"\"></div><div>" + $(this).html() + "</div></div>";
							} else {
								soptions = soptions + "<div data-value='" + $(this).attr('value') + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + cl + " " + check + "'>" + $(this).html() + "</div>";
							}
						} else if ($(this).parent().attr('data-label') == 'on') {
							if (sblock.find('.select__label').length == 0) {
								sblock.prepend('<div class="select__label">' + $(this).html() + '</div>');
							}
						}
					});
					soptions = soptions + "</div></div></div>";
					if ($(this).attr('data-type') == 'search') {
						sblock.append("<div data-type='search' class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
							"<div class='select-title'>" +
							"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
							"<input data-value='" + $(this).find('option[selected="selected"]').html() + "' class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "' />" +
							"</div>" +
							soptions +
							"</div>");
						$('.select_' + ind).find('input.select-title__value').jcOnPageFilter({
							parentSectionClass: 'select-options_' + ind,
							parentLookupClass: 'select-options__value_' + ind,
							childBlockClass: 'select-options__value_' + ind
						});
					} else if ($(this).attr('data-icon') == 'true') {
						sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr('class') + "__select icon " + milti + "'>" +
							"<div class='select-title'>" +
							"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
							"<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'><div><img src=" + $(this).find('option[selected="selected"]').attr('data-icon') + " alt=\"\"></div><div>" + $(this).find('option[selected="selected"]').html() + "</div></div>" +
							"</div>" +
							soptions +
							"</div>");
					} else {
						sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
							"<div class='select-title'>" +
							"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
							"<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'>" + $(this).find('option[selected="selected"]').html() + "</div>" +
							"</div>" +
							soptions +
							"</div>");
					}
					if ($(this).find('option[selected="selected"]').val() != '') {
						sblock.find('.select').addClass('focus');
					}

					if (sblock.find('.select-options__value').length == 1) {
						sblock.find('.select').addClass('one');
					}

					if ($(this).attr('data-req') == 'on') {
						$(this).addClass('req');
					}
					$(".select_" + ind + " .select-options-scroll").niceScroll('.select-options-list', selectscrolloptions());
				});
			}
			select();

			$('body').on('keyup', 'input.select-title__value', function () {
				$('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(50);
				$(this).parents('.select').addClass('active');
				$(this).parents('.select').find('.select-options').slideDown(50, function () {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});
				$(this).parents('.select-block').find('select').val('');
			});
			$('body').on('click', '.select', function () {
				if (!$(this).hasClass('disabled') && !$(this).hasClass('one')) {
					$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
					$(this).toggleClass('active');
					$(this).find('.select-options').slideToggle(50, function () {
						$(this).find(".select-options-scroll").getNiceScroll().resize();
					});

					//	var input=$(this).parent().find('select');
					//removeError(input);

					if ($(this).attr('data-type') == 'search') {
						if (!$(this).hasClass('active')) {
							searchselectreset();
						}
						$(this).find('.select-options__value').show();
					}


					var cl = $.trim($(this).find('.select-title__value').attr('class').replace('select-title__value', ''));
					$(this).find('.select-options__value').show().removeClass('hide').removeClass('last');
					if (cl != '') {
						$(this).find('.select-options__value.' + cl).hide().addClass('hide');
					}
					if ($(this).find('.select-options__value').last().hasClass('hide')) {
						$(this).find('.select-options__value').last().prev().addClass('last');
					}
				}
			});
			$('body').on('click', '.select-options__value', function () {
				if ($(this).parents('.select').hasClass('multiple')) {
					if ($(this).hasClass('active')) {
						if ($(this).parents('.select').find('.select-title__value span').length > 0) {
							$(this).parents('.select').find('.select-title__value').append('<span data-value="' + $(this).data('value') + '">, ' + $(this).html() + '</span>');
						} else {
							$(this).parents('.select').find('.select-title__value').data('label', $(this).parents('.select').find('.select-title__value').html());
							$(this).parents('.select').find('.select-title__value').html('<span data-value="' + $(this).data('value') + '">' + $(this).html() + '</span>');
						}
						$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', true);
						$(this).parents('.select').addClass('focus');
					} else {
						$(this).parents('.select').find('.select-title__value').find('span[data-value="' + $(this).data('value') + '"]').remove();
						if ($(this).parents('.select').find('.select-title__value span').length == 0) {
							$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
							$(this).parents('.select').removeClass('focus');
						}
						$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', false);
					}
					return false;
				}


				if ($(this).parents('.select').attr('data-type') == 'search') {
					$(this).parents('.select').find('.select-title__value').val($(this).html());
					$(this).parents('.select').find('.select-title__value').attr('data-value', $(this).html());
				} else {
					$(this).parents('.select').find('.select-title__value').attr('class', 'select-title__value value_' + $(this).data('value'));
					$(this).parents('.select').find('.select-title__value').html($(this).html());

				}

				$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
				if ($.trim($(this).data('value')) != '') {
					$(this).parents('.select-block').find('select').val($(this).data('value'));
					$(this).parents('.select-block').find('select').find('option[value="' + $(this).data('value') + '"]').attr('selected', 'selected');
				} else {
					$(this).parents('.select-block').find('select').val($(this).html());
					$(this).parents('.select-block').find('select').find('option[value="' + $(this).html() + '"]').attr('selected', 'selected');
				}


				if ($(this).parents('.select-block').find('select').val() != '') {
					$(this).parents('.select-block').find('.select').addClass('focus');
				} else {
					$(this).parents('.select-block').find('.select').removeClass('focus');

					$(this).parents('.select-block').find('.select').removeClass('err');
					$(this).parents('.select-block').parent().removeClass('err');
					$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
				}
				if (!$(this).parents('.select').data('tags') != "") {
					if ($(this).parents('.form-tags').find('.form-tags__item[data-value="' + $(this).data('value') + '"]').length == 0) {
						$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="' + $(this).data('value') + '" href="" class="form-tags__item">' + $(this).html() + '<span class="fa fa-times"></span></a>');
					}
				}
				$(this).parents('.select-block').find('select').change();

				if ($(this).parents('.select-block').find('select').data('update') == 'on') {
					select();
				}
			});
			$(document).on('click touchstart', function (e) {
				if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
					$('.select').removeClass('active');
					$('.select-options').slideUp(50, function () { });
					searchselectreset();
				};
			});
			$(document).on('keydown', function (e) {
				if (e.which == 27) {
					$('.select').removeClass('active');
					$('.select-options').slideUp(50, function () { });
					searchselectreset();
				}
			});
		}
		//FIELDS
		$('input,textarea').focus(function () {
			if ($(this).val() == $(this).attr('data-value')) {
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'password');
				};
				$(this).val('');
			};
			removeError($(this));
		});
		$('input[data-value], textarea[data-value]').each(function () {
			if (this.value == '' || this.value == $(this).attr('data-value')) {
				if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
					$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
				} else {
					this.value = $(this).attr('data-value');
				}
			}
			if (this.value != $(this).attr('data-value') && this.value != '') {
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
					$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
				}
			}

			$(this).click(function () {
				if (this.value == $(this).attr('data-value')) {
					if ($(this).attr('data-type') == 'pass') {
						$(this).attr('type', 'password');
					};
					this.value = '';
				};
			});
			$(this).blur(function () {
				if (this.value == '') {
					if (!$(this).hasClass('l')) {
						this.value = $(this).attr('data-value');
					}
					$(this).removeClass('focus');
					$(this).parent().removeClass('focus');
					if ($(this).attr('data-type') == 'pass') {
						$(this).attr('type', 'text');
					};
				};
				if ($(this).hasClass('vn')) {
					formValidate($(this));
				}
			});
		});
		$('.form-input__viewpass').click(function (event) {
			if ($(this).hasClass('active')) {
				$(this).parent().find('input').attr('type', 'password');
			} else {
				$(this).parent().find('input').attr('type', 'text');
			}
			$(this).toggleClass('active');
		});
		$.each($('input.phone'), function (index, val) {
			$(this).attr('type', 'tel');
			$(this).focus(function () {
				$(this).inputmask('+7(999) 999 9999', {
					clearIncomplete: true, clearMaskOnLostFocus: true,
					"onincomplete": function () { maskclear($(this)); }
				});
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				$(this).parent().removeClass('err');
				$(this).removeClass('err');
			});
		});
		$('input.phone').focusout(function (event) {
			maskclear($(this));
		});
		//CHECK
		$.each($('.check'), function (index, val) {
			if ($(this).find('input').prop('checked') == true) {
				$(this).addClass('active');
			}
		});
		$('body').off('click', '.check', function (event) { });
		$('body').on('click', '.check', function (event) {
			if (!$(this).hasClass('disable')) {
				var target = $(event.target);
				if (!target.is("a")) {
					$(this).toggleClass('active');
					if ($(this).hasClass('active')) {
						$(this).find('input').prop('checked', true);
					} else {
						$(this).find('input').prop('checked', false);
					}
				}
			}
		});

		//OPTION
		$.each($('.option.active'), function (index, val) {
			$(this).find('input').prop('checked', true);
		});
		$('.option').click(function (event) {
			if (!$(this).hasClass('disable')) {
				var target = $(event.target);
				if (!target.is("a")) {
					if ($(this).hasClass('active') && $(this).hasClass('order')) {
						$(this).toggleClass('orderactive');
					}
					$(this).parents('.options').find('.option').removeClass('active');
					$(this).toggleClass('active');
					$(this).children('input').prop('checked', true);
				}
			}
		});
	}
	forms();

	//VALIDATE FORMS
	$('form button[type=submit]').click(function () {
		var er = 0;
		var form = $(this).parents('form');
		var ms = form.data('ms');
		$.each(form.find('.req'), function (index, val) {
			er += formValidate($(this));
		});
		if (er == 0) {
			removeFormError(form);
			if (ms != null && ms != '') {
				showMessageByClass(ms);
				return false;
			}
		} else {
			return false;
		}
	});
	function formValidate(input) {
		var er = 0;
		var form = input.parents('form');
		if (input.attr('name') == 'email' || input.hasClass('email')) {
			if (input.val() != input.attr('data-value')) {
				var em = input.val().replace(" ", "");
				input.val(em);
			}
			if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
				er++;
				addError(input);
			} else {
				removeError(input);
			}
		} else {
			if (input.val() == '' || input.val() == input.attr('data-value')) {
				er++;
				addError(input);
			} else {
				removeError(input);
			}
		}
		if (input.attr('type') == 'checkbox') {
			if (input.prop('checked') == true) {
				input.removeClass('err').parent().removeClass('err');
			} else {
				er++;
				input.addClass('err').parent().addClass('err');
			}
		}
		if (input.hasClass('name')) {
			if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
				er++;
				addError(input);
			}
		}
		if (input.hasClass('pass-2')) {
			if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
				addError(input);
			} else {
				removeError(input);
			}
		}
		return er;
	}
	function formLoad() {
		$('.popup').hide();
		$('.popup-message-body').hide();
		$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
		$('.popup-message').addClass('active').fadeIn(300);
	}
	function showMessageByClass(ms) {
		$('.popup').hide();
		popupOpen('message.' + ms, '');
	}
	function showMessage(html) {
		$('.popup-loading').remove();
		$('.popup-message-body').show().html(html);
	}
	function clearForm(form) {
		$.each(form.find('.input'), function (index, val) {
			$(this).removeClass('focus').val($(this).data('value'));
			$(this).parent().removeClass('focus');
			if ($(this).hasClass('phone')) {
				maskclear($(this));
			}
		});
	}
	function addError(input) {
		input.addClass('err');
		input.parent().addClass('err');
		input.parent().find('.form__error').remove();
		if (input.hasClass('email')) {
			var error = '';
			if (input.val() == '' || input.val() == input.attr('data-value')) {
				error = input.data('error');
			} else {
				error = input.data('error');
			}
			if (error != null) {
				input.parent().append('<div class="form__error">' + error + '</div>');
			}
		} else {
			if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
				input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
			}
		}
		if (input.parents('.select-block').length > 0) {
			input.parents('.select-block').parent().addClass('err');
			input.parents('.select-block').find('.select').addClass('err');
		}
	}
	function addErrorByName(form, input__name, error_text) {
		var input = form.find('[name="' + input__name + '"]');
		input.attr('data-error', error_text);
		addError(input);
	}
	function addFormError(form, error_text) {
		form.find('.form__generalerror').show().html(error_text);
	}
	function removeFormError(form) {
		form.find('.form__generalerror').hide().html('');
	}
	function removeError(input) {
		input.removeClass('err');
		input.parent().removeClass('err');
		input.parent().find('.form__error').remove();

		if (input.parents('.select-block').length > 0) {
			input.parents('.select-block').parent().removeClass('err');
			input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
			//input.parents('.select-block').find('.select-options').hide();
		}
	}
	function removeFormErrors(form) {
		form.find('.err').removeClass('err');
		form.find('.form__error').remove();
	}
	function maskclear(n) {
		if (n.val() == "") {
			n.inputmask('remove');
			if (!n.hasClass('l')) {
				n.val(n.attr('data-value'));
			}
			n.removeClass('focus');
			n.parent().removeClass('focus');
		}
	}
	function searchselectreset() {
		$.each($('.select[data-type="search"]'), function (index, val) {
			var block = $(this).parent();
			var select = $(this).parent().find('select');
			if ($(this).find('.select-options__value:visible').length == 1) {
				$(this).addClass('focus');
				$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
				$(this).find('.select-title__value').val($('.select-options__value:visible').html());
				$(this).find('.select-title__value').attr('data-value', $('.select-options__value:visible').html());
			} else if (select.val() == '') {
				$(this).removeClass('focus');
				block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
				block.find('input.select-title__value').attr('data-value', select.find('option[selected="selected"]').html());
			}
		});
	}
	if (location.hash) {
		var hsh = location.hash.replace('#', '');
		if ($('.popup-' + hsh).length > 0) {
			popupOpen(hsh);
		} else if ($('div.' + hsh).length > 0) {
			$('body,html').animate({ scrollTop: $('div.' + hsh).offset().top, }, 500, function () { });
		}
	}

	var act = "click";
	if (isMobile.iOS()) {
		var act = "touchstart";
	}

	let iconMenu = document.querySelector(".bottom-center-header__icon");
	let body = document.querySelector("body");
	let menuBody = document.querySelector(".bottom-center-header__menu");
	if (iconMenu) {
		iconMenu.addEventListener("click", function () {
			iconMenu.classList.toggle("active");
			body.classList.toggle("lock");
			menuBody.classList.toggle("active");
		});
	}
	//POPUP
	$('.pl').click(function (event) {
		var pl = $(this).attr('href').replace('#', '');
		var v = $(this).data('vid');
		popupOpen(pl, v);
		return false;
	});
	function popupOpen(pl, v) {
		$('.popup').removeClass('active').hide();
		if (!$('.menu__body').hasClass('active')) {
			//$('body').data('scroll',$(window).scrollTop());
		}
		if (!isMobile.any()) {
			$('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
			$('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
		} else {
			setTimeout(function () {
				$('body').addClass('lock');
			}, 300);
		}
		history.pushState('', '', '#' + pl);
		if (v != '' && v != null) {
			$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
		}
		$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

		if ($('.popup-' + pl).find('.slick-slider').length > 0) {
			$('.popup-' + pl).find('.slick-slider').slick('setPosition');
		}
	}
	function openPopupById(popup_id) {
		$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
	}
	function popupClose() {
		$('.popup').removeClass('active').fadeOut(300);
		if (!$('.menu__body').hasClass('active')) {
			if (!isMobile.any()) {
				setTimeout(function () {
					$('body').css({ paddingRight: 0 });
					$('.pdb').css({ paddingRight: 0 });
				}, 200);
				setTimeout(function () {
					$('body').removeClass('lock');
					//$('body,html').scrollTop(parseInt($('body').data('scroll')));
				}, 200);
			} else {
				$('body').removeClass('lock');
				//$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}
		}
		$('.popup-video__value').html('');

		history.pushState('', '', window.location.href.split('#')[0]);
	}
	$('.popup-close,.popup__close').click(function (event) {
		popupClose();
		return false;
	});
	$('.popup').click(function (e) {
		if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
			popupClose();
			return false;
		}
	});
	$(document).on('keydown', function (e) {
		if (e.which == 27) {
			popupClose();
		}
	});

	//Клик вне области
	$(document).on('click touchstart', function (e) {
		if (!$(e.target).is(".select *")) {
			$('.select').removeClass('active');
		};
	});


	AOS.init();


	const tabs1 = document.querySelector('.applic__bottom');
	const tabsBtn1 = document.querySelectorAll('.applic__item');
	const tabsContent1 = document.querySelectorAll('.form-applic');


	if (tabs1) {
		tabs1.addEventListener('click', e => {
			if (e.target.classList.contains('applic__item')) {
				const tabsPath = e.target.dataset.tabsPath;
				tabsHandler1(tabsPath);
			}
		})
	}

	const tabsHandler1 = (path) => {
		tabsBtn1.forEach(el => { el.classList.remove('active') });
		document.querySelector(`[data-tabs-path="${path}"]`).classList.add('active');

		tabsContent1.forEach(el => { el.classList.remove('active') });
		document.querySelector(`[data-tabs-target="${path}"]`).classList.add('active');

	};


	const heroSlider = new Swiper('.slider-hero', {
		loop: true,
		autoplay: {
			delay: 3000,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	const advantagesSlider = new Swiper('.advantages-slider__slider', {
		loop: true,
		autoplay: {
			delay: 3000,
		},
		pagination: {
			el: '.pagination-advantages-slider',
			clickable: true,
		},
	});



	const arrowTop = document.querySelector('.arrow-top');
	const headerScroll = document.querySelector('.header-scroll');

	arrowTop.addEventListener("click", () => {
		document.querySelector("body").scrollIntoView({
			block: "center",
			behavior: "smooth",
		});
	});

	window.addEventListener('scroll', () => {
		headerScrollFunc();
		let scrollTop = window.scrollY;
		if (scrollTop > 1400) {
			arrowTop.style.display = "block";
		} else {
			arrowTop.style.display = "None";
		}
	});


	function headerScrollFunc() {
		let scrollTop = window.scrollY;
		if (scrollTop > 500) {
			headerScroll.style.display = "block";
		} else {
			headerScroll.style.display = "none";
		}
	}

	headerScrollFunc();

	if (document.querySelector('#map')) {
		ymaps.ready(function () {
			var myMap = new ymaps.Map('map', {
				center: [55.751574, 37.573856],
				zoom: 9
			}, {
				searchControlProvider: 'yandex#search'
			}),

				// Создаём макет содержимого.
				MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
					'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
				),

				myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
					hintContent: 'Собственный значок метки',
					balloonContent: 'Это красивая метка'
				}, {
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#image',
					// Своё изображение иконки метки.
					iconImageHref: 'images/myIcon.gif',
					// Размеры метки.
					iconImageSize: [30, 42],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-5, -38]
				}),

				myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
					hintContent: 'Собственный значок метки с контентом',
					balloonContent: 'А эта — новогодняя',
					iconContent: '12'
				}, {
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#imageWithContent',
					// Своё изображение иконки метки.
					iconImageHref: 'images/ball.png',
					// Размеры метки.
					iconImageSize: [48, 48],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-24, -24],
					// Смещение слоя с содержимым относительно слоя с картинкой.
					iconContentOffset: [15, 15],
					// Макет содержимого.
					iconContentLayout: MyIconContentLayout
				});
		});
	}

	let inputFrom = document.querySelector("#input-from");
	let inputTo = document.querySelector("#input-to");

	if (inputFrom || inputTo) {
		inputDefault();
	}


	function inputDefault() {
		inputFrom.value = "Москва";
		inputTo.value = "Якутск";
	}


	const tabs = document.querySelector('.body-contacts');
	const tabsBtn = document.querySelectorAll('.left-body-contacts__tab');
	const tabsContent = document.querySelectorAll('.body-contacts__right');


	if (tabs) {
		tabs.addEventListener('click', e => {
			if (e.target.classList.contains('left-body-contacts__tab')) {
				const tabsPath = e.target.dataset.tabsPath;
				tabsHandler(tabsPath);
			}
		})
	}

	const tabsHandler = (path) => {
		tabsBtn.forEach(el => { el.classList.remove('active') });
		document.querySelector(`[data-tabs-path="${path}"]`).classList.add('active');

		tabsContent.forEach(el => { el.classList.remove('active') });
		document.querySelector(`[data-tabs-target="${path}"]`).classList.add('active');

	};

	const menu = document.querySelector(".bottom-center-header__list");

	menu.addEventListener('click', (e) => {
		if (window.innerWidth < 992 && e.target.nextElementSibling.classList.contains("sub-menu")) {
			if (e.target.nextElementSibling.classList.contains("active")) {
				e.target.classList.remove("active");
				e.target.nextElementSibling.classList.remove("active");
				e.target.nextElementSibling.style.display = "None";
			} else {
				e.target.classList.add("active");
				e.target.nextElementSibling.classList.add("active");
				e.target.nextElementSibling.style.display = "block";
			}
		}
	});

});