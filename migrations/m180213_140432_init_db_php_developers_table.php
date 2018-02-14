<?php

use yii\db\Migration;

/**
 * Class m180213_140432_init_db_php_developers_table
 */
class m180213_140432_init_db_php_developers_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $this->createTable('developer', [
            'id' => $this->primaryKey(),
            'created_at' => $this->dateTime() . ' DEFAULT NOW()',
            'name' => $this->string(255)->notNull(),
            'dob' => $this->date()->notNull(),
            'expirience' => $this->smallInteger()->notNull(),
            'framework_yii' => $this->boolean()->defaultValue(false),
            'framework_yii2' => $this->boolean()->defaultValue(false),
            'framework_laravel' => $this->boolean()->defaultValue(false),
            'framework_symphony' => $this->boolean()->defaultValue(false),
            'framework_zend' => $this->boolean()->defaultValue(false),
            'comment' => $this->text()->defaultValue('')
        ]);
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        $this->dropTable('developer');
    }
}
