
// const music = document.getElementById("birthdayMusicPlayer");
// const toggle = document.getElementById("musicToggle");

// const timeKey = "birthdayMusicTime";
// const stateKey = "birthdayMusicState";
// const sessionKey = "birthdayMusicSession";

// if (music) {

//     // New website visit = start song from beginning
//     if (!sessionStorage.getItem(sessionKey)) {

//         sessionStorage.setItem(sessionKey, "active");

//         sessionStorage.removeItem(timeKey);
//         sessionStorage.removeItem(stateKey);
//     }

//     const savedTime = sessionStorage.getItem(timeKey);
//     const savedState = sessionStorage.getItem(stateKey);


//     // Restore position and continue music
//     music.addEventListener("loadedmetadata", () => {

//         if (savedTime) {

//             const time = Number(savedTime);

//             if (
//                 !isNaN(time) &&
//                 time >= 0 &&
//                 time < music.duration
//             ) {
//                 music.currentTime = time;
//             }
//         }

//         if (savedState === "playing") {

//             music.play().catch(() => {});

//         }
//     });


//     // Save position every 300ms
//     setInterval(() => {

//         if (!music.paused && !music.ended) {

//             sessionStorage.setItem(
//                 timeKey,
//                 music.currentTime
//             );
//         }

//     }, 300);


//     // Save position when changing page
//     window.addEventListener("pagehide", () => {

//         if (!music.ended) {

//             sessionStorage.setItem(
//                 timeKey,
//                 music.currentTime
//             );

//             if (!music.paused) {

//                 sessionStorage.setItem(
//                     stateKey,
//                     "playing"
//                 );
//             }
//         }
//     });


//     // Play
//     music.addEventListener("play", () => {

//         sessionStorage.setItem(
//             stateKey,
//             "playing"
//         );

//         if (toggle) {

//             toggle.classList.add("playing");

//             const icon =
//                 toggle.querySelector(".music-icon");

//             if (icon) {
//                 icon.textContent = "🎵";
//             }
//         }
//     });


//     // Pause
//     music.addEventListener("pause", () => {

//         if (!music.ended) {

//             sessionStorage.setItem(
//                 timeKey,
//                 music.currentTime
//             );
//         }

//         if (toggle) {

//             toggle.classList.remove("playing");

//             const icon =
//                 toggle.querySelector(".music-icon");

//             if (icon) {
//                 icon.textContent = "🔇";
//             }
//         }
//     });


//     // Music button
//     if (toggle) {

//         toggle.addEventListener("click", () => {

//             if (music.paused) {

//                 music.play().catch(() => {});

//             } else {

//                 music.pause();

//                 sessionStorage.setItem(
//                     stateKey,
//                     "paused"
//                 );
//             }

//         });
//     }


//     // Song finished → start again
//     music.addEventListener("ended", () => {

//         sessionStorage.removeItem(timeKey);

//         sessionStorage.setItem(
//             stateKey,
//             "playing"
//         );

//         music.currentTime = 0;

//         music.play().catch(() => {});
//     });

// }




// ======================================================
// GLOBAL BIRTHDAY MUSIC
// Works across GitHub Pages navigation
// ======================================================

