/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin'
import defaultTheme from 'tailwindcss/defaultTheme'
import type { PluginAPI } from "tailwindcss/plugin"

import tokens from '@medicare-pt/pulse-tokens'

import { color, mapColors, mapTypography } from './helpers'

export default {
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Roboto"', ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            black: color(tokens.color.primary.black.value),
            white: color(tokens.color.primary.white.value),
            primary: {
                black: color(tokens.color.primary.black.value),
                white: color(tokens.color.primary.white.value),
                red: color(tokens.color.primary.red.value),
            },
            gray: mapColors(tokens.color.grey),
            red: mapColors(tokens.color.red, 600),
            green: mapColors(tokens.color.green),
            yellow:  mapColors(tokens.color.yellow),
            blue:  mapColors(tokens.color.blue),
        },
        // opacity: {
        //     0: 0,
        //     10: 0.1,
        //     20: 0.2,
        //     30: 0.3,
        //     40: 0.4,
        //     50: 0.5,
        //     60: 0.6,
        //     70: 0.7,
        //     80: 0.8,
        //     90: 0.9,
        //     100: 1,
        // },
    },
    plugins: [
        plugin(function ({ addUtilities } : { addUtilities : PluginAPI["addUtilities"] }) {
            addUtilities(
                mapTypography(tokens.font['text font'])
            )
        }),
    ],
}
