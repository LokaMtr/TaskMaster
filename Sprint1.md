1 Inleiding

Dit project gaat over het maken van een Todo webapplicatie. Want studenten hebben soms
moeite met het makkelijk en snel beheren van hun taken, wat kan leiden tot uitstelgedrag,
vertraging en een gevoel kan geven dat het allemaal iets te veel wordt. Het doel van deze
webapplicatie is om mensen te kunnen helpen met deze problemen en om een dienst te
bieden die makkelijk te gebruiken is en het leven een stukje makkelijker maakt.
Er zijn al wel veel Todo apps beschikbaar maar ze wat ze bieden voldoet niet volledig aan de
behoeftes van de gebruiker, maar deze webapplicatie wordt ontwikkeld met het idee om de
wensen en behoeften van de gebruiker te voldoen.
De ontwikkeling van deze app zal zich richten op een ontwerp waar de gebruiker
overzichtelijk en gemakkelijk zijn taken op prioriteit kan organiseren.
De tegenvallers bij het gebruiken van een Todo app zoals het gebrek aan overzicht, moeilijk
prioriteiten stellen, en het vergeten van taken kunnen voorkomen. Dit alles wordt aangepakt
bij het ontwikkelen van deze webapplicatie.
Om dit project succesvol te maken wordt er gebruik gemaakt van Back-end en Front-end
programming. Want het doel is om een app met kwaliteit te ontwikkelen die voldoet aan de
wensen van de gebruiker en een goeie gebruikservaring biedt.
In dit plan van aanpak wordt verteld over hoe het project gaat worden aangepakt en welke
stappen er precies genomen gaan worden om de app te ontwikkelen. Ook over welke
middelen gebruikt worden en hoe de voortgang wordt gemaakt.
Kortom dit project gaat over een Todo webapplicatie ontwikkelen die het makkelijker maakt
voor gebruikers om taken te plannen en op prioriteit organiseren, wat het gebruik van Todo
apps verbeterd en makkelijker maakt.

2 Overzicht van het systeem

Het eindresultaat wordt een toegankelijke webapplicatie waar je kunt registreren en
inloggen. De gegevens per gebruiker worden opgeslagen. Als er is
ingelogd kom je op de pagina waar je bovenaan de datum ziet en kunt switchen tussen
de dagen. Als je een dag hebt gekozen kan je in een tekst vak een taak intikken, de
prioriteit selecteren en vervolgens met een druk op de knop wordt de taak in het tabel
Todo gezet. In de pagina zie je 3 tabellen, Todo, Doing en Done. Je kunt je taak slepen
van tabel naar tabel als de status van de taak is veranderd. Een taak kun je ook
verwijderen of de beschrijving en de prioriteit aanpassen. Rechtsonder in het scherm is
er een knop waar de gebruiker het thema van de site kan aanpassen tussen een light en
darktheme zodat het past bij de preferentie van de gebruiker.


3 Use cases
Het use case diagram kan je bij src/modellen/UseCaseDiagram zien. Hieonder bij elke use case een beschrijving

Registreren:
Als je de webapplicatie start zie je in
Het midden van je scherm een vierkant
met aan de bovenkant een stuk tekst met
“Login”, daaronder zie je 2 labels onder elkaar
Username en Password. Naast de 2 labels zie je 2
Tekstvakken waar je de gegevens kunt intikken.
Onder de 2 balken zie je 2 buttons, Login en Register.
Heb je nog geen account, druk je op register wat je de optie
geeft om een nieuw account aan te maken.

Inloggen:
Als je bent geregistreerd dan kan je in de 2 tekstvakken je
je Username en Password in vullen om vervolgens op de knop
Login te drukken want je brengt naar het volgende scherm.

Switchen van dag:
Als je eenmaal bent ingelogd kom je op de pagina waar je boven aan een balk ziet met
de huidige datum. En zie je ook 2 buttons, eentje aan de linker kant en eentje aan de
rechter kant van de balk (<-, ->). Je kunt via die 2 knoppen veranderen van dag.

Taak toevoegen:
Als je de dag hebt gekozen waar je je taken wilt inplannen. Zie je onder de balk met de
datum een tekst vak waar je de taakbeschrijving in kunt typen. Rechts van het tekst vak
staat er een “voeg toe” knop. Als je daarop drukt wordt de tekst in het tekst vak
verwijderd en verschijnt de taak in de eerste tabel “Todo”.

Taakbeschrijving aanpassen:
Als je het toch niet eens bent met de beschrijving van je taak zie je rechts van je taak. 3
puntjes waar je op kunt klikken. Als je erop hebt gedrukt krijg je 3 opties, 1 daarvan is de
taakbeschrijving aanpassen. Als je vervolgens drukt op “Taakbeschrijving aanpassen” kan
je de tekst van de taak veranderen en vervolgens weer bevestigen met een knop.

Taak verwijderen:
Naast de 3 puntjes staat ook een “x” icoontje waar je op kunt klikken om de taak uit de
lijst te verwijderen. Als je erop klikt komt er een stukje tekst met “’weetje zeker dat je
deze taak wilt verwijderen”, dan krijg je de optie ja of nee. En aan de hand van de keuze
die je dan maakt wordt de taak verwijderd of niet.

Prioriteit geven aan een taak:
Als je weer op de 3 puntjes klikt naast de taak zie je ook de optie om de taak een
prioriteit te geven, je kan dan kiezen tussen “High” of “low”. Als je High hebt gekozen
dan verschijnt er een rood dun balkje onder je taak, kies je low dan een blauw dun balkje
onder je taak. Je kan er ook voor kiezen om helemaal geen prioriteiten te geven aan je
taken en dan zijn er ook geen balkjes.

