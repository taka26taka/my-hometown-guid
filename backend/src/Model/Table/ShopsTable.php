<?php
declare(strict_types=1);

namespace App\Model\Table;

use Cake\ORM\Query\SelectQuery;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Shops Model
 *
 * @method \App\Model\Entity\Shop newEmptyEntity()
 * @method \App\Model\Entity\Shop newEntity(array $data, array $options = [])
 * @method array<\App\Model\Entity\Shop> newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Shop get(mixed $primaryKey, array|string $finder = 'all', \Psr\SimpleCache\CacheInterface|string|null $cache = null, \Closure|string|null $cacheKey = null, mixed ...$args)
 * @method \App\Model\Entity\Shop findOrCreate($search, ?callable $callback = null, array $options = [])
 * @method \App\Model\Entity\Shop patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method array<\App\Model\Entity\Shop> patchEntities(iterable $entities, array $data, array $options = [])
 * @method \App\Model\Entity\Shop|false save(\Cake\Datasource\EntityInterface $entity, array $options = [])
 * @method \App\Model\Entity\Shop saveOrFail(\Cake\Datasource\EntityInterface $entity, array $options = [])
 * @method iterable<\App\Model\Entity\Shop>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Shop>|false saveMany(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\Shop>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Shop> saveManyOrFail(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\Shop>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Shop>|false deleteMany(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\Shop>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Shop> deleteManyOrFail(iterable $entities, array $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class ShopsTable extends Table
{
    /**
     * Initialize method
     *
     * @param array<string, mixed> $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config): void
    {
        parent::initialize($config);

        $this->setTable('shops');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator): Validator
    {
        $validator
            ->scalar('name')
            ->maxLength('name', 255)
            ->requirePresence('name', 'create')
            ->notEmptyString('name');

        $validator
            ->scalar('address')
            ->maxLength('address', 255)
            ->requirePresence('address', 'create')
            ->notEmptyString('address');

        $validator
            ->scalar('description')
            ->requirePresence('description', 'create')
            ->notEmptyString('description');

        $validator
            ->decimal('lat')
            ->requirePresence('lat', 'create')
            ->notEmptyString('lat');

        $validator
            ->decimal('lng')
            ->requirePresence('lng', 'create')
            ->notEmptyString('lng');

        $validator
            ->scalar('area')
            ->maxLength('area', 255)
            ->allowEmptyString('area');

        $validator
            ->scalar('comment')
            ->allowEmptyString('comment');

        $validator
            ->scalar('official_url')
            ->maxLength('official_url', 512)
            ->allowEmptyString('official_url');

        $validator
            ->scalar('genre')
            ->maxLength('genre', 50)
            ->allowEmptyString('genre');

        $validator
            ->scalar('price_range')
            ->maxLength('price_range', 50)
            ->allowEmptyString('price_range');

        $validator
            ->integer('walk_minutes_from_station')
            ->allowEmptyString('walk_minutes_from_station');

        $validator
            ->scalar('image_url')
            ->allowEmptyString('image_url');

        $validator
            ->scalar('chosen_by')
            ->allowEmptyString('chosen_by');

        $validator
            ->scalar('google_map_url')
            ->allowEmptyString('google_map_url');

        return $validator;
    }
}
