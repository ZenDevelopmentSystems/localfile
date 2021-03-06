  var f = [];//{};
 
  Array.prototype.contains = function (key, expectedValue) {
    // if the other array is a falsy value, return
    if (!this || this.length < 1)
        return -1;
    
    for (var i = 0; i < this.length; i++) {
      if(this[i][key] == expectedValue)
      {
        return $.inArray(this[i], this);
      }
    }       
    return -1;
} 

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

for(i = 0; i < localStorage.length; i++)
{
  //f[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
  f.push({ name : localStorage.key(i), pic : getPic(localStorage.key(i)) });
}

function getPic(item)
{
    if(item.endsWith(".js"))
    {
      return "http://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png";
    }
    else if(item.endsWith(".cs"))
    {
      return "http://www.xappsoftware.com/wordpress/wp-content/uploads/2014/07/csharp3.png";
    }
    else if(item.endsWith(".secret") || item.endsWith(".crypto"))
    {
      return "http://www.dfinews.com/sites/dfinews.com/files/ntru.jpg";
    }
    else if(validateEmail(item))
    {
      return "http://www.gravatar.com/avatar/" + CryptoJS.MD5(item) + "?d=wavatar";
    }
    else
    {
      return "https://lh5.ggpht.com/-4y8XgooGfuM-Z-rYE9xqoalqQGFPlaBlRR8dfUG-aMB3rIMUaEkrX95XOlzLQ0_9FE=w300";
    }
}
 
angular.module('app', []).controller('fileCtrl', function fileCtrl($scope) {
    $scope.files = f;
    $scope.currentFileName = "Untitled";
    $scope.showFileModal = false;
    $scope.displayModal = function(titleText){ 
    	$scope.showFileModal = true; 
    	$scope.$apply();
    	$scope.currentFileName = titleText;
    }
    $scope.open = function(index){
      
      var titleText = $scope.files[index].name;
      
      $scope.displayModal(titleText);
      
	  	var savedText = localStorage.getItem(titleText);
   
      $('.file-name').attr('contenteditable','false');
      
      myCodeMirror.setValue(savedText);
    }
    $scope.close = function(){
      $scope.showFileModal = false;
    }
    $scope.addFile = function(){
      $scope.displayModal("Untitled");
      
    	$('.file-name').attr('contenteditable','true');
      
      myCodeMirror.setValue("");
    }
    $scope.add = function(item) {
      $scope.files.push({ name: item, pic: getPic(item) });
    };
    $scope.remove = function() {
      var fileName = $(".file-name").text();
      
      var fileIndex = $scope.files.contains("name", fileName);
      
      if(fileIndex != -1 )
      {
        $scope.files.splice(fileIndex, 1);
      }
      
      localStorage.removeItem(fileName);
      
      $scope.showFileModal = false;
    };
    $scope.upload = function(){
      var selected_file = $('#input').get(0).files[0];

      var reader = new FileReader();
      reader.onload = function(e) {
        $scope.saveVal(selected_file.name, e.target.result);
      };
      reader.readAsText(selected_file);
    }
    $scope.saveVal = function(name, contents)
    {
        localStorage.setItem(name, contents);

        if($scope.files.contains("name", name) != -1)
        {
          
        }
        else
        {
          $scope.add(name);
        }
    }
    $scope.save = function(){
        var fileName = $(".file-name").text();
       
        var contents = myCodeMirror.getValue();
        
        $scope.saveVal(fileName, contents);
        
      $scope.showFileModal = false;
    };
})


