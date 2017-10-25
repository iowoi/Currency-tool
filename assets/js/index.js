import 'slick-carousel'
import 'gridstack'
import 'handlebars/dist/handlebars'

import '../css/main.css'

import './init'
import './components'
import './pages'

// Force scroll to top
$(document).ready(function () {
	$(this).scrollTop(0)
})

const url = location.href

const matchLang = url.match(/\/([a-z]{2})\/?([a-z\-]+\.html)?$/)
const currentLang = matchLang ? matchLang[1] : 'cn'

const matchPage = url.match(/[^\/]+\.html$/)
const currentPage = matchPage ? matchPage[0] : 'index.html'

const matchHost = url.match(new RegExp(`(.+)\/${currentLang}\/?([a-z\-]+\.html)?$`))
const currentHost = matchHost ? matchHost[1] : ''

$('.nabvbar__lang .dropdown-menu a').click(function (e) {
	e.preventDefault()

	const lang = $(this).data('lang')
	const newUrl = `${currentHost}/${lang}/${currentPage}`
	const failUrl = `${currentHost}/${lang}/index.html`

	$
		.get(newUrl, res => { location.href = res ? newUrl : failUrl })
		.fail(() => { location.href = failUrl })
})

$('.nabvbar__lang .mobile-submenu a').click(function (e) {
	e.preventDefault()

	const lang = $(this).data('lang')
	const newUrl = `${currentHost}/${lang}/${currentPage}`
	const failUrl = `${currentHost}/${lang}/index.html`

	$
		.get(newUrl, res => { location.href = res ? newUrl : failUrl })
		.fail(() => { location.href = failUrl })
})
