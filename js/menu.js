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
        setAlarm(false);
    }
}

document.querySelector('.menuHandleButton').addEventListener('click', toggleMenu);