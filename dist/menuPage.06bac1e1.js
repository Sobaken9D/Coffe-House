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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDRDQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQSxNQUFNO0FBQ04sd0JBQXdCLGdDQUFnQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDZEQUFXO0FBQ2xDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxXQUFXLDRDQUFTO0FBQ3BCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5REFBUztBQUM3QjtBQUNBLEM7Ozs7Ozs7OztBQ3ZMQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NvZmZlLWhvdXNlLy4vc3JjL2pzL01vZHVsZXMvQ2F0YWxvZ0l0ZW0uanMiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2UvLi9zcmMvanMvTW9kdWxlcy9Nb2RhbC5qcyIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS8uL3NyYy9qcy9Nb2R1bGVzL01vZGFsSXRlbS5qcyIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY29mZmUtaG91c2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jb2ZmZS1ob3VzZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NvZmZlLWhvdXNlLy4vc3JjL2pzL21lbnVQYWdlLmpzIiwid2VicGFjazovL2NvZmZlLWhvdXNlLy4vc3JjL3Nhc3Mvc3R5bGUuc2Nzcz8zYWM0Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDYXRhbG9nSXRlbSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7aWQsIHR5cGUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgdXJsVG9JbWFnZSwgcHJpY2V9KSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLnVybFRvSW1hZ2UgPSB1cmxUb0ltYWdlO1xyXG4gICAgICAgIHRoaXMucHJpY2UgPSBwcmljZTtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUl0ZW0oKSB7XHJcbiAgICAgICAgbGV0IHRlbXBsYXRlID0gXCJcIjtcclxuICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgaXRlbS5jbGFzc05hbWUgPSBcImNhdGFsb2dfX2l0ZW1cIjtcclxuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgdGhpcy5pZCk7XHJcblxyXG4gICAgICAgIHRoaXMudXJsVG9JbWFnZSAmJiAodGVtcGxhdGUgKz1cclxuICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2F0YWxvZ19faW1hZ2UtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiY2F0YWxvZ19faW1hZ2VcIiBzcmM9XCIke3RoaXMudXJsVG9JbWFnZX1cIiBhbHQ9XCIke3RoaXMudHlwZX1cIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGBcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50aXRsZSB8fCB0aGlzLmRlc2NyaXB0aW9uIHx8IHRoaXMucHJpY2UpIHtcclxuICAgICAgICAgICAgdGVtcGxhdGUgKz0gYDxkaXYgY2xhc3M9XCJjYXRhbG9nX19pdGVtLWluZm9cIj5gO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlICYmICh0ZW1wbGF0ZSArPSBgPGg1IGNsYXNzPVwiZHJpbmtfX3RpdGxlXCI+JHt0aGlzLnRpdGxlfTwvaDU+YCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gJiYgKHRlbXBsYXRlICs9IGA8cCBjbGFzcz1cImRyaW5rX19kZXNjcmlwdGlvblwiPiR7dGhpcy5kZXNjcmlwdGlvbn08L3A+YCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJpY2UgJiYgKHRlbXBsYXRlICs9IGA8cCBjbGFzcz1cImRyaW5rX19wcmljZVwiPiR7dGhpcy5wcmljZX08L3A+YCk7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlICs9IGA8L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXRlbS5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBNb2RhbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihjbGFzc2VzKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICB0aGlzLm1vZGFsT3ZlcmxheSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tb2RhbFdyYXBwZXIgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubW9kYWxXaW5kb3cgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubW9kYWxDb250ZW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLm1vZGFsQ2xvc2VCdXR0b24gPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkTW9kYWwoY29udGVudCkge1xyXG4gICAgICAgIC8vT3ZlcmxheVxyXG4gICAgICAgIHRoaXMubW9kYWxPdmVybGF5ID0gdGhpcy5jcmVhdGVEb21Ob2RlMSh0aGlzLm1vZGFsT3ZlcmxheSwgXCJkaXZcIiwgXCJtb2RhbF9fb3ZlcmxheVwiKTtcclxuICAgICAgICAvL1dyYXBwZXJcclxuICAgICAgICB0aGlzLm1vZGFsV3JhcHBlciA9IHRoaXMuY3JlYXRlRG9tTm9kZTEodGhpcy5tb2RhbFdyYXBwZXIsIFwiZGl2XCIsIFwibW9kYWxfX3dyYXBwZXJcIik7XHJcbiAgICAgICAgLy9XaW5kb3dcclxuICAgICAgICB0aGlzLm1vZGFsV2luZG93ID0gdGhpcy5jcmVhdGVEb21Ob2RlMSh0aGlzLm1vZGFsV2luZG93LCBcImRpdlwiLCBcIm1vZGFsX193aW5kb3dcIik7XHJcbiAgICAgICAgLy9Db250ZW50XHJcbiAgICAgICAgdGhpcy5tb2RhbENvbnRlbnQgPSB0aGlzLmNyZWF0ZURvbU5vZGUxKHRoaXMubW9kYWxDb250ZW50LCBcImRpdlwiLCBcIm1vZGFsX19jb250ZW50XCIpO1xyXG4gICAgICAgIC8vQ2xvc2VCdXR0b25cclxuICAgICAgICB0aGlzLm1vZGFsQ2xvc2VCdXR0b24gPSB0aGlzLmNyZWF0ZUNsb3NlQnV0dG9uKHRoaXMubW9kYWxDbG9zZUJ1dHRvbiwgXCJidXR0b25cIiwgXCJidXR0b25fX21vZGFsLWNsb3NlXCIpO1xyXG4gICAgICAgIC8vU2V0Q29udGVudFxyXG4gICAgICAgIHRoaXMuc2V0Q29udGVudChjb250ZW50KTtcclxuICAgICAgICAvL1NldENsb3NlQnV0dG9uXHJcbiAgICAgICAgdGhpcy5tb2RhbENvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW5mb1wiKS5hcHBlbmQodGhpcy5tb2RhbENsb3NlQnV0dG9uKTtcclxuICAgICAgICAvL0FwcGVuZE1vZGFsRWxlbWVudHNcclxuICAgICAgICB0aGlzLmFwcGVuZE1vZGFsRWxlbWVudHMoKTtcclxuICAgICAgICAvL0J1aWxkRXZlbnRzKGNsb3NlIGFuZCBvcGVuKVxyXG4gICAgICAgIHRoaXMuYnVpbGRFdmVudHMoKTtcclxuICAgICAgICAvL09wZW5Nb2RhbFxyXG4gICAgICAgIHRoaXMub3Blbk1vZGFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRG9tTm9kZTEobm9kZSwgZWxlbWVudCwgLi4uY2xhc3Nlcykge1xyXG4gICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDbG9zZUJ1dHRvbihub2RlLCAuLi5jbGFzc2VzKSB7XHJcbiAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xyXG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gXCI8c3Bhbj5DbG9zZTwvc3Bhbj5cIjtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb250ZW50KGNvbnRlbnQpIHtcclxuICAgICAgICB0aGlzLm1vZGFsQ29udGVudC5hcHBlbmQoLi4uY29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kTW9kYWxFbGVtZW50cygpIHtcclxuICAgICAgICB0aGlzLm1vZGFsT3ZlcmxheS5hcHBlbmQodGhpcy5tb2RhbFdyYXBwZXIpO1xyXG4gICAgICAgIHRoaXMubW9kYWxXcmFwcGVyLmFwcGVuZCh0aGlzLm1vZGFsV2luZG93KTtcclxuICAgICAgICB0aGlzLm1vZGFsV2luZG93LmFwcGVuZCh0aGlzLm1vZGFsQ29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbChlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5Nb2RhbCgpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLm1vZGFsT3ZlcmxheSk7XHJcbiAgICAgICAgLy9BbnRpLXNjcm9sbFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiXHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VNb2RhbChlKSB7XHJcbiAgICAgICAgbGV0IGNsYXNzZXMgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XHJcbiAgICAgICAgbGV0IGZpcnN0Q2xvc2VSdWxlID0gKGNsYXNzZXMuY29udGFpbnMoXCJtb2RhbF9fb3ZlcmxheVwiKSB8fCBjbGFzc2VzLmNvbnRhaW5zKFwibW9kYWxfX3dyYXBwZXJcIikpO1xyXG4gICAgICAgIGxldCBzZWNvbmRDbG9zZVJ1bGUgPSAoY2xhc3Nlcy5jb250YWlucyhcImJ1dHRvbl9fbW9kYWwtY2xvc2VcIikpO1xyXG4gICAgICAgIGlmIChmaXJzdENsb3NlUnVsZSB8fCBzZWNvbmRDbG9zZVJ1bGUpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fb3ZlcmxheVwiKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9EZWxldGUgQW50aS1zY3JvbGxcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJcIjtcclxuICAgIH1cclxufSIsImltcG9ydCB7TW9kYWx9IGZyb20gJy4vTW9kYWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGFsSXRlbSBleHRlbmRzIE1vZGFsIHtcclxuICAgIGNvbnN0cnVjdG9yKGNsYXNzZXMsIHtpZCwgdHlwZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCB1cmxUb0ltYWdlLCBwcmljZSwgc2l6ZSwgYWRkaXRpdmVzfSkge1xyXG4gICAgICAgIHN1cGVyKGNsYXNzZXMpO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy51cmxUb0ltYWdlID0gdXJsVG9JbWFnZTtcclxuICAgICAgICB0aGlzLnByaWNlID0gcHJpY2U7XHJcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLmFkZGl0aXZlcyA9IGFkZGl0aXZlcztcclxuICAgICAgICB0aGlzLmxldHRlclNpemUgPSBbe2xldHRlcjogXCJTXCIsIHBsdXM6IDB9LCB7bGV0dGVyOiBcIk1cIiwgcGx1czogMC41fSwge2xldHRlcjogXCJMXCIsIHBsdXM6IDF9XTtcclxuICAgICAgICB0aGlzLmFkZGl0aXZlUGx1c1ByaWNlID0gMC41MDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQbHVzUHJpY2UgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vSXRlbSBDb250ZW50IEdlbmVyYXRvclxyXG4gICAgZ2VuZXJhdGVDb250ZW50KCkge1xyXG4gICAgICAgIGxldCBpbWFnZUJsb2NrID0gdGhpcy5nZW5lcmF0ZUltYWdlQmxvY2soKTtcclxuICAgICAgICBsZXQgaW5mb0Jsb2NrID0gdGhpcy5nZW5lcmF0ZUluZm9CbG9jaygpO1xyXG4gICAgICAgIHJldHVybiBbaW1hZ2VCbG9jaywgaW5mb0Jsb2NrXTtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUltYWdlQmxvY2soKSB7XHJcbiAgICAgICAgbGV0IGltYWdlQmxvY2sgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJjYXRhbG9nX19pbWFnZS1jb250YWluZXJcIik7XHJcbiAgICAgICAgbGV0IGltYWdlID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiaW1nXCIsIFwiY2F0YWxvZ19faW1hZ2VcIik7XHJcbiAgICAgICAgdGhpcy51cmxUb0ltYWdlICYmIChpbWFnZS5zcmMgPSB0aGlzLnVybFRvSW1hZ2UpO1xyXG4gICAgICAgIHRoaXMudHlwZSAmJiAoaW1hZ2UuYWx0ID0gdGhpcy50eXBlKTtcclxuICAgICAgICBpbWFnZUJsb2NrLmFwcGVuZENoaWxkKGltYWdlKTtcclxuICAgICAgICByZXR1cm4gaW1hZ2VCbG9jaztcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUluZm9CbG9jaygpIHtcclxuICAgICAgICBsZXQgaW5mb0Jsb2NrID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiZGl2XCIsIFwibW9kYWxfX2luZm9cIik7XHJcbiAgICAgICAgbGV0IGRyaW5rc0Jsb2NrID0gdGhpcy5nZW5lcmF0ZURyaW5rc0Jsb2NrKCk7XHJcbiAgICAgICAgbGV0IHNpemVCbG9jayA9IHRoaXMuZ2VuZXJhdGVTaXplQmxvY2soKTtcclxuICAgICAgICBsZXQgYWRkaXRpdmVzQmxvY2sgPSB0aGlzLmdlbmVyYXRlQWRkaXRpdmVzQmxvY2soKTtcclxuICAgICAgICBsZXQgcHJpY2VCbG9jayA9IHRoaXMuZ2VuZXJhdGVQcmljZUJsb2NrKCk7XHJcbiAgICAgICAgbGV0IG5vdGVCbG9jayA9IHRoaXMuZ2VuZXJhdGVOb3RlQmxvY2soKTtcclxuICAgICAgICBpbmZvQmxvY2suYXBwZW5kKGRyaW5rc0Jsb2NrLCBzaXplQmxvY2ssIGFkZGl0aXZlc0Jsb2NrLCBwcmljZUJsb2NrLCBub3RlQmxvY2spO1xyXG4gICAgICAgIHJldHVybiBpbmZvQmxvY2s7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdlbmVyYXRlRHJpbmtzQmxvY2soKSB7XHJcbiAgICAgICAgbGV0IGRyaW5rc0Jsb2NrID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiZGl2XCIsIFwiZHJpbmtfX2luZm9cIik7XHJcbiAgICAgICAgbGV0IGRyaW5rVGl0bGUgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJoNVwiLCBcImRyaW5rX190aXRsZVwiKTtcclxuICAgICAgICBsZXQgZHJpbmtEZXNjcmlwdGlvbiA9IHRoaXMuY3JlYXRlRG9tTm9kZShcInBcIiwgXCJkcmlua19fZGVzY3JpcHRpb25cIik7XHJcbiAgICAgICAgdGhpcy50aXRsZSAmJiAoZHJpbmtUaXRsZS5pbm5lclRleHQgPSB0aGlzLnRpdGxlKTtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uICYmIChkcmlua0Rlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRoaXMuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIGRyaW5rc0Jsb2NrLmFwcGVuZChkcmlua1RpdGxlLCBkcmlua0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICByZXR1cm4gZHJpbmtzQmxvY2tcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZVNpemVCbG9jaygpIHtcclxuICAgICAgICBsZXQgc2l6ZUJsb2NrID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiZGl2XCIsIFwic2l6ZV9faW5mb1wiLCBcInNpemUtaW5mb1wiKTtcclxuICAgICAgICBsZXQgc2l6ZUJsb2NrVGl0bGUgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJoNlwiLCBcInNpemUtaW5mb19fdGl0bGVcIik7XHJcbiAgICAgICAgc2l6ZUJsb2NrVGl0bGUuaW5uZXJUZXh0ID0gXCJTaXplXCI7XHJcbiAgICAgICAgbGV0IHNpemVCbG9ja0J1dHRvbnMgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJzaXplLWluZm9fX2J1dHRvbnNcIik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaXplLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBidXR0b24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmIChpID09IDApIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbiA9IHRoaXMuY3JlYXRlTW9kYWxCdXR0b24odGhpcy5sZXR0ZXJTaXplW2ldLmxldHRlciwgdGhpcy5zaXplW2ldLCBcImJ1dHRvblwiLFwiYnV0dG9uX19tb2RhbC1pbmZvXCIsIFwiYnV0dG9uX19zaXplXCIsIFwiYnV0dG9uX19tb2RhbC1pbmZvX2FjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbiA9IHRoaXMuY3JlYXRlTW9kYWxCdXR0b24odGhpcy5sZXR0ZXJTaXplW2ldLmxldHRlciwgdGhpcy5zaXplW2ldLCBcImJ1dHRvblwiLFwiYnV0dG9uX19tb2RhbC1pbmZvXCIsIFwiYnV0dG9uX19zaXplXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNpemVCbG9ja0J1dHRvbnMuYXBwZW5kKGJ1dHRvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaXplQmxvY2tCdXR0b25zLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdChcIi5idXR0b25fX3NpemVcIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tTaXplQnV0dG9uKGUsIFwiLmJ1dHRvbl9fc2l6ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBzaXplQmxvY2suYXBwZW5kKHNpemVCbG9ja1RpdGxlLCBzaXplQmxvY2tCdXR0b25zKTtcclxuICAgICAgICByZXR1cm4gc2l6ZUJsb2NrO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrU2l6ZUJ1dHRvbihlLCBzZWxlY3Rvcikge1xyXG4gICAgICAgIC8vIERlbGV0ZSBhY3RpdmUgY2xhc3NcclxuICAgICAgICBsZXQgbm9kZUxpc3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgbm9kZUxpc3RCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJidXR0b25fX21vZGFsLWluZm9fYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gQWRkIGFjdGl2ZSBjbGFzcyB0byBjbGlja2VkIGJ1dHRvblxyXG4gICAgICAgIGUudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpLmNsYXNzTGlzdC5hZGQoXCJidXR0b25fX21vZGFsLWluZm9fYWN0aXZlXCIpO1xyXG4gICAgICAgIC8vIENoYW5nZSBwcmljZVxyXG4gICAgICAgIGxldCBjbGlja2VkU2l6ZSA9IGUudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpLmZpcnN0RWxlbWVudENoaWxkLmlubmVySFRNTDtcclxuICAgICAgICBsZXQgdG90YWxQcmljZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvdGFsLXByaWNlXCIpO1xyXG4gICAgICAgIGxldCB0b3RhbFByaWNlTnVtYmVyID0gK3RoaXMucHJpY2Uuc2xpY2UoMSkgKyB0aGlzLmN1cnJlbnRQbHVzUHJpY2U7XHJcbiAgICAgICAgbGV0IHBsdXNQcmljZSA9ICh0aGlzLmxldHRlclNpemUuZmluZChvYmogPT4gb2JqLmxldHRlciA9PSBjbGlja2VkU2l6ZSkpLnBsdXM7XHJcbiAgICAgICAgdG90YWxQcmljZUVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB0b3RhbFByaWNlRWxlbWVudC5pbm5lckhUTUwgPSBcIiRcIiArIGAke3RvdGFsUHJpY2VOdW1iZXIgKyBwbHVzUHJpY2V9YDtcclxuICAgICAgICBpZiAoIXRvdGFsUHJpY2VFbGVtZW50LmlubmVySFRNTC5pbmNsdWRlcyhcIi5cIikpIHtcclxuICAgICAgICAgICAgdG90YWxQcmljZUVsZW1lbnQuaW5uZXJIVE1MICs9IFwiLjAwXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVBZGRpdGl2ZXNCbG9jaygpIHtcclxuICAgICAgICBsZXQgYWRkaXRpdmVzQmxvY2sgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJhZGRpdGl2ZXNfX2luZm9cIiwgXCJhZGRpdGl2ZXMtaW5mb1wiKTtcclxuICAgICAgICBsZXQgYWRkaXRpdmVzQmxvY2tUaXRsZSA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImg2XCIsIFwiYWRkaXRpdmVzLWluZm9fX3RpdGxlXCIpO1xyXG4gICAgICAgIGFkZGl0aXZlc0Jsb2NrVGl0bGUuaW5uZXJUZXh0ID0gXCJBZGRpdGl2ZXNcIjtcclxuICAgICAgICBsZXQgYWRkaXRpdmVzQmxvY2tCdXR0b25zID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiZGl2XCIsIFwiYWRkaXRpdmVzLWluZm9fX2J1dHRvbnNcIik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hZGRpdGl2ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uID0gdGhpcy5jcmVhdGVNb2RhbEJ1dHRvbigoaSArIDEpLCB0aGlzLmFkZGl0aXZlc1tpXSwgXCJidXR0b25cIixcImJ1dHRvbl9fbW9kYWwtaW5mb1wiLCBcImJ1dHRvbl9fYWRkaXRpdmVzXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uID0gdGhpcy5jcmVhdGVNb2RhbEJ1dHRvbigoaSArIDEpLCB0aGlzLmFkZGl0aXZlc1tpXSwgXCJidXR0b25cIixcImJ1dHRvbl9fbW9kYWwtaW5mb1wiLCBcImJ1dHRvbl9fYWRkaXRpdmVzXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFkZGl0aXZlc0Jsb2NrQnV0dG9ucy5hcHBlbmQoYnV0dG9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZGl0aXZlc0Jsb2NrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdChcIi5idXR0b25fX2FkZGl0aXZlc1wiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0FkZGl0aXZlQnV0dG9uKGUsIFwiLmJ1dHRvbl9fYWRkaXRpdmVzXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGFkZGl0aXZlc0Jsb2NrLmFwcGVuZChhZGRpdGl2ZXNCbG9ja1RpdGxlLCBhZGRpdGl2ZXNCbG9ja0J1dHRvbnMpO1xyXG4gICAgICAgIHJldHVybiBhZGRpdGl2ZXNCbG9jaztcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0FkZGl0aXZlQnV0dG9uKGUsIHNlbGVjdG9yKSB7XHJcbiAgICAgICAgLy8gVG9nZ2xlIGFjdGl2ZSBjbGFzc1xyXG4gICAgICAgIGUudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpLmNsYXNzTGlzdC50b2dnbGUoXCJidXR0b25fX21vZGFsLWluZm9fYWN0aXZlXCIpO1xyXG4gICAgICAgIC8vIENoYW5nZSBwcmljZVxyXG4gICAgICAgIGxldCB0b3RhbFByaWNlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG90YWwtcHJpY2VcIik7XHJcbiAgICAgICAgbGV0IHRvdGFsUHJpY2VOdW1iZXIgPSArKHRvdGFsUHJpY2VFbGVtZW50LmlubmVySFRNTCkuc2xpY2UoMSk7XHJcbiAgICAgICAgdG90YWxQcmljZUVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYgKCEoZS50YXJnZXQuY2xvc2VzdChzZWxlY3RvcikuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnV0dG9uX19tb2RhbC1pbmZvX2FjdGl2ZVwiKSkpIHtcclxuICAgICAgICAgICAgdG90YWxQcmljZUVsZW1lbnQuaW5uZXJIVE1MID0gXCIkXCIgKyBgJHt0b3RhbFByaWNlTnVtYmVyIC0gdGhpcy5hZGRpdGl2ZVBsdXNQcmljZX1gO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQbHVzUHJpY2UgLT0gdGhpcy5hZGRpdGl2ZVBsdXNQcmljZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b3RhbFByaWNlRWxlbWVudC5pbm5lckhUTUwgPSBcIiRcIiArIGAke3RvdGFsUHJpY2VOdW1iZXIgKyB0aGlzLmFkZGl0aXZlUGx1c1ByaWNlfWA7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBsdXNQcmljZSArPSB0aGlzLmFkZGl0aXZlUGx1c1ByaWNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0b3RhbFByaWNlRWxlbWVudC5pbm5lckhUTUwuaW5jbHVkZXMoXCIuXCIpKSB7XHJcbiAgICAgICAgICAgIHRvdGFsUHJpY2VFbGVtZW50LmlubmVySFRNTCArPSBcIi4wMFwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZVByaWNlQmxvY2soKSB7XHJcbiAgICAgICAgbGV0IHByaWNlQmxvY2sgPSB0aGlzLmNyZWF0ZURvbU5vZGUoXCJkaXZcIiwgXCJwcmljZV9faW5mb1wiKTtcclxuICAgICAgICBwcmljZUJsb2NrLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPHNwYW4+VG90YWw6PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcyA9IFwidG90YWwtcHJpY2VcIj4ke3RoaXMucHJpY2V9PC9zcGFuPlxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgcmV0dXJuIHByaWNlQmxvY2s7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVOb3RlQmxvY2soKSB7XHJcbiAgICAgICAgbGV0IG5vdGVCbG9jayA9IHRoaXMuY3JlYXRlRG9tTm9kZShcImRpdlwiLCBcIm5vdGVfX2luZm9cIik7XHJcbiAgICAgICAgbm90ZUJsb2NrLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPG9iamVjdCBkYXRhPVwiLi4vaW1nL2ljb25zL2luZm8tZW1wdHkuc3ZnXCIgdHlwZT1cImltYWdlL3N2Zyt4bWxcIj5cclxuICAgICAgICAgICAgICAgIFlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFNWR1xyXG4gICAgICAgICAgICA8L29iamVjdD5cclxuICAgICAgICAgICAgPHA+VGhlIGNvc3QgaXMgbm90IGZpbmFsLiBEb3dubG9hZCBvdXIgbW9iaWxlIGFwcCB0byBzZWUgdGhlIGZpbmFsIHByaWNlIGFuZCBwbGFjZSB5b3VyPC9icj4gb3JkZXIuXHJcbiAgICAgICAgICAgICAgICBFYXJuIGxveWFsdHkgcG9pbnRzIGFuZCBlbmpveSB5b3VyIGZhdm9yaXRlIGNvZmZlZSB3aXRoIHVwIHRvIDIwJSBkaXNjb3VudC5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgcmV0dXJuIG5vdGVCbG9jaztcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVNb2RhbEJ1dHRvbihzaXplLCB2b2x1bWUsIC4uLmNsYXNzZXMpIHtcclxuICAgICAgICBsZXQgYnV0dG9uID0gdGhpcy5jcmVhdGVEb21Ob2RlKFwiYnV0dG9uXCIsIC4uLmNsYXNzZXMpO1xyXG4gICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uX190ZXh0IGJ1dHRvbl9fdGV4dF9zaXplXCI+JHtzaXplfTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b25fX3RleHQgYnV0dG9uX190ZXh0X3ZvbHVtZVwiPiR7dm9sdW1lfTwvc3Bhbj5cclxuICAgICAgICBgO1xyXG4gICAgICAgIHJldHVybiBidXR0b247XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRG9tTm9kZShlbGVtZW50LCAuLi5jbGFzc2VzKSB7XHJcbiAgICAgICAgbGV0IGRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIGRvbUVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKTtcclxuICAgICAgICByZXR1cm4gZG9tRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJNb2RhbCgpIHtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuZ2VuZXJhdGVDb250ZW50KCk7XHJcbiAgICAgICAgc3VwZXIuYnVpbGRNb2RhbChjb250ZW50KTtcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRhdGFJdGVtcyBmcm9tICcuLi9KU09OL2RhdGEuanNvbic7XHJcbmltcG9ydCB7Q2F0YWxvZ0l0ZW19IGZyb20gXCIuL01vZHVsZXMvQ2F0YWxvZ0l0ZW1cIjtcclxuaW1wb3J0IHtNb2RhbH0gZnJvbSBcIi4vTW9kdWxlcy9Nb2RhbFwiO1xyXG5pbXBvcnQge01vZGFsSXRlbX0gZnJvbSBcIi4vTW9kdWxlcy9Nb2RhbEl0ZW1cIjtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoZGF0YUl0ZW1zKSB7XHJcbiAgICAgICAgcmVuZGVyQ2F0YWxvZ1RvRG9tKFwiY29mZmVcIik7XHJcbiAgICB9XHJcbiAgICAvLyBDYXRlZ29yaWVzXHJcbiAgICBhZGRDYXRlZ29yaWVzQ2xpY2tIYW5kbGVyKCk7XHJcbiAgICAvLyBHZW5lcmF0ZSBtb2RhbFxyXG4gICAgYWRkSXRlbUNhdGFsb2dDbGlja0hhbmRsZXIoKTtcclxuICAgIC8vIGFkZCBXaW5kb3cgUmVzaXplIEhhbmRsZXJcclxuICAgIGFkZFdpbmRvd1Jlc2l6ZUhhbmRsZXIoKTtcclxuICAgIC8vIEFkZCBoYW5kbGVyIHRvIHJlZnJlc2ggYnV0dG9uXHJcbiAgICBhZGRSZWZyZXNoQnV0dG9uSGFuZGxlcigpO1xyXG59XHJcblxyXG5jb25zdCBhZGRSZWZyZXNoQnV0dG9uSGFuZGxlciA9ICgpID0+IHtcclxuICAgIGxldCByZWZyZXNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b25fX3JlZnJlc2hcIik7XHJcbiAgICBsZXQgY3VycmVudENhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b25fX2NhdGVnb3J5X2FjdGl2ZVwiKS5kYXRhc2V0LmNhdGVnb3J5O1xyXG4gICAgcmVmcmVzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBsZXQgY29mZmVJdGVtcyA9IGdldENhdGFsb2dJdGVtcyhjdXJyZW50Q2F0ZWdvcnkpO1xyXG4gICAgICAgIGxldCBjYXRhbG9nV3JhcHBlciA9IGdldENhdGFsb2dXcmFwcGVyKCk7XHJcbiAgICAgICAgZ2VuZXJhdGVJdGVtcyhjb2ZmZUl0ZW1zKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBjYXRhbG9nV3JhcHBlci5hcHBlbmQoaXRlbS5nZW5lcmF0ZUl0ZW0oKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVmcmVzaEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBjaGVja0J1dHRvblJlZnJlc2hOZWVkZWQgPSAoKSA9PiB7XHJcbiAgICBsZXQgY3VycmVudENhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b25fX2NhdGVnb3J5X2FjdGl2ZVwiKS5kYXRhc2V0LmNhdGVnb3J5O1xyXG4gICAgbGV0IGFtb3VudE9mQ3VycmVudEl0ZW1zID0gMDtcclxuICAgIGRhdGFJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT0gY3VycmVudENhdGVnb3J5KSB7XHJcbiAgICAgICAgICAgIGFtb3VudE9mQ3VycmVudEl0ZW1zICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoYW1vdW50T2ZDdXJyZW50SXRlbXMgPiA0ICYmIHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGFkZFdpbmRvd1Jlc2l6ZUhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBsZXQgc3RhcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB7XHJcbiAgICAgICAgLy8gQ2hhbmdlIGFtb3VudCBvZiBjYXRhbG9nIGl0ZW1zXHJcbiAgICAgICAgbGV0IGN1cnJlbnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGxldCBjdXJyZW50Q2F0ZWdvcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbl9fY2F0ZWdvcnlfYWN0aXZlXCIpLmRhdGFzZXQuY2F0ZWdvcnk7XHJcbiAgICAgICAgbGV0IG9iaiA9IGNoZWNrQ2hhbmdlKHN0YXJ0V2lkdGgsIGN1cnJlbnRXaWR0aCk7XHJcbiAgICAgICAgaWYgKG9iai5yZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVuZGVyQ2F0YWxvZ1RvRG9tKGN1cnJlbnRDYXRlZ29yeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXJ0V2lkdGggPSBvYmouc3RhcnRXaWR0aDtcclxuICAgICAgICAvLyBDaGVjayBhIGJ1dHRvbiByZWZyZXNoIG5lZWRlZFxyXG4gICAgICAgIGxldCByZWZyZXNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b25fX3JlZnJlc2hcIik7XHJcbiAgICAgICAgbGV0IGNhdGFsb2dXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXRhbG9nXCIpO1xyXG4gICAgICAgIGlmIChjYXRhbG9nV3JhcHBlci5jaGlsZHJlbi5sZW5ndGggPD0gNCkge1xyXG4gICAgICAgICAgICBpZiAoIWNoZWNrQnV0dG9uUmVmcmVzaE5lZWRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZWZyZXNoQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGNoZWNrQ2hhbmdlID0gKHN0YXJ0V2lkdGgsIGN1cnJlbnRXaWR0aCkgPT4ge1xyXG4gICAgbGV0IHN0YXJ0ID0gc3RhcnRXaWR0aDtcclxuICAgIGxldCByZXMgPSB1bmRlZmluZWQ7XHJcbiAgICBpZiAoc3RhcnRXaWR0aCA8PSA3NjgpIHtcclxuICAgICAgICBpZiAoY3VycmVudFdpZHRoID49IDc2OCkge1xyXG4gICAgICAgICAgICByZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFydCA9IGN1cnJlbnRXaWR0aCArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHN0YXJ0V2lkdGggPj0gNzY4KSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRXaWR0aCA8PSA3NjgpIHtcclxuICAgICAgICAgICAgcmVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3RhcnQgPSBjdXJyZW50V2lkdGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdWx0OiByZXMsXHJcbiAgICAgICAgc3RhcnRXaWR0aDogc3RhcnRcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYWRkQ2F0ZWdvcmllc0NsaWNrSGFuZGxlciA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0ZWdyaWVzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGxldCBjbGlja2VkQ2F0ZWdvcnkgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ1dHRvbl9fY2F0ZWdvcnlcIik7XHJcbiAgICAgICAgbGV0IGRhdGFDYXRlZ29yeSA9IGNsaWNrZWRDYXRlZ29yeT8uZ2V0QXR0cmlidXRlKFwiZGF0YS1jYXRlZ29yeVwiKTtcclxuICAgICAgICBpZiAoY2xpY2tlZENhdGVnb3J5Py5jbGFzc0xpc3QuY29udGFpbnMoXCJidXR0b25fX2NhdGVnb3J5XCIpKSB7XHJcbiAgICAgICAgICAgIGlmICghY2xpY2tlZENhdGVnb3J5LmNsYXNzTGlzdC5jb250YWlucyhcImJ1dHRvbl9fY2F0ZWdvcnlfYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVTZWxlY3RlZENhdGVnb3JpZXMoKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdENsaWNrZWRDYXRlZ29yeShjbGlja2VkQ2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyQ2F0YWxvZ1RvRG9tKGRhdGFDYXRlZ29yeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVmcmVzaCBidXR0b25cclxuICAgICAgICBsZXQgcmVmcmVzaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uX19yZWZyZXNoXCIpO1xyXG4gICAgICAgIGlmICghY2hlY2tCdXR0b25SZWZyZXNoTmVlZGVkKCkpIHtcclxuICAgICAgICAgICAgcmVmcmVzaEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVmcmVzaEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgcmVtb3ZlU2VsZWN0ZWRDYXRlZ29yaWVzID0gKCkgPT4ge1xyXG4gICAgbGV0IGNhdGVnb3JpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvbl9fY2F0ZWdvcnlcIik7XHJcbiAgICBjYXRlZ29yaWVzLmZvckVhY2goY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgIGNhdGVnb3J5LmNsYXNzTGlzdC5yZW1vdmUoXCJidXR0b25fX2NhdGVnb3J5X2FjdGl2ZVwiKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IHNlbGVjdENsaWNrZWRDYXRlZ29yeSA9IChjbGlja2VkQ2F0ZWdvcnkpID0+IHtcclxuICAgIGNsaWNrZWRDYXRlZ29yeS5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uX19jYXRlZ29yeV9hY3RpdmVcIik7XHJcbn1cclxuXHJcbmNvbnN0IGdldENhdGFsb2dJdGVtcyA9ICh0eXBlKSA9PiB7XHJcbiAgICBsZXQgY2F0YWxvZ0l0ZW1zID0gW107XHJcbiAgICBkYXRhSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09IHR5cGUpIHtcclxuICAgICAgICAgICAgY2F0YWxvZ0l0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY2F0YWxvZ0l0ZW1zO1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJDYXRhbG9nVG9Eb20gPSAodHlwZSkgPT4ge1xyXG4gICAgbGV0IGNvZmZlSXRlbXMgPSBnZXRDYXRhbG9nSXRlbXModHlwZSk7XHJcbiAgICBsZXQgY2F0YWxvZ1dyYXBwZXIgPSBnZXRDYXRhbG9nV3JhcHBlcigpO1xyXG4gICAgbGV0IHdpbmRvd0lubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIGxldCBnZW5lcmF0ZU9iamVjdEl0ZW1zID0gZ2VuZXJhdGVJdGVtcyhjb2ZmZUl0ZW1zKTtcclxuICAgIGlmICh3aW5kb3dJbm5lcldpZHRoIDw9IDc2OCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNhdGFsb2dXcmFwcGVyLmFwcGVuZChnZW5lcmF0ZU9iamVjdEl0ZW1zW2ldLmdlbmVyYXRlSXRlbSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2VuZXJhdGVPYmplY3RJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjYXRhbG9nV3JhcHBlci5hcHBlbmQoZ2VuZXJhdGVPYmplY3RJdGVtc1tpXS5nZW5lcmF0ZUl0ZW0oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBnZXRDYXRhbG9nV3JhcHBlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNhdGFsb2dXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXRhbG9nXCIpO1xyXG4gICAgY2F0YWxvZ1dyYXBwZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIHJldHVybiBjYXRhbG9nV3JhcHBlcjtcclxufVxyXG5cclxuY29uc3QgZ2VuZXJhdGVJdGVtcyA9IChkYXRhKSA9PiB7XHJcbiAgICBsZXQgaXRlbXMgPSBbXTtcclxuICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGl0ZW1zLnB1c2gobmV3IENhdGFsb2dJdGVtKGl0ZW0pKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGl0ZW1zO1xyXG59XHJcblxyXG5jb25zdCBhZGRJdGVtQ2F0YWxvZ0NsaWNrSGFuZGxlciA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2F0YWxvZ1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdCgnLmNhdGFsb2dfX2l0ZW0nKSkge1xyXG4gICAgICAgICAgICBsZXQgY2xpY2tlZEl0ZW1JZCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5jYXRhbG9nX19pdGVtJykuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgbGV0IGNsaWNrZWRJdGVtRGF0YSA9IGdldENsaWNrZWREYXRhKGNsaWNrZWRJdGVtSWQpO1xyXG4gICAgICAgICAgICByZW5kZXJJdGVtTW9kYWxXaW5kb3coY2xpY2tlZEl0ZW1EYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBnZXRDbGlja2VkRGF0YSA9IChpZCkgPT4ge1xyXG4gICAgcmV0dXJuIGRhdGFJdGVtcy5maW5kKGl0ZW0gPT4ge1xyXG4gICAgICAgIHJldHVybiBpdGVtLmlkID09IGlkO1xyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgcmVuZGVySXRlbU1vZGFsV2luZG93ID0gKGl0ZW0pID0+IHtcclxuICAgIGxldCBtb2RhbCA9IG5ldyBNb2RhbEl0ZW0oXCJcIiwgaXRlbSk7XHJcbiAgICBtb2RhbC5yZW5kZXJNb2RhbCgpO1xyXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9