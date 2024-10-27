/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Modules/Slider.js":
/*!**********************************!*\
  !*** ./src/js/Modules/Slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Slider: () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
    constructor(data, {autoSlide = true, timeAutoSlide = 3000}) {
        this.sliderWrapper = "";
        this.sliderContainer = "";
        this.sliderButtonPrev = "";
        this.sliderButtonNext = "";
        this.sliderItems = "";
        this.currentSlide = "";
        this.sliderCounter = "";
        this.sliderCount = 0;
        this.clickPrevOrNextButton = true;

        this.data = data;
        this.autoSlide = autoSlide;
        this.timeAutoSlide = timeAutoSlide;
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
        // Add auto slide
        // if (this.autoSlide) {
        //     this.addAutoSlide();
        // }
        //Add counters handler
        this.addCountersProgress();
        // Timer slider
        this.addAutoSlide();

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
            <object data="../img/icons/arrow-${direction}.svg" type="image/svg+xml" class="button-arrow-object">
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
        // let prevCounter = arrCounters[this.sliderCount].firstChild;
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
            } else {
                counterWidth++;
                currentCounter.style.width = `${counterWidth}%`;
            }
        }, this.timeAutoSlide/ 100);
    }

}

/***/ }),

/***/ "./src/JSON/slider.json":
/*!******************************!*\
  !*** ./src/JSON/slider.json ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('[{"id":1,"type":"coffe","title":"S’mores Frappuccino","description":"This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.","urlToImage":"../img/slider/coffee-slider-1.png","price":"$5.50"},{"id":2,"type":"coffe","title":"Caramel Macchiato","description":"Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.","urlToImage":"../img/slider/coffee-slider-2.png","price":"$5.00"},{"id":3,"type":"coffe","title":"Ice coffee","description":"A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.","urlToImage":"../img/slider/coffee-slider-3.png","price":"$4.50"}]');

/***/ }),

/***/ "node:events":
/*!*******************!*\
  !*** node:events ***!
  \*******************/
/***/ (() => {

throw new Error("Module build failed: UnhandledSchemeError: Reading from \"node:events\" is not handled by plugins (Unhandled scheme).\nWebpack supports \"data:\" and \"file:\" URIs by default.\nYou may need an additional plugin to handle \"node:\" URIs.\n    at E:\\MyProjects\\Coffe-House\\node_modules\\webpack\\lib\\NormalModule.js:918:25\n    at Hook.eval [as callAsync] (eval at create (E:\\MyProjects\\Coffe-House\\node_modules\\tapable\\lib\\HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (E:\\MyProjects\\Coffe-House\\node_modules\\tapable\\lib\\Hook.js:18:14)\n    at Object.processResource (E:\\MyProjects\\Coffe-House\\node_modules\\webpack\\lib\\NormalModule.js:915:8)\n    at processResource (E:\\MyProjects\\Coffe-House\\node_modules\\loader-runner\\lib\\LoaderRunner.js:220:11)\n    at iteratePitchingLoaders (E:\\MyProjects\\Coffe-House\\node_modules\\loader-runner\\lib\\LoaderRunner.js:171:10)\n    at runLoaders (E:\\MyProjects\\Coffe-House\\node_modules\\loader-runner\\lib\\LoaderRunner.js:398:2)\n    at NormalModule._doBuild (E:\\MyProjects\\Coffe-House\\node_modules\\webpack\\lib\\NormalModule.js:905:3)\n    at NormalModule.build (E:\\MyProjects\\Coffe-House\\node_modules\\webpack\\lib\\NormalModule.js:1081:15)\n    at E:\\MyProjects\\Coffe-House\\node_modules\\webpack\\lib\\Compilation.js:1400:12");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/js/mainPage.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _JSON_slider_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../JSON/slider.json */ "./src/JSON/slider.json");
/* harmony import */ var _Modules_Slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modules/Slider */ "./src/js/Modules/Slider.js");
/* harmony import */ var node_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:events */ "node:events");
/* harmony import */ var node_events__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_events__WEBPACK_IMPORTED_MODULE_2__);




window.onload = function () {
    // Create slider
    createSlider();
}

