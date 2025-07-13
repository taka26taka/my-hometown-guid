<?php

return [
    'debug' => false,

    'Security' => [
        'salt' => env('SECURITY_SALT'),
    ],

    'Datasources' => [
        'default' => [
            'className' => Cake\Database\Connection::class,
            'driver' => Cake\Database\Driver\Postgres::class,
            'host' => env('DATABASE_HOST', 'localhost'),
            'username' => env('DATABASE_USER', 'postgres'),
            'password' => env('DATABASE_PASSWORD', ''),
            'database' => env('DATABASE_NAME', 'myapp'),
            'port' => env('DATABASE_PORT', 5432),
            'schema' => 'public',
            'encoding' => 'utf8',
            'persistent' => false,
            'timezone' => 'UTC',
            'flags' => [],
            'cacheMetadata' => true,
            'log' => false,
        ],
    ],

    'EmailTransport' => [
        'default' => [
            'host' => 'localhost',
            'port' => 25,
            'username' => null,
            'password' => null,
            'client' => null,
            'url' => env('EMAIL_TRANSPORT_DEFAULT_URL', null),
        ],
    ],
];
