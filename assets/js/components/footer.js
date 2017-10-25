$('.footer__heading').on('click', function() {
	const windowWidth = $( window ).width()
	const theTarget = $(this).siblings('.footer__links')
	const theTargetIcon = $(this).find('.icon')
	if (windowWidth < 768) {
		$('.footer__links').not(theTarget)
			.slideUp(400)
		$('.icon-down').not(theTargetIcon)
			.removeClass('is-active')
		theTarget.slideToggle(400)
		theTargetIcon.toggleClass('is-active')
	}
})