const createSlider = () => {
    let slider = new _Modules_Slider__WEBPACK_IMPORTED_MODULE_1__.Slider(_JSON_slider_json__WEBPACK_IMPORTED_MODULE_0__, {});
    slider.renderSlider();
}
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpblBhZ2UuYzQ3ZmIxZjEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQLHVCQUF1Qix1Q0FBdUM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RixVQUFVO0FBQ3RHO0FBQ0EsK0NBQStDLFVBQVU7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBLCtCQUErQixhQUFhLEdBQUcsV0FBVztBQUMxRCwrQkFBK0IsbUJBQW1CO0FBQ2xEO0FBQ0E7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBLG9DQUFvQyxvQkFBb0I7QUFDeEQ7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxnQ0FBZ0M7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQSx3REFBd0QsYUFBYTtBQUNyRTtBQUNBLGlCQUFpQjtBQUNqQixjQUFjO0FBQ2Q7QUFDQSxnREFBZ0QsYUFBYTtBQUM3RDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzlLQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONEM7QUFDSjtBQUNGO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1EQUFNLENBQUMsOENBQVMsSUFBSTtBQUN6QztBQUNBLEM7Ozs7Ozs7Ozs7QUNaQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NvZmZlLWhvdXNlLy4vc3JjL2pzL01vZHVsZXMvU2xpZGVyLmpzIiwid2VicGFjazovL2NvZmZlLWhvdXNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NvZmZlLWhvdXNlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2NvZmZlLWhvdXNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NvZmZlLWhvdXNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2UvLi9zcmMvanMvbWFpblBhZ2UuanMiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2UvLi9zcmMvc2Fzcy9zdHlsZS5zY3NzPzNhYzQiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFNsaWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCB7YXV0b1NsaWRlID0gdHJ1ZSwgdGltZUF1dG9TbGlkZSA9IDMwMDB9KSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJXcmFwcGVyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJCdXR0b25QcmV2ID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNsaWRlckJ1dHRvbk5leHQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2xpZGVySXRlbXMgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNsaWRlID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNsaWRlckNvdW50ZXIgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY2xpY2tQcmV2T3JOZXh0QnV0dG9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmF1dG9TbGlkZSA9IGF1dG9TbGlkZTtcclxuICAgICAgICB0aGlzLnRpbWVBdXRvU2xpZGUgPSB0aW1lQXV0b1NsaWRlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclNsaWRlcigpIHtcclxuICAgICAgICAvLyBHZXQgc2xpZGVyIHdyYXBwZXJcclxuICAgICAgICB0aGlzLnNsaWRlcldyYXBwZXIgPSB0aGlzLmdldFNsaWRlcldyYXBwZXIoKTtcclxuICAgICAgICAvLyBDcmVhdGUgc2xpZGVyQ29udGFpbmVyIGJsb2NrXHJcbiAgICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJzbGlkZXJfX2NvbnRhaW5lclwiKTtcclxuICAgICAgICAvLyBDcmVhdGUgYnV0dG9uc1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQnV0dG9uUHJldiA9IHRoaXMuY3JlYXRlQnV0dG9uKFwibGVmdFwiKTtcclxuICAgICAgICB0aGlzLnNsaWRlckJ1dHRvbk5leHQgPSB0aGlzLmNyZWF0ZUJ1dHRvbihcInJpZ2h0XCIpO1xyXG4gICAgICAgIC8vIENyZWF0ZSBjdXJyZW50IHNsaWRlXHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGUgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJjdXJyZW50LXNsaWRlXCIpO1xyXG4gICAgICAgIC8vIENyZWF0ZSBpdGVtcyBibG9ja1xyXG4gICAgICAgIHRoaXMuc2xpZGVySXRlbXMgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJzbGlkZXItaXRlbXNcIik7XHJcbiAgICAgICAgLy8gQXBwZW5kIGl0ZW1zXHJcbiAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5nZXRTbGlkZXJJdGVtcyh0aGlzLmRhdGEpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVySXRlbXMuYXBwZW5kKC4uLml0ZW1zKTtcclxuICAgICAgICAvLyBDcmVhdGUgY291bnRlciBibG9ja1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQ291bnRlciA9IHRoaXMuY3JlYXRlQ291bnRlckJsb2NrKCk7XHJcbiAgICAgICAgLy8gQWRkIGl0ZW1zLWxpbmUgdG8gY3VycmVudCBzbGlkZVxyXG4gICAgICAgIHRoaXMuY3VycmVudFNsaWRlLmFwcGVuZCh0aGlzLnNsaWRlckl0ZW1zKTtcclxuICAgICAgICAvLyBBZGQgYmxvY2tzIHRvIHNsaWRlciBjb250YWluZXJcclxuICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lci5hcHBlbmQodGhpcy5zbGlkZXJCdXR0b25QcmV2LCB0aGlzLmN1cnJlbnRTbGlkZSwgdGhpcy5zbGlkZXJDb3VudGVyLCB0aGlzLnNsaWRlckJ1dHRvbk5leHQpO1xyXG4gICAgICAgIC8vIEFkZCBibG9ja3MgdG8gc2xpZGVyIHdyYXBwZXJcclxuICAgICAgICB0aGlzLnNsaWRlcldyYXBwZXIuYXBwZW5kKHRoaXMuc2xpZGVyQ29udGFpbmVyKTtcclxuICAgICAgICAvLyBBZGQgYnV0dG9ucyBoYW5kbGVyXHJcbiAgICAgICAgdGhpcy5idWlsZEV2ZW50cygpO1xyXG4gICAgICAgIC8vIEFkZCBhdXRvIHNsaWRlXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuYXV0b1NsaWRlKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYWRkQXV0b1NsaWRlKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vQWRkIGNvdW50ZXJzIGhhbmRsZXJcclxuICAgICAgICB0aGlzLmFkZENvdW50ZXJzUHJvZ3Jlc3MoKTtcclxuICAgICAgICAvLyBUaW1lciBzbGlkZXJcclxuICAgICAgICB0aGlzLmFkZEF1dG9TbGlkZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRTbGlkZXJXcmFwcGVyKCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlcl9fd3JhcHBlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVEb21Ob2RlKGVsZW1lbnQsIC4uLmNsYXNzZXMpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJ1dHRvbihkaXJlY3Rpb24pIHtcclxuICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiYnV0dG9uXCIsIFwiYnV0dG9uXCIsIFwiYnV0dG9uLWFycm93XCIsIGBidXR0b24tYXJyb3dfJHtkaXJlY3Rpb259YCk7XHJcbiAgICAgICAgbGV0IG9iamVjdCA9IGBcclxuICAgICAgICAgICAgPG9iamVjdCBkYXRhPVwiLi4vaW1nL2ljb25zL2Fycm93LSR7ZGlyZWN0aW9ufS5zdmdcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiIGNsYXNzPVwiYnV0dG9uLWFycm93LW9iamVjdFwiPlxyXG4gICAgICAgICAgICAgICAgWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgU1ZHXHJcbiAgICAgICAgICAgIDwvb2JqZWN0PlxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IG9iamVjdDtcclxuICAgICAgICByZXR1cm4gYnV0dG9uO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvdW50ZXJCbG9jaygpIHtcclxuICAgICAgICBsZXQgY291bnRlckJsb2NrID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiZGl2XCIsIFwic2xpZGVyX19jb3VudGVyXCIsIFwiY291bnRlclwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NCYXIgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJjb3VudGVyX19wcm9ncmVzcy1iYXJcIik7XHJcbiAgICAgICAgICAgIGxldCBjb3VudGVyTGluZSA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcImNvdW50ZXJfX2xpbmVcIik7XHJcbiAgICAgICAgICAgIGNvdW50ZXJMaW5lLmFwcGVuZChwcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgICAgIGNvdW50ZXJCbG9jay5hcHBlbmQoY291bnRlckxpbmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY291bnRlckJsb2NrO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNsaWRlckl0ZW1zKGRhdGEpIHtcclxuICAgICAgICBsZXQgYXJySXRlbXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcInNsaWRlci1pdGVtXCIpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbUltYWdlID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiaW1nXCIsIFwic2xpZGVyX19pbWFnZVwiKTtcclxuICAgICAgICAgICAgaXRlbUltYWdlLmFsdCA9IGAke2RhdGFbaV0udHlwZX0tJHtkYXRhW2ldLmlkfWA7XHJcbiAgICAgICAgICAgIGl0ZW1JbWFnZS5zcmMgPSBgJHtkYXRhW2ldLnVybFRvSW1hZ2V9YDtcclxuICAgICAgICAgICAgbGV0IGluZm9CbG9jayA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcInNsaWRlcl9faW5mb1wiKTtcclxuICAgICAgICAgICAgbGV0IGluZm9UaXRsZSA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImg1XCIsIFwiZHJpbmtfX3RpdGxlXCIpO1xyXG4gICAgICAgICAgICBpbmZvVGl0bGUuaW5uZXJUZXh0ID0gYCR7ZGF0YVtpXS50aXRsZX1gO1xyXG4gICAgICAgICAgICBsZXQgaW5mb1RleHQgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJwXCIsIFwiZHJpbmtfX2Rlc2NyaXB0aW9uXCIpO1xyXG4gICAgICAgICAgICBpbmZvVGV4dC5pbm5lclRleHQgPSBgJHtkYXRhW2ldLmRlc2NyaXB0aW9ufWA7XHJcbiAgICAgICAgICAgIGxldCBpbmZvUHJpY2UgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJwXCIsIFwiZHJpbmtfX3ByaWNlXCIpO1xyXG4gICAgICAgICAgICBpbmZvUHJpY2UuaW5uZXJUZXh0ID0gYCR7ZGF0YVtpXS5wcmljZX1gO1xyXG4gICAgICAgICAgICBpbmZvQmxvY2suYXBwZW5kKGluZm9UaXRsZSwgaW5mb1RleHQsIGluZm9QcmljZSk7XHJcbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kKGl0ZW1JbWFnZSwgaW5mb0Jsb2NrKTtcclxuICAgICAgICAgICAgYXJySXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFyckl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVyV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnV0dG9uLWFycm93X2xlZnRcIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldlNsaWRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xvc2VzdChcIi5idXR0b24tYXJyb3dfcmlnaHRcIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByZXZTbGlkZSgpIHtcclxuICAgICAgICB0aGlzLmNsaWNrUHJldk9yTmV4dEJ1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgICAgICB0aGlzLnNsaWRlckNvdW50LS07XHJcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVyQ291bnQgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyQ291bnQgPSB0aGlzLmRhdGEubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb2xsU2xpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5hZGRBdXRvU2xpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0U2xpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja1ByZXZPck5leHRCdXR0b24gPSB0cnVlO1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJDb3VudCsrO1xyXG4gICAgICAgIGlmICh0aGlzLnNsaWRlckNvdW50ID49IHRoaXMuZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJDb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucm9sbFNsaWRlcigpO1xyXG4gICAgICAgIHRoaXMuYWRkQXV0b1NsaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcm9sbFNsaWRlcigpIHtcclxuICAgICAgICBsZXQgc2xpZGVyV2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlci1pdGVtXCIpLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIHRoaXMuc2xpZGVySXRlbXMuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstdGhpcy5zbGlkZXJDb3VudCAqIHNsaWRlcldpZHRofXB4KWA7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQXV0b1NsaWRlKCkge1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dFNsaWRlKCk7XHJcbiAgICAgICAgfSwgdGhpcy50aW1lQXV0b1NsaWRlKTtcclxuICAgICAgICB0aGlzLmFkZENvdW50ZXJzUHJvZ3Jlc3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRDb3VudGVyc1Byb2dyZXNzKCkge1xyXG4gICAgICAgIGxldCBhcnJDb3VudGVycyA9IEFycmF5LmZyb20odGhpcy5zbGlkZXJDb3VudGVyLmNoaWxkcmVuKTtcclxuICAgICAgICAvLyBsZXQgcHJldkNvdW50ZXIgPSBhcnJDb3VudGVyc1t0aGlzLnNsaWRlckNvdW50XS5maXJzdENoaWxkO1xyXG4gICAgICAgIGxldCBjdXJyZW50Q291bnRlciA9IGFyckNvdW50ZXJzW3RoaXMuc2xpZGVyQ291bnRdLmZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgbGV0IGNvdW50ZXJXaWR0aCA9IDA7XHJcbiAgICAgICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbGlja1ByZXZPck5leHRCdXR0b24gfHwgY291bnRlcldpZHRoID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tQcmV2T3JOZXh0QnV0dG9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVjcmVhc2VJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlcldpZHRoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChkZWNyZWFzZUludGVydmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyV2lkdGgtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvdW50ZXIuc3R5bGUud2lkdGggPSBgJHtjb3VudGVyV2lkdGh9JWA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyV2lkdGgrKztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb3VudGVyLnN0eWxlLndpZHRoID0gYCR7Y291bnRlcldpZHRofSVgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcy50aW1lQXV0b1NsaWRlLyAxMDApO1xyXG4gICAgfVxyXG5cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZGF0YUl0ZW1zIGZyb20gXCIuLi9KU09OL3NsaWRlci5qc29uXCI7XHJcbmltcG9ydCB7U2xpZGVyfSBmcm9tIFwiLi9Nb2R1bGVzL1NsaWRlclwiO1xyXG5pbXBvcnQgKiBhcyBldmVudHMgZnJvbSBcIm5vZGU6ZXZlbnRzXCI7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gQ3JlYXRlIHNsaWRlclxyXG4gICAgY3JlYXRlU2xpZGVyKCk7XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZVNsaWRlciA9ICgpID0+IHtcclxuICAgIGxldCBzbGlkZXIgPSBuZXcgU2xpZGVyKGRhdGFJdGVtcywge30pO1xyXG4gICAgc2xpZGVyLnJlbmRlclNsaWRlcigpO1xyXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9