// Welcome Screen animation
function typeOut(text, targetElement) {
  const typingDelay = 30;
  const randomDelayMin = 10;
  const randomDelayMax = 50;
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

// Header animation
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

//elements animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      //entry.target.classList.remove("show"); 
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// Contact animation
