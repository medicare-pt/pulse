/** @type {import('tailwindcss').Config} */

import { theme, plugins } from '@medicare-pt/pulse-theme'

module.exports = {
    content: ['./src/**/*.{vue,js,ts}'],
    theme,
    plugins,
}
