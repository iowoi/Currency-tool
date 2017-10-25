$('.mobile-tabs li a').click(function () {
	$('#mobileTabs .contact-form__selected').text($(this).text())

	$('.mobile-dropdown__content').hide()
	$(`.mobile-dropdown__content[data-target="${$(this).data('target')}"]`).show()
})

$('.mobile-tabs li button').click(function () {
	$('#mobileTabs .contact-form__selected').text($(this).text())
})
