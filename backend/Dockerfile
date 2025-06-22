FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    unzip git curl libonig-dev libzip-dev libxml2-dev nginx \
    && docker-php-ext-install pdo_mysql intl zip

WORKDIR /var/www/html

COPY . .

RUN curl -sS https://getcomposer.org/installer | php && \
    php composer.phar install --no-dev --optimize-autoloader

COPY docker/default.conf /etc/nginx/conf.d/default.conf

CMD ["sh", "-c", "php-fpm -F & nginx -g 'daemon off;'"]
