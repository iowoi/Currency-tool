import 'bootstrap-sass/assets/javascripts/bootstrap/modal'
import * as _Fn from '../fundation.js'
import BigNumber from 'bignumber.js'

const $dashboardList = $('#often .dashboard__list')
const $customList = $('#customized .dashboard__list')

const $modalFromSelect = $('#modalSelectFrom .dropdown-menu')
const $modalToSelect = $('#modalSelectTo .dropdown-menu')

const $modalFromSelected = $('#modalSelectFrom').find('.exchange-tools__selected')
const $modalToSelected = $('#modalSelectTo').find('.exchange-tools__selected')


let _currentSymbol = '';
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
			saveSymbolList('customCommonSymbols');
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
			saveSymbolList('customSymbols');
		}
	})
}

const toggleMobileChart = $target => {
	$('.dashboard__item')
		.find('#mobileChart')
		.remove()

	$target.append('<div id="mobileChart" class="dashboard__mobile-chart"></div>')
}

$('.dashboard__list').on('click', '.dashboard__item', function () {
	_currentSymbol = $.trim($(this).find('.dashboard__currency').text()).split(' - ');
	$(this).siblings().removeClass('active')
	$(this).addClass('active')
	toggleMobileChart($(this))

	getCurrentSymbolInfo(_currentSymbol);
})

$('.dashboard__list').on('click', '.dashboard__period', function () {
	$(this)
		.closest('.dashboard__period-tabs')
		.find('.dashboard__period')
		.removeClass('active')

	$(this).addClass('active')
})

$('.exchange-modal__selection').on('click', '.dropdown-menu a', function () {

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

	const wrap = $(this).closest('.tab-pane').attr('id')

	wrap === 'customized' ?
		saveSymbolList('customSymbols') :
		saveSymbolList('customCommonSymbols')

	if (!$('#customized .dashboard__item').length)
		$('.dashboard__nothing').show()
})

$('.exchange-modal__confirm').click(() => {
	$('.dashboard__nothing').hide()
	const $modalSelected = $('.exchange-modal__selection .exchange-tools__selected')
	const symbolA = $modalSelected.eq(0).data('name')
	const symbolB = $modalSelected.eq(1).data('name')

	_currentSymbol = [symbolA, symbolB]
	customSymbols.push(symbolA + symbolB)
	getCurrentSymbolInfo(_currentSymbol, true);

	$('#exchangeModal').modal('hide')
})

$('.dashboard__tab').click((e) => {
	const elm = $(e.target).attr('href')
	const symbol = $(elm).find('.active .dashboard__currency').text().split(' - ')
	getCurrentSymbolInfo(symbol)

})


/**
 * KVB
 */

let _SymbolInfo = "";

const saveSymbolList = (SymbolsType) => {
	let $wrap
	SymbolsType === 'customSymbols' ? $wrap = $customList : $wrap = $dashboardList
	const Symbols = [];
	const prevSymbols = $wrap.find('.dashboard__currency');

	const exdate = new Date();
	exdate.setMonth(new Date().getMonth() + 1)

	for (let i = 0; i < prevSymbols.length; i++) {
		Symbols.push($(prevSymbols[i]).text().replace(' - ', ''))
	}

	_Fn.setCookie(SymbolsType, Symbols, exdate)
}

const getCurrentSymbolInfo = (_currentSymbol, custom) => {
	console.log(_currentSymbol)
	_Fn.getRealTimePrice(_currentSymbol[0], _currentSymbol[1], function (info) {
		const obj = {
			from: info.SymbolA,
			to: info.SymbolB,
			rising: info.flag === "+" ? !0 : 0,
			bid: info.Bid,
			ask: info.Ask,
			current: info.Bid,
			rate: new BigNumber(info.Change).toFormat(4),
			percentage: new BigNumber(info.Change).toFormat(2) + '%'
		}
		const html = Handlebars.compile(
			$("#currentSymbolsInfo").html()
		)(obj)
		if (custom) {
			$customList.appendHandlebars('#currencyItem', obj)
		}

		$('#dashboardMain').html(html)
		$('.dashboard__time').text(_Fn.DateTimeFormat(info.UpdateDate))
			saveSymbolList('customSymbols');

	})

	_Fn.getChartData(_currentSymbol[0], _currentSymbol[1])
}

const $commonRateList = $('#often .dashboard__list');
const $customRateList = $('#customized .dashboard__list');
const $dashboardMain = $('#dashboardMain');


/**
 *  Currency Data Api
 */

let commonSymbols = _Fn.getCookie('customCommonSymbols');
let customSymbols = _Fn.getCookie('customSymbols');

