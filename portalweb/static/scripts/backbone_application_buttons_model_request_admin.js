$(document).ready(function() {
	var buttons = new MARVL.Collections.Admin.Buttons();
	
	var approve_request_button = new MARVL.Models.Admin.Button();
	approve_request_button.set({'name':'Approve Request'});
	approve_request_button.set({'icon':'glyphicon-ok'});
	approve_request_button.set({'color':'rename'});
	approve_request_button.set({'size':'medium'});
	
	
	var reject_request_button = new MARVL.Models.Admin.Button();
	reject_request_button.set({'name':'Reject Request'});
	reject_request_button.set({'icon':'glyphicon-remove'});
	reject_request_button.set({'color':'delete'});
	reject_request_button.set({'size':'medium'});
	
	buttons.add(approve_request_button);
	buttons.add(reject_request_button);	
	
	var application_buttons_view = new MARVL.Views.Admin.Buttons({
        collection: buttons,
        tagName: 'div'
    });
   
	$('#application-box').prepend(application_buttons_view.render().el);	
});