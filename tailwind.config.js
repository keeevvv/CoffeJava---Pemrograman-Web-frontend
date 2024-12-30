import defaultTheme from 'tailwindcss/defaultTheme';

import  flowbite  from 'flowbite-react/tailwind';
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.jsx',
       './resources/**/*.js',
       flowbite.content()
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Helvetica', 'Arial', 'sans-serif'],
            },
            colors: {
                NusantaraGold: '#DDA86B', 
                NusantaraGoldLight: '#EBC69B',
                NusantaraGoldDark: '#B88655',
            },
        },
    },
    plugins: [flowbite.plugin()],
};
