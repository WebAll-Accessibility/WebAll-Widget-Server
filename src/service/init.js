const laodScript = (scriptName) => {
    let s = document.createElement('script');
    s.src = `__WA_SERVER_ADDRESS/service/js/${scriptName}`;
    s.async = true;
    s.type = 'text/javascript';
    document.getElementsByTagName('head')[0]
                .appendChild(s);
}

const loadStyles = (stylesheet) => {
    let l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = `__WA_SERVER_ADDRESS/service/css/${stylesheet}`;
    document.getElementsByTagName('head')[0]
                .appendChild(l);
}

const loadHTML = (documentName, id) => {
    let f = document.createElement('iframe');
    f.id = id;
    f.classList.add('weball-invisible');
    f.src = `__WA_SERVER_ADDRESS/service/html/${documentName}`

    document.documentElement.appendChild(f);
    return f;
}

loadStyles('weball-base-styles.css');
loadStyles('weball-features-styles.css');
laodScript('weball-hook.js');
loadHTML('weball-widget.html', 'weball-content-iframe');

let wb = document.createElement('input');
wb.type = 'button';
wb.value = 'WebAll Accessibility';
wb.id = 'weball-button';
const ds = wb.style.display;
wb.style.display = 'none';
wb.onclick = () => {
    postMessage({ weball: { widget: true }})
};
wb.onload = () => {
    // wb.style.display = ds;
}
document.documentElement.appendChild(wb);
