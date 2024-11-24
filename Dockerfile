FROM php:8.1-fpm
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install pdo_mysql zip
WORKDIR /var/www/html
