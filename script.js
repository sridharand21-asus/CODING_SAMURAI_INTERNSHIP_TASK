/* Typing Effect */
const textArray = ["UI/UX Designer", "Frontend Developer", "Aspiring Software Engineer"];
let index = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing");

function typeText() {
    if (charIndex < textArray[index].length) {
        typingElement.textContent += textArray[index].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 1500);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typingElement.textContent = textArray[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        index = (index + 1) % textArray.length;
        setTimeout(typeText, 500);
    }
}

typeText();

/* Dark / Light Mode */
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
});

/* Smooth Scroll */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

/* Contact Form */
document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent successfully!");
    e.target.reset();
});
