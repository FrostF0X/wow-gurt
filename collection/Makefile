boredapes: opensea-images-downloader
	export COLLECTION_NAME=boredapeyachtclub && \
	cd opensea-images-downloader && \
	docker-compose run --build -e OPENSEA_API_KEY=9da430327c714dca924efe8e973068f5 -e COLLECTION_NAME=boredapeyachtclub opensea_downloader

opensea-images-downloader:
	git clone https://github.com/makevoid/opensea-images-downloader.git

https://api.opensea.io/api/v1/assets?order_direction=desc&limit=50&collection=boredapeyachtclub&offset=50
