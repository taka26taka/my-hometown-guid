FROM php:8.1-cli

RUN apt-get update && apt-get install -y \
    unzip git curl libonig-dev libzip-dev libxml2-dev zip \
    && docker-php-ext-install pdo_mysql intl zip \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader

CMD ["sh", "-c", "php -S 0.0.0.0:$PORT -t webroot webroot/index.php"]
