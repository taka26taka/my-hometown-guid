FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    unzip git curl libonig-dev libzip-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql intl zip

# Composerのインストール
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY backend/

# Composer install
RUN composer install --no-dev --optimize-autoloader

# Renderは $PORT を自動で割り当てるので、それを使う
CMD ["php", "-S", "0.0.0.0:${PORT}", "-t", "webroot", "index.php"]
