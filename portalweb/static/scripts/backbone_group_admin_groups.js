MARVL.Views.Admin.Group = Backbone.View.extend({
	tagName: 'tr',
	
	initialize: function(){
      this.template = Handlebars.templates['admin-group-list']
    },
			
	render: function() {       
	  this.$el.html( this.template(this.model.toJSON()));
	  
	  return this;
    }
});

MARVL.Views.Admin.Groups = Backbone.View.extend({
	tagName: 'tbody',
	
	render: function() {
	  this.collection.each(function(group) {
		  var group_view;
		  
		  if (this.view_case == "admin group list table") {
			  group_view = new MARVL.Views.Admin.Group({model: group});
		  }
		  
		  /*if (this.view_case == "instance modal details") {
			  instance_view = new MARVL.Views.Modals.Instance_Details({model: instance});
		  }*/
		  
		  this.$el.append(group_view.render().el);
	 
	  }, this);
	  
	  return this;
    }
});

$(document).ready(function() {

	  if ($("#is_admin") == "True") {
	      url = "/marvl/ajax/groups/admin/list/1";	  		  
	  } else {
	      url = "/marvl/ajax/groups/user/list/1";	  
	  }  
	  
	  var page_metadatas_admin_group = new MARVL.Collections.Page_Metadatas();

	  page_metadatas_admin_group.url = url;
	  page_metadatas_admin_group.css_id = 'pagination_admin_group';
      
	  page_metadatas_admin_group.update_items = function() {
    	var groups = new MARVL.Collections.Groups();
    	
    	groups.url = this.url;

  	    groups.fetch({
  		  success: function() {
  		    var groups_list_view = new MARVL.Views.Admin.Groups({
  		        collection: groups,
  		        tagName: 'tbody'
  		    });
  		      
  		    groups_list_view.view_case = "admin group list table";
  		    $('#admin-groups-list-table').find('tbody').remove();
  		    $('#admin-groups-list-table').append(groups_list_view.render().el);      
  	      }
  	    });     
      };
      
      page_metadatas_admin_group.update_items()
      
      page_metadatas_admin_group.fetch({
	    success: function() {
	      update_pagination('pagination_admin_group', page_metadatas_admin_group);
	    }		
	  });

	});