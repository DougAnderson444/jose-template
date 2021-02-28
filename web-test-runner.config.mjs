// https://modern-web.dev/docs/test-runner/cli-and-configuration/#configuration-file

// Import Maps can be used to resolve imports in your code
// as an alternative to the --node-resolve flag, or to mock modules.
// https://modern-web.dev/docs/dev-server/plugins/import-maps/

// import { importMapsPlugin } from '@web/dev-server-import-maps'
// import snowpack from '@snowpack/web-test-runner-plugin'

process.env.NODE_ENV = 'test'

export default {
  coverageConfig: {
    // exclude: ['**/*/_snowpack/**/*']
  },
  nodeResolve: { browser: true }, // true, //
  plugins: [
    // snowpack(),
    // importMapsPlugin({
    //   inject: {
    //     importMap: {
    //       imports: {
    //         'chai/': '/node_modules/chai/',
    //         'chai-a11y-axe': '/node_modules/chai-a11y-axe/index.js',
    //         'chai-dom': '/node_modules/chai-dom/chai-dom.js'
    //       }
    //     }
    //   }
    // })
  ]
}
