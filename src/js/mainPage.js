import dataItems from "../JSON/slider.json";
import {Slider} from "./Modules/Slider";
// import * as events from "node:events";


window.onload = function () {
    // Create slider
    createSlider();
    // Burger menu
    addBurgerButtonHandler();

}

const createSlider = () => {
    let slider = new Slider(dataItems, {});
    slider.renderSlider();
}

const addBurgerButtonHandler = () => {
    let isShowed = false;
    let burgerButton = document.querySelector(".burger");
    let menuButton = document.querySelector('.header__menu');
    let clickedWidth;

    burgerButton.addEventListener("click", (e) => {
        changeBurgerButton(burgerButton);
        toggleBurgerMenu(isShowed);
        isShowed = !isShowed;
        clickedWidth = window.innerWidth;
    })

    window.addEventListener("resize", (e) => {
        if (checkCorrectResize(isShowed, window.innerWidth)) {
            toggleBurgerMenu(true);
            changeBurgerButton(burgerButton);
            menuButton.style.display = "flex";
        } else if(window.innerWidth >= 768) {
            menuButton.style.display = "flex";
        } else if (window.innerWidth <= 768 && !isShowed) {
            menuButton.style.display = "none";
        }
    })
}

const changeBurgerButton = (button) => {
    let arrayLines = Array.from(button.children);
    if (arrayLines[0].style.marginBottom == "-5px") {
        arrayLines.forEach((item, index) => {
            if (index == 0) {
                item.style.marginBottom = "0px";
                item.style.transform = "rotate(0deg)";
            } else {
                item.style.marginTop = "0px";
                item.style.transform = "rotate(0deg)";
            }
        })
    } else {
        arrayLines.forEach((item, index) => {
            if (index == 0) {
                item.style.marginBottom = "-5px";
                item.style.transform = "rotate(45deg)";
            } else {
                item.style.marginTop = "-5px";
                item.style.transform = "rotate(-45deg)";

            }
        })
    }
}

const toggleBurgerMenu = (isShowed) => {
    let body = document.body;
    let header = document.querySelector('.header');
    let navigation = document.querySelector('.navigation');
    let menuButton = document.querySelector('.header__menu');
    let headerNavigation = document.querySelector('.header__navigation');
    if (!isShowed) {
        // Change body styles
        body.style.cssText = 'overflow: hidden;';
        // Change header styles
        header.style.cssText = `
            position: fixed;
            top: 0;
            z-index: 999;
            background-color: #e1d4c9;
            overflow: hidden;
            width: 100%;
            height: 100vh;
        `;
        // Change navigation styles
        navigation.style.cssText = `
            display: grid;
            position: absolute;
            top: 81px;
            left: 0;
            padding-top: 30px;
            width: 100%;
            grid-template-columns: 1fr;
            justify-items: center;
            row-gap: 40px;
            align-content: start;
        `;
        // Add menu button to navigation block
        menuButton.remove();
        navigation.append(menuButton);
        menuButton.style.display = "flex";
    } else {
        body.style.cssText = '';
        header.style.cssText = '';
        navigation.style.cssText = '';
        menuButton.remove();
        headerNavigation.after(menuButton);
        menuButton.style.display = "none";

    }
}

const checkCorrectResize = (isShowed, currentWidth) => {
    if (isShowed && (currentWidth >= 768)) {
        return true;
    } else {
        return false;
    }
}