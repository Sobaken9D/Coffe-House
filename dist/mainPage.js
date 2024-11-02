/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Modules/Slider.js":
/*!**********************************!*\
  !*** ./src/js/Modules/Slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Slider: () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
    constructor(data, {autoSlide = true, timeAutoSlide = 3000}) {
        // Build variables
        this.sliderWrapper = "";
        this.sliderContainer = "";
        this.sliderButtonPrev = "";
        this.sliderButtonNext = "";
        this.sliderItems = "";
        this.currentSlide = "";
        this.sliderCounter = "";
        this.clickPrevOrNextButton = true;

        this.sliderCount = 0;

        // Data variables
        this.data = data;

        // Auto-slide variables
        this.autoSlide = autoSlide;
        this.timeAutoSlide = timeAutoSlide;

        // Touch and mouse variables
        this.isDragging = 0;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationID = 0;
        this.currentIndex = 0;
    }

    renderSlider() {
        // Get slider wrapper
        this.sliderWrapper = this.getSliderWrapper();
        // Create sliderContainer block
        this.sliderContainer = this.createDomNode("div", "slider__container");
        // Create buttons
        this.sliderButtonPrev = this.createButton("left");
        this.sliderButtonNext = this.createButton("right");
        // Create current slide
        this.currentSlide = this.createDomNode("div", "current-slide");
        // Create items block
        this.sliderItems = this.createDomNode("div", "slider-items");
        // Append items
        let items = this.getSliderItems(this.data);
        this.sliderItems.append(...items);
        // Create counter block
        this.sliderCounter = this.createCounterBlock();
        // Add items-line to current slide
        this.currentSlide.append(this.sliderItems);
        // Add blocks to slider container
        this.sliderContainer.append(this.sliderButtonPrev, this.currentSlide, this.sliderCounter, this.sliderButtonNext);
        // Add blocks to slider wrapper
        this.sliderWrapper.append(this.sliderContainer);
        // Add buttons handler
        this.buildEvents();
        this.addCountersProgress();
        // Timer slider
        this.addAutoSlide();
        // Add touch and mouse events
        this.addTouchEvents();

    }

    getSliderWrapper() {
        return document.querySelector(".slider__wrapper");
    }

    createDomNode(element, ...classes) {
        let node = document.createElement(element);
        node.classList.add(...classes);
        return node;
    }

    createButton(direction) {
        let button = this.createDomNode("button", "button", "button-arrow", `button-arrow_${direction}`);
        let object = `
            <object data="assets/img/slider/arrow-${direction}.svg" type="image/svg+xml" class="button-arrow-object">
                Your browser does not support SVG
            </object>
        `;
        button.innerHTML = object;
        return button;
    }

    createCounterBlock() {
        let counterBlock = this.createDomNode("div", "slider__counter", "counter");
        for (let i = 0; i < this.data.length; i++) {
            let progressBar = this.createDomNode("div", "counter__progress-bar");
            let counterLine = this.createDomNode("div", "counter__line");
            counterLine.append(progressBar);
            counterBlock.append(counterLine);
        }
        return counterBlock;
    }

    getSliderItems(data) {
        let arrItems = [];
        for (let i = 0; i < this.data.length; i++) {
            let item = this.createDomNode("div", "slider-item");
            let itemImage = this.createDomNode("img", "slider__image");
            itemImage.alt = `${data[i].type}-${data[i].id}`;
            itemImage.src = `${data[i].urlToImage}`;
            let infoBlock = this.createDomNode("div", "slider__info");
            let infoTitle = this.createDomNode("h5", "drink__title");
            infoTitle.innerText = `${data[i].title}`;
            let infoText = this.createDomNode("p", "drink__description");
            infoText.innerText = `${data[i].description}`;
            let infoPrice = this.createDomNode("p", "drink__price");
            infoPrice.innerText = `${data[i].price}`;
            infoBlock.append(infoTitle, infoText, infoPrice);
            item.append(itemImage, infoBlock);
            arrItems.push(item);
        }
        return arrItems;
    }

    buildEvents() {
        this.sliderWrapper.addEventListener("click", (e) => {
            if (e.target.closest(".button-arrow_left")) {
                this.prevSlide();
            } else if (e.target.closest(".button-arrow_right")) {
                this.nextSlide();
            }
        })
    }

    prevSlide() {
        this.clickPrevOrNextButton = true;
        clearInterval(this.interval);
        this.sliderCount--;
        if (this.sliderCount < 0) {
            this.sliderCount = this.data.length - 1;
        }
        this.rollSlider();
        this.addAutoSlide();
    }

    nextSlide() {
        this.clickPrevOrNextButton = true;
        clearInterval(this.interval);
        this.sliderCount++;
        if (this.sliderCount >= this.data.length) {
            this.sliderCount = 0;
        }
        this.rollSlider();
        this.addAutoSlide();
    }

    rollSlider() {
        let sliderWidth = document.querySelector(".slider-item").offsetWidth;
        this.sliderItems.style.transform = `translateX(${-this.sliderCount * sliderWidth}px)`;
    }

    addAutoSlide() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.timeAutoSlide);
        this.addCountersProgress();
    }

    addCountersProgress() {
        let arrCounters = Array.from(this.sliderCounter.children);
        let currentCounter = arrCounters[this.sliderCount].firstChild;
        let counterWidth = 0;

        let interval = setInterval(() => {
            if (this.clickPrevOrNextButton || counterWidth > 100) {
                clearInterval(interval);
                this.clickPrevOrNextButton = false;
                let decreaseInterval = setInterval(() => {
                    if (counterWidth <= 0) {
                        clearInterval(decreaseInterval);
                    } else {
                        counterWidth--;
                        currentCounter.style.width = `${counterWidth}%`;
                    }
                }, 1);
            }else if (this.isDragging) {
                clearInterval(interval);
            }
            else {
                counterWidth++;
                currentCounter.style.width = `${counterWidth}%`;
            }
        }, this.timeAutoSlide / 100);
    }

    addTouchEvents() {
        let slides = Array.from(document.querySelectorAll(".slider-item"));
        slides.forEach((slide, index) => {
            let slideImage = slide.querySelector("img");
            slideImage.addEventListener("dragstart", (e) => e.preventDefault());

            slide.addEventListener("touchstart", this.touchStart(index));
            slide.addEventListener("touchend", this.touchEnd.bind(this));
            slide.addEventListener("touchmove", this.touchMove.bind(this));

            slide.addEventListener("mousedown", this.touchStart(index));
            slide.addEventListener("mouseup", this.touchEnd.bind(this));
            slide.addEventListener("mouseleave", this.touchEnd.bind(this));
            slide.addEventListener("mousemove", this.touchMove.bind(this));
        })
    }

    touchStart(index) {
        return (event) => {
            clearInterval(this.interval);

            this.isDragging = true;
            this.currentIndex = index;
            this.startPos = this.getPositionX(event);

            this.animationID = requestAnimationFrame(this.animation);
        }
    }

    touchMove(event) {
        if (this.isDragging) {
            let currentPosition = this.getPositionX(event);
            this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
        }
    }

    touchEnd(event) {
        this.isDragging = false;
        cancelAnimationFrame(this.animationID);

        let movedBy = this.currentTranslate - this.prevTranslate;


        if (movedBy < -100) {
            this.deletePrevProgressBar();

            this.sliderCount += 1;

            if (this.sliderCount >= this.data.length) {
                this.sliderCount = 0;
            }

            this.addAutoSlide();

        }
        else if (movedBy > 100) {
            this.deletePrevProgressBar();

            this.sliderCount -= 1;

            if (this.sliderCount < 0) {
                this.sliderCount = this.data.length - 1;
            }

            this.addAutoSlide();
        } else {
            this.continueCurrentProgressBar();
        }

        // this.addAutoSlide();

        this.setPositionByIndex();
    }

    animation = () => {
        this.setSliderPosition();
        if (this.isDragging) {
            requestAnimationFrame(this.animation);
        }
    }

    setSliderPosition() {
        let slider = document.querySelector(".slider-items");

        slider.style.transform = `translateX(${this.currentTranslate}px)`;
    }

    getPositionX(event) {
        return event.type.includes("mouse") ? event.clientX : event.touches[0].clientX;
    }

    setPositionByIndex() {
        let sliderWidth = document.querySelector(".slider-item").offsetWidth;
        this.currentTranslate = this.sliderCount * -sliderWidth;
        this.prevTranslate = this.currentTranslate;
        this.setSliderPosition();
    }

    deletePrevProgressBar() {
        let arrCounters = Array.from(this.sliderCounter.children);
        let currentCounter = arrCounters[this.sliderCount].firstChild;
        let counterWidth = (currentCounter.style.width).slice(0, -1);

        let decreaseInterval = setInterval(() => {
            if (counterWidth <= 0) {
                clearInterval(decreaseInterval);
            } else {
                counterWidth--;
                currentCounter.style.width = `${counterWidth}%`;
            }
        }, 1);
    }

    continueCurrentProgressBar() {
        let arrCounters = Array.from(this.sliderCounter.children);
        let currentCounter = arrCounters[this.sliderCount].firstChild;
        let counterWidth = (currentCounter.style.width).slice(0, -1);
    }
}

/***/ }),

