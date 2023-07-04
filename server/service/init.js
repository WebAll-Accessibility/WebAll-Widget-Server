const laodScript = (scriptName) => {
    let s = document.createElement('script');
    s.src = `http://155.94.252.86:8081/js/${scriptName}`;
    s.async = true;
    s.type = 'text/javascript';
    document.getElementsByTagName('head')[0]
                .appendChild(s);
}

const loadStyles = (stylesheet) => {
    let l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = `http://155.94.252.86:8081/css/${stylesheet}`;
    document.getElementsByTagName('head')[0]
                .appendChild(l);
}

const loadHTML = (documentName) => {
    let f = document.createElement('iframe');
    f.id = 'weball-content-iframe';

    fetch(`http://155.94.252.86:8081/html/${documentName}`, {method: 'GET'})
        .then((response) => response.text())
        .then((text) => f.innerHTML = text)
        .catch((err) => console.warn(err));

    document.body.appendChild(f);
}

loadStyles('weball-base-styles.css');
loadStyles('weball-features-styles.css');
loadHTML('weball-widget.html');
//laodScript('weball-features.js');
