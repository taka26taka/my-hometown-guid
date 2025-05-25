<?php
declare(strict_types=1);

use Migrations\BaseMigration;

class AddShopsArea extends BaseMigration
{
    /**
     * Change Method.
     *
     * More information on this method is available here:
     * https://book.cakephp.org/migrations/4/en/migrations.html#the-change-method
     * @return void
     */
    public function change(): void
    {
        $table = $this->table('shops');
        $table
            ->addColumn('area', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => true,
            ])
            ->addColumn('comment', 'text', [
                'default' => null,
                'null' => true,
            ])
            ->addColumn('map_embed_url', 'text', [
                'default' => null,
                'null' => true,
            ])
            ->update();
    }
}
