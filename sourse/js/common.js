let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');

div.remove();
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";
		$(link).fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
		});
		const link2 = ".link-modal-team-js";
		$(document).on("click", link2, function (e) {
			e.preventDefault();
			let href = this.getAttribute("href");
			$(href + ' .content-for-modal ').remove();
			$(this).parent().find(".content-for-modal").clone().prependTo(href);

			console.log(href);
			$.fancybox.open({
				src: '#modal-team',
				type: 'inline',
				arrows: false,
				infobar: false,
				touch: false,
				autoFocus: false,
				i18n: {
					en: {
						CLOSE: "Закрыть",
						NEXT: "Вперед",
						PREV: "Назад",
					},
				},
				beforeLoad: function () {
					root.style.setProperty('--spacing-end', scrollWidth + 'px');
				},
				afterClose: function () {
					root.style.setProperty('--spacing-end', null);
				},

			});
		})
		// $(link).fancybox({
		// });


		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			if (!container || link) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {
		const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		tabs.forEach(element => {
			let tabs = element;
			const tabsCaption = tabs.querySelector(".tabs__caption");
			const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			const tabsWrap = tabs.querySelector(".tabs__wrap");
			const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			const random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach((el, index) => {
				const data = `tab-content-${random}-${index}`;
				el.dataset.tabBtn = data;
				const content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;

				const active = content.classList.contains('active') ? 'active' : '';
				// console.log(el.innerHTML);
				content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
			})


			tabs.addEventListener('click', function (element) {
				const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
				if (!btn) return;
				const data = btn.dataset.tabBtn;
				const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
				const content = this.querySelectorAll(`[data-tab-content]`);
				tabsAllBtn.forEach(element => {
					element.dataset.tabBtn == data
						? element.classList.add('active')
						: element.classList.remove('active')
				});
				content.forEach(element => {
					element.dataset.tabContent == data
						? (element.classList.add('active'), element.previousSibling.classList.add('active'))
						: element.classList.remove('active')
				});
			})
		})

		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {

		$(document).on('click', " .scroll-link , .menu-item a", function () {
			const headerHeight = document.querySelector(".header").offsetHeight;
			// console.log(headerHeight);
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top- headerHeight;

			$('html, body').animate({ scrollTop: destination  }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

function eventHandler() {


	var isMobile = (function (a) { return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)); })(navigator.userAgent || navigator.vendor || window.opera);


	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	// function setFixedNav() {
	// 	let topNav = document.querySelector('.top-nav  ');
	// 	if (!topNav) return;
	// 	window.scrollY > 0
	// 		? topNav.classList.add('fixed')
	// 		: topNav.classList.remove('fixed');
	// }

	// function whenResize() {
	// 	setFixedNav();
	// }

	// window.addEventListener('scroll', () => {
	// 	setFixedNav();

	// }, { passive: true })
	// window.addEventListener('resize', () => {
	// 	whenResize();
	// }, { passive: true });

	// whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	});
	// modal window



	var wrapper = document.querySelector(".top-nav"); 
		var nav = priorityNav.init({
			mainNavWrapper: ".top-nav__body", // mainnav wrapper selector (must be direct parent from mainNav)
			mainNav: ".menu", // mainnav selector. (must be inline-block)
			navDropdownLabel: 'Еще',
			navDropdownClassName: "menu__dropdown", // class used for the dropdown.
			navDropdownToggleClassName: "menu__dropdown-toggle", // class used for the dropdown toggle.
			// navDropdownBreakpointLabel: "Выбрать", //button label for navDropdownToggle when the breakPoint is reached.
			breakPoint: 0,
			// moved: function () { scrolldrop()}, // executed when item is moved to dropdown
			// movedBack: function () { scrolldrop()} // executed when item is moved back to main menu
		}); 

	//luckyone js
	let sBlogSlider = new Swiper('.sBlog-slider-js', {
		//...defaultSl,
		slidesPerView: 1,
		loop: true,
		loopedSlides: 6,
		//centeredSlides: true,

		breakpoints: {
			0: {
				spaceBetween: 16,
			},
			1200: {
				spaceBetween: 20,
			},
			1400: {
				spaceBetween: 24,
			},
		},

		navigation: {
			nextEl: '.sBlog .swiper-button-next',
			prevEl: '.sBlog .swiper-button-prev',
		},
	});
	let caruselSliderCenter = new Swiper('.carusel__slider--js', {
		...defaultSl,
		centeredSlides: true,
		slidesPerView: 'auto',
		loop: true,
		loopedSlides: 6,
		centeredSlidesBounds: true,
		// nested: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	if (isMobile) {

		let caruselSlider = new Swiper('.carusel__slider--not-center-js', {
			...defaultSl,
			slidesPerView: 'auto',
			loopedSlides: 6,
			loop: false,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}

	let sOffersSlider = new Swiper('.sOffers-slider-js', {
		//...defaultSl,
		slidesPerView: 'auto',
		loop: true,

		breakpoints: {
			0: {
				spaceBetween: 16,
			},
			992: {
				spaceBetween: 0,
			},
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	//
	let sPlaceSlider = new Swiper('.sPlace-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		loop: true,

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
 

	//end luckyone js



	var wow = new WOW({
		mobile: false,
		animateClass: 'animate__animated',
	});

	$('body').removeClass("op");
	wow.init();
	setTimeout(() => {
	}, 1000);
	setTimeout(() => {
		$('.header').removeClass("op");
	}, 500);



	var controller = new ScrollMagic.Controller();


	function animateText(text, parent, y = "-=200%", d=1000) {
		var tween = TweenMax.to(`${parent} ${text}`, 0.1, { y: y });
		// build scene
		var scene = new ScrollMagic.Scene({ triggerElement: parent, duration: d })
			.setTween(tween)
			// .addIndicators() // add indicators (requires plugin)
			.addTo(controller);
	}
	function animateTextVertical(text, parent, y = "-=200%") {
		var scene = new ScrollMagic.Scene({ triggerElement: parent, duration: 1000 })
			.setPin(`${parent} ${text}`)
			.setTween(tween)
			// .addIndicators() // add indicators (requires plugin)
			.addTo(controller);
	}
	animateText('#text-id-1', '#block-id-1', "-=100%", "2000");
	animateText('#text-id-2', '#block-id-2', "-=100%", "2000");
	animateText('#text-id-3', '#block-id-3', "-=50%");
	animateText('.text', '#sSteps', "-=100%", 2000);
	animateText('.text', '#sRews');
	animateText('.bg-txt', '#sKiteStation');
	animateText('.bg-txt', '#sLeisure');
	animateText('.bg-txt', '#sPlace');
	animateText('.bg-txt', '#sRent');
	animateText('.bg-txt', '#sShop');
	animateText('.bg-txt', '#sHowToGetThere');
	animateText('.bg-txt', '#sAccommodation');
	animateText('.bg-txt', '#sBlog');
	animateText('.bg-txt', '.footer');




	var tween = TweenMax.to(`.sAbout__row`, 300, { x: '-=50%' });
	// build scene
	var scene = new ScrollMagic.Scene({ triggerElement: '.sAbout', duration: 1000 })
		.setTween(tween)
		// .addIndicators() // add indicators (requires plugin)
		.addTo(controller);
	// animateText('.sAdvantages__before', '.sAdvantages');

	// we'd only like to use iScroll for mobile...
	if (!isMobile) {

		var wipeAnimation = new TimelineMax()
			// animate to second panel

			.to("#sSteps  .swiper-wrapper", 1, { x: "-100%", ease: Power0.easeNone})

		// create scene to pin and link animation
		new ScrollMagic.Scene({
			triggerElement: ".sSteps__inner ",
			triggerHook: "onLeave",
			duration: "150%"
		})
			.setPin(".sSteps__inner ")
			.setTween(wipeAnimation)
			// .addIndicators() // add indicators (requires plugin)
			.addTo(controller);

	};


	let placeblock = document.querySelectorAll('.place-block');
	placeblock.forEach(el=>{
		const toggle = el.querySelector(".place-block__toggle"); 
		const toggleTitle = toggle.querySelector(".place-block__title");
		const toggleText = toggle.querySelector(".place-block__text"); 
		
		el.addEventListener("click", event => {
			const toggleTarget = event.target.closest(".place-block__toggle");
			let itemTarget = event.target.closest(".place-block__item");
			if (toggleTarget) el.classList.toggle("show")  
			if (itemTarget) { 
				let title = itemTarget.querySelector(".place-block__title").textContent;
				let text = itemTarget.querySelector(".place-block__text").textContent;  
				toggleTitle.textContent = title
				toggleText.textContent = text
				el.classList.remove("show") 
			}
		})
		document.documentElement.addEventListener("click", event => {
			let placeBlock = event.target.closest(".place-block.show"); 
			if (!placeBlock)  	el.classList.remove("show")  
		})
	})

	// document.addEventListener('click', (event) => {
	// 	let placeBlock = event.target.closest(".place-block.show");
	// 	if (!placeBlock) {
	// 		placeBlock.classList.remove("show");
	// 		$('.place-block__dropdown').slideUp();
	// 	}
	// }, { passive: true });

	$('input.date').daterangepicker({
		opens: 'left',
		showDropdowns: true,
		"locale": {
			"format": "DD.MM.YYYY",
			"separator": " - ",
			"applyLabel": "Применить",
			"cancelLabel": "Сбросить",
			"fromLabel": "От",
			"toLabel": "До",
			"customRangeLabel": "Произвольный",
			"daysOfWeek": [
				"Вс.",
				"Пн.",
				"Вт.",
				"Ср.",
				"Чт.",
				"Пт.",
				"Сб."
			],
			"monthNames": [
				"Январь", // заменяем на Январь
				"Февраль", // Февраль и т д
				"Март",
				"Апрель",
				"Май",
				"Июнь",
				"Июль",
				"Август",
				"Сентябрь",
				"Октябрь",
				"Ноябрь",
				"Декабрь"
			],
			"firstDay": 1
		}
	});

 

	let steps =5;
	// console.log(steps);
	let btnNav = $(".btn-nav");
	let btnNext = $(".btn-next");
	let progressCount = $(".progress-step");
	let progressBar = document.querySelector(".progress__bar");
	progressBar.style.width =  "10%"; 
	// console.log(progressBar);
	
	btnNav.click(function(){
		let step = $(this).parents(".form-wrap__step");
		let index ;
		if ($(this).hasClass("btn-next")) {
			
		 index = step.next().index() + 1;
		 step.removeClass("active").next().addClass("active");
		 progressBar.style.width = (index < 5 ? ((index - 1) * 100 / steps + "%") : "90%");
		}
		else{
			index = step.prev().index() + 1;
			step.removeClass("active").prev().addClass("active");
			progressBar.style.width = index == 2 ? "10%" : ((index - 1) * 100 / steps + "%");
		}
		// console.log(progressBar);
		progressCount.text(index );

	})
	 


	$('.btn-last-js').click(function () {
		$('.sQwiz__top').hide();
		$('.sQwiz').addClass('align-items-center justify-content-center');
	});
	
	$(document).on("click", '.toggle-servises',	 function(){
		$(this).hide();
		$('.sAdditionalServises__items > *:nth-child(n + 11)').slideDown();
		let position = window.pageYOffset;
		$('html, body').animate({ scrollTop: position + 1 }, 0);
	})


	window.addEventListener('wheel', function (evt) {
		let header = document.querySelector(".header")
		if (evt.deltaY < 0  ) {
			// поймали
			header.classList.add("show")
		}
		else {
			if (header.classList.contains("show")) {
				header.classList.remove("show")
			}
		}
	});
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }