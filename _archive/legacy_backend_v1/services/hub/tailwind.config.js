/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'cyber-black': '#050505',
                'cyber-green': '#39ff14',
                'cyber-cyan': '#00f3ff',
                'cyber-red': '#ff003c',
                'cyber-yellow': '#ffee00',
            },
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}
