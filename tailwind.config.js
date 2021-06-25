module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: true,
    content: ["./pages/**/*.js"],
    cursor: {
      default: 'default',
      pointer: 'pointer'
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: 'disabled'
    },
    
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/