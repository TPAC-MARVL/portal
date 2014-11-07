MARVL.Models.ModelRequest = Backbone.Model.extend({
	defaults: {
	  type: "Not, specified",
	  request_id: "Not, specified",
      id: "Not specified",
      description: "Not specified",
      createdBy: "Not specified",
      createdTime: "Not specified",
      status: "Not specified",
      notes: "Not specified",
      show_checkbox: "Not specified",
      show_created_by: "Not specified",
      modifiedTime: "Not specified",
      changedBy: "Not specified"
    }
});

MARVL.Collections.ModelRequests = Backbone.Collection.extend({
	url: '/marvl/ajax/model_request/list/1',
	model: MARVL.Models.ModelRequest,
	
	parse: function(response) {
	  return response.requests;
	}
});

MARVL.Views.Modals.Model_Request_Details = Backbone.View.extend({
	tagName: 'div',
	
	initialize: function(){
      this.template = Handlebars.templates['model-request-details-modal']
    },
			
	render: function() {    	
	  this.$el.html( this.template(this.model.toJSON()));
	  return this;
    }
});

MARVL.Views.ModelRequest = Backbone.View.extend({
	tagName: 'tr',
	
	initialize: function(){
      this.template = Handlebars.templates['model-request-list']
    },
			
	render: function() {       
	  this.$el.html( this.template(this.model.toJSON()));
	  
	  return this;
    }
});

MARVL.Views.ModelRequests = Backbone.View.extend({
	tagName: 'tbody',
	
	render: function() {
	  this.collection.each(function(request) {
		  var model_request_view;
		  
		  if (this.view_case == "model request list table") {
			  model_request_view = new MARVL.Views.ModelRequest({model: request});
		  }
		  
		  if (this.view_case == "model request modal details") {
			  model_request_view = new MARVL.Views.Modals.Model_Request_Details({model: request});	  
		  }
		  
		  this.$el.append(model_request_view.render().el);
	 
	  }, this);
	  
	  return this;
    }
});

$(document).ready(function() {
	  url = '/marvl/ajax/model_request/list/1';
	  css_id = 'pagination_model_request';
	  table_id = '#model-request-list-table';
		  
	 
	  load_model_requests(url, css_id, table_id);	  
	  
	  /*url = "/marvl/ajax/messages/sent/list/1";
	  css_id = 'pagination_message_sent'
	  table_id = '#message-sent-list-table'		  
	 
	  load_messages(url, css_id, table_id);*/

});

function load_model_requests(url, css_id, table_id) {
	
	 var page_metadatas_model_request = new MARVL.Collections.Page_Metadatas();

	 page_metadatas_model_request.url = url;
	 page_metadatas_model_request.css_id = css_id;
	  
	 page_metadatas_model_request.update_items = function() {
	      
		  var modelRequests = new MARVL.Collections.ModelRequests();
		 
		  modelRequests.url = this.url;

		  modelRequests.fetch({
			success: function() {
			      var model_requests_list_view = new MARVL.Views.ModelRequests({
			        collection: modelRequests,
			        tagName: 'tbody'
			      });
			      
			      model_requests_list_view.view_case = "model request list table";
			      $(table_id).find('tbody').remove();
			      $(table_id).append(model_requests_list_view.render().el);		      
		    
				  var model_requests_list_view = new MARVL.Views.ModelRequests({
					    collection: modelRequests,
					    tagName: 'div'
					  });
			      
			      model_requests_list_view.view_case = "model request modal details";
				  $('#request-details-modal').empty();
				  $('#request-details-modal').append(model_requests_list_view.render().el);
		    }	  
		  });
	  };
	    
	  page_metadatas_model_request.update_items()
	  
	  page_metadatas_model_request.fetch({
	    success: function() {
	      update_pagination(css_id, page_metadatas_model_request);
	    }		
	  });	
}