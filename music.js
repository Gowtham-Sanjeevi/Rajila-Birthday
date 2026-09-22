
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

    const music =
        document.getElementById("birthdayMusicPlayer");

    const toggle =
        document.getElementById("musicToggle");

    const icon =
        toggle?.querySelector(".music-icon");


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
            music.paused
                ? "🎵"
                : "🔊";
    }


    // ==================================================
    // SAVE CURRENT POSITION
    // ==================================================

    function savePosition() {

        const currentTime =
            music.currentTime;


        if (
            !Number.isFinite(currentTime) ||
            currentTime < 0
        ) {
            return;
        }


        localStorage.setItem(
            TIME_KEY,
            String(currentTime)
        );


        localStorage.setItem(
            STATE_KEY,
            music.paused
                ? "paused"
                : "playing"
        );


        sessionStorage.setItem(
            TIME_KEY,
            String(currentTime)
        );


        sessionStorage.setItem(
            STATE_KEY,
            music.paused
                ? "paused"
                : "playing"
        );

    }


    // ==================================================
    // GET SAVED TIME
    // ==================================================

    function getSavedTime() {

        let savedTime =
            sessionStorage.getItem(
                TIME_KEY
            );


        if (
            savedTime === null
        ) {

            savedTime =
                localStorage.getItem(
                    TIME_KEY
                );

        }


        const time =
            parseFloat(savedTime);


        if (
            Number.isFinite(time) &&
            time >= 0
        ) {

            return time;

        }


        return 0;

    }


    // ==================================================
    // RESTORE POSITION
    // ==================================================

    function restorePosition() {

        const time =
            getSavedTime();


        if (
            Number.isFinite(music.duration) &&
            music.duration > 0 &&
            time >= 0 &&
            time < music.duration
        ) {

            try {

                music.currentTime =
                    time;


                console.log(
                    "↩️ Music restored:",
                    time
                );

            } catch (error) {

                console.log(
                    "⚠️ Could not restore position"
                );

            }

        }

    }


    // ==================================================
    // GET MUSIC STATE
    // ==================================================

    function getMusicState() {

        let state =
            sessionStorage.getItem(
                STATE_KEY
            );


        if (
            state === null
        ) {

            state =
                localStorage.getItem(
                    STATE_KEY
                );

        }


        return state;

    }


    // ==================================================
    // TRY PLAYING
    // ==================================================

    async function tryPlayMusic() {

        restorePosition();


        try {

            await music.play();


            console.log(
                "▶️ Music playing:",
                music.currentTime
            );


            updateButton();


            return true;


        } catch (error) {

            console.log(
                "⚠️ Automatic playback blocked"
            );


            updateButton();


            return false;

        }

    }


    // ==================================================
    // RESTORE MUSIC
    // ==================================================

    async function restoreMusic() {

        const state =
            getMusicState();


        if (
            state !== "playing"
        ) {

            updateButton();

            return;

        }


        await tryPlayMusic();

    }


    // ==================================================
    // AUDIO READY
    // ==================================================

    function audioReady() {

        restorePosition();

        restoreMusic();

    }


    if (
        music.readyState >= 1
    ) {

        audioReady();

    } else {

        music.addEventListener(
            "loadedmetadata",
            audioReady,
            {
                once: true
            }
        );

    }


    // ==================================================
    // SAVE POSITION WHILE PLAYING
    // ==================================================

    music.addEventListener(
        "timeupdate",
        function () {

            /*
             * Save frequently enough to keep the
             * position accurate without needing
             * another complicated system.
             */

            localStorage.setItem(
                TIME_KEY,
                String(music.currentTime)
            );


            sessionStorage.setItem(
                TIME_KEY,
                String(music.currentTime)
            );

        }
    );


    // ==================================================
    // PLAY EVENT
    // ==================================================

    music.addEventListener(
        "play",
        function () {

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
    // PAUSE EVENT
    // ==================================================

    music.addEventListener(
        "pause",
        function () {

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
            async function (event) {

                event.preventDefault();

                event.stopPropagation();


                // --------------------------------------
                // START MUSIC
                // --------------------------------------

                if (music.paused) {

                    /*
                     * IMPORTANT:
                     *
                     * Restore the position BEFORE
                     * calling play().
                     *
                     * This click is a user gesture,
                     * so the browser normally allows
                     * playback.
                     */

                    restorePosition();


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


                        console.log(
                            "▶️ Music started:",
                            music.currentTime
                        );


                    } catch (error) {

                        console.log(
                            "❌ Music play failed:",
                            error
                        );

                    }


                }

                // --------------------------------------
                // PAUSE MUSIC
                // --------------------------------------

                else {

                    music.pause();

                    savePosition();

                    updateButton();

                }

            }
        );

    }


    // ==================================================
    // SAVE BEFORE PAGE HIDDEN
    // ==================================================

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.visibilityState ===
                "hidden"
            ) {

                savePosition();

            }

        }
    );


    // ==================================================
    // SAVE BEFORE NAVIGATION
    // ==================================================

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
        function () {

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


    // ==================================================
    // INITIAL BUTTON STATE
    // ==================================================

    updateButton();


})();
