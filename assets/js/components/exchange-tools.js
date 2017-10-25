import 'bootstrap-sass/assets/javascripts/bootstrap/tooltip'
import 'bootstrap-sass/assets/javascripts/bootstrap/popover'
import BigNumber from 'bignumber.js'

const $exchangeFrom = $('.exchange-tools__from')
const $exchangeTo = $('.exchange-tools__to')

const $fromSelected = $exchangeFrom.find('.exchange-tools__selected')
const $toSelected = $exchangeTo.find('.exchange-tools__selected')

const $fromRate = $exchangeFrom.find('.exchange-tools__rate')
const $toRate = $exchangeTo.find('.exchange-tools__rate')

const fmtFromCurrencyInput = $exchangeFrom.length
	? new Cleave('.exchange-tools__from .exchange-tools__input', {
		numeral: true,
		prefix: `${$fromSelected.data('symbol')} `
	})
	: null

const fmtToCurrencyInput = $exchangeTo.length
	? new Cleave('.exchange-tools__to .exchange-tools__input', {
		numeral: true,
		prefix: `${$toSelected.data('symbol')} `
	})
	: null

const changeCurrencyName = ($target, $selected) => {
	const isElem = $selected.prop
	const [enName, name] = (isElem ? $selected.text() : $selected.text).split(' ')

	$target
		.html(`${enName}<span> ${name}</span>`)
		.data('name', isElem ? $selected.data('name') : $selected.name)
		.data('symbol', isElem ? $selected.data('symbol') : $selected.symbol)
}

const changeCurrencyInput = (fmtInput, symbol) => {
	fmtInput.properties.prefix = `${symbol} `
	fmtInput.setRawValue(parseFloat(fmtInput.getRawValue().split(' ')[1]))
}

const changeCurrencyInfo = () => {
	$fromRate.text(`1 ${$fromSelected.data('name')} = 6.8385 ${$toSelected.data('name')}`)
	$toRate.text(`1 ${$toSelected.data('name')} = 0.1462 ${$fromSelected.data('name')}`)
}

$exchangeFrom.find('.dropdown-menu a').click(function () {
	changeCurrencyName($fromSelected, $(this))
	changeCurrencyInput(fmtFromCurrencyInput, $(this).data('symbol'))
	changeCurrencyInfo()
})

$exchangeTo.find('.dropdown-menu a').click(function () {
	changeCurrencyName($toSelected, $(this))
	changeCurrencyInput(fmtToCurrencyInput, $(this).data('symbol'))
	changeCurrencyInfo()
})

$('.exchange-tools__switch').click(() => {
	const from = {
		text: $fromSelected.text(),
		name: $fromSelected.data('name'),
		symbol: $fromSelected.data('symbol')
	}

	const to = {
		text: $toSelected.text(),
		name: $toSelected.data('name'),
		symbol: $toSelected.data('symbol')
	}

	changeCurrencyName($fromSelected, to)
	changeCurrencyName($toSelected, from)

	changeCurrencyInput(fmtFromCurrencyInput, $fromSelected.data('symbol'))
	changeCurrencyInput(fmtToCurrencyInput, $toSelected.data('symbol'))

	changeCurrencyInfo()
})

$exchangeFrom.find('.exchange-tools__input').keyup(() => {
	const money = parseFloat(fmtFromCurrencyInput.getRawValue().split(' ')[1])
	fmtToCurrencyInput.setRawValue(new BigNumber(money).times(6.8385))
})

$exchangeTo.find('.exchange-tools__input').keyup(() => {
	const money = parseFloat(fmtToCurrencyInput.getRawValue().split(' ')[1])
	fmtFromCurrencyInput.setRawValue(new BigNumber(money).times(0.1462))
})

$('.exchange-tools__detail').popover({
	html: true,
	trigger: 'hover',
	content() {
		const data = {
			from: $fromSelected.data('name'),
			to: $toSelected.data('name'),
			rising: true,
			bid: 1.116,
			ask: 1.1164,
			current: 1.1408,
			rate: -0.0019,
			percentage: '-0.17%',
			date: 'As of 11:20 PM EDT 7/2/2017'
		}

		const tmpl = Handlebars.compile($('#exchangeToolsPopover').html())
		return tmpl(data)
	}
})
