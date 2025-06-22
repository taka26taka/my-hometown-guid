<?php
use Migrations\AbstractMigration;

class AddMoreFieldsToShops extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('shops');

        $table
            ->addColumn('genre', 'string', [
                'limit' => 50,
                'null' => true,
                'after' => 'official_url'
            ])
            ->addColumn('price_range', 'string', [
                'limit' => 50,
                'null' => true,
                'after' => 'genre'
            ])
            ->addColumn('walk_minutes_from_station', 'integer', [
                'limit' => 3,
                'null' => true,
                'after' => 'price_range'
            ])
            ->addColumn('image_url', 'text', [
                'null' => true,
                'after' => 'walk_minutes_from_station'
            ])
            ->addColumn('chosen_by', 'enum', [
                'values' => ['groom', 'bride', 'both'],
                'default' => 'both',
                'null' => true,
                'after' => 'image_url'
            ])
            ->addColumn('google_map_url', 'text', [
                'null' => true,
                'after' => 'chosen_by'
            ])
            ->update();
    }
}
