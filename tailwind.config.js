/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
        extend: {
            colors: {
                card: {
                    100: '#ffffff',
                    950: '#1D2226',
                }
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
