import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import plugin from 'tailwindcss/plugin';
import scrollbarPlugin from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', 'FontAwesome', ...defaultTheme.fontFamily.sans],
                roboto: ['Roboto', 'FontAwesome', ...defaultTheme.fontFamily.sans],
                playfair: ['Playfair Display', 'FontAwesome', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        forms,
        plugin(function ({ addVariant }) {
            addVariant('hasCoverPhoto', '.hasCoverPhoto &');
            addVariant('selected', ['.selected &', '&.selected']);
        }),
        scrollbarPlugin,
    ],
};
