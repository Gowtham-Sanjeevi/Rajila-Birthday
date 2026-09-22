
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






/* =========================================
   MUSIC
========================================= */

(function () {

    const music =
        document.getElementById(
            "birthdayMusicPlayer"
        );

    const toggle =
        document.getElementById(
            "musicToggle"
        );

    if (!music || !toggle) {
        return;
    }


    const icon =
        toggle.querySelector(
            ".music-icon"
        );


    /* =========================================
       STORAGE
    ========================================= */

    const timeKey =
        "birthdayMusicTime";

    const stateKey =
        "birthdayMusicState";

    const sessionKey =
        "birthdayMusicSession";


    /* =========================================
       NEW WEBSITE VISIT
    ========================================= */

    if (!sessionStorage.getItem(sessionKey)) {

        sessionStorage.setItem(
            sessionKey,
            "active"
        );

        sessionStorage.removeItem(
            timeKey
        );

        sessionStorage.removeItem(
            stateKey
        );

    }


    const savedTime =
        sessionStorage.getItem(
            timeKey
        );

    const savedState =
        sessionStorage.getItem(
            stateKey
        );


    /* =========================================
       RESTORE MUSIC POSITION
    ========================================= */

    music.addEventListener(
        "loadedmetadata",
        function () {

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


            /* ================================
               CONTINUE MUSIC
            ================================= */

            if (
                savedState === "playing"
            ) {

                music.play()
                    .then(function () {

                        toggle.classList.add(
                            "playing"
                        );

                        if (icon) {

                            icon.textContent =
                                "🎵";

                        }

                    })
                    .catch(function () {

                        /*
                         * Browser autoplay blocked.
                         *
                         * Position is already restored.
                         * Press the music button once.
                         */

                    });

            }

        }
    );


    /* =========================================
       SAVE POSITION EVERY 300ms
    ========================================= */

    setInterval(
        function () {

            if (
                !music.paused &&
                !music.ended
            ) {

                sessionStorage.setItem(
                    timeKey,
                    music.currentTime
                );

            }

        },
        300
    );


    /* =========================================
       SAVE BEFORE LEAVING PAGE
    ========================================= */

    window.addEventListener(
        "pagehide",
        function () {

            if (!music.ended) {

                sessionStorage.setItem(
                    timeKey,
                    music.currentTime
                );


                /*
                 * IMPORTANT:
                 *
                 * If music was playing,
                 * keep state as "playing".
                 */

                if (!music.paused) {

                    sessionStorage.setItem(
                        stateKey,
                        "playing"
                    );

                }

            }

        }
    );


    /* =========================================
       PLAY
    ========================================= */

    music.addEventListener(
        "play",
        function () {

            sessionStorage.setItem(
                stateKey,
                "playing"
            );


            toggle.classList.add(
                "playing"
            );


            if (icon) {

                icon.textContent =
                    "🎵";

            }

        }
    );


    /* =========================================
       PAUSE
    ========================================= */

    music.addEventListener(
        "pause",
        function () {

            if (!music.ended) {

                sessionStorage.setItem(
                    timeKey,
                    music.currentTime
                );

            }


            toggle.classList.remove(
                "playing"
            );


            if (icon) {

                icon.textContent =
                    "🔇";

            }

        }
    );


    /* =========================================
       MUSIC BUTTON
    ========================================= */

    toggle.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            if (music.paused) {

                music.play()
                    .then(function () {

                        sessionStorage.setItem(
                            stateKey,
                            "playing"
                        );


                        toggle.classList.add(
                            "playing"
                        );


                        if (icon) {

                            icon.textContent =
                                "🎵";

                        }

                    })
                    .catch(function () {

                        if (icon) {

                            icon.textContent =
                                "🔇";

                        }

                    });

            } else {

                music.pause();


                sessionStorage.setItem(
                    stateKey,
                    "paused"
                );


                sessionStorage.setItem(
                    timeKey,
                    music.currentTime
                );


                toggle.classList.remove(
                    "playing"
                );


                if (icon) {

                    icon.textContent =
                        "🔇";

                }

            }

        }
    );


    /* =========================================
       SONG FINISHED
    ========================================= */

    music.addEventListener(
        "ended",
        function () {

            sessionStorage.removeItem(
                timeKey
            );


            sessionStorage.setItem(
                stateKey,
                "playing"
            );


            music.currentTime = 0;


            music.play()
                .then(function () {

                    toggle.classList.add(
                        "playing"
                    );


                    if (icon) {

                        icon.textContent =
                            "🎵";

                    }

                })
                .catch(function () {});

        }
    );


})();
