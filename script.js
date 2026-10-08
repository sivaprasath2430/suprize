
/* =====================================================
   BHUVANESHWARI MAM - BIRTHDAY ANIMATION
   Complete JavaScript
===================================================== */


/* =====================================================
   SCREEN SYSTEM
===================================================== */

const screens = document.querySelectorAll(".screen");

let currentScreen = 0;


/* Show first screen */
if (screens.length > 0) {
    screens[0].classList.add("active");
}


/* =====================================================
   GO TO NEXT SCREEN
===================================================== */

function nextScreen() {

    if (currentScreen >= screens.length - 1) {
        return;
    }

    const oldScreen = screens[currentScreen];

    currentScreen++;

    const newScreen = screens[currentScreen];

    oldScreen.classList.remove("active");
    oldScreen.classList.add("previous");

    newScreen.classList.add("active");

    startScreenAnimation(currentScreen);
}


/* =====================================================
   SCREEN ANIMATIONS
===================================================== */

function startScreenAnimation(number) {

    /* Screen 2 - Birthday */
    if (number === 1) {
        createSparkles();
    }


    /* Screen 3 - Tree */
    if (number === 2) {
        createTreeParticles();
    }


    /* Screen 4 - First Wish */
    if (number === 3) {

        const wish =
            "May your days always be filled with happiness, " +
            "your heart with peace, and your life with beautiful memories. 🌸";

        typeWish(wish);
    }


    /* Screen 5 - Second Wish */
    if (number === 4) {
        createFloatingHearts();
    }


    /* Screen 6 - Cake */
    if (number === 5) {
        startCakeAnimation();
    }


    /* Screen 7 - Final */
    if (number === 6) {
        createFinalHearts();
    }
}


/* =====================================================
   ARROW
===================================================== */

const arrow = document.getElementById("arrow");

let dragging = false;

let startX = 0;
let startY = 0;

let pullX = 0;
let pullY = 0;


/* Arrow pressed */

if (arrow) {

    arrow.addEventListener("pointerdown", function(event) {

        if (currentScreen !== 0) {
            return;
        }

        dragging = true;

        startX = event.clientX;
        startY = event.clientY;

        pullX = 0;
        pullY = 0;

        arrow.style.transition = "none";

        try {
            arrow.setPointerCapture(event.pointerId);
        } catch (error) {
            console.log(error);
        }

    });


    /* Arrow dragging */

    arrow.addEventListener("pointermove", function(event) {

        if (!dragging) {
            return;
        }

        const moveX = event.clientX - startX;
        const moveY = event.clientY - startY;


        /*
           Limit how far the arrow can move.
        */

        pullX = Math.max(-80, Math.min(20, moveX));

        pullY = Math.max(-35, Math.min(35, moveY));


        arrow.style.transform =
            `translate(${pullX}px, ${pullY}px) rotate(-8deg)`;

    });


    /* Arrow released */

    arrow.addEventListener("pointerup", function(event) {

        if (!dragging) {
            return;
        }

        dragging = false;

        try {
            arrow.releasePointerCapture(event.pointerId);
        } catch (error) {
            console.log(error);
        }


        /* Arrow flies towards the heart */
arrow.style.transition =
    "transform 0.9s cubic-bezier(.2,.8,.2,1)";

arrow.style.transform =
    "translate(45px,-125px) rotate(-25deg)";

        /* Open Birthday screen */

        setTimeout(function() {

            arrow.style.opacity = "0";

            nextScreen();

        }, 700);

    });


    /* Cancel dragging */

    arrow.addEventListener("pointercancel", function() {

        dragging = false;

        arrow.style.transition =
            "transform .3s ease";

        arrow.style.transform =
            "translate(0,0) rotate(-8deg)";

    });

}


/* =====================================================
   SPARKLES
===================================================== */

function createSparkles() {

    const screen =
        document.getElementById("screen2");

    if (!screen) {
        return;
    }


    for (let i = 0; i < 45; i++) {

        const sparkle =
            document.createElement("div");


        sparkle.style.position =
            "absolute";

        sparkle.style.width =
            "5px";

        sparkle.style.height =
            "5px";

        sparkle.style.borderRadius =
            "50%";

        sparkle.style.background =
            "white";

        sparkle.style.boxShadow =
            "0 0 12px white, 0 0 20px #ff80b9";

        sparkle.style.left =
            Math.random() * 100 + "%";

        sparkle.style.top =
            Math.random() * 100 + "%";

        sparkle.style.pointerEvents =
            "none";

        sparkle.style.animation =
            `sparkleAnimation 1.5s ease ${Math.random() * 2}s forwards`;


        screen.appendChild(sparkle);


        setTimeout(function() {

            sparkle.remove();

        }, 4000);

    }
}


