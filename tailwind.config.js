tailwind.config = {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        sm: "24px",
      },
      maxWidth: {
        xl: "1140px",
      },
    },
    extend: {
      colors: {
        pink: "#FD0786",
        "light-pink": "#FFAFCD",
        "extralight-pink": "#FFCdE7",
        "white-pink": "#FFDAE8",
        blue: "#053167",
        "dark-pink": "#B3628C",
        gray: "#797979",
        "light-gray": "#EEEEEE",
        "light-white": "#F4F4F4",
        "gray-light-white": "#E5DDE2",
        "gray-white": "#F5F5F5",
        "white-primary": "#FFF3F9",
        "dark-white": "#999999",
        "off-pink": "#FFB9D4",
        "btn-pink": "#FEACD7",
        "sky": "#00F2EA",
        "red": "#FF004F",
      },
      border: {
        sm: "6px"
      },
      fontSize: {
        "custom-xxs": "11px",
        "custom-sxm": "15px",
        "custom-2xl": "22px",
        "custom-3xl": "28px",
        "custom-4xl": "40px",
        "custom-5xl": "52px",
        "custom-6xl": "60px",
        "custom-8xl": "80px",
      },
      screens: {
        xs: "420px",
        xxs: "440px",
      },
      fontFamily: {
        shrikhand: ["Shrikhand", "sans-serif"],
        lexend: ["Lexend\ Deca", "sans-serif"],
        jost: ["Jost", "sans-serif"],
      },
      boxShadow: {
        "pink-shadow": "-8.12px 8.12px 16.24px 0px #FFAFCD",
      },
      lineHeight: {
        120: "120%",
        125: "125%",
        130: "130%",
        150: "150%",
        142: "142.8%",
        145: "145.8%",
      },
      backgroundImage: {
        "clean-girl-supporter": "url('/assets/images/svg/counter-bg.svg')",
        "mobile-clean-girl-supporter":
          "url('/assets/images/webp/mobile-pink-bg.webp')",
        counter: "linear-gradient(180deg, rgba(255,255,255,1) 50%, rgba(255,243,249,1) 50%)"
      },
      borderRadius: {
        10: "10px",
        14: "14px",
      },
      borderWidth: {
        6: "6px",
      },
      padding: {
        '4.5': '18px',
        '5.5': '22px',
      },
      backgroundSize: {
        full: "100% 100%",
      },
    },
  },
};
