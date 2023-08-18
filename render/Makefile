exec: build
	docker run --name render --init --cap-add=SYS_ADMIN --rm -p 8000:80 --entrypoint=/bin/sh -it -v $(shell pwd)/src:/usr/src/app/src render
development: build
	docker-compose up -d
development-logs:
	docker-compose logs --tail 1000 -f render
prod-start: build
	docker run --name render --init --cap-add=SYS_ADMIN --rm -p 80:80 -v /tmp:/tmp render prod-mainnet
prod-stop:
	docker kill render
dev-migrate:
	docker-compose exec -T render npm run migrate-development
dev-migrate-prev:
	docker-compose exec -T render npm run migrate-rollback-development
migrate-production:
	npm run migrate-production
build:
	docker build -f .docker/Dockerfile -t render .
