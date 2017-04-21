import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-js'
import filesize from 'rollup-plugin-filesize'

const externalModules = ['ramda', 'axios']

function isImportExternal (importStr) {
  let external = false

  // Check for each of the external modules defined above
  externalModules.forEach(externalModule => {
    if (importStr.indexOf(externalModule) >= 0) external = true
  })

  return external
}

const modulesEnabled = process.env.MODULES === 'true'

const buildFormat = modulesEnabled ? 'es' : 'cjs'
const destination = modulesEnabled ? 'dist/apisauce.es6.js' : 'dist/apisauce.js'

export default {
  entry: 'lib/apisauce.js',
  format: buildFormat,
  plugins: [
    babel({
      babelrc: false,
      presets: ['es2015-rollup'],
      plugins: ['fast-async', 'transform-object-rest-spread', 'ramda']
    }),
    uglify({}, minify),
    filesize()
  ],
  exports: 'named',
  dest: destination,
  external: isImportExternal
}
