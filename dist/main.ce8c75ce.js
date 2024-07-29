/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Modules/CatalogItem.js":
/*!***************************************!*\
  !*** ./src/js/Modules/CatalogItem.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CatalogItem: () => (/* binding */ CatalogItem)
/* harmony export */ });
class CatalogItem {
    constructor({id, type, title, description, urlToImage, price}) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.description = description;
        this.urlToImage = urlToImage;
        this.price = price;
    }

    generateItem() {
        let template = "";
        let item = document.createElement("div");
        item.className = "catalog__item";
        item.setAttribute("data-id", this.id);

        this.urlToImage && (template +=
            `
            <div class="catalog__image-container">
                <img class="catalog__image" src="${this.urlToImage}" alt="${this.type}">
            </div>
            `
        );

        if (this.title || this.description || this.price) {
            template += `<div class="catalog__item-info">`;
            this.title && (template += `<h5 class="drink__title">${this.title}</h5>`);
            this.description && (template += `<p class="drink__description">${this.description}</p>`);
            this.price && (template += `<p class="drink__price">${this.price}</p>`);
            template += `</div>`;
        }

        item.innerHTML = template;
        return item;
    }
}

/***/ }),

/***/ "./src/js/Modules/Modal.js":
/*!*********************************!*\
  !*** ./src/js/Modules/Modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Modal: () => (/* binding */ Modal)
/* harmony export */ });
class Modal {
    constructor(classes) {
        this.classes = classes;
        this.modalOverlay = "";
        this.modalWrapper = "";
        this.modalWindow = "";
        this.modalContent = "";
        this.modalCloseButton = "";
    }

    buildModal(content) {
        //Overlay
        this.modalOverlay = this.createDomNode1(this.modalOverlay, "div", "modal__overlay");
        //Wrapper
        this.modalWrapper = this.createDomNode1(this.modalWrapper, "div", "modal__wrapper");
        //Window
        this.modalWindow = this.createDomNode1(this.modalWindow, "div", "modal__window");
        //Content
        this.modalContent = this.createDomNode1(this.modalContent, "div", "modal__content");
        //CloseButton
        this.modalCloseButton = this.createCloseButton(this.modalCloseButton, "button", "button__modal-close");
        //SetContent
        this.setContent(content);
        //SetCloseButton
        this.modalContent.querySelector(".modal__info").append(this.modalCloseButton);
        //AppendModalElements
        this.appendModalElements();
        //BuildEvents(close and open)
        this.buildEvents();
        //OpenModal
        this.openModal();
    }

    createDomNode1(node, element, ...classes) {
        node = document.createElement(element);
        node.classList.add(...classes);
        return node;
    }

    createCloseButton(node, ...classes) {
        node = document.createElement("button");
        node.classList.add(...classes);
        node.innerHTML = "<span>Close</span>";
        return node;
    }

    setContent(content) {
        this.modalContent.append(...content);
    }

    appendModalElements() {
        this.modalOverlay.append(this.modalWrapper);
        this.modalWrapper.append(this.modalWindow);
        this.modalWindow.append(this.modalContent);
    }

    buildEvents() {
        this.modalOverlay.addEventListener("click", (e) => {
            this.closeModal(e);
        })
    }

    openModal() {
        document.body.append(this.modalOverlay);
        //Anti-scroll
        document.body.style.overflow = "hidden"
    }

    closeModal(e) {
        let classes = e.target.classList;
        let firstCloseRule = (classes.contains("modal__overlay") || classes.contains("modal__wrapper"));
        let secondCloseRule = (classes.contains("button__modal-close"));
        if (firstCloseRule || secondCloseRule) {
            document.querySelector(".modal__overlay").remove();
        }
        //Delete Anti-scroll
        document.body.style.overflow = "";
    }
}

/***/ }),

/***/ "./src/js/Modules/ModalItem.js":
/*!*************************************!*\
  !*** ./src/js/Modules/ModalItem.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalItem: () => (/* binding */ ModalItem)
/* harmony export */ });
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal */ "./src/js/Modules/Modal.js");


class ModalItem extends _Modal__WEBPACK_IMPORTED_MODULE_0__.Modal {
    constructor(classes, {id, type, title, description, urlToImage, price, size, additives}) {
        super(classes);
        this.id = id;
        this.type = type;
        this.title = title;
        this.description = description;
        this.urlToImage = urlToImage;
        this.price = price;
        this.size = size;
        this.additives = additives;
        this.letterSize = [{letter: "S", plus: 0}, {letter: "M", plus: 0.5}, {letter: "L", plus: 1}];
        this.additivePlusPrice = 0.50;
        this.currentPlusPrice = 0;
    }

    //Item Content Generator
    generateContent() {
        let imageBlock = this.generateImageBlock();
        let infoBlock = this.generateInfoBlock();
        return [imageBlock, infoBlock];
    }

    generateImageBlock() {
        let imageBlock = this.createDomNode("div", "catalog__image-container");
        let image = this.createDomNode("img", "catalog__image");
        this.urlToImage && (image.src = this.urlToImage);
        this.type && (image.alt = this.type);
        imageBlock.appendChild(image);
        return imageBlock;
    }

    generateInfoBlock() {
        let infoBlock = this.createDomNode("div", "modal__info");
        let drinksBlock = this.generateDrinksBlock();
        let sizeBlock = this.generateSizeBlock();
        let additivesBlock = this.generateAdditivesBlock();
        let priceBlock = this.generatePriceBlock();
        let noteBlock = this.generateNoteBlock();
        infoBlock.append(drinksBlock, sizeBlock, additivesBlock, priceBlock, noteBlock);
        return infoBlock;
    }


    generateDrinksBlock() {
        let drinksBlock = this.createDomNode("div", "drink__info");
        let drinkTitle = this.createDomNode("h5", "drink__title");
        let drinkDescription = this.createDomNode("p", "drink__description");
        this.title && (drinkTitle.innerText = this.title);
        this.description && (drinkDescription.innerText = this.description);
        drinksBlock.append(drinkTitle, drinkDescription);
        return drinksBlock
    }

    generateSizeBlock() {
        let sizeBlock = this.createDomNode("div", "size__info", "size-info");
        let sizeBlockTitle = this.createDomNode("h6", "size-info__title");
        sizeBlockTitle.innerText = "Size";
        let sizeBlockButtons = this.createDomNode("div", "size-info__buttons");

        for (let i = 0; i < this.size.length; i++) {
            let button = undefined;
            if (i == 0) {
                button = this.createModalButton(this.letterSize[i].letter, this.size[i], "button","button__modal-info", "button__size", "button__modal-info_active");
            } else {
                button = this.createModalButton(this.letterSize[i].letter, this.size[i], "button","button__modal-info", "button__size");
            }
            sizeBlockButtons.append(button);
        }

        sizeBlockButtons.addEventListener("click", (e) => {
            if (e.target.closest(".button__size")) {
                this.clickSizeButton(e, ".button__size");
            }

        })

        sizeBlock.append(sizeBlockTitle, sizeBlockButtons);
        return sizeBlock;
    }

    clickSizeButton(e, selector) {
        // Delete active class
        let nodeListButtons = document.querySelectorAll(selector);
        nodeListButtons.forEach(button => {
            button.classList.remove("button__modal-info_active");
        })
        // Add active class to clicked button
        e.target.closest(selector).classList.add("button__modal-info_active");
        // Change price
        let clickedSize = e.target.closest(selector).firstElementChild.innerHTML;
        let totalPriceElement = document.querySelector(".total-price");
        let totalPriceNumber = +this.price.slice(1) + this.currentPlusPrice;
        let plusPrice = (this.letterSize.find(obj => obj.letter == clickedSize)).plus;
        totalPriceElement.innerHTML = "";
        totalPriceElement.innerHTML = "$" + `${totalPriceNumber + plusPrice}`;
        if (!totalPriceElement.innerHTML.includes(".")) {
            totalPriceElement.innerHTML += ".00"
        }
    }

