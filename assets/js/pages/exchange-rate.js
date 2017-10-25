import 'bootstrap-sass/assets/javascripts/bootstrap/modal'

const $dashboardList = $('#often .dashboard__list')
const $customList = $('#customized .dashboard__list')

if ($dashboardList.length) {
	Sortable.create($dashboardList[0], {
		animation: 150,
		delay: 35,
		draggable: '.dashboard__item',
		onStart() {
			$dashboardList
				.find('.dashboard__item')
				.addClass('dragging')
		},
		onEnd() {
			$dashboardList
				.find('.dashboard__item')
				.removeClass('dragging')
		}
	})

	Sortable.create($customList[0], {
		animation: 150,
		delay: 35,
		draggable: '.dashboard__item',
		filter: '.dashboard__nothing',
		onStart() {
			$customList
				.find('.dashboard__item')
				.addClass('dragging')
		},
		onEnd() {
			$customList
				.find('.dashboard__item')
				.removeClass('dragging')
		}
	})
}

const toggleMobileChart = $target => {
	$('.dashboard__item')
		.find('.dashboard__mobile-chart')
		.remove()

	$target.appendHandlebars('#mobileChart', { chart: 'https://fakeimg.pl/1400x640/008FBC/FFFFFF?text=chart' })
}

$('.dashboard__list').on('click', '.dashboard__item-content', function () {
	$('.dashboard__item').removeClass('active')

	$(this)
		.closest('.dashboard__item')
		.addClass('active')

	toggleMobileChart($(this).closest('.dashboard__item'))
})

$('.dashboard__list').on('click', '.dashboard__period', function () {
	$(this)
		.closest('.dashboard__period-tabs')
		.find('.dashboard__period')
		.removeClass('active')

	$(this).addClass('active')
})

$('.exchange-modal__selection a').click(function () {
	$(this)
		.closest('.exchange-modal__selection')
		.find('.exchange-tools__selected')
		.text($(this).text())
		.data('name', $(this).data('name'))
		.data('symbol', $(this).data('symbol'))
})

$('.dashboard__add').click(() => $('#exchangeModal').modal('show'))

$('.dashboard__list').on('click', '.dashboard__del', function () {
	$(this)
		.closest('.dashboard__item')
		.remove()

	if (!$('#customized .dashboard__item').length)
		$('.dashboard__nothing').show()
})

$('.exchange-modal__confirm').click(() => {
	$('.dashboard__nothing').hide()
	const $modalSelected = $('.exchange-modal__selection .exchange-tools__selected')

	const data = {
		from: $modalSelected.eq(0).data('name'),
		to: $modalSelected.eq(1).data('name'),
		rising: true,
		bid: 1.116,
		ask: 1.1164,
		current: 1.1408,
		rate: -0.0019,
		percentage: '-0.17%'
	}

	$('.dashboard__nothing').hide()
	$customList.appendHandlebars('#currencyItem', data)

	$('#exchangeModal').modal('hide')
})
