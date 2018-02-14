<?php

namespace app\controllers;

use Yii;
use yii\filters\ContentNegotiator;
use yii\web\Controller;
use yii\web\Response;

class SiteController extends Controller
{

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['contentNegotiator'] = [
            'class' => ContentNegotiator::className(),
            'formats' => [
                'application/json' => Response::FORMAT_JSON
            ]

        ];

        return $behaviors;
    }

    public function actionError()
    {
        $exception = Yii::$app->errorHandler->exception;
        if ($exception !== null) {
            return $exception;
        }
        return '';
    }
}
