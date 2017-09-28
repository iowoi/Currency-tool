$(function () {
    var Symbol = $$GV("Symbol");
    var ParamInfo = GetUrlParam();

    if (typeof (ParamInfo.Symbol) != "undefined")
        Symbol = ParamInfo.Symbol;

    $("#SymbolInfo").text(Symbol);

    $("#Symbol").change(function () {
        var Symbol = $$GV("Symbol");

        $("#SymbolInfo").text(Symbol);
        LoadChart(Symbol);
    });

    LoadSymbol(Symbol);
});

function LoadSymbol(Symbol) {
    LoadSymbolInfo(function (info) {
        var list = new Array();
        var $select = $("#Symbol");

        if (info.code != "0") {
            alert(info.message);
            return (false);
        }

        list = info.returnValue.list;

        $select.html("");
        for (var i = 0; i < list.length; i++) {
            var option = "<option value=\"{Symbol}\">{Symbol}</option>";

            option = option.rp("{Symbol}", list[i]["Symbol"]);
            $select.append(option);
        }

        $$SV("Symbol", Symbol);
        $("#Symbol").change();
    });
}

function LoadSymbolInfo(func) {
    var ApiUrl = "//api.kvbgc.com/api/RealTimePriceGC/List";
    var param = {};

    GetData(ApiUrl, param, func);
}

function LoadChart(Symbol) {
    LoadChartData(Symbol.Left(3), Symbol.Right(3), function (info) {
        if (info.code != "0") {
            alert(info.message);
            return (false);
        }

        ShowChart($("#SymbolChart"), Symbol.Left(3) + " - " + Symbol.Right(3), info.returnValue.list);
    });
}


function LoadChartData(SymbolA, SymbolB, func) {
    var ApiUrl = "//api.kvbgc.com/api/RealTimePriceGC/ChartData";
    var param = {};

    param["SymbolA"] = SymbolA;
    param["SymbolB"] = SymbolB;

    GetData(ApiUrl, param, func);
}

function GetData(ApiUrl, param, func) {
    $.ajax({
        url: ApiUrl
        , jsonp: "callback"
        , dataType: "jsonp"
        , data: param
        , success: func
    });
}

function ShowChart($dsp, ChartName, ChartData) {
    var blue = '#123e67';
    var bluelt = '#449dcb';
    var bluealt = '#286991';

    // Set unique chart options
    Highcharts.setOptions({

        // Language options
        // -------------------------
        lang: {
            rangeSelectorZoom: null
        }
    });

    // Create the chart
    $dsp.highcharts('StockChart', {
        chart: {
            height: 500,
            spacingLeft: 1,
            spacingRight: 1,
            backgroundColor: '#123e67',
            events: {
                load: function () {
                    chart = this; // `this` is the reference to the chart
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
                    lineColor: '#ffffff',
                    fillColor: bluelt,
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
            type: 'spline',
            shadow: true,
            tooltip: {
                valueDecimals: 4
            },
            fillColor: bluealt
        }],

        rangeSelector: {
            selected: 0,
            buttonSpacing: 8,
            inputPosition: {
                align: "right",
                x: -8
            },
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
            inputBoxBorderColor: '#ffffff',
            inputStyle: {
                backgroundColor: blue,
                color: '#ffffff'
            },
            labelStyle: {
                color: '#ffffff'
            },
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
                type: 'month',
                count: 3,
                text: '3 months'
            }, {
                type: 'month',
                count: 6,
                text: '6 months'
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