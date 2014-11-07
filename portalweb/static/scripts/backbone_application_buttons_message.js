$(document).ready(function() {
	var buttons = new MARVL.Collections.Admin.Buttons();
	
	var create_message_button = new MARVL.Models.Admin.Button();
	create_message_button.set({'name':'Send Message'});
	create_message_button.set({'icon':'glyphicon-plus'});
	create_message_button.set({'color':'create'});
	create_message_button.set({'size':'medium'});
	
	buttons.add(create_message_button);
	
	var application_buttons_view = new MARVL.Views.Admin.Buttons({
        collection: buttons,
        tagName: 'div'
    });
   
	$('#application-box').prepend(application_buttons_view.render().el);	
});