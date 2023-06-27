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
        }

        for (const child of node.children) {
            inner(child);
        }
    }

    inner(root);
}

const traverseUp = (root, action) => {
    const inner = (node) => {
        action(null, node);
        
        if (!node.parent)
            return;
        
        action(node.parent, node);
        inner(node.parent, action);
    }

    inner(root);
}

const invertiColori = () => {
    toggleClass('inverti-colori', 'selected');
    toggleClassOnElement(document.documentElement, 'inverted');
}

const scalaDiGrigi = () => {
    toggleClass('scala-di-grigi', 'selected');
    toggleClassOnElement(document.documentElement, 'grey-scale');
}

const contrasto = () => {
    toggleClass('contrasto', 'selected');
    toggleClassOnElement(document.documentElement, 'contrast');
}

const saturazione = () => {
    toggleClass('saturazione', 'selected');
    toggleClassOnElement(document.documentElement, 'saturation');
}

const luminosita = () => {
    toggleClass('luminosita', 'selected');
    toggleClassOnElement(document.documentElement, 'brightness');
}

const epilessia = () => {
    toggleClass('epilessia', 'selected');
    toggleClassOnElement(document.documentElement, 'sepia');
}

const caratteriDislessia = () => {
    traverse(document.documentElement, (parent, child) => {
        const operation = (hasClass('caratteri-dislessia', 'selected'))
                                ? removeClassFromElement
                                : addClassToElement;
        
        operation(child, 'dyslexia');
    });

    toggleClass('caratteri-dislessia', 'selected');
}

const cursoreGrande = () => {
    traverse(document.documentElement, (parent, child) => {
        const operation = (hasClass('cursore-grande', 'selected'))
                                ? removeClassFromElement
                                : addClassToElement;
        
        operation(child, 'zoom-pointer');
    });

    toggleClass('cursore-grande', 'selected');
}

const evidenziaLink = () => {
    traverse(document.documentElement, (parent, child) => {
        const operation = (hasClass('evidenzia-link', 'selected'))
                                ? removeClassFromElement
                                : addClassToElement;
        
        if (child.nodeName.toLowerCase() === 'a') {
            operation(child, 'highlight');
        }
    });

    toggleClass('evidenzia-link', 'selected');
}

const zoom = () => {
    toggleClass('zoom', 'selected');
    toggleClassOnElement(document.documentElement, 'zoom');
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