
# FMMI - Food Recommender App

Voor de app te editen en te runnen, heb je het volgende nodig:
- WebStorm (download [hier](https://www.jetbrains.com/webstorm/promo/?gclsrc=aw.ds&&gclid=EAIaIQobChMIstTb0bTf5QIVyOR3Ch0pbAHUEAAYASAAEgLtx_D_BwE)).
- Installeer Node.js (nodig voor `npm` uit te voeren).
Ga naar de directory van de recommender app. Voer eerst `npm install` uit om eventueel nieuw toegevoegde packages lokaal te installeren. Voer dan `npm start` uit om de app te starten.

### `npm start`

Runt de app in in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) om de app in de browser te bekijken.

De pagina herlaadt automatisch indien er aanpassingen gemaakt worden.<br />
Lint errors (checker voor syntax, unused variables, etc.) worden ook in de console weergegeven.

## Structuur van een React app
Elke file ziet er uit als volgt:
```
import React from 'react';
import ...

class PageName extends React.Component {

    jsFunctie() {
        ... javaScript code ...
        return value
    }

    render() {
        return (
            <div className="App">
                ... html code ...
                {javaScript return value}
                ... html code ...
            </div>
        );
    }
}

export default PageName;

```
React werkt met `components`. Dit kan oftewel een hele pagina zijn, oftewel een herbruikbaar deel (bv. de header van een website). Een pagina kan dus meerdere components tegelijkertijd renderen.
Zo een component-klasse bevat meerdere javaScript functies. Een standaardfunctie dat elke klasse moet hebben, is de `render` functie waarin de html code staat. Een paar andere nuttige vooraf gedefinieerde functies zijn: `constructor()`, `componentDidMount()`, `componentWillUnmount()`, enz.

Om de return-waarde van een JavaScript functie te gebruiken in html code, gebruikt men accolades (een voorbeeld hiervan staat in  `recommendations.js`).

### Binding
Het probleem bij React is dat handlers (zoals bv. een button `onClick={this.increaseCounter}` niet automatisch binden aan de klasse waarin ze zich bevinden. Zo geeft de `increaseCounter` bijvoorbeeld de fout in `recommender.js` dat `this.state` undefined is. Dit komt doordat de `this` niet gebonden is. Dit wordt opgelost door de volgende lijn toe te voegen in de `constructor`:
```
this.increaseCounter = this.increaseCounter.bind(this);
```

## State
React components kunnen elk een `state` bijhouden, waarin verschillende variabelen bijgehouden worden. Wanneer de state aangepast wordt, wordt de `render` functie telkens opnieuw opgeroepen. De state kan bv. aangemaakt worden in de constructor:
```
constructor() {
    super();
    this.state = {
        variabele1: 0,
        variabele2: false
    };
}
```
Om naar een variabele in de state te verwijzen, gebruikt men simpelweg `this.state.variabele1`. Om een variabele aan te passen, gebruikt men `        this.setState({variabele2: false})`. Het handige aan states is dat ze ook gebruikt kunnen worden om informatie naar andere componenten door te geven (bv. de resultaten van één pagina doorgeven naar de volgende pagina dat geopend wordt).

## De recommender app

### App.js
Dit is de eerste pagina dat geopend wordt wanneer de app opstart. Merk op dat er voor gekozen werd om dit als 'router' pagina te gebruiken dat meteen doorverwijst naar een nieuw aangemaakte pagina,  `home.js`. In `app.js` worden dus enkel de links (verwijzingen) geinstantieerd naar alle andere pagina's onze de web app.

### Home.js
Dit is de homepagina van de webapp, en dus ook de eerste pagina die de gebruiker te zien krijgt.

### Recommender.js
Hierin worden de recommendations weergegeven. Enkele interessante opmerkingen:
 - Hierin staat een voorbeeld van een `JavaScript` functie
