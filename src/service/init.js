const laodScript = (scriptName) => {
    let s = document.createElement('script');
    s.src = `__WA_SERVER_ADDRESS/service/js/${scriptName}`;
    s.async = true;
    s.type = 'text/javascript';
    document.getElementsByTagName('head')[0]
                .appendChild(s);
    return s;
}

const loadStyles = (stylesheet) => {
    let l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = `__WA_SERVER_ADDRESS/service/css/${stylesheet}`;
    document.getElementsByTagName('head')[0]
                .appendChild(l);
    return l;
}

const loadHTML = (documentName, id) => {
    let f = document.createElement('iframe');
    f.id = id;
    f.classList.add('weball-invisible');
    f.src = `__WA_SERVER_ADDRESS/service/html/${documentName}`

    document.documentElement.appendChild(f);
    return f;
}

const base = loadStyles('weball-base-styles.css');
base.onload = () => {
    const feature = loadStyles('weball-features-styles.css');
    feature.onload = () => {
        const hook = laodScript('weball-hook.js');
        hook.onload = () => {
            const widget = loadHTML('weball-widget.html', 'weball-content-iframe');
            widget.onload = () => {
                let wb = document.createElement('input');
                wb.type = 'button';
                wb.value = 'WebAll';
                wb.id = 'weball-button';
                wb.onclick = () => {
                    postMessage({ weball: { widget: true }})
                };

                document.documentElement.appendChild(wb);
            }
        }
    }
}
