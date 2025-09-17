<?php
use Migrations\AbstractMigration;

class AddOpentimeEndtimeToShops extends AbstractMigration
{
    public function change(): void
    {
        $table = $this->table('shops');
        $table
            ->addColumn('open_time', 'string', [
                'null' => true,
                'default' => null,
                'limit' => 10,
                'after' => 'google_map_url',
                'comment' => '開店時間',
            ])
            ->addColumn('end_time', 'string', [
                'null' => true,
                'default' => null,
                'limit' => 10,
                'after' => 'open_time',
                'comment' => '閉店時間',
            ])
            ->update();
    }
}