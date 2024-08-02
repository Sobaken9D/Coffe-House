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
    constructor(data) {
        this.sliderWrapper = "";
        this.sliderContainer = "";
        this.sliderButtonPrev = "";
        this.sliderButtonNext = "";
        this.sliderItems = "";
        this.sliderCounter = "";
        this.data = data;
    }

    renderSlider() {
        // Get slider wrapper
        this.sliderWrapper = this.getSliderWrapper();
        // Create sliderContainer block
        this.sliderContainer = this.createDomNode("div", "slider__container");
        // Create buttons
        this.sliderButtonPrev = this.createButton("left");
        this.sliderButtonNext = this.createButton("right");
        // Create items block
        this.sliderItems = this.createDomNode("div", "slider-items");
        // Append items
        // let items = this.getSliderItems();
        // this.sliderItems.append(...items);
        // Create counter block
        this.sliderCounter = this.createCounterBlock();
        // Add blocks to slider container
        this.sliderContainer.append(this.sliderButtonPrev, this.sliderItems, this.sliderCounter, this.sliderButtonNext);
        // Add blocks to slider wrapper
        this.sliderWrapper.append(this.sliderContainer);
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
        let counterBlock = document.createDomNode("div", "slider__counter", "counter");
        let counterLine = document.createDomNode("div", "counter__line");
        for (let i = 0; i < 3; i++) {
            counterBlock.append(counterLine);
        }
        return counterBlock;
    }

    getSliderItems() {
        return 1;
    }
}

/***/ }),

