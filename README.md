# ecn-tp-database

## configuration pgadmin
Le fichier env_sql/config/pgadmin4.db est mappé avec le fichier /var/lib/pgadmin/pgadmin4.db; celui-ci contient les infos de connexion au serveur postgresql intégré au docker-compose.
L'utilisateur du conteneur pgadmin étant l'utilisateur pgadmin il est possible qu'il n'ait pas par défaut les droits d'accès à ce fichier mappé, ce qui empêche le conteneur de démarrer. Pour résoudre ce problème il faut donner les droits d'accès avec la commande `sudo chown -R 5050:5050 env_sql/config/pgadmin4.db`