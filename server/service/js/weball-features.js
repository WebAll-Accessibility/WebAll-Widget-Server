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
const invertiColori = () => {
    toggleClass('inverti-colori', 'selected');
    toggleClassOnElement(parent.document.documentElement, 'weball-inverted');
}

const scalaDiGrigi = () => {
    toggleClass('scala-di-grigi', 'selected');
    toggleClassOnElement(parent.document.documentElement, 'weball-grey-scale');
}

const contrasto = () => {
    toggleClass('contrasto', 'selected');
    toggleClassOnElement(parent.document.documentElement, 'weball-contrast');
}

const saturazione = () => {
    toggleClass('saturazione', 'selected');
    toggleClassOnElement(parent.document.documentElement, 'weball-saturation');
}

const luminosita = () => {
    toggleClass('luminosita', 'selected');
    toggleClassOnElement(parent.document.documentElement, 'weball-brightness');
}

const epilessia = () => {
    toggleClass('epilessia', 'selected');
    toggleClassOnElement(parent.document.documentElement, 'weball-sepia');
}

const caratteriDislessia = () => {
    traverse(parent.document.documentElement, (parent, child) => {
        const operation = (hasClass('caratteri-dislessia', 'selected'))
                                ? removeClassFromElement
                                : addClassToElement;
        
        operation(child, 'weball-dyslexia');
    });

    toggleClass('caratteri-dislessia', 'selected');
}

const cursoreGrande = () => {
    traverse(parent.document.documentElement, (parent, child) => {
        const operation = (hasClass('cursore-grande', 'selected'))
                                ? removeClassFromElement
                                : addClassToElement;
        
        operation(child, 'weball-zoom-pointer');
    });

    toggleClass('cursore-grande', 'selected');
}

const evidenziaLink = () => {
    traverse(parent.document.documentElement, (parent, child) => {
        const operation = (hasClass('evidenzia-link', 'selected'))
                                ? removeClassFromElement
                                : addClassToElement;
        
        if (child.nodeName.toLowerCase() === 'a') {
            operation(child, 'weball-highlight');
        }
    });

    toggleClass('evidenzia-link', 'selected');
}

const mutaAudio = () => {
    toggleClass('silenzia-suoni', 'selected');
    
    parent.document.querySelectorAll('video, audio').forEach((elem) => {
        elem.muted = !elem.muted;
    });
}

const zoom = () => {
    toggleClass('zoom', 'selected');
    toggleClassOnElement(parent.document.documentElement, 'weball-zoom');
}

const weball = () => {
    addClass('weball-button', 'invisible');
    addClass('weball-widget', 'flex');
    removeClass('weball-widget', 'invisible');
}

const noWeball = () => {
    addClass('weball-widget', 'invisible');
    removeClass('weball-widget', 'flex');
    removeClass('weball-button', 'invisible');
}