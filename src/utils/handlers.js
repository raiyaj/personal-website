export const smoothScroll = (selector, e) => {
  e.preventDefault();
  document.querySelector(selector).scrollIntoView({
    behavior: 'smooth'
  });
};
