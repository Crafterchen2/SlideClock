//import Mexp from 'math-expression-evaluator';

//const mexp = new Mexp();

let menuOpen = false;

function toggleMenu() {
    menuOpen = !menuOpen;
    const handle = document.querySelector('.menuHandle');
    const menu = document.querySelector('.menu');
    const moody = document.querySelector('.moody');
    if (menuOpen) {
        handle.classList.remove('close');
        handle.classList.add('open');
        menu.classList.remove('close');
        menu.classList.add('open');
        moody.classList.remove('bright');
        moody.classList.add('dark');
    } else {
        handle.classList.remove('open');
        handle.classList.add('close');
        menu.classList.remove('open');
        menu.classList.add('close');
        moody.classList.remove('dark');
        moody.classList.add('bright');
    }
}

function appendToCalc(text) {
    document.querySelector(".calculatorIn").value += text;
}

function calc() {
    fromIn = document.querySelector(".calculatorIn").value;
    //fromIn = mexp.eval(fromIn);
    document.querySelector(".calculatorOut").textContent = ":= " + fromIn;
}

function backspace() {
    str = document.querySelector(".calculatorIn").value;
    if (str != "") document.querySelector(".calculatorIn").value = str.substring(0, str.length - 1);
}

document.querySelector('.menuHandleButton').addEventListener('click', toggleMenu);