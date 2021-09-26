# ecn-tp-database
Pour exécuter le projet vous devez avoir docker et make sur votre machine.

## Environnement SQL
L'environnement sql est composé d'un serveur postgresql, ainsi que pgadmin pour gérer la base de donnée.  
- Si vous avez des problèmes de droits sur le fichier pgpass.conf contenant les infos de connexions de pgadmin à la bdd (probable sous Linux), avant de lancer le conteneur exécutez: `make sql_set`
- Pour lancer le conteneur: `make sql_up` .
- Pour le mettre en pause: `make sql_pause` et `make resume`
- Pour l'arrêter totalement (suppression du conteneur): `make sql_down`
