MARVL.Models.UserMap = Backbone.Model.extend({
	defaults: {
      email: "Not specified",
	  group: "Not specified",
      creator: "Not specified",
      created: "Not specified",
      proved: "Not specified",
      is_admin: "Not specified",
      status: "Not specified",
      show_checkbox: "Not specified",
      group_id: "Not specified",
    }
});

MARVL.Collections.UserMaps = Backbone.Collection.extend({
	url: '/marvl/ajax/users/map/admin/list/1',
	model: MARVL.Models.UserMap,
	
	parse: function(response) {
	  return response.maps;
	}
});

MARVL.Views.UserMap = Backbone.View.extend({
	tagName: 'tr',
	
	initialize: function(){
      this.template = Handlebars.templates['admin-user-map-list']
    },
			
	render: function() {       
	  this.$el.html( this.template(this.model.toJSON()));
	  
	  return this;
    }
});

MARVL.Views.UserMaps = Backbone.View.extend({
	tagName: 'tbody',
	
	render: function() {
	  this.collection.each(function(map) {
		  var map_view;
		  
		  if (this.view_case == "map list table") {
			  map_view = new MARVL.Views.UserMap({model: map});
		  }
		  
		  this.$el.append(map_view.render().el);
	 
	  }, this);
	  
	  return this;
    }
});



$(document).ready(function() {
	  url = "/marvl/ajax/users/map/admin/list/1";
	  var page_metadatas_map = new MARVL.Collections.Page_Metadatas();

	  page_metadatas_map.url = url;
	  page_metadatas_map.css_id = 'pagination_map';
	  
	  page_metadatas_map.update_items = function() {
	      
		  var maps = new MARVL.Collections.UserMaps();
		 
		  maps.url = this.url;

		  maps.fetch({
			success: function() {
			      var map_list_view = new MARVL.Views.UserMaps({
			        collection: maps,
			        tagName: 'tbody'
			      });
			      
			      map_list_view.view_case = "map list table";
			      $('#map-list-table').find('tbody').remove();
			      $('#map-list-table').append(map_list_view.render().el);      
		    }
		  });		  
	  };
	    
	  page_metadatas_map.update_items()
	  
	  page_metadatas_map.fetch({
	    success: function() {
	      update_pagination('pagination_map', page_metadatas_map);
	    }		
	  });
	});