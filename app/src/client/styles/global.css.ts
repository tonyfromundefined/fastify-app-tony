import { globalStyle } from "@vanilla-extract/css";

globalStyle("html, body, #root", {
  margin: 0,
  padding: 0,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  height: "100%",
});
