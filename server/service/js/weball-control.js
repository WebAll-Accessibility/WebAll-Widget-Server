const currentConfiguration = {
    widget: undefined,
    inverted: undefined,
    grayScale: undefined,
    contrast: undefined,
    saturation: undefined,
    brightness: undefined,
    sepia: undefined,
    highlightLinks: undefined,
    dyslexia: undefined,
    zoomPointer: undefined,
    zoom: undefined,
    muteSounds: undefined
};

const elementHasClass = (element, cls) => element.classList.contains(cls);
const hasClass = (id, cls) => elementHasClass(document.getElementById(id), cls);

const removeClassFromElement = (element, cls) => {
    if (element.classList.contains(cls))
        element.classList.remove(cls);
}

const addClassToElement = (element, cls) => {
    if (!element.classList.contains(cls))
        element.classList.add(cls);
}

const removeClass = (id, cls) => {
    removeClassFromElement(document.getElementById(id), cls);
}

const addClass = (id, cls) => {
    addClassToElement(document.getElementById(id), cls);
}

const toggleClassOnElement = (element, cls) => {
    const contains = element.classList.contains(cls);
    const operation = (contains) ? removeClassFromElement
                                    : addClassToElement;

    operation(element, cls);
    return contains;
}

const toggleClass = (button, cls) => {
    const element =  document.getElementById(button);
    return toggleClassOnElement(element, cls);
}

const setClassOnElement = (element, cls, state) => {
    const operation = (state) ? addClassToElement
                                : removeClassFromElement;

    operation(element, cls);
}

const setClass = (id, cls, state) => {
    setClassOnElement(document.getElementById(id), cls, state);
}

const update = () => {
    parent.postMessage({ weball: currentConfiguration }, '*');
}

const toggleInvertiColori = () => {
    toggleClass('inverti-colori', 'selected');
    currentConfiguration.inverted = !currentConfiguration.inverted;
    update();
}

const toggleScalaDiGrigi = () => {
    toggleClass('scala-di-grigi', 'selected');
    currentConfiguration.grayScale = !currentConfiguration.grayScale;
    update();
    currentConfiguration = {};
}

const noWeball = () => {
    currentConfiguration.widget = false;
    update();
}
