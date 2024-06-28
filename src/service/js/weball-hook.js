let currentConfiguration = {};

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

const traverse = (root, action) => {
    const inner = (node) => {
        action(null, node);
        
        if (!node.hasChildNodes())
            return;
        
        for (const child of node.children) {
            action(node, child);
            inner(child);
        }
    }

    inner(root);
}

const invertiColori = (state) => {
    if (state == undefined || state == currentConfiguration.inverted)
        return;
    
    currentConfiguration.inverted = state;
    // setClassOnElement(document.documentElement, 'weball-inverted', state);
}

const scalaDiGrigi = (state) => {
    if (state == undefined || state == currentConfiguration.grayScale)
        return;
    
    currentConfiguration.grayScale = state;
    // setClassOnElement(document.documentElement, 'weball-gray-scale', state);
}

const contrasto = (state) => {
    if (state == undefined || state == currentConfiguration.contrast)
        return;
    
    currentConfiguration.contrast = state;
    // setClassOnElement(document.documentElement, 'weball-contrast', state);
}

const saturazione = (state) => {
    if (state == undefined || state == currentConfiguration.saturation)
        return;
    
    currentConfiguration.saturation = state;
    // setClassOnElement(document.documentElement, 'weball-saturation', state);
}

const luminosita = (state) => {
    if (state == undefined || state == currentConfiguration.brightness)
        return;
    
    currentConfiguration.brightness = state;
    // setClassOnElement(document.documentElement, 'weball-brightness', state);
}

const epilessia = (state) => {
    if (state == undefined || state == currentConfiguration.sepia)
        return;
    
    currentConfiguration.sepia = state;
    // setClassOnElement(document.documentElement, 'weball-sepia', state);
}

const caratteriDislessia = (state) => {
    if (state == undefined || state == currentConfiguration.font)
        return;
    
    currentConfiguration.font = state;	
    traverse(document.documentElement, (parent, child) => {
        const operation = (!state)
                                ? removeClassFromElement
                                : addClassToElement;
        
        operation(child, 'weball-dyslexia');
    });
}

const charspace = (state) => {
    if (state == undefined || state == currentConfiguration.charspace)
        return;
    
    traverse(document.documentElement, (parent, child) => {
        if (currentConfiguration.charspace) {
            const oldClass = `weball-letter-spacing-${currentConfiguration.charspace}`.replace('.', '');
            removeClassFromElement(child, oldClass);
        }
        
        if (state) {
            const newClass = `weball-letter-spacing-${state}`.replace('.', '');
            addClassToElement(child, newClass);
        }
    });

    currentConfiguration.charspace = state;	
}

const wordspace = (state) => {
    if (state == undefined || state == currentConfiguration.wordspace)
        return;
    
    traverse(document.documentElement, (parent, child) => {
        if (currentConfiguration.wordspace) {
            const oldClass = `weball-word-spacing-${currentConfiguration.wordspace}`.replace('.', '');
            removeClassFromElement(child, oldClass);
        }
        
        if (state) {
            const newClass = `weball-word-spacing-${state}`.replace('.', '');
            addClassToElement(child, newClass);
        }
    });

    currentConfiguration.wordspace = state;	
}

const cursoreGrande = (state) => {
    if (state == undefined || state == currentConfiguration.zoomPointer)
        return;
    
    currentConfiguration.zoomPointer = state;
    traverse(document.documentElement, (parent, child) => {
        const operation = (!state)
                                ? removeClassFromElement
                                : addClassToElement;
        
        operation(child, 'weball-zoom-pointer');
    });
}

const evidenziaLink = (state) => {
    if (state == undefined || state == currentConfiguration.highlightLinks)
        return;

    currentConfiguration.highlightLinks = state;
    traverse(document.documentElement, (parent, child) => {
        const operation = (!state)
                                ? removeClassFromElement
                                : addClassToElement;
        
        if (child.nodeName.toLowerCase() === 'a') {
            operation(child, 'weball-highlight');
        }
    });
}

const mutaAudio = (state) => {
    if (state == undefined || state == currentConfiguration.muteSounds)
        return;
    
    currentConfiguration.muteSounds = state;
    document.querySelectorAll('video, audio').forEach((elem) => {
        elem.muted = state;
    });
}

const zoom = (state) => {
    if (state == undefined || state == currentConfiguration.zoom)
        return;

    currentConfiguration.zoom = state;
    document.body.style.transformOrigin = '0 0';
    document.body.style.transform = `scale(${state})`;
    // console.log(document.body.style.transform);
        // setClassOnElement(document.body, 'weball-zoom', state);
}

const setWeballWidget = (state) => {
    if (state == undefined || state == currentConfiguration.widget)
        return;

    currentConfiguration.widget = state;
    setClass('weball-content-iframe', 'weball-invisible', !state);
    setClass('weball-button', 'weball-invisible', state);
}

const processSignal = (signal) => {
    setWeballWidget(signal.widget);
    invertiColori(signal.inverted);
    scalaDiGrigi(signal.grayScale);
    contrasto(signal.contrast);
    saturazione(signal.saturation);
    luminosita(signal.brightness);
    epilessia(signal.sepia);
    evidenziaLink(signal.highlightLinks);
    caratteriDislessia(signal.font);
    zoom(signal.zoom);
    charspace(signal.charspace);
    wordspace(signal.wordspace);
    mutaAudio(signal.muteSounds);

    const effectMap = {
        inverted: 'invert(100%)',
        grayScale: 'grayscale()',
        contrast: 'contrast(200%)',
        saturation: 'saturate(200%)',
        brightness: 'brightness(200%)',
        sepia: 'sepia(50%)'
    };

    let globalEffects = '';

    for (const key of Object.keys(effectMap)) {
        if (currentConfiguration[key] == true) {
            globalEffects += effectMap[key] + ' ';
        }
    }

    // globalEffects += ' !important';
    document.documentElement.style.filter = globalEffects;
}

window.addEventListener('message', (e) => {
    signal = e.data;
    
    if (signal.weball)
        processSignal(signal.weball);
});
