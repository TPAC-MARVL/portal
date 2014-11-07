MARVL.Views.Instance = Backbone.View.extend({
	tagName: 'tr',
	
	initialize: function(){
      this.template = Handlebars.templates['mygroup-instances-list']
    },
			
	render: function() {       
	  this.$el.html( this.template(this.model.toJSON()));
	  
	  return this;
    }
});

MARVL.Views.Instances = Backbone.View.extend({
	tagName: 'tbody',
	
	render: function() {
	  this.collection.each(function(instance) {
		  var instance_view;
		  
		  if (this.view_case == "instance list table") {
			  instance_view = new MARVL.Views.Instance({model: instance});
		  }
		  
		  if (this.view_case == "instance modal details") {
			  instance_view = new MARVL.Views.Modals.Instance_Details({model: instance});
		  }
		  
		  this.$el.append(instance_view.render().el);
	 
	  }, this);
	  
	  return this;
    }
});

MARVL.Views.Modals.Instance_Details = Backbone.View.extend({
	tagName: 'div',
	
	initialize: function(){
      this.template = Handlebars.templates['mygroup-instance-details-modal']
    },
			
	render: function() {    	
	  this.$el.html( this.template(this.model.toJSON()));
	  return this;	  
    }
});

$(document).ready(function() {
  var group_id = $("#groupId").html();

  url = "/marvl/ajax/groups/my_group/instances/list/" + group_id + "/1";
  var page_metadatas_instance = new MARVL.Collections.Page_Metadatas();

  page_metadatas_instance.url = url;
  page_metadatas_instance.css_id = 'pagination_instance';
  
  page_metadatas_instance.update_items = function() {
      
	  var instances = new MARVL.Collections.Instances();
	 
	  instances.url = this.url;

	  instances.fetch({
		success: function() {
		      var instances_list_view = new MARVL.Views.Instances({
		        collection: instances,
		        tagName: 'tbody'
		      });
		      
			  instances_list_view.view_case = "instance list table";
		      $('#instances-list-table').find('tbody').remove();
		      $('#instances-list-table').append(instances_list_view.render().el);
		      
		      var instances_modal_details_view = new MARVL.Views.Instances({
		        collection: instances,
		        tagName: 'div'
		      });
		        
		      instances_modal_details_view.view_case = "instance modal details";
		      $('#instance-details-modal').empty();
		      $('#instance-details-modal').append(instances_modal_details_view.render().el);      
	    }
	  });  
	  
  };
    
  page_metadatas_instance.update_items()
  
  page_metadatas_instance.fetch({
    success: function() {
      update_pagination('pagination_instance', page_metadatas_instance);
    }		
  });

}); 