MARVL.Views.Admin.User = Backbone.View.extend({
	tagName: 'tr',
	
	initialize: function(){
      this.template = Handlebars.templates['admin-user-list']
    },
			
	render: function() {       
	  this.$el.html( this.template(this.model.toJSON()));
	  
	  return this;
    }
});

MARVL.Views.Admin.Users = Backbone.View.extend({
	tagName: 'tbody',
	
	render: function() {
	  this.collection.each(function(user) {
		  var user_view = new MARVL.Views.Admin.User({model: user});

		  this.$el.append(user_view.render().el);
	 
	  }, this);
	  
	  return this;
    }
});

$(document).ready(function() {

    url = "/marvl/ajax/users/admin/list/1";
    var page_metadatas_admin_users = new MARVL.Collections.Page_Metadatas();

    page_metadatas_admin_users.url = url;
    page_metadatas_admin_users.css_id = 'pagination_admin_users';
    
    page_metadatas_admin_users.update_items = function() {
  	var users = new MARVL.Collections.Members();
  	
  	users.url = this.url;

  	users.fetch({
		  success: function() {
		    var users_list_view = new MARVL.Views.Admin.Users({
		        collection: users,
		        tagName: 'tbody'
		    });
		      
		    $('#admin-users-list-table').find('tbody').remove();
		    $('#admin-users-list-table').append(users_list_view.render().el);      
	      }
	    });     
    };
    
    page_metadatas_admin_users.update_items()
    
    page_metadatas_admin_users.fetch({
	    success: function() {
	      update_pagination('pagination_admin_users', page_metadatas_admin_users);
	    }		
	  });

});