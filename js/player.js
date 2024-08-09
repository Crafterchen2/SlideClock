let mediaPlaying = false;

// Funktion zum Aktualisieren der Track-Informationen auf der Webseite
const noTrackJpg = "resources/noTrack.jpg";

function updateTrackInfo(trackInfo) {
    if (trackInfo) {
        document.querySelector('.thumbnail').src = trackInfo.thumbnail ?? noTrackJpg;
        document.querySelector('.title').textContent = trackInfo.title ?? "Kein Titel";
        document.querySelector('.desc').textContent = trackInfo.artist ?? "Kein Kein Künstler";
    } else {
        document.querySelector('.thumbnail').src = noTrackJpg;
        document.querySelector('.title').textContent = "Kein Titel";
        document.querySelector('.desc').textContent = "Kein Kein Künstler";
    }
}

// Funktion zum Ein- oder Ausblenden des Players
function togglePlayerVisibility() {
    const playerElement = document.querySelector('.player');
    if (mediaPlaying || settings.player.force) {
        playerElement.classList.remove('hide');
        playerElement.classList.add('show');
    } else {
        playerElement.classList.remove('show');
        playerElement.classList.add('hide');
    }
}

// Funktion zum Umwandeln von Hex-Farbe in RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// Funktion zum Ändern der Hintergrundfarbe des Players
function changePlayerBackgroundColor(hexColorP, hexColorS) {
    const colorP = hexToRgb(hexColorP);
    const colorS = hexToRgb(hexColorS);
    const playerElement = document.querySelector('.player');
    p = settings.player.pColorScale;
    s = settings.player.sColorScale;
    playerElement.style.backgroundImage = `linear-gradient(to right,
                rgba(${colorP.r * p.r}, ${colorP.g * p.g}, ${colorP.b * p.b}, ${settings.player.pOpacity}),
                rgba(${colorS.r * s.r}, ${colorS.g * s.g}, ${colorS.b * s.b}, ${settings.player.sOpacity}))`;
}

function wallpaperMediaThumbnailListener(event) {
    if (mediaPlaying) {
        document.querySelector('.thumbnail').src = event.thumbnail ?? noTrackJpg;
        changePlayerBackgroundColor(event.primaryColor ?? "#000000", event.secondaryColor ?? "#000000");
    }
    togglePlayerVisibility();
}

function wallpaperMediaPropertiesListener(event) {
    mediaPlaying = (event.title !== "" && settings.player.enabled) || settings.player.force;
    if (mediaPlaying) {
        document.querySelector('.title').textContent = event.title ?? "Kein Titel";
        document.querySelector('.desc').textContent = event.artist ?? "Kein Kein Künstler";
    }
    togglePlayerVisibility();
}

try {
    window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);

    window.wallpaperRegisterMediaPropertiesListener(wallpaperMediaPropertiesListener);
} catch {
    console.log("sliderClock.js -> This doesn't seem to be the Wallpaper Engine.");
}

updateTrackInfo(null);
togglePlayerVisibility();