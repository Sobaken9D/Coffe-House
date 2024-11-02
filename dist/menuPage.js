/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Modules/CatalogItem.js":
/*!***************************************!*\
  !*** ./src/js/Modules/CatalogItem.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

module.exports = /*#__PURE__*/JSON.parse('[{"id":1,"type":"coffe","title":"Irish coffee","description":"Fragrant black coffee with Jameson Irish whiskey and whipped milk","urlToImage":"assets/img/menu/coffe/coffee-1.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$7.00"},{"id":2,"type":"coffe","title":"Kahlua coffee","description":"Classic coffee with milk and Kahlua liqueur under a cap of frothed milk","urlToImage":"assets/img/menu/coffe/coffee-2.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$7.00"},{"id":3,"type":"coffe","title":"Honey raf","description":"Espresso with frothed milk, cream and aromatic honey","urlToImage":"assets/img/menu/coffe/coffee-3.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$5.50"},{"id":4,"type":"coffe","title":"Ice cappuccino","description":"Cappuccino with soft thick foam in summer version with ice","urlToImage":"assets/img/menu/coffe/coffee-4.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$5.00"},{"id":5,"type":"coffe","title":"Espresso","description":"Classic black coffee","urlToImage":"assets/img/menu/coffe/coffee-5.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$4.50"},{"id":6,"type":"coffe","title":"Latte","description":"Espresso coffee with the addition of steamed milk and dense milk foam","urlToImage":"assets/img/menu/coffe/coffee-6.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$5.50"},{"id":7,"type":"coffe","title":"Latte macchiato","description":"Espresso with frothed milk and chocolate","urlToImage":"assets/img/menu/coffe/coffee-7.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$5.50"},{"id":8,"type":"coffe","title":"Coffee with cognac","description":"Fragrant black coffee with cognac and whipped cream","urlToImage":"assets/img/menu/coffe/coffee-8.jpg","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Cinnamon","Syrup"],"price":"$6.50"},{"id":9,"type":"tea","title":"Moroccan","description":"Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint","urlToImage":"assets/img/menu/tea/tea-1.png","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Lemon","Syrup"],"price":"$4.50"},{"id":10,"type":"tea","title":"Ginger","description":"Original black tea with fresh ginger, lemon and honey","urlToImage":"assets/img/menu/tea/tea-2.png","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Lemon","Syrup"],"price":"$5.00"},{"id":11,"type":"tea","title":"Cranberry","description":"Invigorating black tea with cranberry and honey","urlToImage":"assets/img/menu/tea/tea-3.png","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Lemon","Syrup"],"price":"$5.00"},{"id":12,"type":"tea","title":"Sea buckthorn","description":"Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon","urlToImage":"assets/img/menu/tea/tea-4.png","size":["200 ml","300 ml","400 ml"],"additives":["Sugar","Lemon","Syrup"],"price":"$5.50 "},{"id":13,"type":"dessert","title":"Marble cheesecake","description":"Philadelphia cheese with lemon zest on a light sponge cake and red currant jam","urlToImage":"assets/img/menu/desserts/dessert-1.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$3.50"},{"id":14,"type":"dessert","title":"Red velvet","description":"Layer cake with cream cheese frosting","urlToImage":"assets/img/menu/desserts/dessert-2.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$4.00"},{"id":15,"type":"dessert","title":"Cheesecakes","description":"Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar","urlToImage":"assets/img/menu/desserts/dessert-3.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$4.50"},{"id":16,"type":"dessert","title":"Creme brulee","description":"Delicate creamy dessert in a caramel basket with wild berries","urlToImage":"assets/img/menu/desserts/dessert-4.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$4.00"},{"id":17,"type":"dessert","title":"Pancakes","description":"Tender pancakes with strawberry jam and fresh strawberries","urlToImage":"assets/img/menu/desserts/dessert-5.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$4.50"},{"id":18,"type":"dessert","title":"Honey cake","description":"Classic honey cake with delicate custard","urlToImage":"assets/img/menu/desserts/dessert-6.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$4.50"},{"id":19,"type":"dessert","title":"Chocolate cake","description":"Cake with hot chocolate filling and nuts with dried apricots","urlToImage":"assets/img/menu/desserts/dessert-7.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$5.50"},{"id":20,"type":"dessert","title":"Black forest","description":"A combination of thin sponge cake with cherry jam and light chocolate mousse","urlToImage":"assets/img/menu/desserts/dessert-8.png","size":["50 g","100 g","200 g"],"additives":["Berries","Nuts","Jam"],"price":"$6.50"}]');

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
  !*** ./src/js/menuPage.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _JSON_data_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../JSON/data.json */ "./src/JSON/data.json");
