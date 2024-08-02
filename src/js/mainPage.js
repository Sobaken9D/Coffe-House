import dataItems from "../JSON/slider.json";
import {Slider} from "./Modules/Slider";

window.onload = function () {
    // Create slider
    createSlider();
}

const createSlider = () => {
    let slider = new Slider(dataItems, {});
    slider.renderSlider();
}