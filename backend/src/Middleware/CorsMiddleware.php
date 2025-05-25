<?php
declare(strict_types=1);

namespace App\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class CorsMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $response = $handler->handle($request);

        if ($request->getMethod() === 'OPTIONS') {
            return (new \Laminas\Diactoros\Response())
                ->withStatus(204)
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->withHeader('Access-Control-Max-Age', '86400');
        }

        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->withHeader('Access-Control-Max-Age', '86400');
    }
}
