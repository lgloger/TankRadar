const headerSearchInput = document.getElementById("headerSearchInput");

const words = ["Postleitzahl", "Stadt"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  headerSearchInput.placeholder = currentWord.substring(0, charIndex);

  let speed = isDeleting ? 60 : 120;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 3000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

// Info Container
const infoBtn = document.getElementById("infoBtn");
const infoCloseBtn = document.getElementById("infoCloseBtn");

function toggleInfoContainer() {
  const infoContainer = document.querySelector(".infoContainer");
  infoContainer.classList.toggle("hideInfoContainer");
}

infoBtn.addEventListener("click", () => {
  toggleInfoContainer();
});

infoCloseBtn.addEventListener("click", () => {
  toggleInfoContainer();
});

// Start Type Effect
if (headerSearchInput) {
  typeEffect();
}
