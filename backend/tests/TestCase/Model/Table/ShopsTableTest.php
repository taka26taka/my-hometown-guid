<?php
declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ShopsTable;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ShopsTable Test Case
 */
class ShopsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ShopsTable
     */
    protected $Shops;

    /**
     * Fixtures
     *
     * @var list<string>
     */
    protected array $fixtures = [
        'app.Shops',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $config = $this->getTableLocator()->exists('Shops') ? [] : ['className' => ShopsTable::class];
        $this->Shops = $this->getTableLocator()->get('Shops', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    protected function tearDown(): void
    {
        unset($this->Shops);

        parent::tearDown();
    }

    /**
     * Test validationDefault method
     *
     * @return void
     * @uses \App\Model\Table\ShopsTable::validationDefault()
     */
    public function testValidationDefault(): void
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
