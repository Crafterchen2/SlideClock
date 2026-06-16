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

function setPlayerVisibility(visible) {
    const playerElement = document.querySelector('.player');
    if (visible) {
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

function changeOrbColor(hexColorP, hexColorS, hexColorT){
    const gradHead = "radial-gradient(circle, rgba(";
    const gradTail = ") 0%, transparent 70%)";
    const orb1 = document.querySelector('.orb1');
    const orb2 = document.querySelector('.orb2');
    const orb3 = document.querySelector('.orb3');
    const orb4 = document.querySelector('.orb4');
    let orb1rgb = (hexColorP != null) ? hexToRgb(hexColorP) : {r: 124, g: 58, b: 237};
    let orb2rgb = (hexColorS != null) ? hexToRgb(hexColorS) : {r: 37, g: 99, b: 235};
    let orb3rgb = (hexColorT != null) ? hexToRgb(hexColorT) : {r: 6, g: 182, b: 212};
    let orb4rgb = {r: 139, g: 92, b: 246};
    if (hexColorP != null || hexColorS != null || hexColorT != null) {
        orb4rgb = {r: 0, g: 0, b: 0};
        let count = 0;
        if (hexColorP != null) {
            let c = hexToRgb(hexColorP);
            orb4rgb.r += c.r;
            orb4rgb.g += c.g;
            orb4rgb.b += c.b;
            count++;
        }
        if (hexColorS != null) {
            let c = hexToRgb(hexColorS);
            orb4rgb.r += c.r;
            orb4rgb.g += c.g;
            orb4rgb.b += c.b;
            count++;
        }
        if (hexColorT != null) {
            let c = hexToRgb(hexColorT);
            orb4rgb.r += c.r;
            orb4rgb.g += c.g;
            orb4rgb.b += c.b;
            count++;
        }
        orb4rgb.r /= count;
        orb4rgb.g /= count;
        orb4rgb.b /= count;
    }
    orb1.style.background = `${gradHead}${orb1rgb.r}, ${orb1rgb.g}, ${orb1rgb.b}, 0.25${gradTail}`;
    orb2.style.background = `${gradHead}${orb2rgb.r}, ${orb2rgb.g}, ${orb2rgb.b}, 0.21${gradTail}`;
    orb3.style.background = `${gradHead}${orb3rgb.r}, ${orb3rgb.g}, ${orb3rgb.b}, 0.19${gradTail}`;
    orb4.style.background = `${gradHead}${orb4rgb.r}, ${orb4rgb.g}, ${orb4rgb.b}, 0.15${gradTail}`;
}

function wallpaperMediaThumbnailListener(event) {
    if (mediaPlaying) {
        document.querySelector('.thumbnail').src = event.thumbnail ?? noTrackJpg;
        changePlayerBackgroundColor(event.primaryColor ?? "#000000", event.secondaryColor ?? "#000000");
        if (settings.player.affectOrbs) changeOrbColor(event.primaryColor, event.secondaryColor, event.tertiaryColor);
    }
    if (settings.player.enabled) {
        togglePlayerVisibility();
    }
}

function wallpaperMediaPropertiesListener(event) {
    mediaPlaying = event.title !== "" || settings.player.force;
    if (mediaPlaying) {
        document.querySelector('.title').textContent = event.title ?? "Kein Titel";
        document.querySelector('.desc').textContent = event.artist ?? "Kein Kein Künstler";
    }
    if (settings.player.enabled) {
        togglePlayerVisibility();
    }
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