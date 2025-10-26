let mediaPlaying = false;

// Funktion zum Aktualisieren der Track-Informationen auf der Webseite
const noTrackJpg = "resources/noTrack.jpg";

function updateTrackInfo(trackInfo) {
    if (trackInfo) {
        document.querySelector('.thumbnail').src = trackInfo.thumbnail ?? noTrackJpg;
        document.querySelector('.title').textContent = trackInfo.title ?? "Kein Titel";
        document.querySelector('.desc').textContent = trackInfo.artist ?? "Kein Künstler";
    } else {
        document.querySelector('.thumbnail').src = noTrackJpg;
        document.querySelector('.title').textContent = "Kein Titel";
        document.querySelector('.desc').textContent = "Kein Künstler";
    }
}

// Funktion zum Ein- oder Ausblenden des Players
function togglePlayerVisibility() {
    const playerElement = document.querySelector('.player');
    if (mediaPlaying || settings.player.force) {
        playerElement.classList.remove('hide');
        playerElement.classList.add('show');
    } else {
        if (playerBig) togglePlayerBig();
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
    let p = settings.player.pColorScale;
    let s = settings.player.sColorScale;
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

let playerBig = false;

function togglePlayerBig(){
    const player = document.querySelector('.playerContainer');
    const menu = document.querySelector('.menuHandleButton')
    if (playerBig) {
        menu.classList.remove('hide')
        menu.classList.add('show')
        player.classList.remove('big');
        player.classList.add('small');
    } else {
        if (menuOpen) toggleMenu();
        menu.classList.remove('show')
        menu.classList.add('hide')
        player.classList.remove('small');
        player.classList.add('big');
    }
    playerBig = !playerBig;
}

try {
    window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);

    window.wallpaperRegisterMediaPropertiesListener(wallpaperMediaPropertiesListener);
} catch {
    console.log("sliderClock.js -> This doesn't seem to be the Wallpaper Engine.");
}

updateTrackInfo(null);