

var app = angular.module('FinancialVisualizationApp', ['d3']);

app.controller("HeaderVizualisationController", function ($scope,$templateCache,$filter, $rootScope, $sce, $location, $http, $anchorScroll) {
    $scope.chart_data = [40, 80, 15, 60, 23, 95];

    $scope.dataset;
    $scope.test = []
    $scope.status = 0;
    $scope.data= [];
    $scope.run = function () {

        $http({ method: "GET", url: "../dataset/output.json", cache: $templateCache }).
            then(function (response) {
                $scope.status = response.status;
                $scope.dataset = response.data;
            }, function (response) {
                $scope.dataset = response.data || 'Request failed';
                $scope.status = response.status;
            });
    }
});

app.directive('d3Lines', ['d3', function (d3) {
    return {
        restrict: 'EA',
        template: "<svg width='850' height='200'></svg>",
        link: function (scope) {
            //your code for chart.
        }
    };
}]);

app.filter("groupBy", ["$parse", "$filter", function ($parse, $filter) {
    return function (array, groupByField) {
        var result = [];
        var prev_item = null;
        var groupKey = false;
        var filteredData = $filter('orderBy')(array, groupByField);
        for (var i = 0; i < filteredData.length; i++) {
            groupKey = false;
            if (prev_item !== null) {
                if (prev_item[groupByField] !== filteredData[i][groupByField]) {
                    groupKey = true;
                }
            } else {
                groupKey = true;
            }
            if (groupKey) {
                filteredData[i]['group_by_key'] = true;
            } else {
                filteredData[i]['group_by_key'] = false;
            }
            result.push(filteredData[i]);
            prev_item = filteredData[i];
        }
        return result;
    }
}])