FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    unzip git curl libonig-dev libzip-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql intl zip

WORKDIR /var/www/html

COPY . .

# Composer install
RUN curl -sS https://getcomposer.org/installer | php && \
    php composer.phar install --no-dev --optimize-autoloader

# nginx
COPY docker/default.conf /etc/nginx/conf.d/default.conf

CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]
