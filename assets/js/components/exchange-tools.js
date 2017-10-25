import * as _Fn from '../fundation.js'
import 'bootstrap-sass/assets/javascripts/bootstrap/tooltip'
import 'bootstrap-sass/assets/javascripts/bootstrap/popover'
import BigNumber from 'bignumber.js'

const $exchangeFrom = $('.exchange-tools__from')
const $exchangeTo = $('.exchange-tools__to')

const $fromSelected = $exchangeFrom.find('.exchange-tools__selected')
const $toSelected = $exchangeTo.find('.exchange-tools__selected')

const $fromRate = $exchangeFrom.find('.exchange-tools__rate')
const $toRate = $exchangeTo.find('.exchange-tools__rate')

const $fromList = $exchangeFrom.find('.dropdown-menu')
const $toList = $exchangeTo.find('.dropdown-menu')

//if (window.location.pathname === '/' || window.location.pathname === '/exchange-rate') {

if (window.location.pathname.indexOf('/index') > -1 || window.location.pathname.indexOf('/exchange-rate') > -1) {
	const fmtFromCurrencyInput =
		new Cleave('.exchange-tools__from .exchange-tools__input', {
			numeral: true,
			prefix: `${$fromSelected.attr('data-symbol')} `
		})
	const fmtToCurrencyInput =
		new Cleave('.exchange-tools__to .exchange-tools__input', {
			numeral: true,
			prefix: `${$toSelected.attr('data-symbol')} `
		})

	const changeCurrencyName = ($target, $selected) => {
		$target
			.html($selected.text)
			.attr('data-name', $selected.name)
			.attr('data-symbol', $selected.symbol)
			.attr('data-rate', $selected.rate)
	}

	const changeCurrencyInput = (fmtInput, symbol) => {
		fmtInput.properties.prefix = `${symbol} `
		fmtInput.setRawValue(parseFloat(fmtInput.getRawValue().split(' ')[1]))
	}

	const changeCurrencyInfo = () => {
		const SymbolA = $fromSelected.attr('data-name'),
			SymbolB = $toSelected.attr('data-name'),
			RateA = $fromSelected.attr('data-rate'),
			RateB = $toSelected.attr('data-rate'),
			currentHost = location.href

		$fromRate.text(`1 ${SymbolA} = ${RateA} ${SymbolB}`)
		$toRate.text(`1 ${SymbolB} = ${RateB} ${SymbolA}`)
		if (currentHost.indexOf('en') > -1 || currentHost.indexOf('jp') > -1) {
			$('.exchange-tools__selected .hidden-xs').hide();
		}
	}

	const getDefaultRate = (SymbolA, SymbolB) => {
		if (SymbolB === null) {
			const list = _Fn.FindObject(_SymbolInfo, "SymbolA", SymbolA);
			return _Fn.FindObject(_SymbolInfo, "Symbol", SymbolA + list[0].SymbolB)[0].Bid
		} else {
			return _Fn.FindObject(_SymbolInfo, "Symbol", SymbolA + SymbolB)[0].Bid
		}
	}

	$exchangeFrom.on('click', '.dropdown-menu a', function () {
		const currency = {
			text: $(this).html(),
			name: $(this).attr('data-name'),
			symbol: $(this).attr('data-symbol'),
			rate: getDefaultRate($(this).attr('data-name'), null)
		}
		changeCurrencyName($fromSelected, currency)
		changeCurrencyInput(fmtFromCurrencyInput, currency.symbol)
		changeCurrencyInfo()

		createSymbolB(_SymbolInfo, currency.name)
	})

	$exchangeTo.on('click', '.dropdown-menu a', function () {
		const currency = {
			text: $(this).html(),
			name: $(this).attr('data-name'),
			symbol: $(this).attr('data-symbol'),
			rate: getDefaultRate($(this).attr('data-name'), $fromSelected.attr('data-name'))
		}
		changeCurrencyName($toSelected, currency)
		changeCurrencyInput(fmtToCurrencyInput, currency.symbol)
		changeFromCurrencyInfo(currency.name)
		changeCurrencyInfo()
	})

	$('.exchange-tools__switch').click(() => {
		const from = {
			text: $fromSelected.html(),
			name: $fromSelected.attr('data-name'),
			symbol: $fromSelected.attr('data-symbol'),
			rate: $fromSelected.attr('data-rate')
		}

		const to = {
			text: $toSelected.html(),
			name: $toSelected.attr('data-name'),
			symbol: $toSelected.attr('data-symbol'),
			rate: $toSelected.attr('data-rate')
		}

		fmtToCurrencyInput.setRawValue(new BigNumber(1000).times($toSelected.attr('data-rate')))

		changeCurrencyName($fromSelected, to)
		changeCurrencyName($toSelected, from)

		changeCurrencyInput(fmtFromCurrencyInput, to.symbol)
		changeCurrencyInput(fmtToCurrencyInput, from.symbol)

		changeCurrencyInfo()
	})

	$exchangeFrom.find('.exchange-tools__input').keyup(() => {
		const money = parseFloat(fmtFromCurrencyInput.getRawValue().split(' ')[1])
		fmtToCurrencyInput.setRawValue(new BigNumber(money).times($fromSelected.attr('data-rate')))
	})

	$exchangeTo.find('.exchange-tools__input').keyup(() => {
		const money = parseFloat(fmtToCurrencyInput.getRawValue().split(' ')[1])
		console.log(new BigNumber(money).times($toSelected.attr('data-rate')))
		fmtFromCurrencyInput.setRawValue(new BigNumber(money).times($toSelected.attr('data-rate')))
	})


	/**
	 *  Currency Data Api
	 */
	let _SymbolInfo = "";

	$(function () {
		$.ajax({
			url: 'https://api.kvbgc.com/api/RealTimePriceGC/List?token=095334BD-F90F-4750-8D30-28EA006FC1E2',
			jsonp: "callback",
			dataType: "jsonp",
			success: LoadCurrencyList_finish
		});
	})

	const LoadCurrencyList_finish = (info) => {
		if (info.code !== "0") {
			alert(info.message);
			return (false);
		}

		_SymbolInfo = info.returnValue.list;
		let symbolList = [];

		createSymbolB(_SymbolInfo, 'AUD');
		$fromSelected.attr(('data-rate'), getDefaultRate('AUD', 'CNY'));
		for (let i = 0; i < _SymbolInfo.length; i++) {
			const info = _SymbolInfo[i];
			const symbolA = info["SymbolA"];
			const nameA = info["NameA"];
			if (symbolList.indexOf(symbolA) === -1) {
				symbolList.push(symbolA);
				const dollarIcon = _Fn.CreateCurrencySymbol(symbolA);
				$fromList.append(`<li><a data-name="${symbolA}" data-symbol="${dollarIcon}"">${symbolA} <span class="hidden-xs">${nameA}</span></a></li>`);
			}
		}

		changeCurrencyInfo()
	}

	const createSymbolB = (_SymbolInfo, Symbol) => {
		const list = _Fn.FindObject(_SymbolInfo, "SymbolA", Symbol);

		let currency = {
			text: `${list[0].SymbolB} <span class="hidden-xs">${list[0].NameB}</span>`,
			name: list[0].SymbolB,
			symbol: _Fn.CreateCurrencySymbol(list[0].SymbolB),
			rate: getDefaultRate(list[0].SymbolB, Symbol)
		}

		$toList.html("");
		for (let i = 0; i < list.length; i++) {
			const info = list[i];
			const symbolB = info["SymbolB"];
			const nameB = info["NameB"];
			const dollarIcon = _Fn.CreateCurrencySymbol(symbolB);
			$toList.append(`<li><a data-name="${symbolB}" data-symbol="${dollarIcon}">${symbolB} <span class="hidden-xs">${nameB}</span></a></li>`);
			if (list[i].SymbolB === 'CNY') {
				currency = {
					text: `CNY <span class="hidden-xs">${nameB}</span>`,
					name: 'CNY',
					symbol: '¥',
					rate: getDefaultRate('CNY', Symbol)
				}
			}
		}

		changeCurrencyName($toSelected, currency);
		changeCurrencyInput(fmtToCurrencyInput, currency.symbol)
		changeFromCurrencyInfo();
		changeCurrencyInfo()
	}

	const changeFromCurrencyInfo = (SymbolB) => {
		const list = _Fn.FindObject(_SymbolInfo, "SymbolA", $fromSelected.attr('data-name'));
		let currency = {
			text: $fromSelected.html(),
			name: $fromSelected.attr('data-name'),
			symbol: $fromSelected.attr('data-symbol'),
			rate: getDefaultRate($fromSelected.attr('data-name'), list[0].SymbolB)
		}
		for (let i = 0; i < list.length; i++) {
			if (list[i].SymbolB === 'CNY') {
				currency.rate = getDefaultRate($fromSelected.attr('data-name'), 'CNY')
			}
		}

		if (SymbolB) {
			currency.rate = getDefaultRate($fromSelected.attr('data-name'), SymbolB)
		}
		changeCurrencyName($fromSelected, currency);
		fmtToCurrencyInput.setRawValue(new BigNumber('1000').times(currency.rate))
	}

	// 价格走势图 popover
	$('.exchange-tools__detail').hover(function () {
		const e = $(this);
		const wrap = $(this).parents('.exchange-tools__currency-block')[0].classList[2];
		makePopoverContent(wrap, function (data) {
			const dataHtml = Handlebars.compile(
				$("#exchangeToolsPopover").html()
			)(data)
			e.attr('data-content', dataHtml);
			e.popover({
				html: !0,
				content: function () {
					return e.attr('data-content');
				}
			}).popover('toggle')
		});
	});



	const makePopoverContent = (wrap, returnOutput) => {
		const symbolFrom = $fromSelected.attr('data-name');
		const symbolTo = $toSelected.attr('data-name');
		let API_URL = "https://media.kvbkunlun.com/api/RealTimePrice/ConvertSymbolPrice?";
		let currentSymbol;
		wrap === 'exchange-tools__from' ?
			API_URL = `${API_URL}SymbolA=${symbolFrom}&SymbolB=${symbolTo}` :
			API_URL = `${API_URL}SymbolA=${symbolTo}&SymbolB=${symbolFrom}`
		wrap === 'exchange-tools__from' ?
			currentSymbol = `${symbolFrom}${symbolTo}` :
			currentSymbol = `${symbolTo}${symbolFrom}`

		const currentSymbolInfo = _Fn.FindObject(_SymbolInfo, "Symbol", `${currentSymbol}`)[0];
		$.ajax({
			url: API_URL,
			jsonp: "callback",
			dataType: "jsonp",
			success: function (result) {
				if (result.code !== "0") {
					alert(result.message);
					return (false);
				}
				const info = result.returnValue.PriceInfo[0];
				const data = {
					from: wrap === 'exchange-tools__from' ? symbolFrom : symbolTo,
					to: wrap === 'exchange-tools__from' ? symbolTo : symbolFrom,
					rising: info.flag === "+" ? true : false,
					bid: info.Bid,
					ask: info.Ask,
					current: currentSymbolInfo.Bid,
					rate: new BigNumber(info.Change).toFormat(4),
					percentage: new BigNumber(info.Change).toFormat(2) + '%',
					date: _Fn.DateTimeFormat(currentSymbolInfo.UpdateTime)
				};
				// Todo: exchange-tools__brief style UP or Down
				returnOutput(data);
			}
		});
	}

}
