import * as _Fn from '../fundation.js'
import BigNumber from 'bignumber.js'

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


$('.city').click(function () {
	$('.city').removeClass('active')
	$(this).addClass('active')

	const target = $(this).data('target')
	$('.current-city').hide()
	$(`.current-city[data-target="${target}"]`).show()
})


/**
 * KVB
 */

$(function () {
	if (window.location.pathname === '/') {
		_Fn.getRealTimePriceList(LoadCurrencyList_finish);
	}
})
// Get currenct list and set default chart and value
const LoadCurrencyList_finish = (info) => {
	const commonSymbols = [{
		symbolEN: "AUDUSD",
		symbolCN: "澳元 / 美元"
	}, {
		symbolEN: "NZDUSD",
		symbolCN: "纽元 / 美元"
	}, {
		symbolEN: "EURUSD",
		symbolCN: "欧元 / 美元"
	}, {
		symbolEN: "USDJPY",
		symbolCN: "美元 / 日圆"
	}, {
		symbolEN: "GBPUSD",
		symbolCN: "英镑 / 美元"
	}, {
		symbolEN: "USDCAD",
		symbolCN: "美元 / 加币"
	}, {
		symbolEN: "USDHKD",
		symbolCN: "美元 / 港币"
	}, {
		symbolEN: "USDCNH",
		symbolCN: "美元 / 人民币"
	}, {
		symbolEN: "USDCHF",
		symbolCN: "美元 / 瑞郎"
	}, {
		symbolEN: "USDSGD",
		symbolCN: "美元 / 新加坡元"
	}]

	for (let i = 0; i < commonSymbols.length; i++) {
		const SymbolA = commonSymbols[i].symbolEN.substr(0, 3);
		const SymbolB = commonSymbols[i].symbolEN.substr(3, 3);
		const API_URL = `https://media.kvbkunlun.com/api/RealTimePrice/ConvertSymbolPrice?SymbolA=${SymbolA}&SymbolB=${SymbolB}`;

		var request = new XMLHttpRequest();
		request.open('GET', API_URL, false); // `false` makes the request synchronous
		request.send(null);

		if (request.status === 200) {
			const info = JSON.parse(request.responseText).returnValue.PriceInfo[0];

			const obj = {
				symbolCN: commonSymbols[i].symbolCN,
				rising: info.flag === "+" ? true : false,
				bid: info.Bid,
				ask: info.Ask,
				current: info.Bid,
				percentage: new BigNumber(info.Change).toFormat(2) + '%'
			}
			const html = Handlebars.compile(
				$("#sliderItems").html()
			)(obj)
			$(html).appendTo('.exchange-rate__list');
			if (i === 9) {
				slick();
			}
		}
	}
}

const slick = () => {
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
}
