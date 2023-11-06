import adapter from 'svelte-adapter-github';


// Determine if you are in development mode (NODE_ENV not set to 'production')
const dev = process.env.NODE_ENV !== 'production';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'docs',
			assets: 'docs',
			fallback: null,
			precompress: false,
			domain: '',
			jekyll: false
		  }),
		paths: {
			base: dev ? '' : '/weather-svelte',
		},
		AppDir: 'internal',
		trailingSlash: 'always'
	  }
};

export default config;
