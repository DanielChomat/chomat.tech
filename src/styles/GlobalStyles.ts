import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        box-sizing: border-box;
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    body {
        line-height: 1;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    html {

        /* Amethyst */
        --amethyst-100: #ac78e9;
        --amethyst-200: #bc93ee;
        --amethyst-300: #cdaef2;
        --amethyst-400: #dec9f6;
        --amethyst-500: #9b5de5ff;
        --amethyst-600: #7c4ab7;
        --amethyst-700: #5d3889;
        --amethyst-800: #3e255c;
        --amethyst-900: #1f122e;

        /* Magenta Crayola */
        --magenta-crayola-100: #f376c1;
        --magenta-crayola-200: #f692ce;
        --magenta-crayola-300: #f8adda;
        --magenta-crayola-400: #fac8e6;
        --magenta-crayola-500: #f15bb5ff;
        --magenta-crayola-600: #c14991;
        --magenta-crayola-700: #91376d;
        --magenta-crayola-800: #602448;
        --magenta-crayola-900: #301224;

        /* Minion Yellow */
        --minion-yellow-100: #fee860;
        --minion-yellow-200: #feed80;
        --minion-yellow-300: #fef2a0;
        --minion-yellow-400: #fff6bf;
        --minion-yellow-500: #fee440ff;
        --minion-yellow-600: #cbb633;
        --minion-yellow-700: #988826;
        --minion-yellow-800: #665b1a;
        --minion-yellow-900: #332e0d;

        /* Capri */
        --capri-100: #2ac6fa;
        --capri-200: #55d2fb;
        --capri-300: #80ddfc;
        --capri-400: #aae8fd;
        --capri-500: #00bbf9ff;
        --capri-600: #0096c7;
        --capri-700: #007095;
        --capri-800: #004b64;
        --capri-900: #002632;

        /* Sea Green Crayola */
        --sea-green-crayola-100: #2af7db;
        --sea-green-crayola-200: #55f8e2;
        --sea-green-crayola-300: #80faea;
        --sea-green-crayola-400: #aafcf1;
        --sea-green-crayola-500: #00f5d4ff;
        --sea-green-crayola-600: #00c4aa;
        --sea-green-crayola-700: #009380;
        --sea-green-crayola-800: #006255;
        --sea-green-crayola-900: #00312a;

        /* Raisin Black */
        --raisin-black-100: #464b59;
        --raisin-black-200: #6b6f7a;
        --raisin-black-300: #90939c;
        --raisin-black-400: #b5b7bd;
        --raisin-black-500: #212738ff;
        --raisin-black-600: #1a1f2d;
        --raisin-black-700: #141722;
        --raisin-black-800: #0d1016;
        --raisin-black-900: #06080b;

        /* Ghost White */
        --ghost-white-100: #f8f8ff;
        --ghost-white-200: #fafaff;
        --ghost-white-300: #fbfbff;
        --ghost-white-400: #fcfcff;
        --ghost-white-500: #f7f7ffff;
        --ghost-white-600: #c6c6cc;
        --ghost-white-700: #949499;
        --ghost-white-800: #636366;
        --ghost-white-900: #323233;

        /* Orange Soda */
        --orange-soda-100: #f7785e;
        --orange-soda-200: #f8937e;
        --orange-soda-300: #faae9e;
        --orange-soda-400: #fcc9bf;
        --orange-soda-500: #F55D3E;
        --orange-soda-600: #c44a32;
        --orange-soda-700: #933826;
        --orange-soda-800: #622519;
        --orange-soda-900: #31120c;

        /* Davy's Grey */
        --davys-grey-100: #74777a;
        --davys-grey-200: #909294;
        --davys-grey-300: #acaeaf;
        --davys-grey-400: #c7c9ca;
        --davys-grey-500: #585C5Fff;
        --davys-grey-600: #464a4c;
        --davys-grey-700: #353839;
        --davys-grey-800: #232526;
        --davys-grey-900: #121213;

        --typo-color-black: var(--raisin-black-500);
        --typo-color-purple: var(--amethyst-500);
        --typo-color-grey: var(--davys-grey-500);
        --typo-color-tag: var(--davys-grey-500);

        --bg-color-main: var(--ghost-white-500);
        --bg-color-purple: var(--amethyst-500);
        --bg-color-blue: var(--capri-500);
        --bg-color-green: var(--sea-green-crayola-500);
        --bg-color-yellow: var(--minion-yellow-500);
        --bg-color-red: var(--magenta-crayola-500);

        --bg-color-tag: var(--bg-color-yellow);
        --bg-github-icon: rgb(31, 35, 40);

        --border-color-details: var(--orange-soda-500);

        --box-shadow-color-default: color-mix(in srgb, var(--ghost-white-800) 20%, transparent);

        @media (prefers-color-scheme: dark) {
            --typo-color-black: var(--amethyst-500);
            --typo-color-purple: var(--ghost-white-600);
            --typo-color-grey: var(--ghost-white-700);
            --typo-color-tag: var(--ghost-white-400);

            --bg-color-main: var(--raisin-black-700);
            --bg-color-purple: var(--amethyst-800);
            --bg-color-blue: var(--capri-800);
            --bg-color-green: var(--sea-green-crayola-800);
            --bg-color-yellow: var(--minion-yellow-700);
            --bg-color-red: var(--magenta-crayola-800);

            --bg-color-tag: var(--bg-color-green);
            --bg-github-icon: rgb(230, 237, 243);

            --border-color-details: var(--orange-soda-700);

            --box-shadow-color-default: color-mix(in srgb, var(--sea-green-crayola-700) 10%, transparent);


            .inverted {
                filter: invert(1);
            }
        }


        --baseFontSize: 62.5%;

        @media only screen and (max-width: 969px) {
            --baseFontSize: 50%;
        }

        font-size: var(--baseFontSize, 62.5%);

    }

    body {
        margin: 0;
        min-height: 100vh;
        height: 100%;
        color: var(--typo-color-purple);

        font-family: 'Yanone Kaffeesatz', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        font-size: 1.6rem;

        --main-bg-red-gradient: linear-gradient(-70deg, transparent 0%, var(--bg-color-red, #FE8280) 0%, var(--bg-color-red, #FE8280) 170px, transparent 171px) no-repeat;
        --main-bg-blue-gradient: linear-gradient(60deg, transparent 0%, var(--bg-color-blue, #00D4FF) 0%, var(--bg-color-blue, #00D4FF) 230px, transparent 231px) no-repeat;
        --main-bg-yellow-gradient: linear-gradient(10deg, transparent 0%, var(--bg-color-yellow, #1CC761) 0%, var(--bg-color-yellow, #1CC761) 170px, transparent 171px) no-repeat;

        background: linear-gradient(195deg, transparent 0%, var(--bg-color-green, #FCD45C) 0%, var(--bg-color-green, #FCD45C) 220px, transparent 221px) no-repeat,
        linear-gradient(145deg, transparent 0%, var(--bg-color-purple, #A25FE4) 0%, var(--bg-color-purple, #A25FE4) 170px, transparent 171px) no-repeat,
        var(--main-bg-yellow-gradient),
        var(--main-bg-blue-gradient),
        var(--main-bg-red-gradient),
        var(--bg-color-main) no-repeat;


        @media only screen and (max-width: 567px) {
            background: linear-gradient(195deg, transparent 0%, var(--bg-color-green, #FCD45C) 0%, var(--bg-color-green, #FCD45C) 28vw, transparent calc(28vw + 1px)) no-repeat,
            linear-gradient(145deg, transparent 0%, var(--bg-color-purple, #A25FE4) 0%, var(--bg-color-purple, #A25FE4) 20vw, transparent calc(20vw + 1px)) no-repeat,
            var(--main-bg-yellow-gradient),
            var(--main-bg-blue-gradient),
            var(--main-bg-red-gradient),
            var(--bg-color-main) no-repeat;
        }
    }

    a {
        text-decoration: none;

        &, &:link, &:visited {
            color: inherit;
        }

        position: relative;

        &:after {
            content: "";

            position: absolute;
            bottom: -.2em;
            right: 0;

            width: 0;
            height: .15em;

            background-color: var(--bg-color-green);
            transition: all 250ms ease-in-out;
            border-radius: .2em;
        }

            /*&[target="_blank"] {
      &::before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 1.8rem;
        height: 1.8rem;
        //background-color: red;
        border-radius: 4px;

        opacity: 0;
        visibility: hidden;

        transition: all 250ms ease-in-out;

        background: url(${
          require("../../content/assets/resize.svg").default
        }) no-repeat 65% / 14px 14px, #21273880;
      }

      &:hover {
        &::before {
          opacity: 1;
          visibility: visible;
        }
      }

    }*/

        &:hover {
            &::after {
                left: 0;
                right: auto;
                width: 100%;

            }
        }
    }

    h1, h2, h3, h4 {
        svg {
            height: 1.2em;
            vertical-align: middle;
        }
    }

    h1 {
        font-size: 8.4rem;
        line-height: 1.2;
        margin-bottom: 1rem;
    }

    h2 {
        font-size: 6.4rem;
        line-height: 1.2;
        margin-bottom: 1rem;
    }

    h3 {
        font-size: 3.6rem;
        line-height: 1.3;
        margin-bottom: 1rem;
    }

    h4 {
        font-size: 2.8rem;
        line-height: 1.3;
        margin-bottom: 1rem;
    }

    h5 {
        font-size: 2rem;
        line-height: 1.3;
        margin-bottom: 1rem;
    }

    .text-left {
        text-align: left;
    }

    .text-center {
        text-align: center;
    }
`

export default GlobalStyles
