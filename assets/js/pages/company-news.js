/* eslint-disable */
const API_URL = 'https://media.kvbkunlun.com/api/News/List?lang=cn&type=CompanyNews'
			console.log('~~~~~~~~~~')

$.ajax({
		url: API_URL,
		jsonp: "callback",
		dataType: "json",
		success: function (result) {
			if (result.code !== "0") {
				alert(result.message);
				return false;
			}

			console.log(result)
		}
	});
let inputData = [];
let news1 = {date: "2012/11/15",
						 title: "KVB昆仑国际之夜 上演“妹”力永恒",
						 des: "2017年3月26日，国内规模最大的电商专业展 — 2017 IEBE（广州）国际电子商务博览会在广州开幕，KVB昆仑国际环球资本集团受邀参展。",
						 background: "background-image: url(img/company-news/news-tile-2.jpg);"
					 }
let news2 = {date: "2012/11/15",
						 title: "中国企业亟须发展外汇管理软实力",
						 des: "在刚刚过去的两个新春周末，澳洲悉尼车士活市Chatswood猴年农历春节庆典和墨尔本中国年庆典热烈举办，两地华人社团、政商名人齐聚，共祝新春。",
						 background: "background-image: url(img/company-news/news-tile-2.jpg);"
					 }
let news3 = {date: "2012/11/15",
						 title: "KVB昆仑国际之夜 上演“妹”力永恒",
						 des: "中国企业亟须发展外汇管理软实力",
						 background: "background-image: url(img/company-news/news-tile-3.jpg);"
					 }
let news4 = {date: "2012/11/15",
						 title: "中国企业亟须发展外汇管理软实力",
						 des: "2017年3月26日，国内规模最大的电商专业展 — 2017 IEBE（广州）国际电子商务博览会在广州开幕，KVB昆仑国际环球资本集团受邀参展。",
						 background: "background-image: url(img/company-news/news-tile-4.jpg);"
					 }
let news5 = {date: "2012/11/15",
						 title: "KVB昆仑国际之夜 上演“妹”力永恒",
						 des: "在刚刚过去的两个新春周末，澳洲悉尼车士活市Chatswood猴年农历春节庆典和墨尔本中国年庆典热烈举办，两地华人社团、政商名人齐聚，共祝新春。",
						 background: "background-image: url(img/company-news/news-tile-3.jpg);"
					 }