    generateAdditivesBlock() {
        let additivesBlock = this.createDomNode("div", "additives__info", "additives-info");
        let additivesBlockTitle = this.createDomNode("h6", "additives-info__title");
        additivesBlockTitle.innerText = "Additives";
        let additivesBlockButtons = this.createDomNode("div", "additives-info__buttons");

        for (let i = 0; i < this.additives.length; i++) {
            let button = undefined;
            if (i == 0) {
                button = this.createModalButton((i + 1), this.additives[i], "button","button__modal-info", "button__additives");
            } else {
                button = this.createModalButton((i + 1), this.additives[i], "button","button__modal-info", "button__additives");
            }
            additivesBlockButtons.append(button);
        }

        additivesBlock.addEventListener("click", (e) => {
            if (e.target.closest(".button__additives")) {
                this.clickAdditiveButton(e, ".button__additives");
            }

        })

        additivesBlock.append(additivesBlockTitle, additivesBlockButtons);
        return additivesBlock;
    }

    clickAdditiveButton(e, selector) {
        // Toggle active class
        e.target.closest(selector).classList.toggle("button__modal-info_active");
        // Change price
        let totalPriceElement = document.querySelector(".total-price");
        let totalPriceNumber = +(totalPriceElement.innerHTML).slice(1);
        totalPriceElement.innerHTML = "";

        if (!(e.target.closest(selector).classList.contains("button__modal-info_active"))) {
            totalPriceElement.innerHTML = "$" + `${totalPriceNumber - this.additivePlusPrice}`;
            this.currentPlusPrice -= this.additivePlusPrice;
        } else {
            totalPriceElement.innerHTML = "$" + `${totalPriceNumber + this.additivePlusPrice}`;
            this.currentPlusPrice += this.additivePlusPrice;
        }

        if (!totalPriceElement.innerHTML.includes(".")) {
            totalPriceElement.innerHTML += ".00"
        }

    }

    generatePriceBlock() {
        let priceBlock = this.createDomNode("div", "price__info");
        priceBlock.innerHTML = `
            <span>Total:</span>
            <span class = "total-price">${this.price}</span>
        `;
        return priceBlock;
    }

    generateNoteBlock() {
        let noteBlock = this.createDomNode("div", "note__info");
        noteBlock.innerHTML = `
            <object data="../img/icons/info-empty.svg" type="image/svg+xml">
                Your browser does not support SVG
            </object>
            <p>The cost is not final. Download our mobile app to see the final price and place your</br> order.
                Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
            </p>
        `;
        return noteBlock;
    }

    createModalButton(size, volume, ...classes) {
        let button = this.createDomNode("button", ...classes);
        button.innerHTML = `
            <span class="button__text button__text_size">${size}</span>
            <span class="button__text button__text_volume">${volume}</span>
        `;
        return button;
    }

    createDomNode(element, ...classes) {
        let domElement = document.createElement(element);
        domElement.classList.add(...classes);
        return domElement;
    }

    renderModal() {
        let content = this.generateContent();
        super.buildModal(content);
    }
}

/***/ }),

/***/ "./src/JSON/data.json":
/*!****************************!*\
  !*** ./src/JSON/data.json ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('[{"id":1,"type":"coffe","title":"Irish coffee","description":"Fragrant black coffee with Jameson Irish whiskey and whipped milk","urlToImage":"../img/menu/coffe/coffee-1.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$7.00"},{"id":2,"type":"coffe","title":"Kahlua coffee","description":"Classic coffee with milk and Kahlua liqueur under a cap of frothed milk","urlToImage":"../img/menu/coffe/coffee-2.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$7.00"},{"id":3,"type":"coffe","title":"Honey raf","description":"Espresso with frothed milk, cream and aromatic honey","urlToImage":"../img/menu/coffe/coffee-3.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$5.50"},{"id":4,"type":"coffe","title":"Ice cappuccino","description":"Cappuccino with soft thick foam in summer version with ice","urlToImage":"../img/menu/coffe/coffee-4.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$5.00"},{"id":5,"type":"coffe","title":"Espresso","description":"Classic black coffee","urlToImage":"../img/menu/coffe/coffee-5.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$4.50"},{"id":6,"type":"coffe","title":"Latte","description":"Espresso coffee with the addition of steamed milk and dense milk foam","urlToImage":"../img/menu/coffe/coffee-6.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$5.50"},{"id":7,"type":"coffe","title":"Latte macchiato","description":"Espresso with frothed milk and chocolate","urlToImage":"../img/menu/coffe/coffee-7.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$5.50"},{"id":8,"type":"coffe","title":"Coffee with cognac","description":"Fragrant black coffee with cognac and whipped cream","urlToImage":"../img/menu/coffe/coffee-8.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$6.50"},{"id":9,"type":"tea","title":"Moroccan","description":"Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint","urlToImage":"../img/menu/tea/tea-1.png","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Lemon","Syrup"],"price":"$4.50"},{"id":10,"type":"tea","title":"Ginger","description":"Original black tea with fresh ginger, lemon and honey","urlToImage":"../img/menu/tea/tea-2.png","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Lemon","Syrup"],"price":"$5.00"},{"id":11,"type":"tea","title":"Cranberry","description":"Invigorating black tea with cranberry and honey","urlToImage":"../img/menu/tea/tea-3.png","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Lemon","Syrup"],"price":"$5.00"},{"id":12,"type":"tea","title":"Sea buckthorn","description":"Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon","urlToImage":"../img/menu/tea/tea-4.png","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Lemon","Syrup"],"price":"$5.50 "},{"id":13,"type":"dessert","title":"Marble cheesecake","description":"Philadelphia cheese with lemon zest on a light sponge cake and red currant jam","urlToImage":"../img/menu/desserts/dessert-1.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$3.50"},{"id":14,"type":"dessert","title":"Red velvet","description":"Layer cake with cream cheese frosting","urlToImage":"../img/menu/desserts/dessert-2.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$4.00"},{"id":15,"type":"dessert","title":"Cheesecakes","description":"Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar","urlToImage":"../img/menu/desserts/dessert-3.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$4.50"},{"id":16,"type":"dessert","title":"Creme brulee","description":"Delicate creamy dessert in a caramel basket with wild berries","urlToImage":"../img/menu/desserts/dessert-4.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$4.00"},{"id":17,"type":"dessert","title":"Pancakes","description":"Tender pancakes with strawberry jam and fresh strawberries","urlToImage":"../img/menu/desserts/dessert-5.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$4.50"},{"id":18,"type":"dessert","title":"Honey cake","description":"Classic honey cake with delicate custard","urlToImage":"../img/menu/desserts/dessert-6.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$4.50"},{"id":19,"type":"dessert","title":"Chocolate cake","description":"Cake with hot chocolate filling and nuts with dried apricots","urlToImage":"../img/menu/desserts/dessert-7.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$5.50"},{"id":20,"type":"dessert","title":"Black forest","description":"A combination of thin sponge cake with cherry jam and light chocolate mousse","urlToImage":"../img/menu/desserts/dessert-8.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$6.50"}]');

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _JSON_data_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../JSON/data.json */ "./src/JSON/data.json");
/* harmony import */ var _Modules_CatalogItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modules/CatalogItem */ "./src/js/Modules/CatalogItem.js");
/* harmony import */ var _Modules_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modules/Modal */ "./src/js/Modules/Modal.js");
/* harmony import */ var _Modules_ModalItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Modules/ModalItem */ "./src/js/Modules/ModalItem.js");
// import {Modal} from "./Modules/Modal.js";
// let dataItems = Modal.data;





window.onload = function () {
    if (_JSON_data_json__WEBPACK_IMPORTED_MODULE_0__) {
        renderCatalogToDom("coffe");
    }
    // Categories
    addCategoriesClickHandler();
    // Generate modal
    addItemCatalogClickHandler();
    // add Window Resize Handler
    addWindowResizeHandler();
    // Add handler to refresh button
    addRefreshButtonHandler();
}

