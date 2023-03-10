import { style } from "@vanilla-extract/css";

import { utils } from "../styles";

export const container = style([
  utils.flexColumn,
  {
    height: "100%",
    alignItems: "stretch",
  },
]);

export const stretched = style([
  utils.flexAlignCenter,
  utils.flexJustifyCenter,
  utils.flex1,
]);

export const centered = style({});

export const logo = style([
  utils.flexAlignCenter,
  utils.flexJustifyCenter,
  {
    gap: "0.375rem",
    marginBottom: ".5rem",
  },
]);

export const logoImage = style({
  width: "2.1875rem",
});

export const logoLabel = style({
  fontSize: "2rem",
});

export const description = style({
  fontSize: "1rem",
});