/* =====================================================
   TREE PARTICLES
===================================================== */
function createTreeParticles() {

    const screen = document.getElementById("screen3");

    if (!screen) {
        return;
    }

    const tree = screen.querySelector(".tree");

    if (!tree) {
        return;
    }

    // Remove old particles first
    tree.querySelectorAll(".tree-particle").forEach(function (particle) {
        particle.remove();
    });

    // Create particles around the tree canopy
    for (let i = 0; i < 35; i++) {

        const particle = document.createElement("div");

        particle.className = "tree-particle";

        // Mix of hearts and sparkles
        particle.textContent =
            Math.random() > 0.45 ? "♥" : "✦";

        // Position around the upper tree
        const left = 20 + Math.random() * 60;
        const top = 5 + Math.random() * 48;

        particle.style.left = left + "%";
        particle.style.top = top + "%";

        // Different sizes
        const size = 10 + Math.random() * 14;
        particle.style.fontSize = size + "px";

        // Pink / gold
        particle.style.color =
            Math.random() > 0.5
                ? "#ff70ae"
                : "#ffd76a";

        // Different animation timing
        particle.style.animationDuration =
            (2.5 + Math.random() * 2.5) + "s";

        particle.style.animationDelay =
            (Math.random() * 1.5) + "s";

        tree.appendChild(particle);

        // Remove after animation
        setTimeout(function () {

            if (particle) {
                particle.remove();
            }

        }, 6500);
    }
}

/* =====================================================
   WISH TYPING
===================================================== */

function typeWish(message) {

    const text =
        document.querySelector("#screen4 .wish-text");

    if (!text) {
        return;
    }


    text.textContent = "";

    let position = 0;


    const timer =
        setInterval(function() {

            text.textContent += message[position];

            position++;


            if (position >= message.length) {

                clearInterval(timer);

            }

        }, 25);
}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createFloatingHearts() {

    const screen =
        document.getElementById("screen5");

    if (!screen) {
        return;
    }


    for (let i = 0; i < 30; i++) {

        const heart =
            document.createElement("div");


        heart.textContent =
            Math.random() > 0.5
                ? "♥"
                : "♡";


        heart.style.position =
            "absolute";

        heart.style.bottom =
            "-30px";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.fontSize =
            (15 + Math.random() * 20) + "px";

        heart.style.color =
            Math.random() > 0.5
                ? "#ff70ae"
                : "#ffd76a";

        heart.style.pointerEvents =
            "none";

        heart.style.animation =
            `floatUp ${4 + Math.random() * 3}s linear forwards`;


        screen.appendChild(heart);


        setTimeout(function() {

            heart.remove();

        }, 7500);

    }
}


/* =====================================================
   CAKE
===================================================== */

function startCakeAnimation() {

    const cakeScreen =
        document.querySelector(".cake-screen");

    if (!cakeScreen) {
        return;
    }


    const flames =
        cakeScreen.querySelectorAll(".flame");


    flames.forEach(function(flame, index) {

        flame.classList.remove("off");

        flame.style.animationDelay =
            (index * 0.1) + "s";

    });

}


/* =====================================================
   BLOW CANDLES
===================================================== */

const blowButton =
    document.getElementById("blowBtn");


if (blowButton) {

    blowButton.addEventListener("click", function() {

        /* Prevent double click */

        if (blowButton.dataset.blown === "true") {
            return;
        }

        blowButton.dataset.blown = "true";


        const cakeScreen =
            document.querySelector(".cake-screen");


        const flames =
            cakeScreen
                ? cakeScreen.querySelectorAll(".flame")
                : [];


        const instruction =
            document.querySelector(".instruction");


        /* Change text */

        if (instruction) {

            instruction.textContent =
                "Your wish is on its way... ✨";

        }


        /* Turn off flames one by one */

        flames.forEach(function(flame, index) {

            setTimeout(function() {

                flame.classList.add("off");

            }, index * 180);

        });


        /* Hide button */

        blowButton.style.transition =
            "opacity .5s ease, transform .5s ease";

        blowButton.style.opacity = "0";

        blowButton.style.transform =
            "scale(.7)";


        blowButton.style.pointerEvents =
            "none";


        /* Go to final page */

        setTimeout(function() {

            nextScreen();

        }, 1500);

    });

}


/* =====================================================
   FINAL HEARTS
===================================================== */

function createFinalHearts() {

    const screen =
        document.querySelector(".final-screen");

    if (!screen) {
        return;
    }


    for (let i = 0; i < 40; i++) {

        const heart =
            document.createElement("div");


        heart.textContent =
            Math.random() > 0.5
                ? "♥"
                : "✨";


        heart.style.position =
            "absolute";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.bottom =
            "-30px";

        heart.style.fontSize =
            (15 + Math.random() * 25) + "px";

        heart.style.color =
            Math.random() > 0.5
                ? "#ff70ae"
                : "#ffd76a";

        heart.style.pointerEvents =
            "none";

        heart.style.animation =
            `floatUp ${3 + Math.random() * 3}s linear forwards`;


        screen.appendChild(heart);


        setTimeout(function() {

            heart.remove();

        }, 7000);

    }
}


/* =====================================================
   OPTIONAL KEYBOARD SUPPORT
===================================================== */

document.addEventListener("keydown", function(event) {

    /* Enter = next screen */

    if (event.key === "Enter") {

        if (currentScreen > 0 &&
            currentScreen < screens.length - 1) {

            nextScreen();

        }

    }

});


/* =====================================================
   START
===================================================== */

startScreenAnimation(0);

