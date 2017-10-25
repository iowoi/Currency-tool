$('.comprehensive-tabs .tab').click(function () {
	$('.comprehensive-tabs .tab').removeClass('active')
	$(this).addClass('active')

	const target = $(this).data('category')
	$('section[data-panel]').hide()
	$(`section[data-panel="${target}"]`).show()
})
