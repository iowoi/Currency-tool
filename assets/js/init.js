$.fn.appendHandlebars = function (srcElem, data) {
	const tmpl = Handlebars.compile($(srcElem).html())
	const html = tmpl(data)

	$(this).append(html)

	return $(this)
}

let cellHeight = 376

if ($('.longtern-investment').length)
	cellHeight = 320
else if ($('.grid-stack--less-content').length)
	cellHeight = 290

$('.grid-stack').gridstack({
	verticalMargin: 24,
	cellHeight
})


const handleGridResize = () => {
	if (!$('.grid-stack').length)
		return

	const $grid = $('.grid-stack').data('gridstack')

	if ($(window).outerWidth() <= 1024) {
		$grid.verticalMargin(16)
		// $grid.cellHeight(280)
		$grid.cellHeight(340)
	} else {
		$grid.verticalMargin(24)
		$grid.cellHeight(cellHeight)
	}
}

handleGridResize()
$(window).resize(handleGridResize)
