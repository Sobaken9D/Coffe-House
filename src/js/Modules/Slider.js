export class Slider {
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