/***/ "./src/JSON/slider.json":
/*!******************************!*\
  !*** ./src/JSON/slider.json ***!
  \******************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"id":1,"type":"coffe","title":"S’mores Frappuccino","description":"This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.","urlToImage":"assets/img/slider/coffee-slider-1.png","price":"$5.50"},{"id":2,"type":"coffe","title":"Caramel Macchiato","description":"Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.","urlToImage":"assets/img/slider/coffee-slider-2.png","price":"$5.00"},{"id":3,"type":"coffe","title":"Ice coffee","description":"A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.","urlToImage":"assets/img/slider/coffee-slider-3.png","price":"$4.50"}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/js/mainPage.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _JSON_slider_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../JSON/slider.json */ "./src/JSON/slider.json");
/* harmony import */ var _Modules_Slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modules/Slider */ "./src/js/Modules/Slider.js");


// import * as events from "node:events";


window.onload = function () {
    // Create slider
    createSlider();
    // Burger menu
    addBurgerButtonHandler();

}

const createSlider = () => {
    let slider = new _Modules_Slider__WEBPACK_IMPORTED_MODULE_1__.Slider(_JSON_slider_json__WEBPACK_IMPORTED_MODULE_0__, {});
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
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsQzs7Ozs7Ozs7O0FDM0hBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29mZmUtaG91c2UvLi9zcmMvanMvTW9kdWxlcy9TbGlkZXIuanMiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NvZmZlLWhvdXNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS8uL3NyYy9qcy9tYWluUGFnZS5qcyIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS8uL3NyYy9zYXNzL3N0eWxlLnNjc3M/M2FjNCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU2xpZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGRhdGEsIHthdXRvU2xpZGUgPSB0cnVlLCB0aW1lQXV0b1NsaWRlID0gMzAwMH0pIHtcclxuICAgICAgICAvLyBCdWlsZCB2YXJpYWJsZXNcclxuICAgICAgICB0aGlzLnNsaWRlcldyYXBwZXIgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNsaWRlckJ1dHRvblByZXYgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQnV0dG9uTmV4dCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJJdGVtcyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQ291bnRlciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jbGlja1ByZXZPck5leHRCdXR0b24gPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlckNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgLy8gRGF0YSB2YXJpYWJsZXNcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICAvLyBBdXRvLXNsaWRlIHZhcmlhYmxlc1xyXG4gICAgICAgIHRoaXMuYXV0b1NsaWRlID0gYXV0b1NsaWRlO1xyXG4gICAgICAgIHRoaXMudGltZUF1dG9TbGlkZSA9IHRpbWVBdXRvU2xpZGU7XHJcblxyXG4gICAgICAgIC8vIFRvdWNoIGFuZCBtb3VzZSB2YXJpYWJsZXNcclxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhcnRQb3MgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRyYW5zbGF0ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5wcmV2VHJhbnNsYXRlID0gMDtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbklEID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU2xpZGVyKCkge1xyXG4gICAgICAgIC8vIEdldCBzbGlkZXIgd3JhcHBlclxyXG4gICAgICAgIHRoaXMuc2xpZGVyV3JhcHBlciA9IHRoaXMuZ2V0U2xpZGVyV3JhcHBlcigpO1xyXG4gICAgICAgIC8vIENyZWF0ZSBzbGlkZXJDb250YWluZXIgYmxvY2tcclxuICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lciA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcInNsaWRlcl9fY29udGFpbmVyXCIpO1xyXG4gICAgICAgIC8vIENyZWF0ZSBidXR0b25zXHJcbiAgICAgICAgdGhpcy5zbGlkZXJCdXR0b25QcmV2ID0gdGhpcy5jcmVhdGVCdXR0b24oXCJsZWZ0XCIpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQnV0dG9uTmV4dCA9IHRoaXMuY3JlYXRlQnV0dG9uKFwicmlnaHRcIik7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGN1cnJlbnQgc2xpZGVcclxuICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZSA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcImN1cnJlbnQtc2xpZGVcIik7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGl0ZW1zIGJsb2NrXHJcbiAgICAgICAgdGhpcy5zbGlkZXJJdGVtcyA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcInNsaWRlci1pdGVtc1wiKTtcclxuICAgICAgICAvLyBBcHBlbmQgaXRlbXNcclxuICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLmdldFNsaWRlckl0ZW1zKHRoaXMuZGF0YSk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJJdGVtcy5hcHBlbmQoLi4uaXRlbXMpO1xyXG4gICAgICAgIC8vIENyZWF0ZSBjb3VudGVyIGJsb2NrXHJcbiAgICAgICAgdGhpcy5zbGlkZXJDb3VudGVyID0gdGhpcy5jcmVhdGVDb3VudGVyQmxvY2soKTtcclxuICAgICAgICAvLyBBZGQgaXRlbXMtbGluZSB0byBjdXJyZW50IHNsaWRlXHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUuYXBwZW5kKHRoaXMuc2xpZGVySXRlbXMpO1xyXG4gICAgICAgIC8vIEFkZCBibG9ja3MgdG8gc2xpZGVyIGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLnNsaWRlckJ1dHRvblByZXYsIHRoaXMuY3VycmVudFNsaWRlLCB0aGlzLnNsaWRlckNvdW50ZXIsIHRoaXMuc2xpZGVyQnV0dG9uTmV4dCk7XHJcbiAgICAgICAgLy8gQWRkIGJsb2NrcyB0byBzbGlkZXIgd3JhcHBlclxyXG4gICAgICAgIHRoaXMuc2xpZGVyV3JhcHBlci5hcHBlbmQodGhpcy5zbGlkZXJDb250YWluZXIpO1xyXG4gICAgICAgIC8vIEFkZCBidXR0b25zIGhhbmRsZXJcclxuICAgICAgICB0aGlzLmJ1aWxkRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDb3VudGVyc1Byb2dyZXNzKCk7XHJcbiAgICAgICAgLy8gVGltZXIgc2xpZGVyXHJcbiAgICAgICAgdGhpcy5hZGRBdXRvU2xpZGUoKTtcclxuICAgICAgICAvLyBBZGQgdG91Y2ggYW5kIG1vdXNlIGV2ZW50c1xyXG4gICAgICAgIHRoaXMuYWRkVG91Y2hFdmVudHMoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2xpZGVyV3JhcHBlcigpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXJfX3dyYXBwZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRG9tTm9kZShlbGVtZW50LCAuLi5jbGFzc2VzKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCdXR0b24oZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImJ1dHRvblwiLCBcImJ1dHRvblwiLCBcImJ1dHRvbi1hcnJvd1wiLCBgYnV0dG9uLWFycm93XyR7ZGlyZWN0aW9ufWApO1xyXG4gICAgICAgIGxldCBvYmplY3QgPSBgXHJcbiAgICAgICAgICAgIDxvYmplY3QgZGF0YT1cImFzc2V0cy9pbWcvc2xpZGVyL2Fycm93LSR7ZGlyZWN0aW9ufS5zdmdcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiIGNsYXNzPVwiYnV0dG9uLWFycm93LW9iamVjdFwiPlxyXG4gICAgICAgICAgICAgICAgWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgU1ZHXHJcbiAgICAgICAgICAgIDwvb2JqZWN0PlxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IG9iamVjdDtcclxuICAgICAgICByZXR1cm4gYnV0dG9uO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvdW50ZXJCbG9jaygpIHtcclxuICAgICAgICBsZXQgY291bnRlckJsb2NrID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiZGl2XCIsIFwic2xpZGVyX19jb3VudGVyXCIsIFwiY291bnRlclwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NCYXIgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJjb3VudGVyX19wcm9ncmVzcy1iYXJcIik7XHJcbiAgICAgICAgICAgIGxldCBjb3VudGVyTGluZSA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcImNvdW50ZXJfX2xpbmVcIik7XHJcbiAgICAgICAgICAgIGNvdW50ZXJMaW5lLmFwcGVuZChwcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgICAgIGNvdW50ZXJCbG9jay5hcHBlbmQoY291bnRlckxpbmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY291bnRlckJsb2NrO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNsaWRlckl0ZW1zKGRhdGEpIHtcclxuICAgICAgICBsZXQgYXJySXRlbXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcInNsaWRlci1pdGVtXCIpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbUltYWdlID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiaW1nXCIsIFwic2xpZGVyX19pbWFnZVwiKTtcclxuICAgICAgICAgICAgaXRlbUltYWdlLmFsdCA9IGAke2RhdGFbaV0udHlwZX0tJHtkYXRhW2ldLmlkfWA7XHJcbiAgICAgICAgICAgIGl0ZW1JbWFnZS5zcmMgPSBgJHtkYXRhW2ldLnVybFRvSW1hZ2V9YDtcclxuICAgICAgICAgICAgbGV0IGluZm9CbG9jayA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcInNsaWRlcl9faW5mb1wiKTtcclxuICAgICAgICAgICAgbGV0IGluZm9UaXRsZSA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImg1XCIsIFwiZHJpbmtfX3RpdGxlXCIpO1xyXG4gICAgICAgICAgICBpbmZvVGl0bGUuaW5uZXJUZXh0ID0gYCR7ZGF0YVtpXS50aXRsZX1gO1xyXG4gICAgICAgICAgICBsZXQgaW5mb1RleHQgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJwXCIsIFwiZHJpbmtfX2Rlc2NyaXB0aW9uXCIpO1xyXG4gICAgICAgICAgICBpbmZvVGV4dC5pbm5lclRleHQgPSBgJHtkYXRhW2ldLmRlc2NyaXB0aW9ufWA7XHJcbiAgICAgICAgICAgIGxldCBpbmZvUHJpY2UgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJwXCIsIFwiZHJpbmtfX3ByaWNlXCIpO1xyXG4gICAgICAgICAgICBpbmZvUHJpY2UuaW5uZXJUZXh0ID0gYCR7ZGF0YVtpXS5wcmljZX1gO1xyXG4gICAgICAgICAgICBpbmZvQmxvY2suYXBwZW5kKGluZm9UaXRsZSwgaW5mb1RleHQsIGluZm9QcmljZSk7XHJcbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kKGl0ZW1JbWFnZSwgaW5mb0Jsb2NrKTtcclxuICAgICAgICAgICAgYXJySXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFyckl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVyV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnV0dG9uLWFycm93X2xlZnRcIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldlNsaWRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xvc2VzdChcIi5idXR0b24tYXJyb3dfcmlnaHRcIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByZXZTbGlkZSgpIHtcclxuICAgICAgICB0aGlzLmNsaWNrUHJldk9yTmV4dEJ1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgICAgICB0aGlzLnNsaWRlckNvdW50LS07XHJcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVyQ291bnQgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyQ291bnQgPSB0aGlzLmRhdGEubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb2xsU2xpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5hZGRBdXRvU2xpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0U2xpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja1ByZXZPck5leHRCdXR0b24gPSB0cnVlO1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJDb3VudCsrO1xyXG4gICAgICAgIGlmICh0aGlzLnNsaWRlckNvdW50ID49IHRoaXMuZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJDb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucm9sbFNsaWRlcigpO1xyXG4gICAgICAgIHRoaXMuYWRkQXV0b1NsaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcm9sbFNsaWRlcigpIHtcclxuICAgICAgICBsZXQgc2xpZGVyV2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlci1pdGVtXCIpLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIHRoaXMuc2xpZGVySXRlbXMuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstdGhpcy5zbGlkZXJDb3VudCAqIHNsaWRlcldpZHRofXB4KWA7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQXV0b1NsaWRlKCkge1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dFNsaWRlKCk7XHJcbiAgICAgICAgfSwgdGhpcy50aW1lQXV0b1NsaWRlKTtcclxuICAgICAgICB0aGlzLmFkZENvdW50ZXJzUHJvZ3Jlc3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRDb3VudGVyc1Byb2dyZXNzKCkge1xyXG4gICAgICAgIGxldCBhcnJDb3VudGVycyA9IEFycmF5LmZyb20odGhpcy5zbGlkZXJDb3VudGVyLmNoaWxkcmVuKTtcclxuICAgICAgICBsZXQgY3VycmVudENvdW50ZXIgPSBhcnJDb3VudGVyc1t0aGlzLnNsaWRlckNvdW50XS5maXJzdENoaWxkO1xyXG4gICAgICAgIGxldCBjb3VudGVyV2lkdGggPSAwO1xyXG5cclxuICAgICAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsaWNrUHJldk9yTmV4dEJ1dHRvbiB8fCBjb3VudGVyV2lkdGggPiAxMDApIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja1ByZXZPck5leHRCdXR0b24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBkZWNyZWFzZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyV2lkdGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGRlY3JlYXNlSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJXaWR0aC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q291bnRlci5zdHlsZS53aWR0aCA9IGAke2NvdW50ZXJXaWR0aH0lYDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYgKHRoaXMuaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyV2lkdGgrKztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb3VudGVyLnN0eWxlLndpZHRoID0gYCR7Y291bnRlcldpZHRofSVgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcy50aW1lQXV0b1NsaWRlIC8gMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb3VjaEV2ZW50cygpIHtcclxuICAgICAgICBsZXQgc2xpZGVzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNsaWRlci1pdGVtXCIpKTtcclxuICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzbGlkZUltYWdlID0gc2xpZGUucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcclxuICAgICAgICAgICAgc2xpZGVJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xyXG5cclxuICAgICAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50b3VjaFN0YXJ0KGluZGV4KSk7XHJcbiAgICAgICAgICAgIHNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLnRvdWNoRW5kLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICBzbGlkZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMudG91Y2hNb3ZlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnRvdWNoU3RhcnQoaW5kZXgpKTtcclxuICAgICAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy50b3VjaEVuZC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy50b3VjaEVuZC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLnRvdWNoTW92ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRvdWNoU3RhcnQoaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0UG9zID0gdGhpcy5nZXRQb3NpdGlvblgoZXZlbnQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25JRCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvdWNoTW92ZShldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb25YKGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VHJhbnNsYXRlID0gdGhpcy5wcmV2VHJhbnNsYXRlICsgY3VycmVudFBvc2l0aW9uIC0gdGhpcy5zdGFydFBvcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG91Y2hFbmQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbklEKTtcclxuXHJcbiAgICAgICAgbGV0IG1vdmVkQnkgPSB0aGlzLmN1cnJlbnRUcmFuc2xhdGUgLSB0aGlzLnByZXZUcmFuc2xhdGU7XHJcblxyXG5cclxuICAgICAgICBpZiAobW92ZWRCeSA8IC0xMDApIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVQcmV2UHJvZ3Jlc3NCYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyQ291bnQgKz0gMTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNsaWRlckNvdW50ID49IHRoaXMuZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZEF1dG9TbGlkZSgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobW92ZWRCeSA+IDEwMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVByZXZQcm9ncmVzc0JhcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJDb3VudCAtPSAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2xpZGVyQ291bnQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlckNvdW50ID0gdGhpcy5kYXRhLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQXV0b1NsaWRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb250aW51ZUN1cnJlbnRQcm9ncmVzc0JhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGhpcy5hZGRBdXRvU2xpZGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbkJ5SW5kZXgoKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTbGlkZXJQb3NpdGlvbigpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2xpZGVyUG9zaXRpb24oKSB7XHJcbiAgICAgICAgbGV0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyLWl0ZW1zXCIpO1xyXG5cclxuICAgICAgICBzbGlkZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHt0aGlzLmN1cnJlbnRUcmFuc2xhdGV9cHgpYDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQb3NpdGlvblgoZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gZXZlbnQudHlwZS5pbmNsdWRlcyhcIm1vdXNlXCIpID8gZXZlbnQuY2xpZW50WCA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQb3NpdGlvbkJ5SW5kZXgoKSB7XHJcbiAgICAgICAgbGV0IHNsaWRlcldpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXItaXRlbVwiKS5vZmZzZXRXaWR0aDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUcmFuc2xhdGUgPSB0aGlzLnNsaWRlckNvdW50ICogLXNsaWRlcldpZHRoO1xyXG4gICAgICAgIHRoaXMucHJldlRyYW5zbGF0ZSA9IHRoaXMuY3VycmVudFRyYW5zbGF0ZTtcclxuICAgICAgICB0aGlzLnNldFNsaWRlclBvc2l0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlUHJldlByb2dyZXNzQmFyKCkge1xyXG4gICAgICAgIGxldCBhcnJDb3VudGVycyA9IEFycmF5LmZyb20odGhpcy5zbGlkZXJDb3VudGVyLmNoaWxkcmVuKTtcclxuICAgICAgICBsZXQgY3VycmVudENvdW50ZXIgPSBhcnJDb3VudGVyc1t0aGlzLnNsaWRlckNvdW50XS5maXJzdENoaWxkO1xyXG4gICAgICAgIGxldCBjb3VudGVyV2lkdGggPSAoY3VycmVudENvdW50ZXIuc3R5bGUud2lkdGgpLnNsaWNlKDAsIC0xKTtcclxuXHJcbiAgICAgICAgbGV0IGRlY3JlYXNlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyV2lkdGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChkZWNyZWFzZUludGVydmFsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXJXaWR0aC0tO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvdW50ZXIuc3R5bGUud2lkdGggPSBgJHtjb3VudGVyV2lkdGh9JWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250aW51ZUN1cnJlbnRQcm9ncmVzc0JhcigpIHtcclxuICAgICAgICBsZXQgYXJyQ291bnRlcnMgPSBBcnJheS5mcm9tKHRoaXMuc2xpZGVyQ291bnRlci5jaGlsZHJlbik7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRDb3VudGVyID0gYXJyQ291bnRlcnNbdGhpcy5zbGlkZXJDb3VudF0uZmlyc3RDaGlsZDtcclxuICAgICAgICBsZXQgY291bnRlcldpZHRoID0gKGN1cnJlbnRDb3VudGVyLnN0eWxlLndpZHRoKS5zbGljZSgwLCAtMSk7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkYXRhSXRlbXMgZnJvbSBcIi4uL0pTT04vc2xpZGVyLmpzb25cIjtcclxuaW1wb3J0IHtTbGlkZXJ9IGZyb20gXCIuL01vZHVsZXMvU2xpZGVyXCI7XHJcbi8vIGltcG9ydCAqIGFzIGV2ZW50cyBmcm9tIFwibm9kZTpldmVudHNcIjtcclxuXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gQ3JlYXRlIHNsaWRlclxyXG4gICAgY3JlYXRlU2xpZGVyKCk7XHJcbiAgICAvLyBCdXJnZXIgbWVudVxyXG4gICAgYWRkQnVyZ2VyQnV0dG9uSGFuZGxlcigpO1xyXG5cclxufVxyXG5cclxuY29uc3QgY3JlYXRlU2xpZGVyID0gKCkgPT4ge1xyXG4gICAgbGV0IHNsaWRlciA9IG5ldyBTbGlkZXIoZGF0YUl0ZW1zLCB7fSk7XHJcbiAgICBzbGlkZXIucmVuZGVyU2xpZGVyKCk7XHJcbn1cclxuXHJcbmNvbnN0IGFkZEJ1cmdlckJ1dHRvbkhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBsZXQgaXNTaG93ZWQgPSBmYWxzZTtcclxuICAgIGxldCBidXJnZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1cmdlclwiKTtcclxuICAgIGxldCBtZW51QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbWVudScpO1xyXG4gICAgbGV0IGNsaWNrZWRXaWR0aDtcclxuXHJcbiAgICBidXJnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgY2hhbmdlQnVyZ2VyQnV0dG9uKGJ1cmdlckJ1dHRvbik7XHJcbiAgICAgICAgdG9nZ2xlQnVyZ2VyTWVudShpc1Nob3dlZCk7XHJcbiAgICAgICAgaXNTaG93ZWQgPSAhaXNTaG93ZWQ7XHJcbiAgICAgICAgY2xpY2tlZFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB9KVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGNoZWNrQ29ycmVjdFJlc2l6ZShpc1Nob3dlZCwgd2luZG93LmlubmVyV2lkdGgpKSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZUJ1cmdlck1lbnUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGNoYW5nZUJ1cmdlckJ1dHRvbihidXJnZXJCdXR0b24pO1xyXG4gICAgICAgICAgICBtZW51QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICB9IGVsc2UgaWYod2luZG93LmlubmVyV2lkdGggPj0gNzY4KSB7XHJcbiAgICAgICAgICAgIG1lbnVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPD0gNzY4ICYmICFpc1Nob3dlZCkge1xyXG4gICAgICAgICAgICBtZW51QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBjaGFuZ2VCdXJnZXJCdXR0b24gPSAoYnV0dG9uKSA9PiB7XHJcbiAgICBsZXQgYXJyYXlMaW5lcyA9IEFycmF5LmZyb20oYnV0dG9uLmNoaWxkcmVuKTtcclxuICAgIGlmIChhcnJheUxpbmVzWzBdLnN0eWxlLm1hcmdpbkJvdHRvbSA9PSBcIi01cHhcIikge1xyXG4gICAgICAgIGFycmF5TGluZXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUubWFyZ2luQm90dG9tID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGUoMGRlZylcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUubWFyZ2luVG9wID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGUoMGRlZylcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFycmF5TGluZXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUubWFyZ2luQm90dG9tID0gXCItNXB4XCI7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnRyYW5zZm9ybSA9IFwicm90YXRlKDQ1ZGVnKVwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5tYXJnaW5Ub3AgPSBcIi01cHhcIjtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGUoLTQ1ZGVnKVwiO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHRvZ2dsZUJ1cmdlck1lbnUgPSAoaXNTaG93ZWQpID0+IHtcclxuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICBsZXQgbmF2aWdhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZpZ2F0aW9uJyk7XHJcbiAgICBsZXQgbWVudUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX21lbnUnKTtcclxuICAgIGxldCBoZWFkZXJOYXZpZ2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbmF2aWdhdGlvbicpO1xyXG4gICAgaWYgKCFpc1Nob3dlZCkge1xyXG4gICAgICAgIC8vIENoYW5nZSBib2R5IHN0eWxlc1xyXG4gICAgICAgIGJvZHkuc3R5bGUuY3NzVGV4dCA9ICdvdmVyZmxvdzogaGlkZGVuOyc7XHJcbiAgICAgICAgLy8gQ2hhbmdlIGhlYWRlciBzdHlsZXNcclxuICAgICAgICBoZWFkZXIuc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgICAgIHotaW5kZXg6IDk5OTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2UxZDRjOTtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwdmg7XHJcbiAgICAgICAgYDtcclxuICAgICAgICAvLyBDaGFuZ2UgbmF2aWdhdGlvbiBzdHlsZXNcclxuICAgICAgICBuYXZpZ2F0aW9uLnN0eWxlLmNzc1RleHQgPSBgXHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgdG9wOiA4MXB4O1xyXG4gICAgICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogMzBweDtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIHJvdy1nYXA6IDQwcHg7XHJcbiAgICAgICAgICAgIGFsaWduLWNvbnRlbnQ6IHN0YXJ0O1xyXG4gICAgICAgIGA7XHJcbiAgICAgICAgLy8gQWRkIG1lbnUgYnV0dG9uIHRvIG5hdmlnYXRpb24gYmxvY2tcclxuICAgICAgICBtZW51QnV0dG9uLnJlbW92ZSgpO1xyXG4gICAgICAgIG5hdmlnYXRpb24uYXBwZW5kKG1lbnVCdXR0b24pO1xyXG4gICAgICAgIG1lbnVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBib2R5LnN0eWxlLmNzc1RleHQgPSAnJztcclxuICAgICAgICBoZWFkZXIuc3R5bGUuY3NzVGV4dCA9ICcnO1xyXG4gICAgICAgIG5hdmlnYXRpb24uc3R5bGUuY3NzVGV4dCA9ICcnO1xyXG4gICAgICAgIG1lbnVCdXR0b24ucmVtb3ZlKCk7XHJcbiAgICAgICAgaGVhZGVyTmF2aWdhdGlvbi5hZnRlcihtZW51QnV0dG9uKTtcclxuICAgICAgICBtZW51QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGNoZWNrQ29ycmVjdFJlc2l6ZSA9IChpc1Nob3dlZCwgY3VycmVudFdpZHRoKSA9PiB7XHJcbiAgICBpZiAoaXNTaG93ZWQgJiYgKGN1cnJlbnRXaWR0aCA+PSA3NjgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==