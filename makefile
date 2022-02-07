default:
	@echo "Usage : make {sql_up|sql_down|sql_pause|sql_resume|sql_set}"

sql_up:
	cd env_sql \
		&& docker-compose down \
		&& docker-compose up -d \
		&& docker exec -it -u root ecn-tp-database-pgadmin cp /tmp/pgpass.conf /pgadmin4 \
		&& docker exec -it -u root ecn-tp-database-pgadmin chown pgadmin:pgadmin /pgadmin4/pgpass.conf \
		&& docker exec -it -u root ecn-tp-database-pgadmin chmod 600 /pgadmin4/pgpass.conf

sql_down:
	cd env_sql \
		&& docker-compose down

sql_pause:
	cd env_sql \
		&& docker-compose stop

sql_resume:
	cd env_sql \
		&& docker-compose start

client_set:
	cd webapp/client \
		&& npm install -y

client_up:
	cd webapp/client \
		&& ng s -o

client_up_background:
	cd webapp/client \
		&& ng s

server_up:
	cd webapp/server \
		&& ./gradlew bootRun

mongo_up:
	cd env_mongo \
		&& docker-compose down \
		&& docker-compose up -d

mongo_down:
	cd env_mongo \
		&& docker-compose down

mongo_pause:
	cd env_mongo \
		&& docker-compose stop

mongo_resume:
	cd env_mongo \
		&& docker-compose start

resume: sql_resume mongo_resume client_up

backend_up: sql_up mongo_up server_up
backend_resume: sql_resume mongo_resume server_up