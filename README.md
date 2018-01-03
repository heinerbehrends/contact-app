# contact-app
A simple ajax email contacts app developed with jquery, bootstrap4 and mysql/php for Gorilla Code Groningen

Werkproces omschrijving

Ik had al ervaring met bootstrap4 en jquery, zie ook mijn Bootstrap-Audio-Playlist repository. 
Om de ontwikkeling soepeler te laten verlopen heb ik de app dus hierop gebaseerd.
Om nog iets nieuws te leren heb ik de volgende technologien gebruikt, waarmee ik nog niet eerder had gewerkt:
- AJAX request om de UI te verversen zonder de pagina opnieuw te laden
- php/mySQL backend om de data permanent op te slagen
- zoekfunctie die de contacten in realtime filtert

De vormgeving is bedoelt voor kleine schermen zoals mobiele telefoons vanaf 320 dip.

styledphp.php is de ingang van de app.
Voor de database functionaliteit verwacht de code een db 'address_book' 
met daarin een table 'contacts' met 4 columns: id, first_name, last_name en email. 
Getest met WAMP64, PHP 5.6.25 en mySQL 5.7.14

- sessie 1:
database aan de praat krijgen,
php met js aan de praat krijgen
- sessie 2: 
basic layout, delete functie, animatie
- sessie 3: 
nieuwe layout aan database koppelen, 
modal dialoog voor delete functie,
- sessie 4:
input validation, styling, fix auto update
- sessie 5:
search filter en ui update, modal styling
- sessie 6: 
confirm delete in cards
scroll to and open new entry, modal dialoog verwijderen

Het proces is niet echt snel maar toch zonder grote struikelblokken verlopen, mede dankzij mijn ervaring met de Playlist-App en de goede documentatie van jQuery. Ik heb nog oefening nodig om de code mooier te maken, gestructureerder te programmeren. Ik kwam aan de grenzen van overzichtelijkheid en mede daarom heb ik besloten om voor de tweede opdracht een nieuwe structuur te leren en react/redux te leren. 
