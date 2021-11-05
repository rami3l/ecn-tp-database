# ecn-tp-database

Pour exécuter le projet vous devez avoir `docker`, `make`, `gradle` et `angular-cli` (pour `ng`) sur votre machine.

## Ensemble du projet

- Pour mettre en route le client: `make client_up`
- Pour mettre en route le backend: `make backend_up`
- Pour mettre en route le backend sans écraser les données en base: `make backend_resume`

Pour mettre en route seulement certains composants, réferrez-vous à la suite du Readme.

## Environnement SQL

L'environnement sql est composé d'un serveur postgresql, ainsi que pgadmin pour gérer la base de donnée.

- Si vous avez des problèmes de droits sur le fichier pgpass.conf contenant les infos de connexions de pgadmin à la bdd (probable sous Linux), avant de lancer le conteneur exécutez: `make sql_set`
- Pour lancer le conteneur: `make sql_up` .
- Pour le mettre en pause: `make sql_pause` et `make sql_resume`
- Pour l'arrêter totalement (suppression du conteneur): `make sql_down`

## Environnement MongoDB

- Pour lancer le conteneur: `make mongo_up` .
- Pour le mettre en pause: `make mongo_pause` et `make mongo_resume`
- Pour l'arrêter totalement (suppression du conteneur): `make mongo_down`

## WebApp

- Pour lancer le backend en Java: `make server_up`
- Pour lancer le client en Angular: `make client_up` (ou `make client_up_background`)
