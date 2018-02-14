'use strict';

var app = angular
.module('frontendApp', [
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker'
])
.constant(
    'API', 'http://basic/developers'
);

app.service('DeveloperService', function($http, API) {
    this.get = function() {
        return $http.get(API);
    };
    this.getById = function(id) {
        return $http.get(API + "/" + id);
    };
    this.post = function (data) {
        return $http.post(API, data);
    };
    this.put = function (id, data) {
        return $http.put(API + "/" + id, data);
    };
    this.delete = function (id) {
        return $http.delete(API + "/" + id);
    };
});

app.controller('DevelopersController', ['$scope', 'DeveloperService', '$timeout',
    function ($scope, DeveloperService, $timeout) {
        $scope.developers = [];

        $scope.refreshDevelopers = function() {
            DeveloperService.get().then(function (data) {
                if (data.status == 200)
                    $scope.developers = data.data;
            }, function (err) {
                console.log(err);
            });
        };

        $scope.refreshDevelopers();

        $scope.errorsAdd = {};
        $scope.errorsEdit = {};
        $scope.vm.editDeveloperUser = false;

        $scope.post = function(developer) {
            DeveloperService.post(developer).then(function (data) {
                $scope.refreshDevelopers();
                $scope.errorsAdd = {};
                $scope.reset('addDeveloper', 'developer');
            }, function (err) {
                console.log(err);
                $scope.errorsAdd = err.data;
            });
        };

        $scope.put = function(id, developer) {
            DeveloperService.put(id, developer).then(function (data) {
                $scope.refreshDevelopers();
                $scope.errorsEdit = {};
            }, function (err) {
                console.log(err);
                $scope.errorsEdit = err.data;
            });
        };

        $scope.edit = function(id) {
            DeveloperService.getById(id).then(function (data) {
                if (data.status == 200) {
                    $scope.vm.editDeveloperUser = data.data;
                    $scope.vm.editDeveloperArray = angular.copy(data.data);
                    $timeout(function() { $scope.currentTab = 1; });
                }
            }, function (err) {
                console.log(err);
            });
        };

        $scope.delete = function(id) {
            DeveloperService.delete(id).then(function (data) {
                $scope.refreshDevelopers();
            }, function (err) {
                console.log(err);
            });
        };

        $scope.hasError = function (form, field) { return _.find($scope[form], {field: field}); };
        $scope.getError = function (form, field) { return $scope.hasError(form, field) ? $scope.hasError(form, field).message : false; };

        $scope.beforeRender = function ($view, $dates) {
          var activateDate = moment().subtract(18, 'years');
          $dates
              .filter(function(date) { return date.localDateValue() >= activateDate.valueOf() })
              .forEach(function(date) { date.selectable = false; })
        };

        $scope.reset = function (developerArray, form) {
            var keys = _.keys($scope.vm[developerArray]);
            keys.forEach(function(key) {
                $scope.vm[developerArray][key] = null;
            });
            if ($scope.vm[form]) {
                $scope.vm[form].$setPristine();
                $scope.vm[form].$setUntouched();
            }
        };

        $scope.resetAdd = function (developerArray, form) {
            $scope.reset(developerArray, form);
            $scope.errorsAdd = {};
        };

        $scope.clear = function (developerArray, form) {
            $scope.reset(developerArray, form);
            $scope.errorsEdit = {};
            $scope.vm.editDeveloperUser = false;
        };
    }
]);
