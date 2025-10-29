/** @type {import('tailwindcss').Config} */

import { theme } from '@medicare-pt/pulse-theme'

module.exports = {
    presets: [theme],
    content: ['./src/**/*.{vue,js,ts}'],
    theme: {
        extend: {
            //
        },
    },
    plugins: [
        //
    ],
}
