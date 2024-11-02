import dataItems from '../JSON/data.json';
import {CatalogItem} from "./Modules/CatalogItem";
import {Modal} from "./Modules/Modal";
import {ModalItem} from "./Modules/ModalItem";

window.onload = function () {
    if (dataItems) {
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
    dataItems.forEach(item => {
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
    dataItems.forEach((item) => {
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
        items.push(new CatalogItem(item));
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
    return dataItems.find(item => {
        return item.id == id;
    })
}

const renderItemModalWindow = (item) => {
    let modal = new ModalItem("", item);
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