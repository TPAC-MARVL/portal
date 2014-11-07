MARVL.Models.Notification = Backbone.Model.extend({
	defaults: {
      title: "Not specified",
	  content: "Not specified",
      createdBy: "Not specified",
      createdTime: "Not specified"   
    }
});

MARVL.Collections.Notifications = Backbone.Collection.extend({
	url: '/marvl/ajax/notification/list/1',
	model: MARVL.Models.Notification,
	
	parse: function(response) {
	  return response.notifications;
	}
});

MARVL.Views.Notification = Backbone.View.extend({
	tagName: 'tr',
	
	initialize: function(){
      this.template = Handlebars.templates['notification-list']
    },
			
	render: function() {       
	  this.$el.html( this.template(this.model.toJSON()));
	  
	  return this;
    }
});

MARVL.Views.Notifications = Backbone.View.extend({
	tagName: 'tbody',
	
	render: function() {
	  this.collection.each(function(notification) {
		  var notification_view;
		  
		  if (this.view_case == "notification list table") {
			  notification_view = new MARVL.Views.Notification({model: notification});
		  }
		  
		  this.$el.append(notification_view.render().el);
	 
	  }, this);
	  
	  return this;
    }
});

$(document).ready(function() {
	  url = "/marvl/ajax/notification/list/1";
	  var page_metadatas_notification = new MARVL.Collections.Page_Metadatas();

	  page_metadatas_notification.url = url;
	  page_metadatas_notification.css_id = 'pagination_notification';
	  
	  page_metadatas_notification.update_items = function() {
	      
		  var notifications = new MARVL.Collections.Notifications();
		 
		  notifications.url = this.url;

		  notifications.fetch({
			success: function() {
			      var notifications_list_view = new MARVL.Views.Notifications({
			        collection: notifications,
			        tagName: 'tbody'
			      });
			      
			      notifications_list_view.view_case = "notification list table";
			      $('#notification-list-table').find('tbody').remove();
			      $('#notification-list-table').append(notifications_list_view.render().el);		      
		    }
		  });  
		  
	  };
	    
	  page_metadatas_notification.update_items()
	  
	  page_metadatas_notification.fetch({
	    success: function() {
	      update_pagination('pagination_notification', page_metadatas_notification);
	    }		
	  });

	}); 