/***/ "./src/JSON/slider.json":
/*!******************************!*\
  !*** ./src/JSON/slider.json ***!
  \******************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"id":1,"type":"coffe","title":"S’mores Frappuccino","description":"This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.","urlToImage":"../img/slider/coffee-slider-1.png","price":"$5.50"},{"id":2,"type":"coffe","title":"Caramel Macchiato","description":"Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.","urlToImage":"../img/slider/coffee-slider-2.png","price":"$5.00"},{"id":3,"type":"coffe","title":"Ice coffee","description":"A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.","urlToImage":"../img/slider/coffee-slider-3.png","price":"$4.50"}]');

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



window.onload = function () {
    // Create slider
    createSlider();
}

const createSlider = () => {
    let Slider = new Slider(_JSON_slider_json__WEBPACK_IMPORTED_MODULE_0__);
    // Slider.renderSlider();
    console.log(123);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpblBhZ2UuMGIxMTc1ZWIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0RixVQUFVO0FBQ3RHO0FBQ0EsK0NBQStDLFVBQVU7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7VUNqRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjRDO0FBQ0o7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsOENBQVM7QUFDckM7QUFDQTtBQUNBLEM7Ozs7Ozs7OztBQ1pBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29mZmUtaG91c2UvLi9zcmMvanMvTW9kdWxlcy9TbGlkZXIuanMiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NvZmZlLWhvdXNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS8uL3NyYy9qcy9tYWluUGFnZS5qcyIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS8uL3NyYy9zYXNzL3N0eWxlLnNjc3M/M2FjNCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU2xpZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgICAgICB0aGlzLnNsaWRlcldyYXBwZXIgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQ29udGFpbmVyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNsaWRlckJ1dHRvblByZXYgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQnV0dG9uTmV4dCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJJdGVtcyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJDb3VudGVyID0gXCJcIjtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclNsaWRlcigpIHtcclxuICAgICAgICAvLyBHZXQgc2xpZGVyIHdyYXBwZXJcclxuICAgICAgICB0aGlzLnNsaWRlcldyYXBwZXIgPSB0aGlzLmdldFNsaWRlcldyYXBwZXIoKTtcclxuICAgICAgICAvLyBDcmVhdGUgc2xpZGVyQ29udGFpbmVyIGJsb2NrXHJcbiAgICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJzbGlkZXJfX2NvbnRhaW5lclwiKTtcclxuICAgICAgICAvLyBDcmVhdGUgYnV0dG9uc1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQnV0dG9uUHJldiA9IHRoaXMuY3JlYXRlQnV0dG9uKFwibGVmdFwiKTtcclxuICAgICAgICB0aGlzLnNsaWRlckJ1dHRvbk5leHQgPSB0aGlzLmNyZWF0ZUJ1dHRvbihcInJpZ2h0XCIpO1xyXG4gICAgICAgIC8vIENyZWF0ZSBpdGVtcyBibG9ja1xyXG4gICAgICAgIHRoaXMuc2xpZGVySXRlbXMgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJzbGlkZXItaXRlbXNcIik7XHJcbiAgICAgICAgLy8gQXBwZW5kIGl0ZW1zXHJcbiAgICAgICAgLy8gbGV0IGl0ZW1zID0gdGhpcy5nZXRTbGlkZXJJdGVtcygpO1xyXG4gICAgICAgIC8vIHRoaXMuc2xpZGVySXRlbXMuYXBwZW5kKC4uLml0ZW1zKTtcclxuICAgICAgICAvLyBDcmVhdGUgY291bnRlciBibG9ja1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQ291bnRlciA9IHRoaXMuY3JlYXRlQ291bnRlckJsb2NrKCk7XHJcbiAgICAgICAgLy8gQWRkIGJsb2NrcyB0byBzbGlkZXIgY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIuYXBwZW5kKHRoaXMuc2xpZGVyQnV0dG9uUHJldiwgdGhpcy5zbGlkZXJJdGVtcywgdGhpcy5zbGlkZXJDb3VudGVyLCB0aGlzLnNsaWRlckJ1dHRvbk5leHQpO1xyXG4gICAgICAgIC8vIEFkZCBibG9ja3MgdG8gc2xpZGVyIHdyYXBwZXJcclxuICAgICAgICB0aGlzLnNsaWRlcldyYXBwZXIuYXBwZW5kKHRoaXMuc2xpZGVyQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTbGlkZXJXcmFwcGVyKCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlcl9fd3JhcHBlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVEb21Ob2RlKGVsZW1lbnQsIC4uLmNsYXNzZXMpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJ1dHRvbihkaXJlY3Rpb24pIHtcclxuICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiYnV0dG9uXCIsIFwiYnV0dG9uXCIsIFwiYnV0dG9uLWFycm93XCIsIGBidXR0b24tYXJyb3dfJHtkaXJlY3Rpb259YCk7XHJcbiAgICAgICAgbGV0IG9iamVjdCA9IGBcclxuICAgICAgICAgICAgPG9iamVjdCBkYXRhPVwiLi4vaW1nL2ljb25zL2Fycm93LSR7ZGlyZWN0aW9ufS5zdmdcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiIGNsYXNzPVwiYnV0dG9uLWFycm93LW9iamVjdFwiPlxyXG4gICAgICAgICAgICAgICAgWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgU1ZHXHJcbiAgICAgICAgICAgIDwvb2JqZWN0PlxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IG9iamVjdDtcclxuICAgICAgICByZXR1cm4gYnV0dG9uO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvdW50ZXJCbG9jaygpIHtcclxuICAgICAgICBsZXQgY291bnRlckJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcInNsaWRlcl9fY291bnRlclwiLCBcImNvdW50ZXJcIik7XHJcbiAgICAgICAgbGV0IGNvdW50ZXJMaW5lID0gZG9jdW1lbnQuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcImNvdW50ZXJfX2xpbmVcIik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgY291bnRlckJsb2NrLmFwcGVuZChjb3VudGVyTGluZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb3VudGVyQmxvY2s7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2xpZGVySXRlbXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkYXRhSXRlbXMgZnJvbSBcIi4uL0pTT04vc2xpZGVyLmpzb25cIjtcclxuaW1wb3J0IHtTbGlkZXJ9IGZyb20gXCIuL01vZHVsZXMvU2xpZGVyXCI7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gQ3JlYXRlIHNsaWRlclxyXG4gICAgY3JlYXRlU2xpZGVyKCk7XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZVNsaWRlciA9ICgpID0+IHtcclxuICAgIGxldCBTbGlkZXIgPSBuZXcgU2xpZGVyKGRhdGFJdGVtcyk7XHJcbiAgICAvLyBTbGlkZXIucmVuZGVyU2xpZGVyKCk7XHJcbiAgICBjb25zb2xlLmxvZygxMjMpO1xyXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9