Taak verplaatsen van Toto naar Doing en vervolgens Done:
Als je bezig bent met een taak kan je weer op de 3 puntjes klikken naast de taak en kan
je drukken op “Change status” vervolgens druk je op Doing en dan word je taak
verplaatst van de tabel Todo naar Doing. En als je klaar bent met je taak kan je precies
hetzelfde doen alleen kies je dan voor Done en dan wordt je taak verplaatst naar de
tabel Done.

Kleurenthema aanpassen:
Rechtsonder op de pagina krijg je de optie om het thema van Lightmode naar Darkmode
aan te passen. Dat kan of door 2 verschillende buttons of door een toggle box.


3.1 Actoren
Bij een actor hoort ook een beschrijving, de actor description. In een actor description wordt
naast de rolnaam een beschrijving van de rol ingevuld en daarmee een role description
geschreven.
Alle actoren die zijn weergegeven in je use case diagram moeten hier terug te vinden zijn op
alfabetische volgorde.
Actor: Beschrijving:

3.2 Use case beschrijvingen en wireframes
Maak hier use case beschrijvingen. Maak per use case een paragraaf met use case
beschrijving aan de hand van de template, zoals je hebt geleerd bij Modelling.
Maak voor sprint 1 voor elke use case voorlopig alleen een use case samenvatting.
Voor de sprints 2, 3 en 4 houd je je aan de template die je hebt gebruikt en geleerd bij
Modelling.
Als je een use case beschrijving maakt, vergeet niet bij de stappen met een wireframe ernaar
te refereren door het figuurnummer erbij / erachter te zetten.
5
Onder elke use case beschrijving moeten de wireframes komen te staan van die specifieke
use case. De wireframes moeten uiteraard gemaakt worden in een officiele tool. Als je dus
een wireframe op papier uittekent en vervolgens fotografeert, wordt dat niet toegestaan en
levert geen punten op. Je mag ook niet een screenshot van de applicatie gebruiken als
“wireframe”. Dat levert ook geen punten op.
Geef elke wireframe een figuurnummer, figuurtitel en een toelichting. In die toelichting geef
je een omschrijving maar je moet ook de verwijzing maken naar de stap in de bovenstaande
use case beschrijving waar het bij hoort.
Voor sprint 1 zijn wireframes nog niet verplicht.


4 Modellen
4.1 Domeinmodel
Hier komt het domeinmodel van de applicatie. Deze wordt iedere keer geupdatet bij elke
nieuwe sprint. Beschrijf bij elke nieuwe sprint wat er veranderd is en wat je motivaties /
redenen ervan waren. Voor sprint 1, 2 en 3 hoef je alleen een conceptueel domeinmodel op
te leveren iedere keer, maar bij sprint 4 moet je een technisch domeinmodel opleveren.
Tip: Maak je domeinmodel aan de hand van de use case samenvattingen die je eerder hebt
gemaakt en pas daar de zelfstandignaamwoordenmethode op toe.
Leg het domeinmodel ook uit!
Zorg ervoor dat je domeinmodel volledig en technisch is bij de uiteindelijke oplevering van
sprint 4.
Hierbij geldt dus extra:
- Neem alle attributen op met bijbehorende types
- Neem alle operaties / methodes op met bijbehorende types
Tip: Neem de get- en setmethoden niet mee, maar vermeld wel expliciet de
volgende tekst onder het domeinmodel:
De get- en setmethodes voor de attributen zijn met opzet niet vermeld, omdat de
klassen anders te groot worden in UML.
- Neem bij elke associatie de multipliciteiten en de rolnamen op.
- Maak gebruik van de juiste notatie. Zie de cursus OOAD.
4.2 Business rules
Daarnaast kent een domeinmodel eventueel extra regels op het domein (business rules) die
je niet goed in UML kan vertalen. Deze regels neem je hier puntsgewijs op. Geef bij elke
business rule ook aan wat voor type business rule het betreft, zoals je hebt geleerd bij OOAD.
4.3 Datamodellen
Let op: Dit hoofdstuk is optioneel en is alleen verplicht, als je gebruik maakt van een
database. Als je geen gebruik maakt van een database, dien je dit hoofdstuk te verwijderen.
Maak voor je database een conceptueel en fysiek datamodel, zoals je hebt geleerd bij
Modelling
Neem het diagram op met daarbij een korte beschrijving van alle entiteiten. Zie bij de cursus
Modelling hoe je dit model maakt.
Entiteit Beschrijving
6


5 Technologieën
Voor het realiseren van de applicatie wordt gebruik van de volgende methodieken en
technieken: UML, Java, SQL, HTML, CSS, J2EE (Servlets), Rest (Jax-RS), Applicatieserver
& HTTP-protocol en een eventuele datastore. Dat zijn technieken die je bij MOD, OOAD,
FEP1, BEP1 en OOP hebt geleerd. Beschrijf ook welke frameworks je gebruikt. Hiervan neem
je ook de versie en het licentiemodel op.
Gebruik van andere technologieen die niet zijn gegeven bij MOD, OOAD, FEP1, BEP1 en OOP,
zijn niet toegestaan.


6 Overdracht
Hier wordt een installatiehandleiding en een summiere gebruikershandleiding beschreven.
Ook eventuele gebruikersnamen en wachtwoorden moet bekend worden om de werking van
het programma aan te tonen.


7 Referenties
Geef hier de bronnenlijst. Gebruik de APA-stijl om de bronnen te vermelden.
Als er geen referenties zijn, vermeld dan dat er geen referenties zijn.
Deze moeten wel al bij sprint 1 en worden ook steeds geupdatet bij elke nieuwe sprint.
