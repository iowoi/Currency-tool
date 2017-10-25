import 'jquery-placeholder'

$('.contact-form .dropdown-menu a').click(function () {
	$(this)
		.closest('.dropdown')
		.find('.contact-form__selected')
		.text($(this).text())
})

$('.contact-form input').placeholder()
