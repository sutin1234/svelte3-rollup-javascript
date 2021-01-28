import svelte from 'rollup-plugin-svelte-hot';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import preprocess from './svelte.config';
import hmr from 'rollup-plugin-hot'
// import { uglify } from 'rollup-plugin-uglify';
import alias from '@rollup/plugin-alias';


const production = !process.env.ROLLUP_WATCH;
const isNollup = !!process.env.NOLLUP
const isWatch = !!process.env.ROLLUP_WATCH
const isLiveReload = !!process.env.LIVERELOAD

const isDev = isWatch || isLiveReload
const isHot = isWatch && !isLiveReload

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			// customElement: true,
			hot: isHot && {
				optimistic: true,
				noPreserveState: false,
			},
			css: css => {
				css.write(isNollup ? 'build/bundle.css' : 'bundle.css')
			},
			dev: !production
		}),
		preprocess, // extend svelte.config.js
		css({ output: 'bundle.css' }),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		isDev && !isNollup && serve(),
		isLiveReload && livereload('public'),
		production && terser(),
		hmr({
			public: 'public',
			inMemory: true,
			compatModuleHot: !isHot,
		}),
		alias({
      entries: [
        { find: '@', replacement: 'src' }
      ]
    })
	],
	watch: {
		clearScreen: false
	},
	
};
