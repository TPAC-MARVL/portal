 $(document).ready(function() {
   $('#messageClose').click(function(){
     $('#messageDiv').hide();
   });
   
   $("#menu1").click(function() {
     $("#sub-menu-1").toggle( "fast" );
   });
   
   $("#menu2").click(function() {
     $("#sub-menu-2").toggle( "fast" );
   });
   
   $(".sub-menu-list-group-item").hover(
      function() {
	    $(this).append('<span class="glyphicon glyphicon-arrow-right right-icon"></span>');
	  },
	  function() {
	    $(this).children("span").remove();
	  }
   );
   
 }); 
 
 function capitaliseFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
 }