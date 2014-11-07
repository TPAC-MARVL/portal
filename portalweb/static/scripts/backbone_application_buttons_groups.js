$(document).ready(function() {
	var buttons = new MARVL.Collections.Admin.Buttons();
	
	var create_group_button = new MARVL.Models.Admin.Button();
	create_group_button.set({'name':'New Group'});
	create_group_button.set({'icon':'glyphicon-plus'});
	create_group_button.set({'color':'create'});
	create_group_button.set({'size':'medium'});
	
	var add_member_button = new MARVL.Models.Admin.Button();
	add_member_button.set({'name':'Add Members'});
	add_member_button.set({'icon':'glyphicon-plus'});
	add_member_button.set({'color':'add-member'});
	add_member_button.set({'size':'medium'});	
	
	var remove_member_button = new MARVL.Models.Admin.Button();
	remove_member_button.set({'name':'Remove Members'});
	remove_member_button.set({'icon':'glyphicon-trash'});
	remove_member_button.set({'color':'delete'});
	remove_member_button.set({'size':'medium'})
	
	var rename_group_button = new MARVL.Models.Admin.Button();
	rename_group_button.set({'name':'Rename Group'});
	rename_group_button.set({'icon':'glyphicon-edit'});
	rename_group_button.set({'color':'rename'});
	rename_group_button.set({'size':'medium'})
	
	var add_group_admin_button = new MARVL.Models.Admin.Button();
	add_group_admin_button.set({'name':'Edit Members'});
	add_group_admin_button.set({'icon':'glyphicon-plus'});
	add_group_admin_button.set({'color':'add-instance'});
	add_group_admin_button.set({'size':'medium'});	
	
	buttons.add(create_group_button);
	buttons.add(rename_group_button);
	buttons.add(add_member_button);
	buttons.add(remove_member_button);
	buttons.add(add_group_admin_button);	
	
	var application_buttons_view = new MARVL.Views.Admin.Buttons({
        collection: buttons,
        tagName: 'div'
    });
   
	$('#application-box').prepend(application_buttons_view.render().el);	
});