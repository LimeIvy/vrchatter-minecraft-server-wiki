/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blink: {
          "50%": { borderColor: "transparent" },
        },
      },
      animation: {
        blink: "blink .75s step-end infinite",
      },
      colors: {
        "mc-bg": "#c6c6c6",
        "mc-border-light": "#ffffff",
        "mc-border-dark": "#555555",
        "mc-text": "#3f3f3f",
        "mc-hover-bg":
          "#58a14e" /* Changed hover to Minecraft Grass top color */,
        "mc-yellow": "#ffff55",
        "mc-gray": "#aaaaaa",
        "mc-dark": "#000000",
        "mc-tooltip-bg": "rgba(16, 0, 16, 0.95)",
        "mc-tooltip-border1": "#280068",
        "mc-tooltip-border2": "#140034",
        "mc-dirt": "#593D29",
      },
      fontFamily: {
        minecraft: ['"DotGothic16"', '"VT323"', "monospace", "sans-serif"],
      },
      boxShadow: {
        "mc-panel":
          "inset 4px 4px 0px 0px #ffffff, inset -4px -4px 0px 0px #555555, inset 6px 6px 0px 0px #c6c6c6, inset -6px -6px 0px 0px #c6c6c6",
        "mc-button":
          "inset 3px 3px 0px 0px #ffffff, inset -3px -3px 0px 0px #555555",
        "mc-button-hover":
          "inset 3px 3px 0px 0px #86ed76, inset -3px -3px 0px 0px #315c2d" /* Replaced hover border colors to match grassy theme */,
        "mc-button-active":
          "inset 3px 3px 0px 0px #555555, inset -3px -3px 0px 0px #ffffff",
        "mc-tooltip":
          "inset 0px 0px 0px 2px #100010, inset 2px 2px 0px 2px #280068, inset -2px -2px 0px 2px #140034",
      },
    },
  },
  plugins: [],
};
