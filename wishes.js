// ======================================================
// WISHES PAGE
// ======================================================

const reasons = [
    {
        text: "Because you always know how to make me smile! 💖",
        emoji: "✨",
        gif: "gif1.gif"
    },
    {
        text: "Because you're the best listener I know! 🌸",
        emoji: "💫",
        gif: "gif2.gif"
    },
    {
        text: "Because your laugh is contagious! ✨",
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        text: "Because you make every moment special! 🎂",
        emoji: "💖",
        gif: "gif2.gif"
    },
    {
        text: "Because you're simply amazing! Here's to another wonderful year! 🎉",
        emoji: "🎊",
        gif: "gif1.gif"
    }
];


// ======================================================
// ELEMENTS
// ======================================================

const reasonsContainer =
    document.getElementById("reasons-container");

const shuffleButton =
    document.querySelector(".shuffle-button");

const reasonCounter =
    document.querySelector(".reason-counter");


// ======================================================
// STATE
// ======================================================

let currentReasonIndex = 0;
let showingTimelineButton = false;
let clickLocked = false;


// ======================================================
// CREATE REASON CARD
// ======================================================

function createReasonCard(reason) {

    const card = document.createElement("div");

    card.className = "reason-card";

    const text = document.createElement("div");

    text.className = "reason-text";

    text.textContent =
        `${reason.emoji} ${reason.text}`;


    const gifOverlay =
        document.createElement("div");

    gifOverlay.className =
        "gif-overlay";


    const gif =
        document.createElement("img");

    gif.src = reason.gif;

    gif.alt = "Celebration";


    gifOverlay.appendChild(gif);

    card.appendChild(text);

    card.appendChild(gifOverlay);


    // Card animation

    gsap.fromTo(
        card,
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
        }
    );


    return card;
}


// ======================================================
// DISPLAY NEXT REASON
// ======================================================

function displayNewReason() {

    if (currentReasonIndex >= reasons.length) {

        goToTimeline();

        return;
    }


    const reason =
        reasons[currentReasonIndex];


    const card =
        createReasonCard(reason);


    reasonsContainer.appendChild(card);


    // Counter

    reasonCounter.textContent =
        `Reason ${currentReasonIndex + 1} of ${reasons.length}`;


    currentReasonIndex++;


    // Floating animation

    createFloatingElement();


    // Last reason reached

    if (currentReasonIndex === reasons.length) {

        setTimeout(() => {

            showingTimelineButton = true;

            shuffleButton.textContent =
                "Continue to Timeline 💫";

            shuffleButton.classList.add(
                "story-mode"
            );

        }, 300);

    }

}


// ======================================================
// BUTTON CLICK
// ======================================================

shuffleButton.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        event.stopPropagation();


        // If already showing timeline button
        if (showingTimelineButton) {

            goToTimeline();

            return;
        }


        // Prevent accidental double-click
        if (clickLocked) {
            return;
        }


        clickLocked = true;


        // Small click animation

        gsap.killTweensOf(shuffleButton);

        gsap.to(shuffleButton, {

            scale: 0.92,

            duration: 0.08,

            onComplete: function () {

                gsap.to(shuffleButton, {

                    scale:
                        currentReasonIndex === reasons.length - 1
                            ? 1.1
                            : 1,

                    duration: 0.15

                });

            }

        });


        // Immediately show next reason

        displayNewReason();


        // Unlock quickly

        setTimeout(() => {

            clickLocked = false;

        }, 250);

    }
);


// ======================================================
// GO TO TIMELINE
// ======================================================

function goToTimeline() {

    // Prevent multiple navigation calls

    if (document.body.classList.contains("leaving-page")) {
        return;
    }


    document.body.classList.add(
        "leaving-page"
    );


    gsap.killTweensOf("body");


    gsap.to("body", {

        opacity: 0,

        duration: 0.6,

        ease: "power2.out",

        onComplete: function () {

            window.location.href =
                "timeline.html";

        }

    });

}


// ======================================================
// FLOATING ELEMENTS
// ======================================================

function createFloatingElement() {

    const elements = [
        "🌸",
        "✨",
        "💖",
        "🦋",
        "⭐"
    ];


    const element =
        document.createElement("div");


    element.className =
        "floating";


    element.textContent =
        elements[
            Math.floor(
                Math.random() *
                elements.length
            )
        ];


    element.style.left =
        Math.random() *
        window.innerWidth +
        "px";


    element.style.top =
        Math.random() *
        window.innerHeight +
        "px";


    element.style.fontSize =
        (
            Math.random() * 20 +
            10
        ) + "px";


    document.body.appendChild(element);


    gsap.to(element, {

        y: -500,

        duration:
            Math.random() * 10 + 10,

        opacity: 0,

        onComplete: function () {

            element.remove();

        }

    });

}


// ======================================================
// CONTINUOUS FLOATING ELEMENTS
// ======================================================

setInterval(
    createFloatingElement,
    2000
);