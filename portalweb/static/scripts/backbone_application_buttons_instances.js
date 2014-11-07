$(document).ready(function() {
	var buttons = new MARVL.Collections.Admin.Buttons();
	
	var attach_group_button = new MARVL.Models.Admin.Button();
	attach_group_button.set({'name':'Change Group'});
	attach_group_button.set({'icon':'glyphicon-edit'});
	attach_group_button.set({'color':'rename'});
	attach_group_button.set({'size':'medium'});

	var remove_group_button = new MARVL.Models.Admin.Button();
	remove_group_button.set({'name':'Remove Group'});
	remove_group_button.set({'icon':'glyphicon-trash'});
	remove_group_button.set({'color':'add-instance'});
	remove_group_button.set({'size':'medium'});
		
	var add_new_vm_button = new MARVL.Models.Admin.Button();
	add_new_vm_button.set({'name':'Add VM'});
	add_new_vm_button.set({'icon':'glyphicon-plus'});
	add_new_vm_button.set({'color':'create'});
	add_new_vm_button.set({'size':'medium'});
	
	var edit_vm_button = new MARVL.Models.Admin.Button();
	edit_vm_button.set({'name':'Edit VM'});
	edit_vm_button.set({'icon':'glyphicon-edit'});
	edit_vm_button.set({'color':'add-member'});
	edit_vm_button.set({'size':'medium'});	

	var remove_vm_button = new MARVL.Models.Admin.Button();
	remove_vm_button.set({'name':'Remove VM'});
	remove_vm_button.set({'icon':'glyphicon-trash'});
	remove_vm_button.set({'color':'delete'});
	remove_vm_button.set({'size':'medium'});	
	
	buttons.add(add_new_vm_button);
	buttons.add(edit_vm_button);
	buttons.add(remove_group_button);
	buttons.add(attach_group_button);
	buttons.add(remove_vm_button);
	
	var application_buttons_view = new MARVL.Views.Admin.Buttons({
        collection: buttons,
        tagName: 'div'
    });
   
	$('#application-box').prepend(application_buttons_view.render().el);
});