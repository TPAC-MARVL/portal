MARVL.Views.Admin.Instance = Backbone.View.extend({
	tagName: 'tr',
	
	initialize: function(){
      this.template = Handlebars.templates['admin-instance-list']
    },
			
	render: function() {       
	  this.$el.html( this.template(this.model.toJSON()));
	  
	  return this;
    }
});

MARVL.Views.Admin.Instances = Backbone.View.extend({
	tagName: 'tbody',
	
	render: function() {
	  this.collection.each(function(instance) {
		  var instance_view = new MARVL.Views.Admin.Instance({model: instance});

		  this.$el.append(instance_view.render().el);
	 
	  }, this);
	  
	  return this;
    }
});


$(document).ready(function() {

	if ($("#is_admin") == "True") {
	  url = "/marvl/ajax/instances/admin/list/1";  		  
	} else {
	  url = "/marvl/ajax/instances/user/list/1"; 
	}  
	
	
    
    
    
    var page_metadatas_admin_instances = new MARVL.Collections.Page_Metadatas();

    page_metadatas_admin_instances.url = url;
    page_metadatas_admin_instances.css_id = 'pagination_admin_instances';
    
    page_metadatas_admin_instances.update_items = function() {
  	var instances = new MARVL.Collections.Instances();
  	
  	instances.url = this.url;

  	instances.fetch({
		  success: function() {
		    var instances_list_view = new MARVL.Views.Admin.Instances({
		        collection: instances,
		        tagName: 'tbody'
		    });
		      
		    $('#admin-instances-list-table').find('tbody').remove();
		    $('#admin-instances-list-table').append(instances_list_view.render().el);      
	      }
	    });     
    };
    
    page_metadatas_admin_instances.update_items()
    
    page_metadatas_admin_instances.fetch({
	    success: function() {
	      update_pagination('pagination_admin_instances', page_metadatas_admin_instances);
	    }		
	  });

	});