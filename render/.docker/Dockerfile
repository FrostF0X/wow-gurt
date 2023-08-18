FROM zenika/alpine-chrome:latest
USER root

RUN apk add  \
    nodejs  \
    npm  \
    ffmpeg \
    autoconf \
    automake \
    build-base \
    gifsicle \
    --update-cache  \
    --repository http://dl-cdn.alpinelinux.org/alpine/edge/main --allow-untrusted
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm ci
COPY . /usr/src/app
ENTRYPOINT ["npm", "run"]
