/* eslint-disable */
const API_URL = 'https://media.kvbkunlun.com/api/News/List?lang=cn&type=CompanyNews'

$.ajax({
		url: API_URL,
		jsonp: "callback",
		dataType: "json",
		success: function (result) {
			if (result.code !== "0") {
				alert(result.message);
				return false;
			}

		}
	});
let inputData = [];
let news1 = {date: "2015年9月28日",
						 title: "KVB昆仑国际出战第七届澳洲总商会羽毛球团体赛，晋级团队四强，个人赛季军",
						 des: "2015年5月23日，由澳洲中国总商会举办的第六届羽毛球团体赛在悉尼活力开赛。KVB昆仑国际代表队与中国银行，工商银行，农业银行，建设银行，绿地集团，中海集团...",
						 background: "background-image: url(https://www.kvbgc.com/assets/Uploads/news/images/_resampled/SetWidth810-2015-5-2.jpg);"
					 }
let news2 = {date: "2015年9月28日",
						 title: "KVB昆仑国际助力PD龙舟队，卫冕荣誉，勇夺双冠！",
						 des: "南半球最大的竞渡赛事 — 悉尼市政府年度龙舟赛，于2月28日在达令港（Darling Harbour）举行，来自全澳各地数以千计的参赛者齐聚竞渡赛事现场，展现勃勃的生机和倒海的力量...",
						 background: "background-image: url(https://www.kvbgc.com//assets/Uploads/news/images/_resampled/SetWidth810-2015-3.1-2.jpg);"
					 }
let news3 = {date: "2015年9月24日",
						 title: "纽澳共贺新禧 书写福运羊年 – KVB昆仑国际联合纽澳两地公司向全球华人新春拜年",
						 des: "2015新春羊年之际，奥克兰ASB Showground新春花市同乐日、悉尼车士活市羊年农历春节庆典、2015海外欢乐春节澳大利亚庆典，以及墨尔本BOX HILL中国年庆典...",
						 background: "background-image: url(https://www.kvbgc.com/assets/Uploads/news/images/_resampled/SetWidth810-1.jpg);"
					 }
let news4 = {date: "2015年9月24日",
						 title: "KVB昆仑国际成功引入中信证券成为新的战略控股股东",
						 des: "2015年1月30日，昆仑国际金融集团有限公司(股份代码：8077)通过港交所网站和其上市公司网站发布公告...",
						 background: "background-image: url(img/company-news/news-tile-4.jpg);"
					 }


inputData.push(news1, news2, news3, news4);
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
	$('.loading-more__area').hide();
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
