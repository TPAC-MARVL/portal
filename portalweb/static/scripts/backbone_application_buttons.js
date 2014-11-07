MARVL.Models.Admin.Button = Backbone.Model.extend({
	defaults: {
      name: "Not specified",
	  icon: "Not specified",
	  color: "Not specified",
	  url: "Not specified",
	  size: "Not specified"
    }
});

MARVL.Collections.Admin.Buttons = Backbone.Collection.extend({
	model: MARVL.Models.Admin.Button
});

MARVL.Views.Admin.Modal = Backbone.View.extend({
	tagName: 'div',
	className: 'modal-content',

	initialize: function(){
      this.template = Handlebars.templates[this.template_name]
    },
    
    events:{
      "click #sendOption1" : "click_radio1",
      "click #sendOption2" : "click_radio2",
    },
    
    click_radio1: function() {
      $("#message_members").toggleClass( "hidden" );
      $("#message_groups").toggleClass( "hidden" );
    },
    
    click_radio2: function() {
      $("#message_members").toggleClass( "hidden" );
      $("#message_groups").toggleClass( "hidden" );
    },
    
    render: function() {
      this.template = Handlebars.templates[this.template_name]
      this.$el.html(this.template({"csrf_token": this.csrf_token, "page_token":this.page_token, "item_ids":this.item_ids, "item_names":this.item_names, "instance_name":this.instance_name, "groups": this.groups, "post_url":this.post_url, "title":this.title, "message1":this.message1, "message2":this.message2, "group_id":this.group_id, "group_name":this.group_name, "group_description":this.group_description, "members":this.members, "view_type": this.view_type, "instance_id": this.instance_id, "instance_state": this.instance_state, "instance_ip": this.instance_ip, "instance_url": this.instance_url, "instance_types":this.instance_types, "requests":this.requests, "email":this.email, "map_id":this.map_id, "is_admin":this.is_admin, "instance_public":this.instance_public, "instance_type":this.instance_type}));	
      return this;
    }
});

