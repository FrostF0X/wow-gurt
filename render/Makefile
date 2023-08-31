exec:
	docker-compose exec render /bin/sh
dev: build
	docker-compose up -d
dev-logs:
	docker-compose logs --tail 1000 -f render
prod-start: build
	docker run --name render --init --cap-add=SYS_ADMIN --rm -p 80:80 -v /tmp:/tmp render prod-mainnet
prod-migrate: build
	docker run --name render --init --rm render migrate-production
prod-stop:
	docker kill render
dev-migrate-make:
	docker-compose exec -T render npm run migrate-make new
dev-migrate:
	docker-compose exec -T render npm run migrate-development
dev-migrate-prev:
	docker-compose exec -T render npm run migrate-rollback-development
build:
	docker build -f .docker/Dockerfile -t render .
