import Highcharts from 'highcharts/highstock'
import moment from 'moment'

export function CreateCurrencySymbol(symbol) {
	switch (symbol) {
		case "CHF":
			return "Fr";
		case "CNY":
			return "¥";
		case "EUR":
			return "€";
		case "GBP":
			return "£";
		case "JPY":
			return "¥";
		default:
			return "$"
	}
}

export function FindObject(list, IndexName, IndexValue) {
	const result = new Array();

	for (let i = 0; i < list.length; i++) {
		const info = list[i];
		let value = "" + info[IndexName];

		if (value.toLowerCase() == IndexValue.toLowerCase()) {
			result.push(info);
		}
	}

	return (result);
}

export function DateTimeFormat(date) {
	const dt = new Date(date);
	const m = dt.getMonth();
	const d = dt.getDay();
	const y = dt.getFullYear();
	let h = dt.getHours();
	const mn = dt.getMinutes();
	const ampm = h >= 12 ? 'PM' : 'AM';
	h = h % 12;
	h = h ? h : 12; // the hour '0' should be '12'

	return (`As of ${h}:${mn} ${ampm} EDT ${d}/${m}/${y}`)
}

export function setCookie(name, value, expires) {
	document.cookie = `${name}=${value}; expires=${expires}; path=/`
}

export function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

export function delCookie(name) {
	setCookie(name, "", -1);
}

// API
export function getRealTimePriceList(makeRow) {
	$.ajax({
		url: 'https://api.kvbgc.com/api/RealTimePriceGC/List?token=095334BD-F90F-4750-8D30-28EA006FC1E2',
		jsonp: "callback",
		dataType: "jsonp",
		success: function (result) {
			if (result.code !== "0") {
				alert(result.message);
				return (false);
			}
			makeRow(result.returnValue.list);
		}
	});
}

export function getRealTimePrice(symbolA, symbolB, makeRow) {
	const API_URL = `https://media.kvbkunlun.com/api/RealTimePrice/ConvertSymbolPrice?SymbolA=${symbolA}&SymbolB=${symbolB}`;
	$.ajax({
		url: API_URL,
		jsonp: "callback",
		dataType: "jsonp",
		success: function (result) {
			if (result.code !== "0") {
				alert(result.message);
				return (false);
			}
			makeRow(result.returnValue.PriceInfo[0]);
		}
	});
}

export function getChartData(symbolA, symbolB) {
	const API_URL = `https://api.kvbgc.com/api/RealTimePriceGC/ChartData?SymbolA=${symbolA}&SymbolB=${symbolB}`;

	$.ajax({
		url: API_URL,
		jsonp: "callback",
		dataType: "jsonp",
		success: function (result) {
			if (result.code === '1') {
				getChartDataFromMedia(symbolA, symbolB)
				return false;
			} else if (result.code !== "0") {
				alert(result.message);
				return false;
			}

			makeChart($('#StockChart'), `${symbolA} - ${symbolB}`, result.returnValue.list)
			makeChart($('#mobileChart'), `${symbolA} - ${symbolB}`, result.returnValue.list)

		}
	});
}

function getChartDataFromMedia(symbolA, symbolB) {
	const today = moment().format('YYYY-MM-DD');
	const passYear = moment().subtract(365, 'days').format('YYYY-MM-DD');

	const API_URL = `https://media.kvbkunlun.com/api/RealTimePrice/ChartData2?Symbol=${symbolA}${symbolB}&StartDate=${passYear}&EndDate=${today}`
	$.ajax({
		url: API_URL,
		jsonp: "callback",
		dataType: "jsonp",
		success: function (result) {
			if (result.code !== "0") {
				alert(result.message);
				return (false);
			}
			makeChart($('#StockChart'), `${symbolA} - ${symbolB}`, result.returnValue.list)
			makeChart($('#mobileChart'), `${symbolA} - ${symbolB}`, result.returnValue.list)
		}
	});
}

