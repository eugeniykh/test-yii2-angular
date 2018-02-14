<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "developers".
 *
 * @property int $id
 * @property string $created_at
 * @property string $name
 * @property string $dob
 * @property int $expirience
 * @property int $framework_yii
 * @property int $framework_yii2
 * @property int $framework_laravel
 * @property int $framework_symphony
 * @property int $framework_zend
 * @property string $comment
 */
class Developer extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'developer';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['created_at', 'dob'], 'safe'],
            [['name', 'dob', 'expirience'], 'required'],
            [['expirience', 'framework_yii', 'framework_yii2', 'framework_laravel', 'framework_symphony', 'framework_zend'], 'integer'],
            [['comment'], 'string'],
            [['name'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'created_at' => 'Created At',
            'name' => 'Name',
            'dob' => 'Dob',
            'expirience' => 'Expirience',
            'framework_yii' => 'Framework Yii',
            'framework_yii2' => 'Framework Yii2',
            'framework_laravel' => 'Framework Laravel',
            'framework_symphony' => 'Framework Symphony',
            'framework_zend' => 'Framework Zend',
            'comment' => 'Comment',
        ];
    }
}
