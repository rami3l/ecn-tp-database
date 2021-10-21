default:
	@echo "Usage : make {sql_up|sql_down|sql_pause|sql_resume|sql_set}"

sql_up:
	cd env_sql \
		&& docker-compose down \
		&& docker-compose up -d

sql_down:
	cd env_sql \
		&& docker-compose down

sql_pause:
	cd env_sql \
		&& docker-compose stop

sql_resume:
	cd env_sql \
		&& docker-compose start

sql_set:
	cd env_sql/config \
		&& sudo chown 5050:5050 pgpass.conf \
		&& sudo chmod 0600 pgpass.conf

client_up:
	cd webapp/client \
		&& ng s

client_open:
	cd webapp/client \
		&& ng s -o

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