$(function () {
	commonSymbols ?
		commonSymbols = commonSymbols.split(",") :
		commonSymbols = ["AUDUSD", "NZDUSD", "EURUSD", "USDJPY", "GBPUSD", "USDCAD", "USDHKD", "USDCNH", "USDCHF", "USDSGD"]
	customSymbols ? customSymbols = customSymbols.split(",") :
		commonSymbols
	if (window.location.pathname.indexOf('/exchange-rate') > -1) {
		LoadCurrencyList_finish();
	}

	_Fn.getRealTimePriceList(LoadRealTimeSymbols_finish);

})
// Get currenct list and set default chart and value
const LoadCurrencyList_finish = (info) => {
	let defaultSymbolA, defaultSymbolB

	for (let i = 0; i < commonSymbols.length; i++) {
		const SymbolA = commonSymbols[i].substr(0, 3);
		const SymbolB = commonSymbols[i].substr(3, 3);

		defaultSymbolA = commonSymbols[0].substr(0, 3)
		defaultSymbolB = commonSymbols[0].substr(3, 3)

		const obj = getCurrentList(SymbolA, SymbolB);
		const html = Handlebars.compile(
			$("#currencyItem").html()
		)(obj)
		$(html).appendTo($commonRateList);
		if (i === 0) {
			const html2 = Handlebars.compile(
				$("#currentSymbolsInfo").html()
			)(obj)
			$dashboardMain.html(html2)
			$('.dashboard__time').text(obj.updateDate)
		}
	}
	if (customSymbols) {
		for (let i = 0; i < customSymbols.length; i++) {
			const SymbolA = customSymbols[i].substr(0, 3);
			const SymbolB = customSymbols[i].substr(3, 3);
			const obj = getCurrentList(SymbolA, SymbolB);
			const html = Handlebars.compile(
				$("#currencyItem").html()
			)(obj)
			$(html).appendTo($customRateList);

		}
	}
	//set default currency
	$commonRateList.find('.dashboard__item').first().addClass('active');
	$customRateList.find('.dashboard__item').first().addClass('active');
	_Fn.getChartData(defaultSymbolA, defaultSymbolB);
}

const getCurrentList = (SymbolA, SymbolB) => {
	const API_URL = `https://media.kvbkunlun.com/api/RealTimePrice/ConvertSymbolPrice?SymbolA=${SymbolA}&SymbolB=${SymbolB}`;
	var request = new XMLHttpRequest();
	request.open('GET', API_URL, false); // `false` makes the request synchronous
	request.send(null);

	if (request.status === 200) {
		const info = JSON.parse(request.responseText).returnValue.PriceInfo[0];
		const obj = {
			from: info.SymbolA,
			to: info.SymbolB,
			rising: info.flag === "+" ? true : false,
			bid: info.Bid,
			ask: info.Ask,
			current: info.Bid,
			percentage: new BigNumber(info.Change).toFormat(2) + '%',
			updateDate: _Fn.DateTimeFormat(info.UpdateDate)
		}
		return obj;
	}
}



const LoadRealTimeSymbols_finish = (info) => {
	_SymbolInfo = info
	let symbolList = [];
	createSymbolB(info, 'AUD');

	for (let i = 0; i < info.length; i++) {
		const symbolA = info[i]["SymbolA"];
		const nameA = info[i]["NameA"];
		if (symbolList.indexOf(symbolA) === -1) {
			symbolList.push(symbolA);
			const dollarIcon = _Fn.CreateCurrencySymbol(symbolA);
			$modalFromSelect.append(`<li><a data-name="${symbolA}" data-symbol="${dollarIcon}"">${symbolA} <span class="hidden-xs">${nameA}</span></a></li>`);
		}
	}
	changeCurrencyInfo()
}

const createSymbolB = (info, Symbol) => {
	const list = _Fn.FindObject(info, "SymbolA", Symbol);

	let currency = {
		text: `${list[0].SymbolB} <span class="hidden-xs">${list[0].NameB}</span>`,
		name: list[0].SymbolB,
		symbol: _Fn.CreateCurrencySymbol(list[0].SymbolB)
	}

	$modalToSelect.html("");
	for (let i = 0; i < list.length; i++) {
		const info = list[i];
		const symbolB = info["SymbolB"];
		const nameB = info["NameB"];
		const dollarIcon = _Fn.CreateCurrencySymbol(symbolB);
		$modalToSelect.append(`<li><a data-name="${symbolB}" data-symbol="${dollarIcon}">${symbolB} <span class="hidden-xs">${nameB}</span></a></li>`);
		if (list[i].SymbolB === 'CNY') {
			currency = {
				text: `CNY <span class="hidden-xs">${nameB}</span>`,
				name: 'CNY',
				symbol: '¥'
			}
		}
	}

	changeCurrencyInfo()
}

const changeCurrencyInfo = () => {
	const SymbolA = $modalFromSelected.attr('data-name'),
		SymbolB = $modalToSelected.attr('data-name')

}

$modalFromSelect.on('click', 'a', function () {
	const currency = {
		text: $(this).html(),
		name: $(this).attr('data-name'),
		symbol: $(this).attr('data-symbol')
	}
	changeCurrencyInfo()

	createSymbolB(_SymbolInfo, currency.name)
})
