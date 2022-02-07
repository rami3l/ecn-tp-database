# ecn-tp-database

Ce projet a été réalisé dans le cadre d'un tp de l'option info à Centrale Nantes (par groupe de 2). Voici [le sujet de ce TP (Sujet-tp.pdf)](Sujet-tp.pdf).

Pour exécuter le projet vous devez avoir `docker-compose` (donc `docker`), `make`, `gradle` et `angular-cli` (donc `NodeJS` et `npm`) sur votre machine.

## Ensemble du projet

- Avant de mettre en route le client: `make client_set` (pour installer les dépendances)
- Pour mettre en route le client: `make client_up`
- Pour mettre en route le backend: `make backend_up`
- Pour mettre en route le backend sans écraser les données en base: `make backend_resume`

Pour mettre en route seulement certains composants, réferrez-vous à la suite du Readme.

## Environnement SQL

L'environnement sql est composé d'un serveur postgresql, ainsi que pgadmin pour gérer la base de donnée.

- Pour lancer le conteneur (initialise la base de donnée): `make sql_up` .
- Pour le mettre en pause et le remettre en route (sans réinitialiser la base de donnée): `make sql_pause` et `make sql_resume`
- Pour l'arrêter totalement (suppression du conteneur): `make sql_down`

Pour accéder à pgadmin:  
url: http://localhost:15432  
identifiant: `admin@pgadmin.com`  
mot de passe: `password`
Pour la base de donnée (au cas où pgpass.conf ne fonctionne pas): `password`

## Environnement MongoDB

- Pour lancer le conteneur: `make mongo_up` .
- Pour le mettre en pause: `make mongo_pause` et `make mongo_resume`
- Pour l'arrêter totalement (suppression du conteneur): `make mongo_down`

Pour accéder à mongo-express:  
url: http://localhost:8081

## WebApp

- Pour lancer le backend en Java: `make server_up`
- Pour lancer le client en Angular: `make client_up` (ou `make client_up_background`)

Pour accéder au client:  
url: http://localhost:4200
