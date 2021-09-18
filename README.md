# ecn-tp-database

## Environnement SQL
Le conteneur embarque une instance de postgresql ainsi qu'une instance de pgadmin. 
- Avant le premier lancement: `make sql_set` (afin de donner les permissions nécessaires au fichier contenant les infos de connexions de pgadmin à la bdd)
- Pour lancer le conteneur: `make sql_up` .
- Pour le mettre en pause: `make sql_pause` et `make resume`
- Pour l'arrêter totalement (suppression du conteneur): `make sql_down`.

