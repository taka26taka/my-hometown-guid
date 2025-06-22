<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Shop Entity
 *
 * @property int $id
 * @property string $name
 * @property string $address
 * @property string $description
 * @property \Cake\I18n\DateTime $created
 * @property \Cake\I18n\DateTime $modified
 * @property string $lat
 * @property string $lng
 * @property string|null $area
 * @property string|null $comment
 * @property string|null $official_url
 * @property string|null $genre
 * @property string|null $price_range
 * @property int|null $walk_minutes_from_station
 * @property string|null $image_url
 * @property string|null $chosen_by
 * @property string|null $google_map_url
 */
class Shop extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array<string, bool>
     */
    protected array $_accessible = [
        'name' => true,
        'address' => true,
        'description' => true,
        'created' => true,
        'modified' => true,
        'lat' => true,
        'lng' => true,
        'area' => true,
        'comment' => true,
        'official_url' => true,
        'genre' => true,
        'price_range' => true,
        'walk_minutes_from_station' => true,
        'image_url' => true,
        'chosen_by' => true,
        'google_map_url' => true,
    ];
}
