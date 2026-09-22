// const music = document.getElementById("birthdayMusicPlayer");
// const toggle = document.getElementById("musicToggle");

// const timeKey = "birthdayMusicTime";
// const stateKey = "birthdayMusicState";

// if (music) {

//     const savedTime = localStorage.getItem(timeKey);
//     const savedState = localStorage.getItem(stateKey);

//     // Restore previous position
//     music.addEventListener("loadedmetadata", () => {
//         if (savedTime) {
//             const time = Number(savedTime);

//             if (time < music.duration) {
//                 music.currentTime = time;
//             }
//         }
//     });

//     // Try to continue
//     if (savedState === "playing") {
//         music.play().catch(() => {
//             // Chrome may block autoplay
//         });
//     }

//     // Save position
//     setInterval(() => {
//         if (!music.paused && !music.ended) {
//             localStorage.setItem(timeKey, music.currentTime);
//         }
//     }, 500);

//     // Save before leaving
//     window.addEventListener("pagehide", () => {
//         localStorage.setItem(timeKey, music.currentTime);
//     });

//     // Play
//     music.addEventListener("play", () => {
//         localStorage.setItem(stateKey, "playing");

//         if (toggle) {
//             toggle.classList.add("playing");
//             const icon = toggle.querySelector(".music-icon");
//             if (icon) icon.textContent = "🎵";
//         }
//     });

//     // Pause / mute
//     music.addEventListener("pause", () => {
//         if (!music.ended) {
//             localStorage.setItem(stateKey, "paused");
//         }

//         if (toggle) {
//             toggle.classList.remove("playing");
//             const icon = toggle.querySelector(".music-icon");
//             if (icon) icon.textContent = "🔇";
//         }
//     });

//     // Finished → restart
//     music.addEventListener("ended", () => {
//         localStorage.removeItem(timeKey);
//         music.currentTime = 0;

//         music.play().catch(() => {});
//     });

//     // Music button
//     if (toggle) {
//         toggle.addEventListener("click", () => {

//             if (music.paused) {
//                 music.play().catch(() => {});
//             } else {
//                 music.pause();
//             }

//         });
//     }
// }


//









const music = document.getElementById("birthdayMusicPlayer");
const toggle = document.getElementById("musicToggle");

const timeKey = "birthdayMusicTime";
const stateKey = "birthdayMusicState";
const sessionKey = "birthdayMusicSession";

if (music) {

    /*
     * Create a unique session for this website visit.
     * This prevents an old saved position from being reused
     * when the website is opened again.
     */
    if (!sessionStorage.getItem(sessionKey)) {

        sessionStorage.setItem(sessionKey, "active");

        // Start completely fresh
        sessionStorage.removeItem(timeKey);
        sessionStorage.removeItem(stateKey);
    }


    const savedTime =
        sessionStorage.getItem(timeKey);

    const savedState =
        sessionStorage.getItem(stateKey);


    // =====================================================
    // RESTORE MUSIC POSITION + CONTINUE MUSIC
    // =====================================================

    music.addEventListener("loadedmetadata", () => {

        if (savedTime) {

            const time =
                Number(savedTime);

            if (
                !isNaN(time) &&
                time >= 0 &&
                time < music.duration
            ) {

                music.currentTime =
                    time;

            }
        }


        // Continue music on next page
        if (savedState === "playing") {

            music.play().catch(() => {

                /*
                 * Browser autoplay restriction.
                 *
                 * The music position is already restored.
                 * If autoplay is blocked, the existing music
                 * button can start it without losing the position.
                 */

            });

        }

    });


    // =====================================================
    // FALLBACK WHEN AUDIO IS ALREADY READY
    // =====================================================

    music.addEventListener("canplay", () => {

        if (
            savedState === "playing" &&
            music.paused
        ) {

            music.play().catch(() => {});

        }

    });


    // =====================================================
    // SAVE CURRENT POSITION
    // =====================================================

    setInterval(() => {

        if (
            !music.paused &&
            !music.ended
        ) {

            sessionStorage.setItem(
                timeKey,
                music.currentTime
            );

        }

    }, 300);


    // =====================================================
    // SAVE POSITION WHEN CHANGING PAGE
    // =====================================================

    window.addEventListener("pagehide", () => {

        if (!music.ended) {

            sessionStorage.setItem(
                timeKey,
                music.currentTime
            );

        }

    });


    // =====================================================
    // PLAYING
    // =====================================================

    music.addEventListener("play", () => {

        sessionStorage.setItem(
            stateKey,
            "playing"
        );


        if (toggle) {

            toggle.classList.add("playing");


            const icon =
                toggle.querySelector(
                    ".music-icon"
                );


            if (icon) {

                icon.textContent =
                    "🎵";

            }

        }

    });


    // =====================================================
    // PAUSED
    // =====================================================

    music.addEventListener("pause", () => {

        if (!music.ended) {

            sessionStorage.setItem(
                stateKey,
                "paused"
            );

        }


        if (toggle) {

            toggle.classList.remove("playing");


            const icon =
                toggle.querySelector(
                    ".music-icon"
                );


            if (icon) {

                icon.textContent =
                    "🔇";

            }

        }

    });


    // =====================================================
    // SONG FINISHED → RESTART
    // =====================================================

    music.addEventListener("ended", () => {

        sessionStorage.removeItem(
            timeKey
        );


        sessionStorage.setItem(
            stateKey,
            "playing"
        );


        music.currentTime = 0;


        music.play().catch(() => {});

    });


    // =====================================================
    // MUSIC BUTTON
    // =====================================================

    if (toggle) {

        toggle.addEventListener("click", () => {

            if (music.paused) {

                music.play().catch(() => {});

            } else {

                music.pause();

            }

        });

    }

}
