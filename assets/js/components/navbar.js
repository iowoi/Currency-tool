$(window).scroll(function () {
	$('.navbar').toggleClass('nav-float', ($(this).scrollTop() > 16))
})

$('.navbar-toggle').on('click', () => {
	$('.navbar').toggleClass('mobile-nav-active')
})

$('.mobile-nav__trigger').on('click', function() {
	const theMenu = $(this).siblings('.mobile-submenu')
	$('.mobile-submenu').not(theMenu).slideUp(400)
	theMenu.slideToggle(400)
})

// $('.sub-navbar__trigger').on('click', function() {
// 	const theList = $(this).siblings('.sub-navbar__list').find('.sub-navbar__item')
// 	theList.toggleClass('is-open')
// 	$(this).find('.icon')
// 		.toggleClass('hide')
// })

$('.sub-navbar__trigger').on('click', function() {
	const theList = $(this).siblings('.sub-navbar__list').find('.sub-navbar__item')
	theList.toggleClass('is-open')
	$(this).find('.icon').toggleClass('hide')
})
