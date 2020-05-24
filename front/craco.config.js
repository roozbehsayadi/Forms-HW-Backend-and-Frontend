const CracoLessPlugin = require('craco-less')

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					modifyVars: { '@layout-header-background': '#7dbcea' },
					javascriptEnabled: true,
				},
			},
		},
	],
}
