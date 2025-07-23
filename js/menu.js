let menuOpen = false;

function toggleMenu() {
    menuOpen = !menuOpen;
    const handle = document.querySelector('.menuHandle');
    const menu = document.querySelector('.menu');
    if (menuOpen) {
        handle.classList.remove('close');
        handle.classList.add('open');
        menu.classList.remove('close');
        menu.classList.add('open');
    } else {
        handle.classList.remove('open');
        handle.classList.add('close');
        menu.classList.remove('open');
        menu.classList.add('close');
        const blocker = document.querySelector('.blocker');
        blocker.classList.remove('show');
        blocker.classList.add('hide');
        setAlarm(false);
    }
}

function showBlocker(){
    if (menuOpen || true) {
        const blocker = document.querySelector('.blocker');
        blocker.classList.remove('hide');
        blocker.classList.add('show');
    }
}