MARVL.Views.Admin.Button = Backbone.View.extend({
	tagName: 'div',
	className: 'button-box',
		
	initialize: function(){
      this.template = Handlebars.templates['application-button']
    },
    
    events: {
      'click' : 'click_action'
    },

    click_action: function() {
    	
    	var token = $('meta[name="csrf-token"]').attr('content');
		var dialog_view = new MARVL.Views.Admin.Modal();		
		var call_modal = true;
		var call_warning = false;
		var button_name = this.model.get("name");
		var modal_dialog_id = '#modal-dialog';
		var modal_id = '#editViewModal';
		
		dialog_view.csrf_token = token;
		$(modal_dialog_id).empty();
		
		if (button_name == 'New Group' || button_name == 'Add VM' || button_name == 'Edit VM' || button_name == 'Remove VM') {			
			
			if (button_name == 'New Group') {
				dialog_view.template_name = 'admin-group-create';
				dialog_view.title = 'Create New Group';
				dialog_view.post_url = '/marvl/groups/admin/add_group'; 
			}
			
			if (button_name == 'Add VM') {
				dialog_view.template_name = 'admin-instance-edit';
				dialog_view.title = 'Create New Virtual Machine';
				dialog_view.post_url = '/marvl/instances/admin/add_instance';
				dialog_view.view_type = {'insert_view': true};
			}
			
			if (button_name == 'Remove VM') {
				if ($("input[name='instance']:checked").length > 0) {
				  var instance_ids = new Array(); 
				  var instance_names = new Array();
					  
				  for (var index = 0; index < $("input[name='instance']:checked").length; index++) {
				    instance_ids[index] = $($("input[name='instance']:checked")[index]).val();  
				  }
				  
				  dialog_view.template_name = 'admin-instance-remove';
				  dialog_view.title = 'Remove Virtual Machines';
				  dialog_view.post_url = '/marvl/instances/admin/remove_instance';
				  
				  for(var index = 0; index < instance_ids.length; index++) {
				    instance_names[index] = $('#instance_name_value'+instance_ids[index]).text();
				  }
				  
				  dialog_view.item_names = instance_names;
				  dialog_view.item_ids = instance_ids;
				  
				} else {
			      call_warning = true;    	
			      dialog_view.message2 = 'You must select at lease one instance.';	
				}				
			}
			
			if (button_name == 'Edit VM') {
				if ($("input[name='instance']:checked").length == 1) {
					
				  dialog_view.template_name = 'admin-instance-edit';
				  dialog_view.title = 'Edit Virtual Machine';
				  dialog_view.post_url = '/marvl/instances/admin/edit_instance';
				  dialog_view.view_type = {'edit_view': true};
				  
				  var instance_id = $($("input[name='instance']:checked")[0]).val();
				  dialog_view.instance_id = instance_id;
				  dialog_view.instance_name = $("#instance_name_value"+instance_id).text();
				  
				  var instance_state = $("#instance_state_value"+instance_id).text();
				  var instance_type = $("#instance_type_value"+instance_id).text();
				  
				  if (instance_type == 'm1.small') {
				      dialog_view.instance_type = {"small": true};
				  }
					  
				  if (instance_type == 'm1.xlarge') {
					  dialog_view.instance_type = {"large": true};
				  }
				  
				  if (instance_state == 'running') {
				      dialog_view.instance_state = {"running": true};
				  }
					  
				  if (instance_state == 'stopped') {
					  dialog_view.instance_state = {"stopped": true};
				  }			  
					  
				  dialog_view.instance_ip = $("#instance_ip_value"+instance_id).text();
				  dialog_view.instance_url = $("#instance_url_value"+instance_id).text();
				  instance_visibility = $("#instance_visibility_value"+instance_id).text();
				  
				  if (instance_visibility == "public") {
					  dialog_view.instance_public = true;		  
				  } else {
					  dialog_view.instance_public = false;	  
				  }				  
				  
				} else {
			      call_warning = true;    	
			      dialog_view.message2 = 'You must select one instance.';
				}			
			}		
		    
		} else if (button_name == 'Rename Group') {
			if ($("input[name='group']:checked").length == 1 || $("#groupId").text() != '') {
				dialog_view.template_name = 'admin-group-edit';
				dialog_view.title = 'Rename Group'
				dialog_view.post_url = '/marvl/groups/admin/rename_group';
				var group_id = "";
				
				if ($("#groupId").text() != '') {
				  group_id = $("#groupId").text();
				  dialog_view.group_description = $("#group_description").text().trim();
				  dialog_view.group_name = $("#group_name").text().trim();
				  dialog_view.page_token = 'group_admin'
				  
				} else {
				  group_id = $($("input[name='group']:checked")[0]).val();	
				  dialog_view.group_description = $("#group_description"+group_id).text();
				  dialog_view.group_name = $("#group_name"+group_id).text();
				  dialog_view.page_token = 'system_admin'
				}
				
				dialog_view.group_id = group_id;
            
			} else {
				call_warning = true;
				dialog_view.message2 = 'You must select one group.'
			}			
			
		} else if (button_name == 'Add Members' || button_name == 'Remove Members' || button_name == 'Edit Members') {
			if ($("input[name='group']:checked").length == 1 || $("#groupId").text() != '') {
			  call_modal = false;
			  
			  dialog_view.template_name = 'admin-group-edit-member';
			  dialog_view.title = this.model.get("name");
			  var group_id = '' 
			  
		      if ($("#groupId").text() != '') {
    	    	group_id = $("#groupId").text();
    	    	dialog_view.group_name = $("#group_name").text().trim();
    	    	dialog_view.page_token = 'group_admin'
			  } else {
				group_id = $($("input[name='group']:checked")[0]).val();
				dialog_view.group_name = $("#group_name"+group_id).text();
				dialog_view.page_token = 'system_admin'
			  }		  
			  
			  var url = "" 
				  
			  if (this.model.get("name") == 'Add Members') {
				dialog_view.post_url = '/marvl/groups/admin/group_add_members';	    				  
			    url = "/marvl/ajax/groups/admin/members/add/list/" + group_id;
			    dialog_view.view_type = {'insert_view': true};
			  }
			  
			  if (this.model.get("name") == 'Remove Members') {
				dialog_view.post_url = '/marvl/groups/admin/group_remove_members';	  
		        url = "/marvl/ajax/groups/admin/members/edit/list/" + group_id;
		        dialog_view.view_type = {'delete_view': true}
			  }
			  
			  if (this.model.get("name") == 'Edit Members') {
				dialog_view.post_url = '/marvl/groups/admin/group_add_admins';
				url = "/marvl/ajax/groups/admin/members/edit/list/" + group_id;
				dialog_view.view_type = {'edit_view': true} 	 	  				  
			  }
			
			  var members = new MARVL.Collections.Members();
			  members.url = url;
			  
			  dialog_view.group_id = group_id; 
			  
			  members.fetch({
				success: function() {
				  var index = 0;
				  var member_array = new Array();
				  
				  for (index; index < members.models.length; index++) {
				      member_array[index] = { "name" : members.models[index].get('name'),
					    "id": members.models[index].get('id'),
					    "email":  members.models[index].get('email'),
					    "is_group_admin": members.models[index].get('is_group_admin'),
					    "view_type": dialog_view.view_type
				      };
				  }
				  
				  dialog_view.members = member_array;				  
				  
				  $(modal_dialog_id).append(dialog_view.render().el);    	            	
		    	  $(modal_id).modal();		    	  
			    }
			  });
			
			} else {
			  call_warning = true;
			  dialog_view.message2 = 'You must select one group.'
			}
		} else if (button_name == 'Change Group' || button_name == 'Remove Group') {
			if ($("input[name='instance']:checked").length == 1) {
			  call_modal = false;
			  
			  var instance_id = $($("input[name='instance']:checked")[0]).val();
			  
			  dialog_view.template_name = 'admin-group-edit-instance';
			  dialog_view.title = button_name;
			  dialog_view.instance_name = $("#instance_name_value"+instance_id).text();
			  
			  if (this.model.get("name") == 'Change Group') {
				  dialog_view.post_url = '/marvl/instances/admin/instance_add_group';	    				  
				  url = "/marvl/ajax/instances/admin/groups/add/list/" + instance_id;
				  dialog_view.view_type = {'insert_view': true};
			  }
			  
			  if (this.model.get("name") == 'Remove Group') {
				  dialog_view.post_url = '/marvl/instances/admin/instance_remove_group';	    				  
				  url = "/marvl/ajax/instances/admin/groups/remove/list/" + instance_id;
				  dialog_view.view_type = {'delete_view': true};
			  }
			  
			  var groups = new MARVL.Collections.Groups();
			  groups.url = url;
			  dialog_view.instance_id = instance_id;
			  
			  groups.fetch({
					success: function() {
					  var index = 0;
					  var group_array = new Array();
					  
					  for (index; index < groups.models.length; index++) {
						  group_array[index] = { "name" : groups.models[index].get('name'),
						    "id": groups.models[index].get('id'),
						    "view_type": dialog_view.view_type
					      };
					  }
					  
					  dialog_view.groups = group_array;				  
					  
					  $(modal_dialog_id).append(dialog_view.render().el);    	            	
			    	  $(modal_id).modal();	    	  
				    }
			  });			  
			  
			} else {
			  call_warning = true;    	
			  dialog_view.message2 = 'You must select one instance.'
			}     
		} else if (button_name == 'Add Admin' || button_name == 'Remove Admin') {
			if ($("input[name='user']:checked").length > 0) {
			  var user_ids = new Array(); 
			  var user_names = new Array();
			  
			  for (var index = 0; index < $("input[name='user']:checked").length; index++) {
				  user_ids[index] = $($("input[name='user']:checked")[index]).val();  
			  }				
				
			  dialog_view.title = button_name;
			  dialog_view.template_name = 'admin-user-edit';
			  
			  for(var index = 0; index < user_ids.length; index++) {
				  user_names[index] = $('#user_name_value'+user_ids[index]).text();
			  }
			  
			  if (button_name == 'Add Admin') {
				  dialog_view.post_url = '/marvl/users/admin/user_add_system_admin';
				  dialog_view.view_type = {'insert_view': true};
			  }
			  
			  if (button_name == 'Remove Admin') {
				  dialog_view.post_url = '/marvl/users/admin/user_remove_system_admin';
				  dialog_view.view_type = {'delete_view': true};
			  }			  
			  
			  dialog_view.item_ids = user_ids
			  dialog_view.item_names = user_names
			  
			  
			} else {
				call_warning = true; 	
				dialog_view.message2 = 'You must select at least one user.'	
			}			
		} else if (button_name == 'Approve Request' || button_name == 'Reject Request') {
			  
			  if ($("input[name='request']:checked").length == 0) {
			    call_warning = true;
			    dialog_view.message2 = 'You must select at least one request.'
			  } else {
			
			    dialog_view.title = button_name
			    dialog_view.template_name = 'admin-model-request-form-edit';
			  
			    if (button_name == 'Approve Request') {
			      dialog_view.post_url = '/marvl/model_request_form/approve';
			      dialog_view.view_type = {'approve_view': true};
			    }
			  
			    if (button_name == 'Reject Request') {
			      dialog_view.post_url = '/marvl/model_request_form/reject';
			      dialog_view.view_type = {'reject_view': true};
			    }
			  
			    var request_ids = new Array();		
			    var request_types = new Array();
			    var request_display_ids = new Array();
			    var request_created_bys = new Array();
			    var request_changed_bys = new Array();
			    var modified_times = new Array();
			    var requests = new Array();
			    
			    
			    for (var index = 0; index < $("input[name='request']:checked").length; index++) {
				  request_ids[index] = $($("input[name='request']:checked")[index]).val();  
			    }
			  
			    for(var index = 0; index < request_ids.length; index++) {
			      request_types[index] = $('#request_type'+request_ids[index]).text();
			    }
			  
			    for(var index = 0; index < request_ids.length; index++) {
				  request_display_ids[index] = $('#request_display_id'+request_ids[index]).text();
			    }
			  
			    for(var index = 0; index < request_ids.length; index++) {
				  request_created_bys[index] = $('#request_created_by'+request_ids[index]).text();
			    }	
			    
			    for(var index = 0; index < request_ids.length; index++) {
			    	request_changed_bys[index] = $('#request_changed_by'+request_ids[index]).text();
				 }
			    
			    
			    for(var index = 0; index < request_ids.length; index++) {
			    	modified_times[index] = $('#modified_time'+request_ids[index]).text();
				}
			    			    
			  
			    for(var index = 0; index < request_ids.length; index++) {
				  var request = {id: request_ids[index], display_id:request_display_ids[index], type:request_types[index], createdBy:request_created_bys[index], modifiedTime:modified_times[index], changedBy:request_changed_bys[index]};
				  requests[index] = request;
			    }
			  
			    dialog_view.requests = requests;
			  }
			
		} else if (button_name == 'Edit Map') {
			if ($("input[name='map']:checked").length == 1) {
				 dialog_view.title = 'Edit User Group Map'
				 dialog_view.template_name = 'admin-user-map-edit';	  
				 dialog_view.post_url = '/marvl/users/map/admin/edit'
				
				 call_modal = false;
 			     var groups = new MARVL.Collections.Groups();
				 groups.url = "/marvl/ajax/groups/list";		  
					
				 var map_id = $($("input[name='map']:checked")[0]).val();
				 var email = $("#email" + map_id).text();
				 var group_id = $("#group_id" + map_id).text();
				 var is_admin = $("#is_admin" + map_id).text();
				 
				 $.when(groups.fetch()).done(function(){
		              var group_array = new Array();
					  
					  for (index=0; index < groups.models.length; index++) {
						selected = false;
												
						if (group_id == groups.models[index].get('id')) {
							selected = true;	
						}
						  
					    group_array[index] = { "name" : groups.models[index].get('name'),
						    "id": groups.models[index].get('id'), "selected": selected
						};
					  }
						 
				      dialog_view.groups = group_array;
				      dialog_view.email = email
				      dialog_view.map_id = map_id
				      
				      if (is_admin == 'Yes' || is_admin == 'yes') {
				    	  dialog_view.is_admin = true;				    	  
				      } else {
				    	  dialog_view.is_admin = false;				    	  
				      }
				      
				      dialog_view.view_type = {'edit_view': true};
				      
				      $(modal_dialog_id).append(dialog_view.render().el);
		  	    	  $(modal_id).modal();
				 });	 
			 } else {
				 call_warning = true;
				 dialog_view.message2 = 'You must select at least one map to edit.'
			 }
			
		} else if (button_name == 'Create Map') {
    	  call_modal = false;
    	  dialog_view.title = 'Create User Group Map'
    	  dialog_view.template_name = 'admin-user-map-edit';
    	  dialog_view.post_url = '/marvl/users/map/admin/create';
    	  
    	  var groups = new MARVL.Collections.Groups();
		  groups.url = "/marvl/ajax/groups/list";		  
			
		  $.when(groups.fetch()).done(function(){
              var group_array = new Array();
			  
			  for (index=0; index < groups.models.length; index++) {
			    group_array[index] = { "name" : groups.models[index].get('name'),
				    "id": groups.models[index].get('id')
				};
			  }
				 
		      dialog_view.groups = group_array;  
		      dialog_view.view_type = {'insert_view': true};
		      
		      $(modal_dialog_id).append(dialog_view.render().el);
  	    	  $(modal_id).modal();
		  });
		  
		} else if (button_name == 'Submit Request') {
		  call_modal = false;
		  dialog_view.title = 'Submit Request'
		  dialog_view.template_name = 'model-request-form';
		  dialog_view.post_url = '/marvl/model_request_form/submit';
		  
		  var groups = new MARVL.Collections.Groups();
		  groups.url = "/marvl/ajax/groups/list";
		  
		  var instanceTypes = new MARVL.Collections.InstanceTypes();	
		  
		  $.when(groups.fetch(),instanceTypes.fetch()).done(function(){
			 
		  	 var group_array = new Array();
			  
			 for (index=0; index < groups.models.length; index++) {
				  group_array[index] = { "name" : groups.models[index].get('name'),
				    "id": groups.models[index].get('id')
			      };
			 }
			 
			 dialog_view.groups = group_array;	 
			  
		  	 var instance_type_array = new Array();
			 for (index=0; index < instanceTypes.models.length; index++) {
			   instance_type_array[index] = { "name" : instanceTypes.models[index].get('name'),
					    "id": instanceTypes.models[index].get('id')
			   };
			 }		   
			   
			 dialog_view.instance_types = instance_type_array;
			  
			 $(modal_dialog_id).append(dialog_view.render().el);
	    	 $(modal_id).modal();
	    	 
		  });
		  		 
		} else if (button_name == 'Send Message') {
		  call_modal = false;
			
		  dialog_view.title = 'Send Message'
		  dialog_view.template_name = 'message-send';
		  dialog_view.post_url = '/marvl/message/send';
		  
		  var groups = new MARVL.Collections.Groups();
		  url = "/marvl/messages/groups/list"
		  groups.url = url;
		  
		  groups.fetch({
				success: function() {
			      url = '/marvl/messages/users/list';
			      var members = new MARVL.Collections.Members();
			      members.url = url;
			      
			      members.fetch({
			        success: function() {
			    	  var group_array = new Array();
			    	  var member_array = new Array();
			    	  
			    	  for (index=0; index < groups.models.length; index++) {
						  group_array[index] = { "name" : groups.models[index].get('name'),
						    "id": groups.models[index].get('id')
					      };
					  }
			    	  
			    	  for (index=0; index < members.models.length; index++) {
			    		  member_array[index] = { "name" : members.models[index].get('name'),
						    "id": members.models[index].get('id')
					      };
					  }
			    	  
			    	  dialog_view.groups = group_array;
			    	  dialog_view.members = member_array;			    	  
			    	  
			    	  $(modal_dialog_id).append(dialog_view.render().el);
			    	  $(modal_id).modal();
			        }
			      });	    	  
			    }
		  });	  
		}			
		
		if (call_warning) {
		  dialog_view.title = 'Warning'
		  dialog_view.template_name = 'modal-warning';
		}
		
		if (call_modal) {  	  
    	  $(modal_dialog_id).append(dialog_view.render().el);    	            	
    	  $(modal_id).modal();
    	}
        
        /*if ($("input[name='group']:checked").length > 0) {
    	  alert($($("input[name='group']:checked")[0]).val());
    	} else {
    	  alert("Please select at least one group");	
    	}*/
      
    },
			
	render: function() {       
	  //this.el = this.template(this.model.toJSON());
      
      this.$el.html(this.template(this.model.toJSON()));
      
      this.className = this.className + ' ' + this.model.get("color") + ' ' + this.model.get("size")
      this.$el.addClass(this.className);
      
	  return this;
    }
});

MARVL.Views.Admin.Buttons = Backbone.View.extend({
	tagName: 'div',
	className: 'application-box',
	
	render: function() {
	  this.collection.each(function(button) {
		  var button_view;
		  
		  button_view = new MARVL.Views.Admin.Button({model: button});
				  
		  this.$el.append(button_view.render().$el);
	 
	  }, this);
	  
	  return this;
    }
});