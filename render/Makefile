exec: build
	docker run --name render --init --cap-add=SYS_ADMIN --rm -p 8000:80 --entrypoint=/bin/sh -it -v $(shell pwd)/src:/usr/src/app/src render
development: build
	docker-compose up
prod-start: build
	docker run --name render --init --cap-add=SYS_ADMIN --rm -p 80:80 -v /tmp:/tmp render prod-mainnet
prod-stop:
	docker kill render
build:
	docker build -f .docker/Dockerfile -t render .
