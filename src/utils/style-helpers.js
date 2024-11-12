import { breakpoints, breakpointsList } from "../styles/breakpoints";

const BREAKPOINT_DOWN_DIFF = 0.02;

export const formResponsiveStyle = (style) => {
  let css = "";

  for (let key of breakpointsList) {
    if (!style[key]) continue;

    css += `@media (min-width: ${breakpoints[key]}px) { ${style[key]} }\n`;
  }

  return css;
};

export const formResponsiveStyleDown = (style) => {
  let css = "";

  for (let key of breakpointsList) {
    if (!style[key]) continue;

    css += `@media (max-width: ${
      breakpoints[key] - BREAKPOINT_DOWN_DIFF
    }px) { ${style[key]} }\n`;
  }

  return css;
};
