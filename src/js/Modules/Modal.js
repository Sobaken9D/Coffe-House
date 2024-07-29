export class Modal {
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