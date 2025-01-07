
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}
const words = ["Venkataramana", "ヴェンカタラマナ", "வெங்கடரமணா"];
const typewriter = document.getElementById("typewriter");

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    typewriter.textContent = isDeleting
        ? currentWord.substring(0, letterIndex--)
        : currentWord.substring(0, letterIndex++);

    if (!isDeleting && letterIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 1000); // Pause before deleting
    }

    if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Loop to next word
    }

    const typingSpeed = isDeleting ? 30 : 50; // Faster deleting speed
    setTimeout(typeEffect, typingSpeed);
}

typeEffect();