const addRefreshButtonHandler = () => {
    let refreshButton = document.querySelector(".button__refresh");
    let currentCategory = document.querySelector(".button__category_active").dataset.category;
    refreshButton.addEventListener("click", (e) => {
        let coffeItems = getCatalogItems(currentCategory);
        let catalogWrapper = getCatalogWrapper();
        generateItems(coffeItems).forEach(item => {
            catalogWrapper.append(item.generateItem());
        });
        refreshButton.style.display = "none";
    })
}

const checkButtonRefreshNeeded = () => {
    let currentCategory = document.querySelector(".button__category_active").dataset.category;
    let amountOfCurrentItems = 0;
    _JSON_data_json__WEBPACK_IMPORTED_MODULE_0__.forEach(item => {
        if (item.type == currentCategory) {
            amountOfCurrentItems += 1;
        }
    });
    if (amountOfCurrentItems > 4 && window.innerWidth <= 768) {
        return true;
    } else {
        return false;
    }
}

const addWindowResizeHandler = () => {
    let startWidth = window.innerWidth;
    window.addEventListener('resize', (e) => {
        // Change amount of catalog items
        let currentWidth = window.innerWidth;
        let currentCategory = document.querySelector(".button__category_active").dataset.category;
        let obj = checkChange(startWidth, currentWidth);
        if (obj.result) {
            renderCatalogToDom(currentCategory);
        }
        startWidth = obj.startWidth;
        // Check a button refresh needed
        let refreshButton = document.querySelector(".button__refresh");
        let catalogWrapper = document.querySelector(".catalog");
        if (catalogWrapper.children.length <= 4) {
            if (!checkButtonRefreshNeeded()) {
                refreshButton.style.display = "none";
            } else {
                refreshButton.style.display = "flex";
            }
        }
    });
}

const checkChange = (startWidth, currentWidth) => {
    let start = startWidth;
    let res = undefined;
    if (startWidth <= 768) {
        if (currentWidth >= 768) {
            res = true;
            start = currentWidth + 1;
        }
    }
    if (startWidth >= 768) {
        if (currentWidth <= 768) {
            res = true;
            start = currentWidth - 1;
        }
    }
    return {
        result: res,
        startWidth: start
    }
}

const addCategoriesClickHandler = () => {
    document.querySelector(".categries").addEventListener("click", (e) => {
        let clickedCategory = e.target.closest(".button__category");
        let dataCategory = clickedCategory?.getAttribute("data-category");
        if (clickedCategory?.classList.contains("button__category")) {
            if (!clickedCategory.classList.contains("button__category_active")) {
                removeSelectedCategories();
                selectClickedCategory(clickedCategory);
                renderCatalogToDom(dataCategory);
            }
        }
        // Refresh button
        let refreshButton = document.querySelector(".button__refresh");
        if (!checkButtonRefreshNeeded()) {
            refreshButton.style.display = "none";
        } else {
            refreshButton.style.display = "flex";
        }
    })
}

const removeSelectedCategories = () => {
    let categories = document.querySelectorAll(".button__category");
    categories.forEach(category => {
        category.classList.remove("button__category_active");
    })
}

const selectClickedCategory = (clickedCategory) => {
    clickedCategory.classList.add("button__category_active");
}

const getCatalogItems = (type) => {
    let catalogItems = [];
    _JSON_data_json__WEBPACK_IMPORTED_MODULE_0__.forEach((item) => {
        if (item.type === type) {
            catalogItems.push(item);
        }
    });
    return catalogItems;
}

const renderCatalogToDom = (type) => {
    let coffeItems = getCatalogItems(type);
    let catalogWrapper = getCatalogWrapper();
    let windowInnerWidth = window.innerWidth;
    let generateObjectItems = generateItems(coffeItems);
    if (windowInnerWidth <= 768) {
        for (let i = 0; i < 4; i++) {
            catalogWrapper.append(generateObjectItems[i].generateItem());
        }
    } else {
        for (let i = 0; i < generateObjectItems.length; i++) {
            catalogWrapper.append(generateObjectItems[i].generateItem());
        }
    }
}

const getCatalogWrapper = () => {
    const catalogWrapper = document.querySelector(".catalog");
    catalogWrapper.innerHTML = "";
    return catalogWrapper;
}

const generateItems = (data) => {
    let items = [];
    data.forEach((item) => {
        items.push(new _Modules_CatalogItem__WEBPACK_IMPORTED_MODULE_1__.CatalogItem(item));
    });
    return items;
}

const addItemCatalogClickHandler = () => {
    document.querySelector(".catalog").addEventListener("click", (e) => {
        if (e.target.closest('.catalog__item')) {
            let clickedItemId = e.target.closest('.catalog__item').getAttribute("data-id");
            let clickedItemData = getClickedData(clickedItemId);
            renderItemModalWindow(clickedItemData);
        }
    })
}

const getClickedData = (id) => {
    return _JSON_data_json__WEBPACK_IMPORTED_MODULE_0__.find(item => {
        return item.id == id;
    })
}

