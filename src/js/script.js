
AOS.init({
duration: 1000,
once: true
});

const scrollContainer = document.querySelector('.block-scroll');

scrollContainer.addEventListener('scroll', () => {
    AOS.refresh();
});


const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");
const icon = document.getElementById("musicIcon");

let playing = false;
let hideTimer;

// Show button and hide after 5 seconds
function showButton() {
    btn.classList.remove("hide");

    clearTimeout(hideTimer);

    hideTimer = setTimeout(() => {
        btn.classList.add("hide");
    }, 5000);
}

// Update button state
function updateButtonState(isPlaying) {
    playing = isPlaying;

    if (playing) {
        icon.className = "bi bi-pause-fill";
        btn.classList.add("playing");
    } else {
        icon.className = "bi bi-play-fill";
        btn.classList.remove("playing");
    }
}

// Try autoplay when page loads
window.addEventListener("load", async () => {

    try {
        music.volume = 0.5;      // Optional: 50% volume
        await music.play();

        updateButtonState(true);

    } catch (err) {
        // Browser blocked autoplay
        console.log("Autoplay blocked:", err);
        updateButtonState(false);
    }

    showButton();
});

// Play / Pause
btn.addEventListener("click", async () => {

    try {

        if (playing) {
            music.pause();
            updateButtonState(false);
        } else {
            await music.play();
            updateButtonState(true);
        }

    } catch (err) {
        console.error(err);
    }

    showButton();
});

// Show button while scrolling
window.addEventListener("scroll", showButton);

const scrollArea = document.querySelector(".block-scroll");

if (scrollArea) {
    scrollArea.addEventListener("scroll", showButton);
}