CUR_DIR := $(shell pwd)
LOCAL_VOLUME_DB := $(CUR_DIR)/database

all: up

db:
	@mkdir -p $(LOCAL_VOLUME_DB)

up:
	@docker-compose -f ./docker-compose.yml up

down:
	@docker-compose -f ./docker-compose.yml down

re: clean
	make

clean:
	@docker-compose -f ./docker-compose.yml down -v --rmi all

fclean: clean
		rm -rf $(LOCAL_VOLUME_DB)

.PHONY: all re down clean
