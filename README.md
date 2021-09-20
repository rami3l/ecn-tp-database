# ecn-tp-database

## Environnement SQL
Le conteneur embarque une instance de postgresql ainsi qu'une instance de pgadmin. 
- Si vous avez des problèmes de droits sur le fichier pgpass.conf contenant les infos de connexions de pgadmin à la bdd (probable sous Linux), avant de lancer le conteneur exécutez: `make sql_set`
- Pour lancer le conteneur: `make sql_up` .
- Pour le mettre en pause: `make sql_pause` et `make resume`
- Pour l'arrêter totalement (suppression du conteneur): `make sql_down`

