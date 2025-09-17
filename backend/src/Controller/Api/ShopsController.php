<?php
declare(strict_types=1);

namespace App\Controller\Api;

use App\Controller\AppController;
use Cake\View\JsonView;
use Cake\Event\EventInterface;

class ShopsController extends AppController
{
    public function beforeRender(EventInterface $event): void
    {
        parent::beforeRender($event);
        $this->viewBuilder()->setClassName(JsonView::class);
    }

    public function index()
    {
        $shops = $this->Shops->find()->all(); // ← 追加

        $this->response = $this->response
            ->withType('application/json')
            ->withStringBody(json_encode([
                'success' => true,
                'data' => $shops,
            ], JSON_UNESCAPED_UNICODE));

        return $this->response;

    }
}
