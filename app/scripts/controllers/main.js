'use strict';

angular.module('cvApp')
  .controller('MainCtrl', function ($scope) {
    window.scope = $scope;
    $scope.selectedView = 'initial';
    $scope.lineNumbers = [];
            
    for (var i = 1; i < 10; i++) {
      $scope.lineNumbers[i] = i;
    }
    $scope.opendTab = [];

    //PROTOTYPE TO CHECK IF AN OBJECT EXISTS IN AN ARRAY
    Array.prototype.objIndexOf = function (val) {
                var cnt = -1;
                for (var i = 0, n = this.length; i < n; i++) {
                  cnt++;
                  for (var o in this[i]) {
                    if (this[i][o] === val) {
                      return cnt;
                    }
                  }
                }
                return -1;
              };

    $scope.selectView = function(type, fileName, lineNumbers){
            $scope.selectedView = type;
            $scope.openedTabName = fileName;
            var addTab = {
              'type': type,
              'fileName': fileName,
              'lineNumbers': lineNumbers
            },
                basketIndex = $scope.opendTab.objIndexOf(fileName);
            if(basketIndex === -1){
              $scope.opendTab.push(addTab);
            }
  
            $scope.lineNumbers = [];
            
            for (var i = 1; i < lineNumbers; i++) {
              $scope.lineNumbers[i] = i;
            }
          };

    $scope.closeTab = function(index){
          var nextView = index + 1;
          nextView = $scope.opendTab[nextView];
          console.log(nextView);
          console.log($scope.opendTab.length);
          $scope.opendTab.splice(index, 1);
          if(nextView !== undefined && $scope.opendTab.length > 0){
            $scope.selectView(nextView.type, nextView.fileName, nextView.lineNumbers);
            $scope.openedTabName = nextView.fileName;
          } else if(nextView === undefined && $scope.opendTab.length > 0){
            nextView = $scope.opendTab[0];
            $scope.selectView(nextView.type, nextView.fileName, nextView.lineNumbers);
            $scope.openedTabName = nextView.fileName;
          } else {
            $scope.selectedView = 'initial';
            $scope.lineNumbers = [];
            $scope.openedTabName = '';
            for (var i = 1; i < 10; i++) {
              $scope.lineNumbers[i] = i;
            }
          }
        };

        $scope.closeWindow = function(){
           if (confirm("Weet u zeker dat u het scherm wilt sluiten?")) {
              window.close();
            }
        }
        
  });