(function () {

    const TIME_KEY = "birthdayMusicTime";
    const STATE_KEY = "birthdayMusicState";

    const music = document.getElementById("birthdayMusicPlayer");
    const toggle = document.getElementById("musicToggle");
    const icon = toggle?.querySelector(".music-icon");

    if (!music) {
        console.log("❌ Music player not found");
        return;
    }

    console.log("🎵 Music system loaded");

    // ==================================================
    // UPDATE BUTTON
    // ==================================================

    function updateButton() {

        if (!icon) return;

        icon.textContent =
            music.paused ? "🎵" : "🔊";
    }


    // ==================================================
    // SAVE CURRENT POSITION
    // ==================================================

    function savePosition() {

        const currentTime = music.currentTime;

        if (
            Number.isFinite(currentTime) &&
            currentTime >= 0
        ) {

            const time = currentTime.toString();

            // Persistent
            localStorage.setItem(
                TIME_KEY,
                time
            );

            localStorage.setItem(
                STATE_KEY,
                music.paused
                    ? "paused"
                    : "playing"
            );

            // Backup for this website session
            sessionStorage.setItem(
                TIME_KEY,
                time
            );

            sessionStorage.setItem(
                STATE_KEY,
                music.paused
                    ? "paused"
                    : "playing"
            );

            console.log(
                "💾 Music saved:",
                currentTime
            );
        }
    }


    // ==================================================
    // RESTORE POSITION
    // ==================================================

    function restorePosition() {

        let savedTime =
            sessionStorage.getItem(TIME_KEY);

        if (!savedTime) {
            savedTime =
                localStorage.getItem(TIME_KEY);
        }

        const time =
            parseFloat(savedTime);

        if (
            Number.isFinite(time) &&
            time >= 0 &&
            time < music.duration
        ) {

            music.currentTime = time;

            console.log(
                "↩️ Music restored:",
                time
            );
        }
    }


    // ==================================================
    // RESTORE PLAYING STATE
    // ==================================================

    function restoreMusic() {

        let state =
            sessionStorage.getItem(STATE_KEY);

        if (!state) {
            state =
                localStorage.getItem(STATE_KEY);
        }

        if (state !== "playing") {
            updateButton();
            return;
        }

        restorePosition();

        music.play()
            .then(() => {

                console.log(
                    "▶️ Music continued:",
                    music.currentTime
                );

                updateButton();

            })
            .catch(() => {

                console.log(
                    "⚠️ Browser blocked autoplay"
                );

                updateButton();
            });
    }


    // ==================================================
    // AUDIO READY
    // ==================================================

    music.addEventListener(
        "loadedmetadata",
        () => {

            restorePosition();

            restoreMusic();

        },
        { once: true }
    );


    // ==================================================
    // SAVE WHILE PLAYING
    // ==================================================

    music.addEventListener(
        "timeupdate",
        savePosition
    );


    // ==================================================
    // PLAY
    // ==================================================

    music.addEventListener(
        "play",
        () => {

            localStorage.setItem(
                STATE_KEY,
                "playing"
            );

            sessionStorage.setItem(
                STATE_KEY,
                "playing"
            );

            updateButton();
        }
    );


    // ==================================================
    // PAUSE
    // ==================================================

    music.addEventListener(
        "pause",
        () => {

            savePosition();

            updateButton();
        }
    );


    // ==================================================
    // MUSIC BUTTON
    // ==================================================

    if (toggle) {

        toggle.addEventListener(
            "click",
            async () => {

                if (music.paused) {

                    try {

                        await music.play();

                        localStorage.setItem(
                            STATE_KEY,
                            "playing"
                        );

                        sessionStorage.setItem(
                            STATE_KEY,
                            "playing"
                        );

                        updateButton();

                    } catch (error) {

                        console.log(
                            "Music play failed:",
                            error
                        );
                    }

                } else {

                    music.pause();

                    savePosition();

                    updateButton();
                }
            }
        );
    }


    // ==================================================
    // SAVE BEFORE PAGE NAVIGATION
    // ==================================================

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "hidden"
            ) {
                savePosition();
            }

        }
    );


    window.addEventListener(
        "pagehide",
        savePosition
    );


    window.addEventListener(
        "beforeunload",
        savePosition
    );


    // ==================================================
    // SONG ENDED
    // ==================================================

    music.addEventListener(
        "ended",
        () => {

            localStorage.setItem(
                TIME_KEY,
                "0"
            );

            sessionStorage.setItem(
                TIME_KEY,
                "0"
            );

            localStorage.setItem(
                STATE_KEY,
                "paused"
            );

            sessionStorage.setItem(
                STATE_KEY,
                "paused"
            );

            updateButton();
        }
    );


    updateButton();

})();