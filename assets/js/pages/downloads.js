$('.downloads__tab').click(function () {
	$('.downloads__tab').removeClass('active')
	$(this).addClass('active')

	$('.downloads__content').hide()
	$(`.downloads__content[data-target="${$(this).data('target')}"]`).show()
})

$('.downloads__mobile-tabs li a').click(function () {
	$('#mobileTabs .contact-form__selected').text($(this).text())

	$('.downloads__content').hide()
	$(`.downloads__content[data-target="${$(this).data('target')}"]`).show()
})

$('.downloads__filter li a').click(function () {
	$('#downloadFilter .contact-form__selected').text($(this).text())
})
