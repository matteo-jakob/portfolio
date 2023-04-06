function typeOut(text, targetElement) {
  const typingDelay = 50;
  const randomDelayMin = 20;
  const randomDelayMax = 80;
  let i = 0;

  const typeNextChar = () => {
    if (i >= text.length) {
      return;
    }

    const char = text[i];
    const delay =
      typingDelay +
      Math.random() * (randomDelayMax - randomDelayMin) +
      randomDelayMin;

    setTimeout(() => {
      targetElement.textContent += char;
      i++;
      typeNextChar();
    }, delay);
  };

  typeNextChar();
}

const header = document.querySelector("header");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (lastScrollY < window.scrollY) {
    header.classList.add("header--hidden");
  } else {
    header.classList.remove("header--hidden");
  }
  lastScrollY = window.scrollY;
});