inputData.push(news1, news2, news3, news3, news2, news4, news1, news2, news3, news4, news2);
$('.loading-more__btn').click(function(){
function makeLongCard(longCard) {
	if(longCard.length % 3 == 0){
		for (let i = 0; i < longCard.length; i+=3) {
			$('.card-section .container').append(`<div class="grid-stack grid-stack-3 grid-stack--basic-mobile" style="margin-top: 24px;"><div class="grid-stack-item" data-gs-width="2" data-gs-height="1" data-gs-x="0" data-gs-y="0"><div class="grid-stack-item-content"><div class="grid-stack__block grid-stack__block--rectangle grid-stack__block--content-right"><div class="grid-stack__background" style="${longCard[i].background}"></div><div class="grid-stack__content"><div class="grid-stack__summary"><div class="grid-stack__classification">${longCard[i].date}</div><div class="grid-stack__heading">${longCard[i].title}</div><p class="description description--narrow grid-stack__description">${longCard[i].des}</p></div><a class="btn btn-link btn-readmore"><span>详情</span><i class="icon icon-goto -blue"><svg role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icn-goto"></use></svg></i></a></div><div class="clearfix"></div></div></div></div><div class="grid-stack-item" data-gs-width="2" data-gs-height="1" data-gs-x="0" data-gs-y="1"><div class="grid-stack-item-content"><div class="grid-stack__block grid-stack__block--rectangle grid-stack__block--content-left"><div class="grid-stack__background" style="${longCard[i+1].background}"></div><div class="grid-stack__content"><div class="grid-stack__summary"><div class="grid-stack__classification">${longCard[i+1].date}</div><div class="grid-stack__heading">${longCard[i+1].title}</div><p class="description description--narrow grid-stack__description">${longCard[i+1].des}</p></div><a class="btn btn-link btn-readmore"><span>详情</span><i class="icon icon-goto -blue"><svg role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icn-goto"></use></svg></i></a></div><div class="clearfix"></div></div></div></div><div class="grid-stack-item" data-gs-width="1" data-gs-height="2" data-gs-x="2" data-gs-y="0"><div class="grid-stack-item-content"><div class="grid-stack__block grid-stack__block--rectangle"><div class="grid-stack__background" style="${longCard[i+2].background}"></div><div class="grid-stack__content"><div class="grid-stack__summary"><div class="grid-stack__classification">${longCard[i+2].date}</div><div class="grid-stack__heading">${longCard[i+2].title}</div><p class="description description--narrow grid-stack__description">${longCard[i+2].des}</p></div><a class="btn btn-link btn-readmore"><span>详情</span><i class="icon icon-goto -blue"><svg role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icn-goto"></use></svg></i></a></div><div class="clearfix"></div></div></div></div>`
		);
			}
	$('.grid-stack').gridstack({
		verticalMargin: 24,
		cellHeight: 376
		});
	}
	else {
		for (let i = 0; i < longCard.length; i++) {
		$('.card-section .container').append(`<div class="grid-stack grid-stack-3 grid-stack--basic-mobile" style="margin-top: 24px;"><div class="grid-stack-item" data-gs-width="3" data-gs-height="1" data-gs-x="0" data-gs-y="0"><div class="grid-stack-item-content"><div class="grid-stack__block grid-stack__block--rectangle grid-stack__block--content-right"><div class="grid-stack__background" style="${longCard[i].background}"></div><div class="grid-stack__content"><div class="grid-stack__summary"><div class="grid-stack__classification">${longCard[i].date}</div><div class="grid-stack__heading">${longCard[i].title}</div><p class="description description--narrow grid-stack__description">${longCard[i].des}</p></div><a class="btn btn-link btn-readmore"><span>详情</span><i class="icon icon-goto -blue"><svg role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icn-goto"></use></svg></i></a></div><div class="clearfix"></div></div></div></div>`
		);
			}
	$('.grid-stack').gridstack({
		verticalMargin: 24,
		cellHeight: 376
		});
	}
}
function bundleCard(result) {
	for(let i = 0; i < result.length; i++){
		if(i % 2 == 0) {
			$('.card-section .container').append(`<div class="grid-stack grid-stack-3 grid-stack--basic-mobile" style="margin-top: 24px;"><div class="grid-stack-item" data-gs-width="2" data-gs-height="1" data-gs-x="0" data-gs-y="0"><div class="grid-stack-item-content"><div class="grid-stack__block grid-stack__block--rectangle grid-stack__block--content-right"><div class="grid-stack__background" style="${result[i][0].background}"></div><div class="grid-stack__content"><div class="grid-stack__summary"><div class="grid-stack__classification">${result[i][0].date}</div><div class="grid-stack__heading">${result[i][0].title}</div><p class="description description--narrow grid-stack__description">${result[i][0].des}</p></div><a class="btn btn-link btn-readmore"><span>详情</span><i class="icon icon-goto -blue"><svg role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icn-goto"></use></svg></i></a></div><div class="clearfix"></div></div></div></div><div class="grid-stack-item" data-gs-width="2" data-gs-height="1" data-gs-x="0" data-gs-y="1"><div class="grid-stack-item-content"><div class="grid-stack__block grid-stack__block--rectangle grid-stack__block--content-left"><div class="grid-stack__background" style="${result[i][1].background}"></div><div class="grid-stack__content"><div class="grid-stack__summary"><div class="grid-stack__classification">${result[i][1].date}</div><div class="grid-stack__heading">${result[i][1].title}</div><p class="description description--narrow grid-stack__description">${result[i][1].des}</p></div><a class="btn btn-link btn-readmore"><span>详情</span><i class="icon icon-goto -blue"><svg role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icn-goto"></use></svg></i></a></div><div class="clearfix"></div></div></div></div><div class="grid-stack-item" data-gs-width="1" data-gs-height="2" data-gs-x="2" data-gs-y="0"><div class="grid-stack-item-content"><div class="grid-stack__block grid-stack__block--rectangle"><div class="grid-stack__background" style="${result[i][2].background}"></div><div class="grid-stack__content"><div class="grid-stack__summary"><div class="grid-stack__classification">${result[i][2].date}</div><div class="grid-stack__heading">${result[i][2].title}</div><p class="description description--narrow grid-stack__description">${result[i][2].des}</p></div><a class="btn btn-link btn-readmore"><span>详情</span><i class="icon icon-goto -blue"><svg role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icn-goto"></use></svg></i></a></div><div class="clearfix"></div></div></div></div>`
		);
		}
		else {
			$('.card-section .container').append(`<div class="grid-stack grid-stack-3 grid-stack--basic-mobile" style="margin-top: 24px;"><div class="grid-stack-item" data-gs-width="1" data-gs-height="2" data-gs-x="0" data-gs-y="2"><div class="grid-stack-item-content"><div class="grid-stack__block grid-stack__block--rectangle"><div class="grid-stack__background" style="${result[i][0].background}"></div><div class="grid-stack__content"><div class="grid-stack__summary"><div class="grid-stack__classification">${result[i][0].date}</div><div class="grid-stack__heading">${result[i][0].title}</div><p class="description description--narrow grid-stack__description">${result[i][0].des}</p></div><a class="btn btn-link btn-readmore"><span>详情</span><i class="icon icon-goto -blue"><svg role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icn-goto"></use></svg></i></a></div><div class="clearfix"></div></div></div></div><div class="grid-stack-item" data-gs-width="2" data-gs-height="1" data-gs-x="1" data-gs-y="2"><div class="grid-stack-item-content"><div class="grid-stack__block grid-stack__block--rectangle grid-stack__block--content-right"><div class="grid-stack__background" style="${result[i][1].background}"></div><div class="grid-stack__content"><div class="grid-stack__summary"><div class="grid-stack__classification">${result[i][1].date}</div><div class="grid-stack__heading">${result[i][1].title}</div><p class="description description--narrow grid-stack__description">${result[i][1].des}</p></div><a class="btn btn-link btn-readmore"><span>详情</span><i class="icon icon-goto -blue"><svg role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icn-goto"></use></svg></i></a></div><div class="clearfix"></div></div></div></div><div class="grid-stack-item" data-gs-width="2" data-gs-height="1" data-gs-x="1" data-gs-y="3"><div class="grid-stack-item-content"><div class="grid-stack__block grid-stack__block--rectangle grid-stack__block--content-left"><div class="grid-stack__background" style="${result[i][2].background}"></div><div class="grid-stack__content"><div class="grid-stack__summary"><div class="grid-stack__classification">${result[i][2].date}</div><div class="grid-stack__heading">${result[i][2].title}</div><p class="description description--narrow grid-stack__description">${result[i][2].des}</p></div><a class="btn btn-link btn-readmore"><span>详情</span><i class="icon icon-goto -blue"><svg role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icn-goto"></use></svg></i></a></div><div class="clearfix"></div></div></div></div></div>`
		);
		}
		$('.grid-stack').gridstack({
			verticalMargin: 24,
			cellHeight: 376
		});
	}
}
function cardGenerate(inputData) {
	let result = [];
	for(let i=0;i<inputData.length;i+=3){
				 result.push(inputData.slice(i,i+3));
			}
	let longCard = [];
	longCard = result.pop();
	bundleCard(result);
	makeLongCard(longCard);
}
cardGenerate(inputData);
 })