const renderItemModalWindow = (item) => {
    let modal = new _Modules_ModalItem__WEBPACK_IMPORTED_MODULE_3__.ModalItem("", item);
    modal.renderModal();
}
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (false) { var hotEmitter, check, log, upToDate, lastHash; } else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDRDQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQSxNQUFNO0FBQ04sd0JBQXdCLGdDQUFnQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDZEQUFXO0FBQ2xDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxXQUFXLDRDQUFTO0FBQ3BCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5REFBUztBQUM3QjtBQUNBLEM7Ozs7Ozs7Ozs7O0FDekxBOzs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsbURBbUVmLENBQUM7QUFDRjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29mZmUtaG91c2UvLi9zcmMvanMvTW9kdWxlcy9DYXRhbG9nSXRlbS5qcyIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS8uL3NyYy9qcy9Nb2R1bGVzL01vZGFsLmpzIiwid2VicGFjazovL2NvZmZlLWhvdXNlLy4vc3JjL2pzL01vZHVsZXMvTW9kYWxJdGVtLmpzIiwid2VicGFjazovL2NvZmZlLWhvdXNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NvZmZlLWhvdXNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NvZmZlLWhvdXNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2UvLi9zcmMvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2UvLi9zcmMvc2Fzcy9zdHlsZS5zY3NzPzNhYzQiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2UvLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvZGV2LXNlcnZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ2F0YWxvZ0l0ZW0ge1xyXG4gICAgY29uc3RydWN0b3Ioe2lkLCB0eXBlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHVybFRvSW1hZ2UsIHByaWNlfSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy51cmxUb0ltYWdlID0gdXJsVG9JbWFnZTtcclxuICAgICAgICB0aGlzLnByaWNlID0gcHJpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVJdGVtKCkge1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZSA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGl0ZW0uY2xhc3NOYW1lID0gXCJjYXRhbG9nX19pdGVtXCI7XHJcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIHRoaXMuaWQpO1xyXG5cclxuICAgICAgICB0aGlzLnVybFRvSW1hZ2UgJiYgKHRlbXBsYXRlICs9XHJcbiAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGFsb2dfX2ltYWdlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNhdGFsb2dfX2ltYWdlXCIgc3JjPVwiJHt0aGlzLnVybFRvSW1hZ2V9XCIgYWx0PVwiJHt0aGlzLnR5cGV9XCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGl0bGUgfHwgdGhpcy5kZXNjcmlwdGlvbiB8fCB0aGlzLnByaWNlKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlICs9IGA8ZGl2IGNsYXNzPVwiY2F0YWxvZ19faXRlbS1pbmZvXCI+YDtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSAmJiAodGVtcGxhdGUgKz0gYDxoNSBjbGFzcz1cImRyaW5rX190aXRsZVwiPiR7dGhpcy50aXRsZX08L2g1PmApO1xyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uICYmICh0ZW1wbGF0ZSArPSBgPHAgY2xhc3M9XCJkcmlua19fZGVzY3JpcHRpb25cIj4ke3RoaXMuZGVzY3JpcHRpb259PC9wPmApO1xyXG4gICAgICAgICAgICB0aGlzLnByaWNlICYmICh0ZW1wbGF0ZSArPSBgPHAgY2xhc3M9XCJkcmlua19fcHJpY2VcIj4ke3RoaXMucHJpY2V9PC9wPmApO1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZSArPSBgPC9kaXY+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0ZW0uaW5uZXJIVE1MID0gdGVtcGxhdGU7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgTW9kYWwge1xyXG4gICAgY29uc3RydWN0b3IoY2xhc3Nlcykge1xyXG4gICAgICAgIHRoaXMuY2xhc3NlcyA9IGNsYXNzZXM7XHJcbiAgICAgICAgdGhpcy5tb2RhbE92ZXJsYXkgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubW9kYWxXcmFwcGVyID0gXCJcIjtcclxuICAgICAgICB0aGlzLm1vZGFsV2luZG93ID0gXCJcIjtcclxuICAgICAgICB0aGlzLm1vZGFsQ29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tb2RhbENsb3NlQnV0dG9uID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZE1vZGFsKGNvbnRlbnQpIHtcclxuICAgICAgICAvL092ZXJsYXlcclxuICAgICAgICB0aGlzLm1vZGFsT3ZlcmxheSA9IHRoaXMuY3JlYXRlRG9tTm9kZTEodGhpcy5tb2RhbE92ZXJsYXksIFwiZGl2XCIsIFwibW9kYWxfX292ZXJsYXlcIik7XHJcbiAgICAgICAgLy9XcmFwcGVyXHJcbiAgICAgICAgdGhpcy5tb2RhbFdyYXBwZXIgPSB0aGlzLmNyZWF0ZURvbU5vZGUxKHRoaXMubW9kYWxXcmFwcGVyLCBcImRpdlwiLCBcIm1vZGFsX193cmFwcGVyXCIpO1xyXG4gICAgICAgIC8vV2luZG93XHJcbiAgICAgICAgdGhpcy5tb2RhbFdpbmRvdyA9IHRoaXMuY3JlYXRlRG9tTm9kZTEodGhpcy5tb2RhbFdpbmRvdywgXCJkaXZcIiwgXCJtb2RhbF9fd2luZG93XCIpO1xyXG4gICAgICAgIC8vQ29udGVudFxyXG4gICAgICAgIHRoaXMubW9kYWxDb250ZW50ID0gdGhpcy5jcmVhdGVEb21Ob2RlMSh0aGlzLm1vZGFsQ29udGVudCwgXCJkaXZcIiwgXCJtb2RhbF9fY29udGVudFwiKTtcclxuICAgICAgICAvL0Nsb3NlQnV0dG9uXHJcbiAgICAgICAgdGhpcy5tb2RhbENsb3NlQnV0dG9uID0gdGhpcy5jcmVhdGVDbG9zZUJ1dHRvbih0aGlzLm1vZGFsQ2xvc2VCdXR0b24sIFwiYnV0dG9uXCIsIFwiYnV0dG9uX19tb2RhbC1jbG9zZVwiKTtcclxuICAgICAgICAvL1NldENvbnRlbnRcclxuICAgICAgICB0aGlzLnNldENvbnRlbnQoY29udGVudCk7XHJcbiAgICAgICAgLy9TZXRDbG9zZUJ1dHRvblxyXG4gICAgICAgIHRoaXMubW9kYWxDb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2luZm9cIikuYXBwZW5kKHRoaXMubW9kYWxDbG9zZUJ1dHRvbik7XHJcbiAgICAgICAgLy9BcHBlbmRNb2RhbEVsZW1lbnRzXHJcbiAgICAgICAgdGhpcy5hcHBlbmRNb2RhbEVsZW1lbnRzKCk7XHJcbiAgICAgICAgLy9CdWlsZEV2ZW50cyhjbG9zZSBhbmQgb3BlbilcclxuICAgICAgICB0aGlzLmJ1aWxkRXZlbnRzKCk7XHJcbiAgICAgICAgLy9PcGVuTW9kYWxcclxuICAgICAgICB0aGlzLm9wZW5Nb2RhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZURvbU5vZGUxKG5vZGUsIGVsZW1lbnQsIC4uLmNsYXNzZXMpIHtcclxuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ2xvc2VCdXR0b24obm9kZSwgLi4uY2xhc3Nlcykge1xyXG4gICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcclxuICAgICAgICBub2RlLmlubmVySFRNTCA9IFwiPHNwYW4+Q2xvc2U8L3NwYW4+XCI7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q29udGVudChjb250ZW50KSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbENvbnRlbnQuYXBwZW5kKC4uLmNvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZE1vZGFsRWxlbWVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbE92ZXJsYXkuYXBwZW5kKHRoaXMubW9kYWxXcmFwcGVyKTtcclxuICAgICAgICB0aGlzLm1vZGFsV3JhcHBlci5hcHBlbmQodGhpcy5tb2RhbFdpbmRvdyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbFdpbmRvdy5hcHBlbmQodGhpcy5tb2RhbENvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMubW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlTW9kYWwoZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvcGVuTW9kYWwoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQodGhpcy5tb2RhbE92ZXJsYXkpO1xyXG4gICAgICAgIC8vQW50aS1zY3JvbGxcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIlxyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlTW9kYWwoZSkge1xyXG4gICAgICAgIGxldCBjbGFzc2VzID0gZS50YXJnZXQuY2xhc3NMaXN0O1xyXG4gICAgICAgIGxldCBmaXJzdENsb3NlUnVsZSA9IChjbGFzc2VzLmNvbnRhaW5zKFwibW9kYWxfX292ZXJsYXlcIikgfHwgY2xhc3Nlcy5jb250YWlucyhcIm1vZGFsX193cmFwcGVyXCIpKTtcclxuICAgICAgICBsZXQgc2Vjb25kQ2xvc2VSdWxlID0gKGNsYXNzZXMuY29udGFpbnMoXCJidXR0b25fX21vZGFsLWNsb3NlXCIpKTtcclxuICAgICAgICBpZiAoZmlyc3RDbG9zZVJ1bGUgfHwgc2Vjb25kQ2xvc2VSdWxlKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX292ZXJsYXlcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vRGVsZXRlIEFudGktc2Nyb2xsXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiXCI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge01vZGFsfSBmcm9tICcuL01vZGFsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNb2RhbEl0ZW0gZXh0ZW5kcyBNb2RhbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihjbGFzc2VzLCB7aWQsIHR5cGUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdXJsVG9JbWFnZSwgcHJpY2UsIHNpemUsIGFkZGl0aXZlc30pIHtcclxuICAgICAgICBzdXBlcihjbGFzc2VzKTtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMudXJsVG9JbWFnZSA9IHVybFRvSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5wcmljZSA9IHByaWNlO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5hZGRpdGl2ZXMgPSBhZGRpdGl2ZXM7XHJcbiAgICAgICAgdGhpcy5sZXR0ZXJTaXplID0gW3tsZXR0ZXI6IFwiU1wiLCBwbHVzOiAwfSwge2xldHRlcjogXCJNXCIsIHBsdXM6IDAuNX0sIHtsZXR0ZXI6IFwiTFwiLCBwbHVzOiAxfV07XHJcbiAgICAgICAgdGhpcy5hZGRpdGl2ZVBsdXNQcmljZSA9IDAuNTA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGx1c1ByaWNlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvL0l0ZW0gQ29udGVudCBHZW5lcmF0b3JcclxuICAgIGdlbmVyYXRlQ29udGVudCgpIHtcclxuICAgICAgICBsZXQgaW1hZ2VCbG9jayA9IHRoaXMuZ2VuZXJhdGVJbWFnZUJsb2NrKCk7XHJcbiAgICAgICAgbGV0IGluZm9CbG9jayA9IHRoaXMuZ2VuZXJhdGVJbmZvQmxvY2soKTtcclxuICAgICAgICByZXR1cm4gW2ltYWdlQmxvY2ssIGluZm9CbG9ja107XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVJbWFnZUJsb2NrKCkge1xyXG4gICAgICAgIGxldCBpbWFnZUJsb2NrID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiZGl2XCIsIFwiY2F0YWxvZ19faW1hZ2UtY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGxldCBpbWFnZSA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImltZ1wiLCBcImNhdGFsb2dfX2ltYWdlXCIpO1xyXG4gICAgICAgIHRoaXMudXJsVG9JbWFnZSAmJiAoaW1hZ2Uuc3JjID0gdGhpcy51cmxUb0ltYWdlKTtcclxuICAgICAgICB0aGlzLnR5cGUgJiYgKGltYWdlLmFsdCA9IHRoaXMudHlwZSk7XHJcbiAgICAgICAgaW1hZ2VCbG9jay5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbiAgICAgICAgcmV0dXJuIGltYWdlQmxvY2s7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVJbmZvQmxvY2soKSB7XHJcbiAgICAgICAgbGV0IGluZm9CbG9jayA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcIm1vZGFsX19pbmZvXCIpO1xyXG4gICAgICAgIGxldCBkcmlua3NCbG9jayA9IHRoaXMuZ2VuZXJhdGVEcmlua3NCbG9jaygpO1xyXG4gICAgICAgIGxldCBzaXplQmxvY2sgPSB0aGlzLmdlbmVyYXRlU2l6ZUJsb2NrKCk7XHJcbiAgICAgICAgbGV0IGFkZGl0aXZlc0Jsb2NrID0gdGhpcy5nZW5lcmF0ZUFkZGl0aXZlc0Jsb2NrKCk7XHJcbiAgICAgICAgbGV0IHByaWNlQmxvY2sgPSB0aGlzLmdlbmVyYXRlUHJpY2VCbG9jaygpO1xyXG4gICAgICAgIGxldCBub3RlQmxvY2sgPSB0aGlzLmdlbmVyYXRlTm90ZUJsb2NrKCk7XHJcbiAgICAgICAgaW5mb0Jsb2NrLmFwcGVuZChkcmlua3NCbG9jaywgc2l6ZUJsb2NrLCBhZGRpdGl2ZXNCbG9jaywgcHJpY2VCbG9jaywgbm90ZUJsb2NrKTtcclxuICAgICAgICByZXR1cm4gaW5mb0Jsb2NrO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZW5lcmF0ZURyaW5rc0Jsb2NrKCkge1xyXG4gICAgICAgIGxldCBkcmlua3NCbG9jayA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcImRyaW5rX19pbmZvXCIpO1xyXG4gICAgICAgIGxldCBkcmlua1RpdGxlID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiaDVcIiwgXCJkcmlua19fdGl0bGVcIik7XHJcbiAgICAgICAgbGV0IGRyaW5rRGVzY3JpcHRpb24gPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJwXCIsIFwiZHJpbmtfX2Rlc2NyaXB0aW9uXCIpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgJiYgKGRyaW5rVGl0bGUuaW5uZXJUZXh0ID0gdGhpcy50aXRsZSk7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiAmJiAoZHJpbmtEZXNjcmlwdGlvbi5pbm5lclRleHQgPSB0aGlzLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICBkcmlua3NCbG9jay5hcHBlbmQoZHJpbmtUaXRsZSwgZHJpbmtEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIGRyaW5rc0Jsb2NrXHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVTaXplQmxvY2soKSB7XHJcbiAgICAgICAgbGV0IHNpemVCbG9jayA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcInNpemVfX2luZm9cIiwgXCJzaXplLWluZm9cIik7XHJcbiAgICAgICAgbGV0IHNpemVCbG9ja1RpdGxlID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiaDZcIiwgXCJzaXplLWluZm9fX3RpdGxlXCIpO1xyXG4gICAgICAgIHNpemVCbG9ja1RpdGxlLmlubmVyVGV4dCA9IFwiU2l6ZVwiO1xyXG4gICAgICAgIGxldCBzaXplQmxvY2tCdXR0b25zID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiZGl2XCIsIFwic2l6ZS1pbmZvX19idXR0b25zXCIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2l6ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24gPSB0aGlzLmNyZWF0ZU1vZGFsQnV0dG9uKHRoaXMubGV0dGVyU2l6ZVtpXS5sZXR0ZXIsIHRoaXMuc2l6ZVtpXSwgXCJidXR0b25cIixcImJ1dHRvbl9fbW9kYWwtaW5mb1wiLCBcImJ1dHRvbl9fc2l6ZVwiLCBcImJ1dHRvbl9fbW9kYWwtaW5mb19hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24gPSB0aGlzLmNyZWF0ZU1vZGFsQnV0dG9uKHRoaXMubGV0dGVyU2l6ZVtpXS5sZXR0ZXIsIHRoaXMuc2l6ZVtpXSwgXCJidXR0b25cIixcImJ1dHRvbl9fbW9kYWwtaW5mb1wiLCBcImJ1dHRvbl9fc2l6ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaXplQmxvY2tCdXR0b25zLmFwcGVuZChidXR0b24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2l6ZUJsb2NrQnV0dG9ucy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnV0dG9uX19zaXplXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrU2l6ZUJ1dHRvbihlLCBcIi5idXR0b25fX3NpemVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgc2l6ZUJsb2NrLmFwcGVuZChzaXplQmxvY2tUaXRsZSwgc2l6ZUJsb2NrQnV0dG9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHNpemVCbG9jaztcclxuICAgIH1cclxuXHJcbiAgICBjbGlja1NpemVCdXR0b24oZSwgc2VsZWN0b3IpIHtcclxuICAgICAgICAvLyBEZWxldGUgYWN0aXZlIGNsYXNzXHJcbiAgICAgICAgbGV0IG5vZGVMaXN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgICAgIG5vZGVMaXN0QnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYnV0dG9uX19tb2RhbC1pbmZvX2FjdGl2ZVwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIEFkZCBhY3RpdmUgY2xhc3MgdG8gY2xpY2tlZCBidXR0b25cclxuICAgICAgICBlLnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKS5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uX19tb2RhbC1pbmZvX2FjdGl2ZVwiKTtcclxuICAgICAgICAvLyBDaGFuZ2UgcHJpY2VcclxuICAgICAgICBsZXQgY2xpY2tlZFNpemUgPSBlLnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKS5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUw7XHJcbiAgICAgICAgbGV0IHRvdGFsUHJpY2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b3RhbC1wcmljZVwiKTtcclxuICAgICAgICBsZXQgdG90YWxQcmljZU51bWJlciA9ICt0aGlzLnByaWNlLnNsaWNlKDEpICsgdGhpcy5jdXJyZW50UGx1c1ByaWNlO1xyXG4gICAgICAgIGxldCBwbHVzUHJpY2UgPSAodGhpcy5sZXR0ZXJTaXplLmZpbmQob2JqID0+IG9iai5sZXR0ZXIgPT0gY2xpY2tlZFNpemUpKS5wbHVzO1xyXG4gICAgICAgIHRvdGFsUHJpY2VFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdG90YWxQcmljZUVsZW1lbnQuaW5uZXJIVE1MID0gXCIkXCIgKyBgJHt0b3RhbFByaWNlTnVtYmVyICsgcGx1c1ByaWNlfWA7XHJcbiAgICAgICAgaWYgKCF0b3RhbFByaWNlRWxlbWVudC5pbm5lckhUTUwuaW5jbHVkZXMoXCIuXCIpKSB7XHJcbiAgICAgICAgICAgIHRvdGFsUHJpY2VFbGVtZW50LmlubmVySFRNTCArPSBcIi4wMFwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlQWRkaXRpdmVzQmxvY2soKSB7XHJcbiAgICAgICAgbGV0IGFkZGl0aXZlc0Jsb2NrID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiZGl2XCIsIFwiYWRkaXRpdmVzX19pbmZvXCIsIFwiYWRkaXRpdmVzLWluZm9cIik7XHJcbiAgICAgICAgbGV0IGFkZGl0aXZlc0Jsb2NrVGl0bGUgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJoNlwiLCBcImFkZGl0aXZlcy1pbmZvX190aXRsZVwiKTtcclxuICAgICAgICBhZGRpdGl2ZXNCbG9ja1RpdGxlLmlubmVyVGV4dCA9IFwiQWRkaXRpdmVzXCI7XHJcbiAgICAgICAgbGV0IGFkZGl0aXZlc0Jsb2NrQnV0dG9ucyA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcImFkZGl0aXZlcy1pbmZvX19idXR0b25zXCIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWRkaXRpdmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBidXR0b24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmIChpID09IDApIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbiA9IHRoaXMuY3JlYXRlTW9kYWxCdXR0b24oKGkgKyAxKSwgdGhpcy5hZGRpdGl2ZXNbaV0sIFwiYnV0dG9uXCIsXCJidXR0b25fX21vZGFsLWluZm9cIiwgXCJidXR0b25fX2FkZGl0aXZlc1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbiA9IHRoaXMuY3JlYXRlTW9kYWxCdXR0b24oKGkgKyAxKSwgdGhpcy5hZGRpdGl2ZXNbaV0sIFwiYnV0dG9uXCIsXCJidXR0b25fX21vZGFsLWluZm9cIiwgXCJidXR0b25fX2FkZGl0aXZlc1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZGRpdGl2ZXNCbG9ja0J1dHRvbnMuYXBwZW5kKGJ1dHRvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRpdGl2ZXNCbG9jay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnV0dG9uX19hZGRpdGl2ZXNcIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tBZGRpdGl2ZUJ1dHRvbihlLCBcIi5idXR0b25fX2FkZGl0aXZlc1wiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBhZGRpdGl2ZXNCbG9jay5hcHBlbmQoYWRkaXRpdmVzQmxvY2tUaXRsZSwgYWRkaXRpdmVzQmxvY2tCdXR0b25zKTtcclxuICAgICAgICByZXR1cm4gYWRkaXRpdmVzQmxvY2s7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tBZGRpdGl2ZUJ1dHRvbihlLCBzZWxlY3Rvcikge1xyXG4gICAgICAgIC8vIFRvZ2dsZSBhY3RpdmUgY2xhc3NcclxuICAgICAgICBlLnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKS5jbGFzc0xpc3QudG9nZ2xlKFwiYnV0dG9uX19tb2RhbC1pbmZvX2FjdGl2ZVwiKTtcclxuICAgICAgICAvLyBDaGFuZ2UgcHJpY2VcclxuICAgICAgICBsZXQgdG90YWxQcmljZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvdGFsLXByaWNlXCIpO1xyXG4gICAgICAgIGxldCB0b3RhbFByaWNlTnVtYmVyID0gKyh0b3RhbFByaWNlRWxlbWVudC5pbm5lckhUTUwpLnNsaWNlKDEpO1xyXG4gICAgICAgIHRvdGFsUHJpY2VFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmICghKGUudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpLmNsYXNzTGlzdC5jb250YWlucyhcImJ1dHRvbl9fbW9kYWwtaW5mb19hY3RpdmVcIikpKSB7XHJcbiAgICAgICAgICAgIHRvdGFsUHJpY2VFbGVtZW50LmlubmVySFRNTCA9IFwiJFwiICsgYCR7dG90YWxQcmljZU51bWJlciAtIHRoaXMuYWRkaXRpdmVQbHVzUHJpY2V9YDtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGx1c1ByaWNlIC09IHRoaXMuYWRkaXRpdmVQbHVzUHJpY2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG90YWxQcmljZUVsZW1lbnQuaW5uZXJIVE1MID0gXCIkXCIgKyBgJHt0b3RhbFByaWNlTnVtYmVyICsgdGhpcy5hZGRpdGl2ZVBsdXNQcmljZX1gO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQbHVzUHJpY2UgKz0gdGhpcy5hZGRpdGl2ZVBsdXNQcmljZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdG90YWxQcmljZUVsZW1lbnQuaW5uZXJIVE1MLmluY2x1ZGVzKFwiLlwiKSkge1xyXG4gICAgICAgICAgICB0b3RhbFByaWNlRWxlbWVudC5pbm5lckhUTUwgKz0gXCIuMDBcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVQcmljZUJsb2NrKCkge1xyXG4gICAgICAgIGxldCBwcmljZUJsb2NrID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiZGl2XCIsIFwicHJpY2VfX2luZm9cIik7XHJcbiAgICAgICAgcHJpY2VCbG9jay5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxzcGFuPlRvdGFsOjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3MgPSBcInRvdGFsLXByaWNlXCI+JHt0aGlzLnByaWNlfTwvc3Bhbj5cclxuICAgICAgICBgO1xyXG4gICAgICAgIHJldHVybiBwcmljZUJsb2NrO1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlTm90ZUJsb2NrKCkge1xyXG4gICAgICAgIGxldCBub3RlQmxvY2sgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJub3RlX19pbmZvXCIpO1xyXG4gICAgICAgIG5vdGVCbG9jay5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxvYmplY3QgZGF0YT1cIi4uL2ltZy9pY29ucy9pbmZvLWVtcHR5LnN2Z1wiIHR5cGU9XCJpbWFnZS9zdmcreG1sXCI+XHJcbiAgICAgICAgICAgICAgICBZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBTVkdcclxuICAgICAgICAgICAgPC9vYmplY3Q+XHJcbiAgICAgICAgICAgIDxwPlRoZSBjb3N0IGlzIG5vdCBmaW5hbC4gRG93bmxvYWQgb3VyIG1vYmlsZSBhcHAgdG8gc2VlIHRoZSBmaW5hbCBwcmljZSBhbmQgcGxhY2UgeW91cjwvYnI+IG9yZGVyLlxyXG4gICAgICAgICAgICAgICAgRWFybiBsb3lhbHR5IHBvaW50cyBhbmQgZW5qb3kgeW91ciBmYXZvcml0ZSBjb2ZmZWUgd2l0aCB1cCB0byAyMCUgZGlzY291bnQuXHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICBgO1xyXG4gICAgICAgIHJldHVybiBub3RlQmxvY2s7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTW9kYWxCdXR0b24oc2l6ZSwgdm9sdW1lLCAuLi5jbGFzc2VzKSB7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImJ1dHRvblwiLCAuLi5jbGFzc2VzKTtcclxuICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbl9fdGV4dCBidXR0b25fX3RleHRfc2l6ZVwiPiR7c2l6ZX08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uX190ZXh0IGJ1dHRvbl9fdGV4dF92b2x1bWVcIj4ke3ZvbHVtZX08L3NwYW4+XHJcbiAgICAgICAgYDtcclxuICAgICAgICByZXR1cm4gYnV0dG9uO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZURvbU5vZGUoZWxlbWVudCwgLi4uY2xhc3Nlcykge1xyXG4gICAgICAgIGxldCBkb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuICAgICAgICBkb21FbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XHJcbiAgICAgICAgcmV0dXJuIGRvbUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyTW9kYWwoKSB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmdlbmVyYXRlQ29udGVudCgpO1xyXG4gICAgICAgIHN1cGVyLmJ1aWxkTW9kYWwoY29udGVudCk7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGltcG9ydCB7TW9kYWx9IGZyb20gXCIuL01vZHVsZXMvTW9kYWwuanNcIjtcclxuLy8gbGV0IGRhdGFJdGVtcyA9IE1vZGFsLmRhdGE7XHJcbmltcG9ydCBkYXRhSXRlbXMgZnJvbSAnLi4vSlNPTi9kYXRhLmpzb24nO1xyXG5pbXBvcnQge0NhdGFsb2dJdGVtfSBmcm9tIFwiLi9Nb2R1bGVzL0NhdGFsb2dJdGVtXCI7XHJcbmltcG9ydCB7TW9kYWx9IGZyb20gXCIuL01vZHVsZXMvTW9kYWxcIjtcclxuaW1wb3J0IHtNb2RhbEl0ZW19IGZyb20gXCIuL01vZHVsZXMvTW9kYWxJdGVtXCI7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGRhdGFJdGVtcykge1xyXG4gICAgICAgIHJlbmRlckNhdGFsb2dUb0RvbShcImNvZmZlXCIpO1xyXG4gICAgfVxyXG4gICAgLy8gQ2F0ZWdvcmllc1xyXG4gICAgYWRkQ2F0ZWdvcmllc0NsaWNrSGFuZGxlcigpO1xyXG4gICAgLy8gR2VuZXJhdGUgbW9kYWxcclxuICAgIGFkZEl0ZW1DYXRhbG9nQ2xpY2tIYW5kbGVyKCk7XHJcbiAgICAvLyBhZGQgV2luZG93IFJlc2l6ZSBIYW5kbGVyXHJcbiAgICBhZGRXaW5kb3dSZXNpemVIYW5kbGVyKCk7XHJcbiAgICAvLyBBZGQgaGFuZGxlciB0byByZWZyZXNoIGJ1dHRvblxyXG4gICAgYWRkUmVmcmVzaEJ1dHRvbkhhbmRsZXIoKTtcclxufVxyXG5cclxuY29uc3QgYWRkUmVmcmVzaEJ1dHRvbkhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBsZXQgcmVmcmVzaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uX19yZWZyZXNoXCIpO1xyXG4gICAgbGV0IGN1cnJlbnRDYXRlZ29yeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uX19jYXRlZ29yeV9hY3RpdmVcIikuZGF0YXNldC5jYXRlZ29yeTtcclxuICAgIHJlZnJlc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvZmZlSXRlbXMgPSBnZXRDYXRhbG9nSXRlbXMoY3VycmVudENhdGVnb3J5KTtcclxuICAgICAgICBsZXQgY2F0YWxvZ1dyYXBwZXIgPSBnZXRDYXRhbG9nV3JhcHBlcigpO1xyXG4gICAgICAgIGdlbmVyYXRlSXRlbXMoY29mZmVJdGVtcykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgY2F0YWxvZ1dyYXBwZXIuYXBwZW5kKGl0ZW0uZ2VuZXJhdGVJdGVtKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlZnJlc2hCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgY2hlY2tCdXR0b25SZWZyZXNoTmVlZGVkID0gKCkgPT4ge1xyXG4gICAgbGV0IGN1cnJlbnRDYXRlZ29yeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uX19jYXRlZ29yeV9hY3RpdmVcIikuZGF0YXNldC5jYXRlZ29yeTtcclxuICAgIGxldCBhbW91bnRPZkN1cnJlbnRJdGVtcyA9IDA7XHJcbiAgICBkYXRhSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpZiAoaXRlbS50eXBlID09IGN1cnJlbnRDYXRlZ29yeSkge1xyXG4gICAgICAgICAgICBhbW91bnRPZkN1cnJlbnRJdGVtcyArPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKGFtb3VudE9mQ3VycmVudEl0ZW1zID4gNCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA8PSA3NjgpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBhZGRXaW5kb3dSZXNpemVIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgbGV0IHN0YXJ0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZSkgPT4ge1xyXG4gICAgICAgIC8vIENoYW5nZSBhbW91bnQgb2YgY2F0YWxvZyBpdGVtc1xyXG4gICAgICAgIGxldCBjdXJyZW50V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBsZXQgY3VycmVudENhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b25fX2NhdGVnb3J5X2FjdGl2ZVwiKS5kYXRhc2V0LmNhdGVnb3J5O1xyXG4gICAgICAgIGxldCBvYmogPSBjaGVja0NoYW5nZShzdGFydFdpZHRoLCBjdXJyZW50V2lkdGgpO1xyXG4gICAgICAgIGlmIChvYmoucmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlbmRlckNhdGFsb2dUb0RvbShjdXJyZW50Q2F0ZWdvcnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGFydFdpZHRoID0gb2JqLnN0YXJ0V2lkdGg7XHJcbiAgICAgICAgLy8gQ2hlY2sgYSBidXR0b24gcmVmcmVzaCBuZWVkZWRcclxuICAgICAgICBsZXQgcmVmcmVzaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uX19yZWZyZXNoXCIpO1xyXG4gICAgICAgIGxldCBjYXRhbG9nV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0YWxvZ1wiKTtcclxuICAgICAgICBpZiAoY2F0YWxvZ1dyYXBwZXIuY2hpbGRyZW4ubGVuZ3RoIDw9IDQpIHtcclxuICAgICAgICAgICAgaWYgKCFjaGVja0J1dHRvblJlZnJlc2hOZWVkZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgcmVmcmVzaEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCBjaGVja0NoYW5nZSA9IChzdGFydFdpZHRoLCBjdXJyZW50V2lkdGgpID0+IHtcclxuICAgIGxldCBzdGFydCA9IHN0YXJ0V2lkdGg7XHJcbiAgICBsZXQgcmVzID0gdW5kZWZpbmVkO1xyXG4gICAgaWYgKHN0YXJ0V2lkdGggPD0gNzY4KSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRXaWR0aCA+PSA3NjgpIHtcclxuICAgICAgICAgICAgcmVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3RhcnQgPSBjdXJyZW50V2lkdGggKyAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChzdGFydFdpZHRoID49IDc2OCkge1xyXG4gICAgICAgIGlmIChjdXJyZW50V2lkdGggPD0gNzY4KSB7XHJcbiAgICAgICAgICAgIHJlcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gY3VycmVudFdpZHRoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3VsdDogcmVzLFxyXG4gICAgICAgIHN0YXJ0V2lkdGg6IHN0YXJ0XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGFkZENhdGVnb3JpZXNDbGlja0hhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhdGVncmllc1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBsZXQgY2xpY2tlZENhdGVnb3J5ID0gZS50YXJnZXQuY2xvc2VzdChcIi5idXR0b25fX2NhdGVnb3J5XCIpO1xyXG4gICAgICAgIGxldCBkYXRhQ2F0ZWdvcnkgPSBjbGlja2VkQ2F0ZWdvcnk/LmdldEF0dHJpYnV0ZShcImRhdGEtY2F0ZWdvcnlcIik7XHJcbiAgICAgICAgaWYgKGNsaWNrZWRDYXRlZ29yeT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnV0dG9uX19jYXRlZ29yeVwiKSkge1xyXG4gICAgICAgICAgICBpZiAoIWNsaWNrZWRDYXRlZ29yeS5jbGFzc0xpc3QuY29udGFpbnMoXCJidXR0b25fX2NhdGVnb3J5X2FjdGl2ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlU2VsZWN0ZWRDYXRlZ29yaWVzKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RDbGlja2VkQ2F0ZWdvcnkoY2xpY2tlZENhdGVnb3J5KTtcclxuICAgICAgICAgICAgICAgIHJlbmRlckNhdGFsb2dUb0RvbShkYXRhQ2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlZnJlc2ggYnV0dG9uXHJcbiAgICAgICAgbGV0IHJlZnJlc2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbl9fcmVmcmVzaFwiKTtcclxuICAgICAgICBpZiAoIWNoZWNrQnV0dG9uUmVmcmVzaE5lZWRlZCgpKSB7XHJcbiAgICAgICAgICAgIHJlZnJlc2hCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlZnJlc2hCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IHJlbW92ZVNlbGVjdGVkQ2F0ZWdvcmllcyA9ICgpID0+IHtcclxuICAgIGxldCBjYXRlZ29yaWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b25fX2NhdGVnb3J5XCIpO1xyXG4gICAgY2F0ZWdvcmllcy5mb3JFYWNoKGNhdGVnb3J5ID0+IHtcclxuICAgICAgICBjYXRlZ29yeS5jbGFzc0xpc3QucmVtb3ZlKFwiYnV0dG9uX19jYXRlZ29yeV9hY3RpdmVcIik7XHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBzZWxlY3RDbGlja2VkQ2F0ZWdvcnkgPSAoY2xpY2tlZENhdGVnb3J5KSA9PiB7XHJcbiAgICBjbGlja2VkQ2F0ZWdvcnkuY2xhc3NMaXN0LmFkZChcImJ1dHRvbl9fY2F0ZWdvcnlfYWN0aXZlXCIpO1xyXG59XHJcblxyXG5jb25zdCBnZXRDYXRhbG9nSXRlbXMgPSAodHlwZSkgPT4ge1xyXG4gICAgbGV0IGNhdGFsb2dJdGVtcyA9IFtdO1xyXG4gICAgZGF0YUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpZiAoaXRlbS50eXBlID09PSB0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhdGFsb2dJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNhdGFsb2dJdGVtcztcclxufVxyXG5cclxuY29uc3QgcmVuZGVyQ2F0YWxvZ1RvRG9tID0gKHR5cGUpID0+IHtcclxuICAgIGxldCBjb2ZmZUl0ZW1zID0gZ2V0Q2F0YWxvZ0l0ZW1zKHR5cGUpO1xyXG4gICAgbGV0IGNhdGFsb2dXcmFwcGVyID0gZ2V0Q2F0YWxvZ1dyYXBwZXIoKTtcclxuICAgIGxldCB3aW5kb3dJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICBsZXQgZ2VuZXJhdGVPYmplY3RJdGVtcyA9IGdlbmVyYXRlSXRlbXMoY29mZmVJdGVtcyk7XHJcbiAgICBpZiAod2luZG93SW5uZXJXaWR0aCA8PSA3NjgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBjYXRhbG9nV3JhcHBlci5hcHBlbmQoZ2VuZXJhdGVPYmplY3RJdGVtc1tpXS5nZW5lcmF0ZUl0ZW0oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdlbmVyYXRlT2JqZWN0SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2F0YWxvZ1dyYXBwZXIuYXBwZW5kKGdlbmVyYXRlT2JqZWN0SXRlbXNbaV0uZ2VuZXJhdGVJdGVtKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgZ2V0Q2F0YWxvZ1dyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjYXRhbG9nV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0YWxvZ1wiKTtcclxuICAgIGNhdGFsb2dXcmFwcGVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICByZXR1cm4gY2F0YWxvZ1dyYXBwZXI7XHJcbn1cclxuXHJcbmNvbnN0IGdlbmVyYXRlSXRlbXMgPSAoZGF0YSkgPT4ge1xyXG4gICAgbGV0IGl0ZW1zID0gW107XHJcbiAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtcy5wdXNoKG5ldyBDYXRhbG9nSXRlbShpdGVtKSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpdGVtcztcclxufVxyXG5cclxuY29uc3QgYWRkSXRlbUNhdGFsb2dDbGlja0hhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhdGFsb2dcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoJy5jYXRhbG9nX19pdGVtJykpIHtcclxuICAgICAgICAgICAgbGV0IGNsaWNrZWRJdGVtSWQgPSBlLnRhcmdldC5jbG9zZXN0KCcuY2F0YWxvZ19faXRlbScpLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgIGxldCBjbGlja2VkSXRlbURhdGEgPSBnZXRDbGlja2VkRGF0YShjbGlja2VkSXRlbUlkKTtcclxuICAgICAgICAgICAgcmVuZGVySXRlbU1vZGFsV2luZG93KGNsaWNrZWRJdGVtRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgZ2V0Q2xpY2tlZERhdGEgPSAoaWQpID0+IHtcclxuICAgIHJldHVybiBkYXRhSXRlbXMuZmluZChpdGVtID0+IHtcclxuICAgICAgICByZXR1cm4gaXRlbS5pZCA9PSBpZDtcclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlckl0ZW1Nb2RhbFdpbmRvdyA9IChpdGVtKSA9PiB7XHJcbiAgICBsZXQgbW9kYWwgPSBuZXcgTW9kYWxJdGVtKFwiXCIsIGl0ZW0pO1xyXG4gICAgbW9kYWwucmVuZGVyTW9kYWwoKTtcclxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vKiBnbG9iYWxzIF9fd2VicGFja19oYXNoX18gKi9cbmlmIChtb2R1bGUuaG90KSB7XG5cdC8qKiBAdHlwZSB7dW5kZWZpbmVkfHN0cmluZ30gKi9cblx0dmFyIGxhc3RIYXNoO1xuXHR2YXIgdXBUb0RhdGUgPSBmdW5jdGlvbiB1cFRvRGF0ZSgpIHtcblx0XHRyZXR1cm4gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChsYXN0SGFzaCkuaW5kZXhPZihfX3dlYnBhY2tfaGFzaF9fKSA+PSAwO1xuXHR9O1xuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuXHR2YXIgY2hlY2sgPSBmdW5jdGlvbiBjaGVjaygpIHtcblx0XHRtb2R1bGUuaG90XG5cdFx0XHQuY2hlY2sodHJ1ZSlcblx0XHRcdC50aGVuKGZ1bmN0aW9uICh1cGRhdGVkTW9kdWxlcykge1xuXHRcdFx0XHRpZiAoIXVwZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRcdFx0bG9nKFxuXHRcdFx0XHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcdFx0XHRcIltITVJdIENhbm5vdCBmaW5kIHVwZGF0ZS4gXCIgK1xuXHRcdFx0XHRcdFx0XHQodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIlxuXHRcdFx0XHRcdFx0XHRcdD8gXCJOZWVkIHRvIGRvIGEgZnVsbCByZWxvYWQhXCJcblx0XHRcdFx0XHRcdFx0XHQ6IFwiUGxlYXNlIHJlbG9hZCBtYW51YWxseSFcIilcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGxvZyhcblx0XHRcdFx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XHRcdFx0XCJbSE1SXSAoUHJvYmFibHkgYmVjYXVzZSBvZiByZXN0YXJ0aW5nIHRoZSB3ZWJwYWNrLWRldi1zZXJ2ZXIpXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghdXBUb0RhdGUoKSkge1xuXHRcdFx0XHRcdGNoZWNrKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXF1aXJlKFwiLi9sb2ctYXBwbHktcmVzdWx0XCIpKHVwZGF0ZWRNb2R1bGVzLCB1cGRhdGVkTW9kdWxlcyk7XG5cblx0XHRcdFx0aWYgKHVwVG9EYXRlKCkpIHtcblx0XHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gQXBwIGlzIHVwIHRvIGRhdGUuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IG1vZHVsZS5ob3Quc3RhdHVzKCk7XG5cdFx0XHRcdGlmIChbXCJhYm9ydFwiLCBcImZhaWxcIl0uaW5kZXhPZihzdGF0dXMpID49IDApIHtcblx0XHRcdFx0XHRsb2coXG5cdFx0XHRcdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFwiW0hNUl0gQ2Fubm90IGFwcGx5IHVwZGF0ZS4gXCIgK1xuXHRcdFx0XHRcdFx0XHQodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIlxuXHRcdFx0XHRcdFx0XHRcdD8gXCJOZWVkIHRvIGRvIGEgZnVsbCByZWxvYWQhXCJcblx0XHRcdFx0XHRcdFx0XHQ6IFwiUGxlYXNlIHJlbG9hZCBtYW51YWxseSFcIilcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBcIiArIGxvZy5mb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gVXBkYXRlIGZhaWxlZDogXCIgKyBsb2cuZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9O1xuXHR2YXIgaG90RW1pdHRlciA9IHJlcXVpcmUoXCIuL2VtaXR0ZXJcIik7XG5cdGhvdEVtaXR0ZXIub24oXCJ3ZWJwYWNrSG90VXBkYXRlXCIsIGZ1bmN0aW9uIChjdXJyZW50SGFzaCkge1xuXHRcdGxhc3RIYXNoID0gY3VycmVudEhhc2g7XG5cdFx0aWYgKCF1cFRvRGF0ZSgpICYmIG1vZHVsZS5ob3Quc3RhdHVzKCkgPT09IFwiaWRsZVwiKSB7XG5cdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gQ2hlY2tpbmcgZm9yIHVwZGF0ZXMgb24gdGhlIHNlcnZlci4uLlwiKTtcblx0XHRcdGNoZWNrKCk7XG5cdFx0fVxuXHR9KTtcblx0bG9nKFwiaW5mb1wiLCBcIltITVJdIFdhaXRpbmcgZm9yIHVwZGF0ZSBzaWduYWwgZnJvbSBXRFMuLi5cIik7XG59IGVsc2Uge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJbSE1SXSBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGlzIGRpc2FibGVkLlwiKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==