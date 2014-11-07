$(document).ready(function() {
	var buttons = new MARVL.Collections.Admin.Buttons();
	
	var submit_request_button = new MARVL.Models.Admin.Button();
	submit_request_button.set({'name':'Submit Request'});
	submit_request_button.set({'icon':'glyphicon-plus'});
	submit_request_button.set({'color':'create'});
	submit_request_button.set({'size':'medium'});
	
	buttons.add(submit_request_button);
	
	var application_buttons_view = new MARVL.Views.Admin.Buttons({
        collection: buttons,
        tagName: 'div'
    });
   
	$('#application-box').prepend(application_buttons_view.render().el);	
});