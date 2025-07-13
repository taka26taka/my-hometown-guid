FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    unzip git curl libonig-dev libzip-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql intl zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ルートにあるbackendの中身を /var/www/html にコピー
COPY . .

# 依存パッケージのインストール（本番向け）
RUN composer install --no-dev --optimize-autoloader

# RenderはPORT環境変数を自動注入する → sh -c 経由で展開
CMD ["sh", "-c", "php -S 0.0.0.0:$PORT -t webroot index.php"]
