export class CatalogItem {
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