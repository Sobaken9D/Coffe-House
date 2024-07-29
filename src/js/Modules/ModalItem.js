import {Modal} from './Modal';

export class ModalItem extends Modal {
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