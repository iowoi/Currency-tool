const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const Router = require('koa-router')
const views = require('koa-views')
const webpack = require('webpack')
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
const config = require('./webpack.config.dev')

const app = new Koa()
const router = new Router()

router.get('/', async ctx => await ctx.render('index', { isDev: true }))

fs
	.readdirSync('./views')
	.filter(filename => filename.includes('pug') && !filename.includes('layout') && !filename.includes('index'))
	.forEach(filename => {
		const name = filename.replace('.pug', '')
		router.get(`/${name}`, async ctx => await ctx.render(name, { isDev: true }))
	})

const compile = webpack(config)
app
	.use(views(path.resolve(__dirname, 'views'), { extension: 'pug' }))
	.use(serve('assets'))
	.use(router.routes())
	.use(router.allowedMethods())
	.use(devMiddleware(compile, {
		noInfo: false,
		quiet: false,
		stats: {
			colors: true
		},
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		hot: true,
		port: 9000
	}))
	.use(hotMiddleware(compile, {}))
	.listen(9000, () => console.info('Server start: http://localhost:9000'))
