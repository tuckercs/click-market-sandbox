import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle(
  ({ theme }) => `
  @font-face {
    font-family: "IBMPlexMono";
    src: url("/fonts/IBMPlexMono-Medium.ttf");
    font-style: normal;
    font-weight: 500;
    font-display: swap;
  }

  @font-face {
    font-family: "PostGrotesk";
    src: url("/fonts/PostGrotesk-Light.otf");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: "PostGrotesk";
    src: url("/fonts/PostGrotesk-Bold.otf");
    font-style: normal;
    font-weight: bold;
    font-display: swap;
  }

  html,
  body {
    color: ${theme.colors.text};
    padding: 0;
    margin: 0;
    font-family: "${theme.fonts.primary}";
  }

  a {
    color: ${theme.colors.primary};
    cursor: pointer;
    text-decoration: ${theme.textDecoration.link};
  }

  button {
    align-items: center;
    background-color: ${theme.colors.primary};
    border: none;
    color: ${theme.colors.background};
    cursor: pointer;
    display: flex;
    font-family: "${theme.fonts.primary}";
    font-size: 26px;
    font-weight: bold;
    justify-content: center;
  }

  button:disabled,
  button[disabled] {
    background-color: ${theme.colors.disabled};
    color: ${theme.colors.text};
    cursor: initial;
  }

  h1 {
    font: ${theme.fonts.h1()};
  }

  h2 {
    font: ${theme.fonts.h2()};
  }

  h3 {
    font: ${theme.fonts.h3()};
  }

  .reactSelect__control {
    background: none;
    border: none;
    width: max-content;
  }
  
  * {
    box-sizing: border-box;
  }
`
);
