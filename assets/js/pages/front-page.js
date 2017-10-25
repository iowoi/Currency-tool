$('.main-slider').slick({
	dots: true,
	autoplay: true,
	infinite: false,
	speed: 300,
	slidesToShow: 1,
	arrows: false
})

$('.cities').slick({
	dots: false,
	autoplay: false,
	infinite: false,
	slidesToShow: 6,
	speed: 300,
	arrows: true,
	responsive: [{
		breakpoint: 1581,
		settings: {
			slidesToShow: 5
		}
	}, {
		breakpoint: 1381,
		settings: {
			slidesToShow: 4
		}
	}]
})

$('.description--ellipsis').each(function () {
	const maxLength = 24
	const description = $(this).text()

	if (description.length > maxLength) {
		$(this).attr('title', description)
		const text = `${description.substring(0, maxLength - 1)}...`
		$(this).text(text)
	}
})

$('.exchange-rate__list').slick({
	dots: false,
	autoplay: false,
	infinite: false,
	slidesToShow: 6,
	speed: 300,
	arrows: true,
	responsive: [{
		breakpoint: 1200,
		settings: {
			slidesToShow: 5,
		}
	}, {
		breakpoint: 992,
		settings: {
			slidesToShow: 4,
		}
	}, {
		breakpoint: 821,
		settings: {
			slidesToShow: 3
		}
	}, {
		breakpoint: 631,
		settings: {
			slidesToShow: 2
		}
	}, {
		breakpoint: 551,
		settings: {
			slidesToShow: 1,
			centerMode: true
		}
	}]
})

$('.city').click(function () {
	$('.city').removeClass('active')
	$(this).addClass('active')

	const target = $(this).data('target')
	$('.current-city').hide()
	$(`.current-city[data-target="${target}"]`).show()
})
