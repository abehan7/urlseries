export const Fonts = {
  Pretendard: `@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

font-family: 'Pretendard-Regular';

`,
};

const customMediaQuery = (maxWidth) => `@media (max-width: ${maxWidth}px)`;
const mobileMediaQuery = (minWidth, maxWidth) =>
  `@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  1440: customMediaQuery(1440),
  1100: customMediaQuery(1100),
  768: customMediaQuery(768),
  mobile: mobileMediaQuery(320, 600),
};
