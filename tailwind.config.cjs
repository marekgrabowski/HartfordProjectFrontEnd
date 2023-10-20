/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
		  'sans': ['Roboto', 'ui-sans-serif', 'system-ui'],
		  'serif': ['Nunito','ui-serif', 'Georgia'],
		  'mono': ['Roboto Mono','ui-monospace', 'SFMono-Regular'],
		  'display': ['Oswald'],
		  'body': ['"Open Sans"'],
		},
	  },
	plugins: [],
}
