/**
 * Created by Admin on 19.05.2017.
 */
angular.module('graphApp', ['ui.bootstrap.modal'])
    .controller('graphController', function ($scope) {

        $scope.width = 400;
        $scope.height = 400;
        $scope.delimiter = 0.5
        $scope.data = [
            {
                label: 'January',
                value: 36
            },
            {
                label: 'February',
                value: 54
            },
            {
                label: 'March', value: 62
            },
            {
                label: 'April',
                value: 82
            },
            {
                label: 'May',
                value: 96
            },
            {
                label: 'June',
                value: 104
            },
            {
                label: 'July',
                value: 122
            },
            {
                label: 'August',
                value: 152
            },
            {
                label: 'September',
                value: 176
            },
            {
                label: 'October',
                value: 180
            },
            {
                label: 'November',
                value: 252
            },
            {
                label: 'December',
                value: 342
            }
        ];
        $scope.arrayHeight = 50
        $scope.arraySize=0

        var arrLength = $scope.data.length;
        for (var i = 0; i < arrLength; i++) {
           if ($scope.data[i].value > $scope.max)
                $scope.max = $scope.data[i].value;
        }

        $scope.generateMas = function () {
            $scope.max = 0;
            $scope.ulp = []
            $scope.masUl = []
            var n = $scope.arraySize, maxUl = 0;
            n++
            var masU = [], masUl = [];
            var ulp = $scope.ulp
            for (var i = 0; i < n; i++) {
                masU[i] = []
                masUl[i] = []
                for (var j = 0; j < n; j++) {
                    if (!i || !j) {
                        masU[i][j] = 0
                        masUl[i][j] = 0

                    }
                    else {
                        var mathRandom = Math.random()
                        if (mathRandom > $scope.delimiter) {
                            masU[i][j] = 0;
                            masUl[i][j] = 0
                        }
                        else {
                            masU[i][j] = 1;
                            if (masUl[i - 1][j] && masUl[i][j - 1]) {
                                masUl[i][j] = Math.min(masUl[i - 1][j], masUl[i][j - 1])
                                ulp.splice(1, ulp.indexOf(Math.max.apply(null, ulp)), masUl[i][j])
                            }
                            else {
                                if (masUl[i - 1][j] || masUl[i][j - 1]) {
                                    masUl[i][j] = masUl[i - 1][j] || masUl[i][j - 1]
                                }
                                else {
                                    maxUl++
                                    masUl[i][j] = maxUl
                                    ulp.push(maxUl)
                                }
                            }
                        }
                    }
                }
            }

            $scope.masU = masU

  /*          for (i = 0; i < n; i++)
                console.log('mas[', i, '] --->', masU[i], 'masUl[', i, ']---->', masUl[i])*/
            for (i = 1; i < n; i++) {
                for (j = 1; j < n; j++) {
                    if (masUl[i][j]) {
                        var dot = {}
                        dot.xAxis = j
                        dot.yAxis = i
                        $scope.masUl.push(dot)
                    }
                }
            }
        }


    });