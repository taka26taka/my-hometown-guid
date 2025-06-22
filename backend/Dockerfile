FROM php:8.1-cli

RUN apt-get update && apt-get install -y \
    unzip git curl libonig-dev libzip-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql intl zip

WORKDIR /var/www/html

COPY . .

CMD ["sh", "-c", "php -S 0.0.0.0:$PORT -t webroot webroot/index.php"]
