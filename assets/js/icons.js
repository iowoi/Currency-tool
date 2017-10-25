const files = require.context('!svg-sprite-loader!svgo-loader!../icon', false, /\.svg$/)
files.keys().forEach(files)
