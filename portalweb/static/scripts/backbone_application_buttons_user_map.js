$(document).ready(function() {
	var buttons = new MARVL.Collections.Admin.Buttons();
	
	var create_map_button = new MARVL.Models.Admin.Button();
	create_map_button.set({'name':'Create Map'});
	create_map_button.set({'icon':'glyphicon-plus'});
	create_map_button.set({'color':'create'});
	create_map_button.set({'size':'medium'});
	
	var edit_map_button = new MARVL.Models.Admin.Button();
	edit_map_button.set({'name':'Edit Map'});
	edit_map_button.set({'icon':'glyphicon-edit'});
	edit_map_button.set({'color':'rename'});
	edit_map_button.set({'size':'medium'});
	
	buttons.add(create_map_button);
	buttons.add(edit_map_button);
	
	var application_buttons_view = new MARVL.Views.Admin.Buttons({
        collection: buttons,
        tagName: 'div'
    });
   
	$('#application-box').prepend(application_buttons_view.render().el);	
});