/* harmony import */ var _Modules_CatalogItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modules/CatalogItem */ "./src/js/Modules/CatalogItem.js");
/* harmony import */ var _Modules_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modules/Modal */ "./src/js/Modules/Modal.js");
/* harmony import */ var _Modules_ModalItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Modules/ModalItem */ "./src/js/Modules/ModalItem.js");





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
    // Burger menu
    addBurgerButtonHandler();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsQzs7Ozs7Ozs7O0FDcFNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29mZmUtaG91c2UvLi9zcmMvanMvTW9kdWxlcy9DYXRhbG9nSXRlbS5qcyIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS8uL3NyYy9qcy9Nb2R1bGVzL01vZGFsLmpzIiwid2VicGFjazovL2NvZmZlLWhvdXNlLy4vc3JjL2pzL01vZHVsZXMvTW9kYWxJdGVtLmpzIiwid2VicGFjazovL2NvZmZlLWhvdXNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NvZmZlLWhvdXNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NvZmZlLWhvdXNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2UvLi9zcmMvanMvbWVudVBhZ2UuanMiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2UvLi9zcmMvc2Fzcy9zdHlsZS5zY3NzPzNhYzQiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENhdGFsb2dJdGVtIHtcclxuICAgIGNvbnN0cnVjdG9yKHtpZCwgdHlwZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCB1cmxUb0ltYWdlLCBwcmljZX0pIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMudXJsVG9JbWFnZSA9IHVybFRvSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5wcmljZSA9IHByaWNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlSXRlbSgpIHtcclxuICAgICAgICBsZXQgdGVtcGxhdGUgPSBcIlwiO1xyXG4gICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBpdGVtLmNsYXNzTmFtZSA9IFwiY2F0YWxvZ19faXRlbVwiO1xyXG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCB0aGlzLmlkKTtcclxuXHJcbiAgICAgICAgdGhpcy51cmxUb0ltYWdlICYmICh0ZW1wbGF0ZSArPVxyXG4gICAgICAgICAgICBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXRhbG9nX19pbWFnZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJjYXRhbG9nX19pbWFnZVwiIHNyYz1cIiR7dGhpcy51cmxUb0ltYWdlfVwiIGFsdD1cIiR7dGhpcy50eXBlfVwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpdGxlIHx8IHRoaXMuZGVzY3JpcHRpb24gfHwgdGhpcy5wcmljZSkge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZSArPSBgPGRpdiBjbGFzcz1cImNhdGFsb2dfX2l0ZW0taW5mb1wiPmA7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgJiYgKHRlbXBsYXRlICs9IGA8aDUgY2xhc3M9XCJkcmlua19fdGl0bGVcIj4ke3RoaXMudGl0bGV9PC9oNT5gKTtcclxuICAgICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiAmJiAodGVtcGxhdGUgKz0gYDxwIGNsYXNzPVwiZHJpbmtfX2Rlc2NyaXB0aW9uXCI+JHt0aGlzLmRlc2NyaXB0aW9ufTwvcD5gKTtcclxuICAgICAgICAgICAgdGhpcy5wcmljZSAmJiAodGVtcGxhdGUgKz0gYDxwIGNsYXNzPVwiZHJpbmtfX3ByaWNlXCI+JHt0aGlzLnByaWNlfTwvcD5gKTtcclxuICAgICAgICAgICAgdGVtcGxhdGUgKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdGVtLmlubmVySFRNTCA9IHRlbXBsYXRlO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIE1vZGFsIHtcclxuICAgIGNvbnN0cnVjdG9yKGNsYXNzZXMpIHtcclxuICAgICAgICB0aGlzLmNsYXNzZXMgPSBjbGFzc2VzO1xyXG4gICAgICAgIHRoaXMubW9kYWxPdmVybGF5ID0gXCJcIjtcclxuICAgICAgICB0aGlzLm1vZGFsV3JhcHBlciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tb2RhbFdpbmRvdyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tb2RhbENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubW9kYWxDbG9zZUJ1dHRvbiA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRNb2RhbChjb250ZW50KSB7XHJcbiAgICAgICAgLy9PdmVybGF5XHJcbiAgICAgICAgdGhpcy5tb2RhbE92ZXJsYXkgPSB0aGlzLmNyZWF0ZURvbU5vZGUxKHRoaXMubW9kYWxPdmVybGF5LCBcImRpdlwiLCBcIm1vZGFsX19vdmVybGF5XCIpO1xyXG4gICAgICAgIC8vV3JhcHBlclxyXG4gICAgICAgIHRoaXMubW9kYWxXcmFwcGVyID0gdGhpcy5jcmVhdGVEb21Ob2RlMSh0aGlzLm1vZGFsV3JhcHBlciwgXCJkaXZcIiwgXCJtb2RhbF9fd3JhcHBlclwiKTtcclxuICAgICAgICAvL1dpbmRvd1xyXG4gICAgICAgIHRoaXMubW9kYWxXaW5kb3cgPSB0aGlzLmNyZWF0ZURvbU5vZGUxKHRoaXMubW9kYWxXaW5kb3csIFwiZGl2XCIsIFwibW9kYWxfX3dpbmRvd1wiKTtcclxuICAgICAgICAvL0NvbnRlbnRcclxuICAgICAgICB0aGlzLm1vZGFsQ29udGVudCA9IHRoaXMuY3JlYXRlRG9tTm9kZTEodGhpcy5tb2RhbENvbnRlbnQsIFwiZGl2XCIsIFwibW9kYWxfX2NvbnRlbnRcIik7XHJcbiAgICAgICAgLy9DbG9zZUJ1dHRvblxyXG4gICAgICAgIHRoaXMubW9kYWxDbG9zZUJ1dHRvbiA9IHRoaXMuY3JlYXRlQ2xvc2VCdXR0b24odGhpcy5tb2RhbENsb3NlQnV0dG9uLCBcImJ1dHRvblwiLCBcImJ1dHRvbl9fbW9kYWwtY2xvc2VcIik7XHJcbiAgICAgICAgLy9TZXRDb250ZW50XHJcbiAgICAgICAgdGhpcy5zZXRDb250ZW50KGNvbnRlbnQpO1xyXG4gICAgICAgIC8vU2V0Q2xvc2VCdXR0b25cclxuICAgICAgICB0aGlzLm1vZGFsQ29udGVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19pbmZvXCIpLmFwcGVuZCh0aGlzLm1vZGFsQ2xvc2VCdXR0b24pO1xyXG4gICAgICAgIC8vQXBwZW5kTW9kYWxFbGVtZW50c1xyXG4gICAgICAgIHRoaXMuYXBwZW5kTW9kYWxFbGVtZW50cygpO1xyXG4gICAgICAgIC8vQnVpbGRFdmVudHMoY2xvc2UgYW5kIG9wZW4pXHJcbiAgICAgICAgdGhpcy5idWlsZEV2ZW50cygpO1xyXG4gICAgICAgIC8vT3Blbk1vZGFsXHJcbiAgICAgICAgdGhpcy5vcGVuTW9kYWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVEb21Ob2RlMShub2RlLCBlbGVtZW50LCAuLi5jbGFzc2VzKSB7XHJcbiAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNsb3NlQnV0dG9uKG5vZGUsIC4uLmNsYXNzZXMpIHtcclxuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XHJcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBcIjxzcGFuPkNsb3NlPC9zcGFuPlwiO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbnRlbnQoY29udGVudCkge1xyXG4gICAgICAgIHRoaXMubW9kYWxDb250ZW50LmFwcGVuZCguLi5jb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmRNb2RhbEVsZW1lbnRzKCkge1xyXG4gICAgICAgIHRoaXMubW9kYWxPdmVybGF5LmFwcGVuZCh0aGlzLm1vZGFsV3JhcHBlcik7XHJcbiAgICAgICAgdGhpcy5tb2RhbFdyYXBwZXIuYXBwZW5kKHRoaXMubW9kYWxXaW5kb3cpO1xyXG4gICAgICAgIHRoaXMubW9kYWxXaW5kb3cuYXBwZW5kKHRoaXMubW9kYWxDb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZEV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLm1vZGFsT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZU1vZGFsKGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb3Blbk1vZGFsKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMubW9kYWxPdmVybGF5KTtcclxuICAgICAgICAvL0FudGktc2Nyb2xsXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCJcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZU1vZGFsKGUpIHtcclxuICAgICAgICBsZXQgY2xhc3NlcyA9IGUudGFyZ2V0LmNsYXNzTGlzdDtcclxuICAgICAgICBsZXQgZmlyc3RDbG9zZVJ1bGUgPSAoY2xhc3Nlcy5jb250YWlucyhcIm1vZGFsX19vdmVybGF5XCIpIHx8IGNsYXNzZXMuY29udGFpbnMoXCJtb2RhbF9fd3JhcHBlclwiKSk7XHJcbiAgICAgICAgbGV0IHNlY29uZENsb3NlUnVsZSA9IChjbGFzc2VzLmNvbnRhaW5zKFwiYnV0dG9uX19tb2RhbC1jbG9zZVwiKSk7XHJcbiAgICAgICAgaWYgKGZpcnN0Q2xvc2VSdWxlIHx8IHNlY29uZENsb3NlUnVsZSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19vdmVybGF5XCIpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0RlbGV0ZSBBbnRpLXNjcm9sbFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcIlwiO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtNb2RhbH0gZnJvbSAnLi9Nb2RhbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kYWxJdGVtIGV4dGVuZHMgTW9kYWwge1xyXG4gICAgY29uc3RydWN0b3IoY2xhc3Nlcywge2lkLCB0eXBlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHVybFRvSW1hZ2UsIHByaWNlLCBzaXplLCBhZGRpdGl2ZXN9KSB7XHJcbiAgICAgICAgc3VwZXIoY2xhc3Nlcyk7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLnVybFRvSW1hZ2UgPSB1cmxUb0ltYWdlO1xyXG4gICAgICAgIHRoaXMucHJpY2UgPSBwcmljZTtcclxuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuYWRkaXRpdmVzID0gYWRkaXRpdmVzO1xyXG4gICAgICAgIHRoaXMubGV0dGVyU2l6ZSA9IFt7bGV0dGVyOiBcIlNcIiwgcGx1czogMH0sIHtsZXR0ZXI6IFwiTVwiLCBwbHVzOiAwLjV9LCB7bGV0dGVyOiBcIkxcIiwgcGx1czogMX1dO1xyXG4gICAgICAgIHRoaXMuYWRkaXRpdmVQbHVzUHJpY2UgPSAwLjUwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBsdXNQcmljZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy9JdGVtIENvbnRlbnQgR2VuZXJhdG9yXHJcbiAgICBnZW5lcmF0ZUNvbnRlbnQoKSB7XHJcbiAgICAgICAgbGV0IGltYWdlQmxvY2sgPSB0aGlzLmdlbmVyYXRlSW1hZ2VCbG9jaygpO1xyXG4gICAgICAgIGxldCBpbmZvQmxvY2sgPSB0aGlzLmdlbmVyYXRlSW5mb0Jsb2NrKCk7XHJcbiAgICAgICAgcmV0dXJuIFtpbWFnZUJsb2NrLCBpbmZvQmxvY2tdO1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlSW1hZ2VCbG9jaygpIHtcclxuICAgICAgICBsZXQgaW1hZ2VCbG9jayA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcImNhdGFsb2dfX2ltYWdlLWNvbnRhaW5lclwiKTtcclxuICAgICAgICBsZXQgaW1hZ2UgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJpbWdcIiwgXCJjYXRhbG9nX19pbWFnZVwiKTtcclxuICAgICAgICB0aGlzLnVybFRvSW1hZ2UgJiYgKGltYWdlLnNyYyA9IHRoaXMudXJsVG9JbWFnZSk7XHJcbiAgICAgICAgdGhpcy50eXBlICYmIChpbWFnZS5hbHQgPSB0aGlzLnR5cGUpO1xyXG4gICAgICAgIGltYWdlQmxvY2suYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgIHJldHVybiBpbWFnZUJsb2NrO1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlSW5mb0Jsb2NrKCkge1xyXG4gICAgICAgIGxldCBpbmZvQmxvY2sgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJtb2RhbF9faW5mb1wiKTtcclxuICAgICAgICBsZXQgZHJpbmtzQmxvY2sgPSB0aGlzLmdlbmVyYXRlRHJpbmtzQmxvY2soKTtcclxuICAgICAgICBsZXQgc2l6ZUJsb2NrID0gdGhpcy5nZW5lcmF0ZVNpemVCbG9jaygpO1xyXG4gICAgICAgIGxldCBhZGRpdGl2ZXNCbG9jayA9IHRoaXMuZ2VuZXJhdGVBZGRpdGl2ZXNCbG9jaygpO1xyXG4gICAgICAgIGxldCBwcmljZUJsb2NrID0gdGhpcy5nZW5lcmF0ZVByaWNlQmxvY2soKTtcclxuICAgICAgICBsZXQgbm90ZUJsb2NrID0gdGhpcy5nZW5lcmF0ZU5vdGVCbG9jaygpO1xyXG4gICAgICAgIGluZm9CbG9jay5hcHBlbmQoZHJpbmtzQmxvY2ssIHNpemVCbG9jaywgYWRkaXRpdmVzQmxvY2ssIHByaWNlQmxvY2ssIG5vdGVCbG9jayk7XHJcbiAgICAgICAgcmV0dXJuIGluZm9CbG9jaztcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2VuZXJhdGVEcmlua3NCbG9jaygpIHtcclxuICAgICAgICBsZXQgZHJpbmtzQmxvY2sgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJkcmlua19faW5mb1wiKTtcclxuICAgICAgICBsZXQgZHJpbmtUaXRsZSA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImg1XCIsIFwiZHJpbmtfX3RpdGxlXCIpO1xyXG4gICAgICAgIGxldCBkcmlua0Rlc2NyaXB0aW9uID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwicFwiLCBcImRyaW5rX19kZXNjcmlwdGlvblwiKTtcclxuICAgICAgICB0aGlzLnRpdGxlICYmIChkcmlua1RpdGxlLmlubmVyVGV4dCA9IHRoaXMudGl0bGUpO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gJiYgKGRyaW5rRGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gdGhpcy5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgZHJpbmtzQmxvY2suYXBwZW5kKGRyaW5rVGl0bGUsIGRyaW5rRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHJldHVybiBkcmlua3NCbG9ja1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlU2l6ZUJsb2NrKCkge1xyXG4gICAgICAgIGxldCBzaXplQmxvY2sgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJzaXplX19pbmZvXCIsIFwic2l6ZS1pbmZvXCIpO1xyXG4gICAgICAgIGxldCBzaXplQmxvY2tUaXRsZSA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImg2XCIsIFwic2l6ZS1pbmZvX190aXRsZVwiKTtcclxuICAgICAgICBzaXplQmxvY2tUaXRsZS5pbm5lclRleHQgPSBcIlNpemVcIjtcclxuICAgICAgICBsZXQgc2l6ZUJsb2NrQnV0dG9ucyA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcInNpemUtaW5mb19fYnV0dG9uc1wiKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNpemUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uID0gdGhpcy5jcmVhdGVNb2RhbEJ1dHRvbih0aGlzLmxldHRlclNpemVbaV0ubGV0dGVyLCB0aGlzLnNpemVbaV0sIFwiYnV0dG9uXCIsXCJidXR0b25fX21vZGFsLWluZm9cIiwgXCJidXR0b25fX3NpemVcIiwgXCJidXR0b25fX21vZGFsLWluZm9fYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uID0gdGhpcy5jcmVhdGVNb2RhbEJ1dHRvbih0aGlzLmxldHRlclNpemVbaV0ubGV0dGVyLCB0aGlzLnNpemVbaV0sIFwiYnV0dG9uXCIsXCJidXR0b25fX21vZGFsLWluZm9cIiwgXCJidXR0b25fX3NpemVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2l6ZUJsb2NrQnV0dG9ucy5hcHBlbmQoYnV0dG9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNpemVCbG9ja0J1dHRvbnMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KFwiLmJ1dHRvbl9fc2l6ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja1NpemVCdXR0b24oZSwgXCIuYnV0dG9uX19zaXplXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHNpemVCbG9jay5hcHBlbmQoc2l6ZUJsb2NrVGl0bGUsIHNpemVCbG9ja0J1dHRvbnMpO1xyXG4gICAgICAgIHJldHVybiBzaXplQmxvY2s7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tTaXplQnV0dG9uKGUsIHNlbGVjdG9yKSB7XHJcbiAgICAgICAgLy8gRGVsZXRlIGFjdGl2ZSBjbGFzc1xyXG4gICAgICAgIGxldCBub2RlTGlzdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICBub2RlTGlzdEJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImJ1dHRvbl9fbW9kYWwtaW5mb19hY3RpdmVcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBBZGQgYWN0aXZlIGNsYXNzIHRvIGNsaWNrZWQgYnV0dG9uXHJcbiAgICAgICAgZS50YXJnZXQuY2xvc2VzdChzZWxlY3RvcikuY2xhc3NMaXN0LmFkZChcImJ1dHRvbl9fbW9kYWwtaW5mb19hY3RpdmVcIik7XHJcbiAgICAgICAgLy8gQ2hhbmdlIHByaWNlXHJcbiAgICAgICAgbGV0IGNsaWNrZWRTaXplID0gZS50YXJnZXQuY2xvc2VzdChzZWxlY3RvcikuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MO1xyXG4gICAgICAgIGxldCB0b3RhbFByaWNlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG90YWwtcHJpY2VcIik7XHJcbiAgICAgICAgbGV0IHRvdGFsUHJpY2VOdW1iZXIgPSArdGhpcy5wcmljZS5zbGljZSgxKSArIHRoaXMuY3VycmVudFBsdXNQcmljZTtcclxuICAgICAgICBsZXQgcGx1c1ByaWNlID0gKHRoaXMubGV0dGVyU2l6ZS5maW5kKG9iaiA9PiBvYmoubGV0dGVyID09IGNsaWNrZWRTaXplKSkucGx1cztcclxuICAgICAgICB0b3RhbFByaWNlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHRvdGFsUHJpY2VFbGVtZW50LmlubmVySFRNTCA9IFwiJFwiICsgYCR7dG90YWxQcmljZU51bWJlciArIHBsdXNQcmljZX1gO1xyXG4gICAgICAgIGlmICghdG90YWxQcmljZUVsZW1lbnQuaW5uZXJIVE1MLmluY2x1ZGVzKFwiLlwiKSkge1xyXG4gICAgICAgICAgICB0b3RhbFByaWNlRWxlbWVudC5pbm5lckhUTUwgKz0gXCIuMDBcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUFkZGl0aXZlc0Jsb2NrKCkge1xyXG4gICAgICAgIGxldCBhZGRpdGl2ZXNCbG9jayA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcImFkZGl0aXZlc19faW5mb1wiLCBcImFkZGl0aXZlcy1pbmZvXCIpO1xyXG4gICAgICAgIGxldCBhZGRpdGl2ZXNCbG9ja1RpdGxlID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiaDZcIiwgXCJhZGRpdGl2ZXMtaW5mb19fdGl0bGVcIik7XHJcbiAgICAgICAgYWRkaXRpdmVzQmxvY2tUaXRsZS5pbm5lclRleHQgPSBcIkFkZGl0aXZlc1wiO1xyXG4gICAgICAgIGxldCBhZGRpdGl2ZXNCbG9ja0J1dHRvbnMgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJhZGRpdGl2ZXMtaW5mb19fYnV0dG9uc1wiKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFkZGl0aXZlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24gPSB0aGlzLmNyZWF0ZU1vZGFsQnV0dG9uKChpICsgMSksIHRoaXMuYWRkaXRpdmVzW2ldLCBcImJ1dHRvblwiLFwiYnV0dG9uX19tb2RhbC1pbmZvXCIsIFwiYnV0dG9uX19hZGRpdGl2ZXNcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24gPSB0aGlzLmNyZWF0ZU1vZGFsQnV0dG9uKChpICsgMSksIHRoaXMuYWRkaXRpdmVzW2ldLCBcImJ1dHRvblwiLFwiYnV0dG9uX19tb2RhbC1pbmZvXCIsIFwiYnV0dG9uX19hZGRpdGl2ZXNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWRkaXRpdmVzQmxvY2tCdXR0b25zLmFwcGVuZChidXR0b24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkaXRpdmVzQmxvY2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KFwiLmJ1dHRvbl9fYWRkaXRpdmVzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQWRkaXRpdmVCdXR0b24oZSwgXCIuYnV0dG9uX19hZGRpdGl2ZXNcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgYWRkaXRpdmVzQmxvY2suYXBwZW5kKGFkZGl0aXZlc0Jsb2NrVGl0bGUsIGFkZGl0aXZlc0Jsb2NrQnV0dG9ucyk7XHJcbiAgICAgICAgcmV0dXJuIGFkZGl0aXZlc0Jsb2NrO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQWRkaXRpdmVCdXR0b24oZSwgc2VsZWN0b3IpIHtcclxuICAgICAgICAvLyBUb2dnbGUgYWN0aXZlIGNsYXNzXHJcbiAgICAgICAgZS50YXJnZXQuY2xvc2VzdChzZWxlY3RvcikuY2xhc3NMaXN0LnRvZ2dsZShcImJ1dHRvbl9fbW9kYWwtaW5mb19hY3RpdmVcIik7XHJcbiAgICAgICAgLy8gQ2hhbmdlIHByaWNlXHJcbiAgICAgICAgbGV0IHRvdGFsUHJpY2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b3RhbC1wcmljZVwiKTtcclxuICAgICAgICBsZXQgdG90YWxQcmljZU51bWJlciA9ICsodG90YWxQcmljZUVsZW1lbnQuaW5uZXJIVE1MKS5zbGljZSgxKTtcclxuICAgICAgICB0b3RhbFByaWNlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZiAoIShlLnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKS5jbGFzc0xpc3QuY29udGFpbnMoXCJidXR0b25fX21vZGFsLWluZm9fYWN0aXZlXCIpKSkge1xyXG4gICAgICAgICAgICB0b3RhbFByaWNlRWxlbWVudC5pbm5lckhUTUwgPSBcIiRcIiArIGAke3RvdGFsUHJpY2VOdW1iZXIgLSB0aGlzLmFkZGl0aXZlUGx1c1ByaWNlfWA7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBsdXNQcmljZSAtPSB0aGlzLmFkZGl0aXZlUGx1c1ByaWNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvdGFsUHJpY2VFbGVtZW50LmlubmVySFRNTCA9IFwiJFwiICsgYCR7dG90YWxQcmljZU51bWJlciArIHRoaXMuYWRkaXRpdmVQbHVzUHJpY2V9YDtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGx1c1ByaWNlICs9IHRoaXMuYWRkaXRpdmVQbHVzUHJpY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRvdGFsUHJpY2VFbGVtZW50LmlubmVySFRNTC5pbmNsdWRlcyhcIi5cIikpIHtcclxuICAgICAgICAgICAgdG90YWxQcmljZUVsZW1lbnQuaW5uZXJIVE1MICs9IFwiLjAwXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlUHJpY2VCbG9jaygpIHtcclxuICAgICAgICBsZXQgcHJpY2VCbG9jayA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcInByaWNlX19pbmZvXCIpO1xyXG4gICAgICAgIHByaWNlQmxvY2suaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8c3Bhbj5Ub3RhbDo8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzID0gXCJ0b3RhbC1wcmljZVwiPiR7dGhpcy5wcmljZX08L3NwYW4+XHJcbiAgICAgICAgYDtcclxuICAgICAgICByZXR1cm4gcHJpY2VCbG9jaztcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZU5vdGVCbG9jaygpIHtcclxuICAgICAgICBsZXQgbm90ZUJsb2NrID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiZGl2XCIsIFwibm90ZV9faW5mb1wiKTtcclxuICAgICAgICBub3RlQmxvY2suaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8b2JqZWN0IGRhdGE9XCIuLi9pbWcvaWNvbnMvaW5mby1lbXB0eS5zdmdcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiPlxyXG4gICAgICAgICAgICAgICAgWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgU1ZHXHJcbiAgICAgICAgICAgIDwvb2JqZWN0PlxyXG4gICAgICAgICAgICA8cD5UaGUgY29zdCBpcyBub3QgZmluYWwuIERvd25sb2FkIG91ciBtb2JpbGUgYXBwIHRvIHNlZSB0aGUgZmluYWwgcHJpY2UgYW5kIHBsYWNlIHlvdXI8L2JyPiBvcmRlci5cclxuICAgICAgICAgICAgICAgIEVhcm4gbG95YWx0eSBwb2ludHMgYW5kIGVuam95IHlvdXIgZmF2b3JpdGUgY29mZmVlIHdpdGggdXAgdG8gMjAlIGRpc2NvdW50LlxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgYDtcclxuICAgICAgICByZXR1cm4gbm90ZUJsb2NrO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU1vZGFsQnV0dG9uKHNpemUsIHZvbHVtZSwgLi4uY2xhc3Nlcykge1xyXG4gICAgICAgIGxldCBidXR0b24gPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJidXR0b25cIiwgLi4uY2xhc3Nlcyk7XHJcbiAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b25fX3RleHQgYnV0dG9uX190ZXh0X3NpemVcIj4ke3NpemV9PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbl9fdGV4dCBidXR0b25fX3RleHRfdm9sdW1lXCI+JHt2b2x1bWV9PC9zcGFuPlxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVEb21Ob2RlKGVsZW1lbnQsIC4uLmNsYXNzZXMpIHtcclxuICAgICAgICBsZXQgZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgZG9tRWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xyXG4gICAgICAgIHJldHVybiBkb21FbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlck1vZGFsKCkge1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5nZW5lcmF0ZUNvbnRlbnQoKTtcclxuICAgICAgICBzdXBlci5idWlsZE1vZGFsKGNvbnRlbnQpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZGF0YUl0ZW1zIGZyb20gJy4uL0pTT04vZGF0YS5qc29uJztcclxuaW1wb3J0IHtDYXRhbG9nSXRlbX0gZnJvbSBcIi4vTW9kdWxlcy9DYXRhbG9nSXRlbVwiO1xyXG5pbXBvcnQge01vZGFsfSBmcm9tIFwiLi9Nb2R1bGVzL01vZGFsXCI7XHJcbmltcG9ydCB7TW9kYWxJdGVtfSBmcm9tIFwiLi9Nb2R1bGVzL01vZGFsSXRlbVwiO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChkYXRhSXRlbXMpIHtcclxuICAgICAgICByZW5kZXJDYXRhbG9nVG9Eb20oXCJjb2ZmZVwiKTtcclxuICAgIH1cclxuICAgIC8vIENhdGVnb3JpZXNcclxuICAgIGFkZENhdGVnb3JpZXNDbGlja0hhbmRsZXIoKTtcclxuICAgIC8vIEdlbmVyYXRlIG1vZGFsXHJcbiAgICBhZGRJdGVtQ2F0YWxvZ0NsaWNrSGFuZGxlcigpO1xyXG4gICAgLy8gYWRkIFdpbmRvdyBSZXNpemUgSGFuZGxlclxyXG4gICAgYWRkV2luZG93UmVzaXplSGFuZGxlcigpO1xyXG4gICAgLy8gQWRkIGhhbmRsZXIgdG8gcmVmcmVzaCBidXR0b25cclxuICAgIGFkZFJlZnJlc2hCdXR0b25IYW5kbGVyKCk7XHJcbiAgICAvLyBCdXJnZXIgbWVudVxyXG4gICAgYWRkQnVyZ2VyQnV0dG9uSGFuZGxlcigpO1xyXG59XHJcblxyXG5jb25zdCBhZGRSZWZyZXNoQnV0dG9uSGFuZGxlciA9ICgpID0+IHtcclxuICAgIGxldCByZWZyZXNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b25fX3JlZnJlc2hcIik7XHJcbiAgICBsZXQgY3VycmVudENhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b25fX2NhdGVnb3J5X2FjdGl2ZVwiKS5kYXRhc2V0LmNhdGVnb3J5O1xyXG4gICAgcmVmcmVzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBsZXQgY29mZmVJdGVtcyA9IGdldENhdGFsb2dJdGVtcyhjdXJyZW50Q2F0ZWdvcnkpO1xyXG4gICAgICAgIGxldCBjYXRhbG9nV3JhcHBlciA9IGdldENhdGFsb2dXcmFwcGVyKCk7XHJcbiAgICAgICAgZ2VuZXJhdGVJdGVtcyhjb2ZmZUl0ZW1zKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBjYXRhbG9nV3JhcHBlci5hcHBlbmQoaXRlbS5nZW5lcmF0ZUl0ZW0oKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVmcmVzaEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBjaGVja0J1dHRvblJlZnJlc2hOZWVkZWQgPSAoKSA9PiB7XHJcbiAgICBsZXQgY3VycmVudENhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b25fX2NhdGVnb3J5X2FjdGl2ZVwiKS5kYXRhc2V0LmNhdGVnb3J5O1xyXG4gICAgbGV0IGFtb3VudE9mQ3VycmVudEl0ZW1zID0gMDtcclxuICAgIGRhdGFJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT0gY3VycmVudENhdGVnb3J5KSB7XHJcbiAgICAgICAgICAgIGFtb3VudE9mQ3VycmVudEl0ZW1zICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoYW1vdW50T2ZDdXJyZW50SXRlbXMgPiA0ICYmIHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGFkZFdpbmRvd1Jlc2l6ZUhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBsZXQgc3RhcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB7XHJcbiAgICAgICAgLy8gQ2hhbmdlIGFtb3VudCBvZiBjYXRhbG9nIGl0ZW1zXHJcbiAgICAgICAgbGV0IGN1cnJlbnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGxldCBjdXJyZW50Q2F0ZWdvcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbl9fY2F0ZWdvcnlfYWN0aXZlXCIpLmRhdGFzZXQuY2F0ZWdvcnk7XHJcbiAgICAgICAgbGV0IG9iaiA9IGNoZWNrQ2hhbmdlKHN0YXJ0V2lkdGgsIGN1cnJlbnRXaWR0aCk7XHJcbiAgICAgICAgaWYgKG9iai5yZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVuZGVyQ2F0YWxvZ1RvRG9tKGN1cnJlbnRDYXRlZ29yeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXJ0V2lkdGggPSBvYmouc3RhcnRXaWR0aDtcclxuICAgICAgICAvLyBDaGVjayBhIGJ1dHRvbiByZWZyZXNoIG5lZWRlZFxyXG4gICAgICAgIGxldCByZWZyZXNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b25fX3JlZnJlc2hcIik7XHJcbiAgICAgICAgbGV0IGNhdGFsb2dXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXRhbG9nXCIpO1xyXG4gICAgICAgIGlmIChjYXRhbG9nV3JhcHBlci5jaGlsZHJlbi5sZW5ndGggPD0gNCkge1xyXG4gICAgICAgICAgICBpZiAoIWNoZWNrQnV0dG9uUmVmcmVzaE5lZWRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGNoZWNrQ2hhbmdlID0gKHN0YXJ0V2lkdGgsIGN1cnJlbnRXaWR0aCkgPT4ge1xyXG4gICAgbGV0IHN0YXJ0ID0gc3RhcnRXaWR0aDtcclxuICAgIGxldCByZXMgPSB1bmRlZmluZWQ7XHJcbiAgICBpZiAoc3RhcnRXaWR0aCA8PSA3NjgpIHtcclxuICAgICAgICBpZiAoY3VycmVudFdpZHRoID49IDc2OCkge1xyXG4gICAgICAgICAgICByZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFydCA9IGN1cnJlbnRXaWR0aCArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHN0YXJ0V2lkdGggPj0gNzY4KSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRXaWR0aCA8PSA3NjgpIHtcclxuICAgICAgICAgICAgcmVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3RhcnQgPSBjdXJyZW50V2lkdGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdWx0OiByZXMsXHJcbiAgICAgICAgc3RhcnRXaWR0aDogc3RhcnRcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYWRkQ2F0ZWdvcmllc0NsaWNrSGFuZGxlciA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0ZWdyaWVzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGxldCBjbGlja2VkQ2F0ZWdvcnkgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ1dHRvbl9fY2F0ZWdvcnlcIik7XHJcbiAgICAgICAgbGV0IGRhdGFDYXRlZ29yeSA9IGNsaWNrZWRDYXRlZ29yeT8uZ2V0QXR0cmlidXRlKFwiZGF0YS1jYXRlZ29yeVwiKTtcclxuICAgICAgICBpZiAoY2xpY2tlZENhdGVnb3J5Py5jbGFzc0xpc3QuY29udGFpbnMoXCJidXR0b25fX2NhdGVnb3J5XCIpKSB7XHJcbiAgICAgICAgICAgIGlmICghY2xpY2tlZENhdGVnb3J5LmNsYXNzTGlzdC5jb250YWlucyhcImJ1dHRvbl9fY2F0ZWdvcnlfYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVTZWxlY3RlZENhdGVnb3JpZXMoKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdENsaWNrZWRDYXRlZ29yeShjbGlja2VkQ2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyQ2F0YWxvZ1RvRG9tKGRhdGFDYXRlZ29yeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVmcmVzaCBidXR0b25cclxuICAgICAgICBsZXQgcmVmcmVzaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uX19yZWZyZXNoXCIpO1xyXG4gICAgICAgIGlmICghY2hlY2tCdXR0b25SZWZyZXNoTmVlZGVkKCkpIHtcclxuICAgICAgICAgICAgcmVmcmVzaEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVmcmVzaEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgcmVtb3ZlU2VsZWN0ZWRDYXRlZ29yaWVzID0gKCkgPT4ge1xyXG4gICAgbGV0IGNhdGVnb3JpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvbl9fY2F0ZWdvcnlcIik7XHJcbiAgICBjYXRlZ29yaWVzLmZvckVhY2goY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgIGNhdGVnb3J5LmNsYXNzTGlzdC5yZW1vdmUoXCJidXR0b25fX2NhdGVnb3J5X2FjdGl2ZVwiKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IHNlbGVjdENsaWNrZWRDYXRlZ29yeSA9IChjbGlja2VkQ2F0ZWdvcnkpID0+IHtcclxuICAgIGNsaWNrZWRDYXRlZ29yeS5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uX19jYXRlZ29yeV9hY3RpdmVcIik7XHJcbn1cclxuXHJcbmNvbnN0IGdldENhdGFsb2dJdGVtcyA9ICh0eXBlKSA9PiB7XHJcbiAgICBsZXQgY2F0YWxvZ0l0ZW1zID0gW107XHJcbiAgICBkYXRhSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09IHR5cGUpIHtcclxuICAgICAgICAgICAgY2F0YWxvZ0l0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY2F0YWxvZ0l0ZW1zO1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJDYXRhbG9nVG9Eb20gPSAodHlwZSkgPT4ge1xyXG4gICAgbGV0IGNvZmZlSXRlbXMgPSBnZXRDYXRhbG9nSXRlbXModHlwZSk7XHJcbiAgICBsZXQgY2F0YWxvZ1dyYXBwZXIgPSBnZXRDYXRhbG9nV3JhcHBlcigpO1xyXG4gICAgbGV0IHdpbmRvd0lubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIGxldCBnZW5lcmF0ZU9iamVjdEl0ZW1zID0gZ2VuZXJhdGVJdGVtcyhjb2ZmZUl0ZW1zKTtcclxuICAgIGlmICh3aW5kb3dJbm5lcldpZHRoIDw9IDc2OCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNhdGFsb2dXcmFwcGVyLmFwcGVuZChnZW5lcmF0ZU9iamVjdEl0ZW1zW2ldLmdlbmVyYXRlSXRlbSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2VuZXJhdGVPYmplY3RJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjYXRhbG9nV3JhcHBlci5hcHBlbmQoZ2VuZXJhdGVPYmplY3RJdGVtc1tpXS5nZW5lcmF0ZUl0ZW0oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBnZXRDYXRhbG9nV3JhcHBlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNhdGFsb2dXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXRhbG9nXCIpO1xyXG4gICAgY2F0YWxvZ1dyYXBwZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIHJldHVybiBjYXRhbG9nV3JhcHBlcjtcclxufVxyXG5cclxuY29uc3QgZ2VuZXJhdGVJdGVtcyA9IChkYXRhKSA9PiB7XHJcbiAgICBsZXQgaXRlbXMgPSBbXTtcclxuICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGl0ZW1zLnB1c2gobmV3IENhdGFsb2dJdGVtKGl0ZW0pKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGl0ZW1zO1xyXG59XHJcblxyXG5jb25zdCBhZGRJdGVtQ2F0YWxvZ0NsaWNrSGFuZGxlciA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0YWxvZ1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdCgnLmNhdGFsb2dfX2l0ZW0nKSkge1xyXG4gICAgICAgICAgICBsZXQgY2xpY2tlZEl0ZW1JZCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5jYXRhbG9nX19pdGVtJykuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgbGV0IGNsaWNrZWRJdGVtRGF0YSA9IGdldENsaWNrZWREYXRhKGNsaWNrZWRJdGVtSWQpO1xyXG4gICAgICAgICAgICByZW5kZXJJdGVtTW9kYWxXaW5kb3coY2xpY2tlZEl0ZW1EYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBnZXRDbGlja2VkRGF0YSA9IChpZCkgPT4ge1xyXG4gICAgcmV0dXJuIGRhdGFJdGVtcy5maW5kKGl0ZW0gPT4ge1xyXG4gICAgICAgIHJldHVybiBpdGVtLmlkID09IGlkO1xyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgcmVuZGVySXRlbU1vZGFsV2luZG93ID0gKGl0ZW0pID0+IHtcclxuICAgIGxldCBtb2RhbCA9IG5ldyBNb2RhbEl0ZW0oXCJcIiwgaXRlbSk7XHJcbiAgICBtb2RhbC5yZW5kZXJNb2RhbCgpO1xyXG59XHJcblxyXG5jb25zdCBhZGRCdXJnZXJCdXR0b25IYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgbGV0IGlzU2hvd2VkID0gZmFsc2U7XHJcbiAgICBsZXQgYnVyZ2VyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXJnZXJcIik7XHJcbiAgICBsZXQgbWVudUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX21lbnUnKTtcclxuICAgIGxldCBjbGlja2VkV2lkdGg7XHJcblxyXG4gICAgYnVyZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGNoYW5nZUJ1cmdlckJ1dHRvbihidXJnZXJCdXR0b24pO1xyXG4gICAgICAgIHRvZ2dsZUJ1cmdlck1lbnUoaXNTaG93ZWQpO1xyXG4gICAgICAgIGlzU2hvd2VkID0gIWlzU2hvd2VkO1xyXG4gICAgICAgIGNsaWNrZWRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgfSlcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChjaGVja0NvcnJlY3RSZXNpemUoaXNTaG93ZWQsIHdpbmRvdy5pbm5lcldpZHRoKSkge1xyXG4gICAgICAgICAgICB0b2dnbGVCdXJnZXJNZW51KHRydWUpO1xyXG4gICAgICAgICAgICBjaGFuZ2VCdXJnZXJCdXR0b24oYnVyZ2VyQnV0dG9uKTtcclxuICAgICAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgfSBlbHNlIGlmKHdpbmRvdy5pbm5lcldpZHRoID49IDc2OCkge1xyXG4gICAgICAgICAgICBtZW51QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCAmJiAhaXNTaG93ZWQpIHtcclxuICAgICAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgY2hhbmdlQnVyZ2VyQnV0dG9uID0gKGJ1dHRvbikgPT4ge1xyXG4gICAgbGV0IGFycmF5TGluZXMgPSBBcnJheS5mcm9tKGJ1dHRvbi5jaGlsZHJlbik7XHJcbiAgICBpZiAoYXJyYXlMaW5lc1swXS5zdHlsZS5tYXJnaW5Cb3R0b20gPT0gXCItNXB4XCIpIHtcclxuICAgICAgICBhcnJheUxpbmVzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMHB4XCI7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnRyYW5zZm9ybSA9IFwicm90YXRlKDBkZWcpXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLm1hcmdpblRvcCA9IFwiMHB4XCI7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnRyYW5zZm9ybSA9IFwicm90YXRlKDBkZWcpXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhcnJheUxpbmVzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiLTVweFwiO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZS50cmFuc2Zvcm0gPSBcInJvdGF0ZSg0NWRlZylcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUubWFyZ2luVG9wID0gXCItNXB4XCI7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLnRyYW5zZm9ybSA9IFwicm90YXRlKC00NWRlZylcIjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCB0b2dnbGVCdXJnZXJNZW51ID0gKGlzU2hvd2VkKSA9PiB7XHJcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgbGV0IG5hdmlnYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2aWdhdGlvbicpO1xyXG4gICAgbGV0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19tZW51Jyk7XHJcbiAgICBsZXQgaGVhZGVyTmF2aWdhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX25hdmlnYXRpb24nKTtcclxuICAgIGlmICghaXNTaG93ZWQpIHtcclxuICAgICAgICAvLyBDaGFuZ2UgYm9keSBzdHlsZXNcclxuICAgICAgICBib2R5LnN0eWxlLmNzc1RleHQgPSAnb3ZlcmZsb3c6IGhpZGRlbjsnO1xyXG4gICAgICAgIC8vIENoYW5nZSBoZWFkZXIgc3R5bGVzXHJcbiAgICAgICAgaGVhZGVyLnN0eWxlLmNzc1RleHQgPSBgXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgICAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgICAgICB6LWluZGV4OiA5OTk7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlMWQ0Yzk7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMHZoO1xyXG4gICAgICAgIGA7XHJcbiAgICAgICAgLy8gQ2hhbmdlIG5hdmlnYXRpb24gc3R5bGVzXHJcbiAgICAgICAgbmF2aWdhdGlvbi5zdHlsZS5jc3NUZXh0ID0gYFxyXG4gICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIHRvcDogODFweDtcclxuICAgICAgICAgICAgbGVmdDogMDtcclxuICAgICAgICAgICAgcGFkZGluZy10b3A6IDMwcHg7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICAgICAgICAgICAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICByb3ctZ2FwOiA0MHB4O1xyXG4gICAgICAgICAgICBhbGlnbi1jb250ZW50OiBzdGFydDtcclxuICAgICAgICBgO1xyXG4gICAgICAgIC8vIEFkZCBtZW51IGJ1dHRvbiB0byBuYXZpZ2F0aW9uIGJsb2NrXHJcbiAgICAgICAgbWVudUJ1dHRvbi5yZW1vdmUoKTtcclxuICAgICAgICBuYXZpZ2F0aW9uLmFwcGVuZChtZW51QnV0dG9uKTtcclxuICAgICAgICBtZW51QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYm9keS5zdHlsZS5jc3NUZXh0ID0gJyc7XHJcbiAgICAgICAgaGVhZGVyLnN0eWxlLmNzc1RleHQgPSAnJztcclxuICAgICAgICBuYXZpZ2F0aW9uLnN0eWxlLmNzc1RleHQgPSAnJztcclxuICAgICAgICBtZW51QnV0dG9uLnJlbW92ZSgpO1xyXG4gICAgICAgIGhlYWRlck5hdmlnYXRpb24uYWZ0ZXIobWVudUJ1dHRvbik7XHJcbiAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBjaGVja0NvcnJlY3RSZXNpemUgPSAoaXNTaG93ZWQsIGN1cnJlbnRXaWR0aCkgPT4ge1xyXG4gICAgaWYgKGlzU2hvd2VkICYmIChjdXJyZW50V2lkdGggPj0gNzY4KSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=