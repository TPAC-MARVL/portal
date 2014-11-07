MARVL.Models.Message = Backbone.Model.extend({
	defaults: {
      title: "Not specified",
	  content: "Not specified",
      createdBy: "Not specified",
      createdTime: "Not specified",
      sentTo: "Not specified"
    }
});

MARVL.Collections.Messages = Backbone.Collection.extend({
	url: '/marvl/ajax/messages/inbox/list/1',
	model: MARVL.Models.Message,
	
	parse: function(response) {
	  return response.messages;
	}
});

MARVL.Views.Message = Backbone.View.extend({
	tagName: 'tr',
	
	initialize: function(){
      this.template = Handlebars.templates['message-list']
    },
			
	render: function() {       
	  this.$el.html( this.template(this.model.toJSON()));
	  
	  return this;
    }
});

MARVL.Views.Messages = Backbone.View.extend({
	tagName: 'tbody',
	
	render: function() {
	  this.collection.each(function(message) {
		  var message_view;
		  
		  if (this.view_case == "message list table") {
			  message_view = new MARVL.Views.Message({model: message});
		  }
		  
		  this.$el.append(message_view.render().el);
	 
	  }, this);
	  
	  return this;
    }
});

$(document).ready(function() {
	  url = "/marvl/ajax/messages/inbox/list/1";
	  css_id = 'pagination_message'
	  table_id = '#message-list-table'
		  
	 
	  load_messages(url, css_id, table_id);	  
	  
	  url = "/marvl/ajax/messages/sent/list/1";
	  css_id = 'pagination_message_sent'
	  table_id = '#message-sent-list-table'		  
	 
	  load_messages(url, css_id, table_id);

});

function load_messages(url, css_id, table_id) {
	
	 var page_metadatas_message = new MARVL.Collections.Page_Metadatas();

	  page_metadatas_message.url = url;
	  page_metadatas_message.css_id = css_id;
	  
	  page_metadatas_message.update_items = function() {
	      
		  var messages = new MARVL.Collections.Messages();
		 
		  messages.url = this.url;

		  messages.fetch({
			success: function() {
			      var messages_list_view = new MARVL.Views.Messages({
			        collection: messages,
			        tagName: 'tbody'
			      });
			      
			      messages_list_view.view_case = "message list table";
			      $(table_id).find('tbody').remove();
			      $(table_id).append(messages_list_view.render().el);		      
		    }
		  });  
		  
	  };
	    
	  page_metadatas_message.update_items()
	  
	  page_metadatas_message.fetch({
	    success: function() {
	      update_pagination(css_id, page_metadatas_message);
	    }		
	  });	
}