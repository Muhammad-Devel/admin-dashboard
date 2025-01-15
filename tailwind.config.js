/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'], // Asosiy shrift
                serif: ['Merriweather', 'serif'] // Alternativ shrift
            },
            colors: {
                white: {
                    DEFAULT: '#ffffff',
                    100: '#333333',
                    200: '#666666',
                    300: '#999999',
                    400: '#cccccc',
                    500: '#ffffff',
                    600: '#ffffff',
                    700: '#ffffff',
                    800: '#ffffff',
                    900: '#ffffff'
                },
                cosmic_latte: {
                    DEFAULT: '#fff8e8',
                    100: '#614400',
                    200: '#c28800',
                    300: '#ffbd24',
                    400: '#ffda85',
                    500: '#fff8e8',
                    600: '#fff9eb',
                    700: '#fffaf0',
                    800: '#fffcf5',
                    900: '#fffdfa'
                },
                jasmine: {
                    DEFAULT: '#fcd581',
                    100: '#4b3402',
                    200: '#956704',
                    300: '#e09b06',
                    400: '#fabd38',
                    500: '#fcd581',
                    600: '#fcde9c',
                    700: '#fde6b4',
                    800: '#feeecd',
                    900: '#fef7e6'
                },
                rusty_red: {
                    DEFAULT: '#d52941',
                    100: '#2b080d',
                    200: '#56101a',
                    300: '#811826',
                    400: '#ab2133',
                    500: '#d52941',
                    600: '#de5466',
                    700: '#e77e8c',
                    800: '#efa9b3',
                    900: '#f7d4d9'
                },
                claret: {
                    DEFAULT: '#990d35',
                    100: '#1f030b',
                    200: '#3e0515',
                    300: '#5d0820',
                    400: '#7c0b2b',
                    500: '#990d35',
                    600: '#da134b',
                    700: '#ef4273',
                    800: '#f481a2',
                    900: '#fac0d0'
                }
            }
        }
    },
    plugins: []
}
