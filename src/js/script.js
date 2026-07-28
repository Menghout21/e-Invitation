// ===============================
// AOS
// ===============================
AOS.init({
    duration: 1000,      // Animation duration
    once: false,         // Animate every time the element enters the viewport
    mirror: true,        // Animate again when scrolling back up
    offset: 100,         // Trigger animation 100px before the element enters
    easing: "ease-in-out"
});
// Refresh AOS if using a custom scroll container
const scrollContainer = document.querySelector(".block-scroll");
if (scrollContainer) {
    scrollContainer.addEventListener("scroll", () => {
        AOS.refresh();
    });
}

// ===============================
// Music
// ===============================
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");
const icon = document.getElementById("musicIcon");

let playing = false;
let hideTimer;


// Show music button for 5 seconds
function showButton() {
    if (!btn) return;

    btn.classList.add("show");
    btn.classList.remove("hide");

    clearTimeout(hideTimer);

    hideTimer = setTimeout(() => {
        btn.classList.add("hide");
    }, 5000);
}


// Update play/pause icon
function updateButtonState(isPlaying) {

    if (!btn || !icon) return;

    playing = isPlaying;

    if (playing) {
        icon.className = "bi bi-pause-fill";
        btn.classList.add("playing");
    } else {
        icon.className = "bi bi-play-fill";
        btn.classList.remove("playing");
    }
}


// Play / Pause button
if (btn && music) {

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

}


// Show music button while scrolling
window.addEventListener("scroll", showButton);

if (scrollContainer) {
    scrollContainer.addEventListener("scroll", showButton);
}



// ===============================
// Open Invitation
// ===============================
const inviteBtn = document.querySelector(".invite-btn");
const welcomeContent = document.getElementById("welcome-content");
const allContent = document.getElementById("all-content");

if (inviteBtn && welcomeContent && allContent) {

    inviteBtn.addEventListener("click", async () => {

        // Show music button
        if (btn) {
            btn.classList.add("show");
        }

        // Play background music
        if (music) {

            try {

                music.volume = 0.5;
                await music.play();

                updateButtonState(true);

            } catch (err) {

                console.log("Unable to play music:", err);
                updateButtonState(false);

            }

        }

        showButton();

        // Hide welcome screen
        welcomeContent.classList.add("hide");

        setTimeout(() => {

            welcomeContent.style.display = "none";

            // Show invitation
            allContent.classList.add("show");

            // Refresh AOS
            setTimeout(() => {
                AOS.refreshHard();
            }, 650);

        }, 600);

    });

}