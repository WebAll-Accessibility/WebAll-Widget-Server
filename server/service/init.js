const laodScript = (scriptName) => {
    let s = document.createElement('script');
    s.src = `http://155.94.252.86:8081/js/${scriptName}`;
    s.async = true;
    s.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(s);
}

const loadStyles = (stylesheet) => {
    let l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = `http://155.94.252.86:8081/css/${stylesheet}`;
    document.getElementsByTagName('head')[0].appendChild(l);
}

const loadHTML = (documentName) => {
    fetch(`http://155.94.252.86:8081/html/${documentName}`, {method: 'GET'})
        .then((response) => response.text())
        .then((text) => document.getElementsByTagName('body')[0].innerHTML += text)
        .catch((err) => console.warn(err));
}

laodScript('weball-features.js');
loadStyles('weball-widget-styles.css')
loadHTML('weball-widget.html');
