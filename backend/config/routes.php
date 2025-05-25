<?php
use Cake\Routing\RouteBuilder;
use Cake\Routing\Route\DashedRoute;
use Cake\Routing\Router;

Router::extensions(['json']);

return function (RouteBuilder $routes): void {
    $routes->setRouteClass(DashedRoute::class);

    $routes->prefix('Api', ['path' => '/api'], function (RouteBuilder $builder): void {
        $builder->setExtensions(['json']);
        $builder->resources('Shops');
        $builder->fallbacks(DashedRoute::class);
    });
};
