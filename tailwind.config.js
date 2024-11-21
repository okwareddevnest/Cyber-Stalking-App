const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)', ...fontFamily.sans],
                mono: ['var(--font-geist-mono)', ...fontFamily.mono],
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
