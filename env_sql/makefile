default:
	@echo "Usage : make {up|up_|down|pause|resume}"

up:
	sudo chown 5050:5050 config/pgadmin4.db \
		&& docker-compose down \
		&& docker-compose up -d
up_:
	docker-compose down \
		&& docker-compose up -d

down:
	docker-compose down

pause:
	docker-compose stop

resume:
	docker-compose start