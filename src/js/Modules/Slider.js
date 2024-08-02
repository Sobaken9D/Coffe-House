export class Slider {
    constructor(data, {autoSlide = true, timeAutoSlide = 5000}) {
        this.sliderWrapper = "";
        this.sliderContainer = "";
        this.sliderButtonPrev = "";
        this.sliderButtonNext = "";
        this.sliderItems = "";
        this.currentSlide = "";
        this.sliderCounter = "";
        this.sliderCount = 0;

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
        this.addCountersHandler();
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
            let counterLine = this.createDomNode("div", "counter__line");
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
        this.sliderCount--;
        if (this.sliderCount < 0) {
            this.sliderCount = this.data.length - 1;
        }
        this.rollSlider();
    }

    nextSlide() {
        this.sliderCount++;
        if (this.sliderCount >= this.data.length) {
            this.sliderCount = 0;
        }
        this.rollSlider();
    }

    rollSlider() {
        let sliderWidth = document.querySelector(".slider-item").offsetWidth;
        this.sliderItems.style.transform = `translateX(${-this.sliderCount * sliderWidth}px)`;
    }

    addAutoSlide() {
        setInterval(() => {
            this.nextSlide();
        }, this.timeAutoSlide)
    }

    addCountersHandler() {
        // let arrCounters = Array.from(this.sliderCounter.children);
        // arrCounters[0].
    }
}