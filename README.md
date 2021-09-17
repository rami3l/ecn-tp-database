# ecn-tp-database

## Environnement SQL
La base de donnée est une bdd postgresql.
Pour la mettre en route il suffit de lancer la commande `make up` dans le dossier env_sql. Vous pouvez aussi la mettre en pause avec `make up` et `make resume`, ou l'arrêter totalement (suppression du conteneur) avec `make down`.
Le conteneur embarque une instance de postgresql ainsi qu'une instance de pgadmin

### Configuration pgadmin
Le fichier env_sql/config/pgadmin4.db est mappé avec le fichier /var/lib/pgadmin/pgadmin4.db; la commande `make up` entraine le changement des droits sur ce fichier (afin de donner les droits d'accès au conteneur); il peut donc être nécessaire de rentrer son mot de passe pour valider l'opération (droits root nécessaires pour changer les permissions du fichier).
Si le fichier a déjà les bons droits vous pouvez lancer la commande `make up_` pour sauter l'étape de changement de droits (et ne pas avoir à entrer son mot de passe)