function makeChart($elm, ChartName, ChartData) {
	var blue = '#123e67';
	var bluelt = '#449dcb';
	var bluealt = '#0075A4';

	// Set unique chart options
	Highcharts.setOptions({

		// Language options
		// -------------------------
		lang: {
			rangeSelectorZoom: null
		}
	});

	// Create the chart
	$elm.highcharts('StockChart', {
		chart: {
			height: $elm.attr('id') === 'mobileChart' ? 300 : 500,
			spacingLeft: 1,
			spacingRight: 1,
			backgroundColor: '#0075A4',
			events: {
				load: function () {
					const chart = this; // `this` is the reference to the chart
				}
			},
			style: {
				color: "#f00"
			}
		},

		// xAxis
		// -------------------------
		xAxis: {
			lineColor: '#449dcb',
			tickColor: '#449dcb',
			labels: {
				y: 30,
				format: '{value:%e %b}',
				style: {
					"color": "#ffffff",
					"fontWeight": "400",
					"fontSize": "13px"
				}
			},
			title: {
				style: {
					color: '#ffffff'
				}
			}
		},

		// yAxis
		// -------------------------
		yAxis: {
			gridLineColor: '#449dcb',
			labels: {
				x: -8,
				y: -5,
				format: '{value:.4f}',
				style: {
					"color": "#ffffff",
					"fontWeight": "400",
					"fontSize": "13px"
				}
			},
			title: {
				style: {
					color: '#ffffff'
				}
			}
		},

		// plotOptions (main line)
		// -------------------------
		plotOptions: {
			series: {
				color: '#ffffff',
				lineWidth: 2,
				marker: {
					lineColor: '#4DA2C0',
					fillColor: "#F7904E",
					lineWidth: 1,
					radius: 6
				}
			}
		},

		tooltip: {
			backgroundColor: '#123e67',
			borderColor: '#449dcb',
			style: {
				color: '#ffffff'
			},
			crosshairs: {
				color: bluelt
			}
		},

		series: [{
			name: ChartName,
			data: ChartData,
			type: 'areaspline',
			threshold: null,
			shadow: true,
			tooltip: {
				valueDecimals: 2
			},
			fillColor: {
				linearGradient: {
					x1: 0,
					y1: 0,
					x2: 0,
					y2: 1
				},
				stops: [
					[0, Highcharts.getOptions().colors[0]],
					[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
				]
			}
		}],

		rangeSelector: {
			floating: true,
			verticalAlign: 'top',
			selected: 0,
			buttonSpacing: 8,
			buttonTheme: {
				fill: '#063055',
				width: 68,
				r: 3,
				stroke: 'none',
				'stroke-width': 0,
				marginLeft: 100,
				style: {
					color: '#ffffff'
				},
				states: {
					hover: {
						fill: '#2e6f97',
						style: {
							color: '#ffffff'
						}
					},
					select: {
						fill: bluelt,
						style: {
							color: '#ffffff'
						}
					}
				}
			},
			inputEnabled: false,
			buttons: [{
				type: 'day',
				count: 1,
				text: '24 hours'
			}, {
				type: 'week',
				count: 1,
				text: '1 week'
			}, {
				type: 'month',
				count: 1,
				text: '1 month'
			}, {
				type: 'year',
				count: 1,
				text: '1 year'
			}]
		},

		scrollbar: {
			barBackgroundColor: blue,
			barBorderColor: bluelt,
			buttonArrowColor: bluelt,
			buttonBackgroundColor: blue,
			buttonBorderColor: bluelt,
			rifleColor: bluelt,
			trackBackgroundColor: blue,
			trackBorderColor: bluelt,
			height: 35
		},

		navigator: {
			handles: {
				backgroundColor: blue,
				borderColor: bluelt
			},
			outlineColor: bluelt,
			maskInside: true,
			maskFill: 'rgba(68,157,203,0.15)',
			series: {
				color: bluealt,
				lineColor: bluealt
			},
			xAxis: {
				gridLineColor: bluelt,
				dateTimeLabelFormats: {
					day: '%Y',
					week: '%Y',
					month: '%Y',
					year: '%Y'
				},
				labels: {
					format: '{value:%e %b}',
					x: 5,
					y: -8,
					style: {
						"color": "#ffffff",
						"fontWeight": "400",
						"fontSize": "12px"
					}
				}
			}
		},

		// Disabled
		// -------------------------
		title: {
			text: null,
			style: {
				color: "#ffffff"
			}
		},
		credits: false


	});

}
