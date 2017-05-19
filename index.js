/**
 * Created by Admin on 19.05.2017.
 */
angular.module('graphApp', ['ui.bootstrap.modal'])
    .controller('graphController', function ($scope) {

        $scope.width = 400;
        $scope.height = 400;
        $scope.delimiter = 0.5
        $scope.arrayHeight = 50
        $scope.arraySize = 0
        $scope.backgroundColor = 0

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
                                // console.log('this is ulp before splice--->',ulp)
                                ulp.splice(ulp.indexOf(Math.max(ulp[ulp.indexOf(masUl[i - 1][j])],ulp[ulp.indexOf(masUl[i][j - 1])])), 1, masUl[i][j])
                                //  console.log('this is ulp after splice--->',ulp)
                            }
                            else {
                                if (masUl[i - 1][j] || masUl[i][j - 1]) {
                                    masUl[i][j] = masUl[i - 1][j] || masUl[i][j - 1]
                                }
                                else {
                                    maxUl++
                                    masUl[i][j] = maxUl
                                    // console.log('this is ulp before--->',ulp)
                                    ulp.push(maxUl)
                                    // console.log('this is ulp after--->',ulp)
                                }
                            }
                        }
                    }
                }
            }

            $scope.masU = masU

           // for (i = 0; i < n; i++) console.log('mas[', i, '] --->', masU[i], 'masUl[', i, ']---->', masUl[i])


         //   var oldUlp = ulp
         //   console.log('this is old ulp --->', oldUlp)
            for (i = 0; i < ulp.length; i++) {
                if (ulp[i] < i + 1) {
                    // console.log('ulp[',i+1,']=',ulp[i],'--> ulp[',ulp[i],']=',ulp[ulp[i]-1])
                    ulp[i] = ulp[ulp[i] - 1]
                }
            }
            $scope.ulp = ulp
          //  console.log('this is new ulp -->', ulp)
            var masUln = []

            for (i = 0; i < n; i++) {
                masUln[i]=[]
                for (j = 0; j < n; j++) {
                    masUln[i][j] = ulp[masUl[i][j]-1]||0
                }
            }
            for (i = 0; i < n; i++) console.log('mas[', i, '] --->', masU[i], 'masUl[', i, ']---->', masUl[i], ' masULN[', i, ']--->', masUln[i])

            for (i = 1; i < n; i++) {
                for (j = 1; j < n; j++) {
                    if (masUln[i][j]) {
                        var dot = {}
                        dot.xAxis = j
                        dot.yAxis = i
                        dot.backgroundColor = masUln[i][j]
                        $scope.masUl.push(dot)
                    }
                }
            }
        }


    });