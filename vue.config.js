module.exports = {
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				productName: 'ElectronVue',
				appId: 'org.freshfish.remote-exec',
				dmg: {
					contents: [
						{
							x: 410,
							y: 150,
							type: 'link',
							path: '/Applications',
						},
						{
							x: 130,
							y: 150,
							type: 'file',
						},
					],
				},
				directories: {
					output: 'build',
				},
				extraResources: ['.env'],
				extraFiles: ['.env'],
			},
		},
	},
}
