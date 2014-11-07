$(document).ready(function() {
	var buttons = new MARVL.Collections.Admin.Buttons();
	
	var add_system_admin_button = new MARVL.Models.Admin.Button();
	add_system_admin_button.set({'name':'Add Admin'});
	add_system_admin_button.set({'icon':'glyphicon-plus'});
	add_system_admin_button.set({'color':'create'});
	add_system_admin_button.set({'size':'medium'});
	
	var remove_system_admin_button = new MARVL.Models.Admin.Button();
	remove_system_admin_button.set({'name':'Remove Admin'});
	remove_system_admin_button.set({'icon':'glyphicon-trash'});
	remove_system_admin_button.set({'color':'delete'});
	remove_system_admin_button.set({'size':'medium'})
	
	buttons.add(add_system_admin_button);
	buttons.add(remove_system_admin_button);
	
	var application_buttons_view = new MARVL.Views.Admin.Buttons({
        collection: buttons,
        tagName: 'div'
    });
   
	$('#application-box').prepend(application_buttons_view.render().el);	
});