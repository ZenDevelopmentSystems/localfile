$(function() {

$(".file-box").click(function(){ 
  
  var newText = localStorage.getItem($(this).children("span").text().replace(" ",""));
  
  $(".file-details").text(newText);
  
  $(".modal-box").removeClass("hidden");
})

});