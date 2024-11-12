import { createGlobalStyle } from "styled-components";

// Styles
import { themeColors } from "./colors";

export const GlobalStyle = createGlobalStyle`
   *{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
    font-family: 'Gantari', sans-serif;
   }
   body {
    margin:0 auto;
    background-color: ${themeColors.background} !important;
   }
   h1,h2,h3,h4,h5,h6,p {
    margin: 0;
    color: ${themeColors.text};
    font-size: 1rem;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
   }
	 ul,ol {
		margin: 0;
	 }
`;

export default GlobalStyle;
