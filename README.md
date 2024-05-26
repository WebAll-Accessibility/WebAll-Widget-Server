<div align="center" style="margin-top: 30px;">
    <img src=".github/WA-Logo.png", width="150">
</div>

<p align="center">
    <h1 align="center">WebAll Widget Server</h1>
    <p align="center" style="display: flex;">
        <img src="https://img.shields.io/github/contributors/WebAll-Accessibility/WebAll-Widget-Server.svg?style=flat-square">
        <img src="https://img.shields.io/github/forks/WebAll-Accessibility/WebAll-Widget-Server.svg?style=flat-square">
        <img src="https://img.shields.io/github/stars/WebAll-Accessibility/WebAll-Widget-Server.svg?style=flat-square">
        <img src="https://img.shields.io/github/issues/WebAll-Accessibility/WebAll-Widget-Server.svg?style=flat-square">
        <img src="https://img.shields.io/github/license/WebAll-Accessibility/WebAll-Widget-Server.svg?style=flat-square">    </p>
</p>

<h2>Cos'è?</h2>
WebAll Widget Server è un'implementazione di WebAll realizzata con NodeJS.

<h2>Come avviarlo</h2>
Nella riga di comando del server dedicato al database:
```
sh setup.sh <utente db>
```

Sul server web, creare un file `.env` nella directory `src/` con il seguente contenuto:
```
DB_NAME=weball
DB_HOST=<indirizzo IP db>
DB_PORT=<porta TCP db>
DB_USER=<utente db>
DB_PASSWORD=<password db>
WA_SERVER_ADDRESS=http://<indirizzo server>
```

Per esempio, un file `.env` valido per l'uso in `localhost` potrebbe essere:
```
DB_NAME=weball
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
WA_SERVER_ADDRESS=http://127.0.0.1
```

Nella riga di comando del server web, infine:
```
sh run.sh
```

<h2>Crediti</h2>
Questo software è stato progettato e sviluppato da <a href="https://github.com/Alessandro-Salerno">Alessandro Salerno</a>.
