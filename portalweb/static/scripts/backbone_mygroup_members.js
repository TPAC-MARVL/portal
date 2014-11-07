MARVL.Views.Members = Backbone.View.extend({
	tagName: 'tbody',
	
	render: function() {
	
	  this.collection.each(function(member) {
		  var member_view;
		  
		  if (this.view_case == "member list table") {
	        member_view = new MARVL.Views.Member({model: member});
		  }
		  
		  if (this.view_case == "member modal details") {
		    member_view = new MARVL.Views.Modals.Member_Details({model: member});
		  }
		  
		  if (this.view_case == "member modal delete") {
		    member_view = new MARVL.Views.Modals.Member_Delete({model: member});
		  }
		  
		  this.$el.append(member_view.render().el);
	 
	  }, this);
	  
	  return this;
    }
});

MARVL.Views.Modals.Member_Details = Backbone.View.extend({
	tagName: 'div',
	
	initialize: function(){
      this.template = Handlebars.templates['mygroup-member-details-modal']
    },
			
	render: function() {    	
	  this.$el.html( this.template(this.model.toJSON()));
	  return this;	  
    }
});

MARVL.Views.Modals.Member_Delete = Backbone.View.extend({
	tagName: 'div',
	
	initialize: function(){
      this.template = Handlebars.templates['mygroup-member-delete-modal']
    },
			
	render: function() {    	
	  this.$el.html( this.template(this.model.toJSON()));
	  return this;	  
    }
});

MARVL.Views.Member = Backbone.View.extend({
	tagName: 'tr',
	
	initialize: function(){
      this.template = Handlebars.templates['mygroup-members-list']
    },
			
	render: function() {       
	  this.$el.html( this.template(this.model.toJSON()));
	  
	  return this;
    }
});

$(document).ready(function() {
  var group_id = $("#groupId").html();
  url = "/marvl/ajax/groups/my_group/members/list/" + group_id + "/1";
	
  var page_metadatas_member = new MARVL.Collections.Page_Metadatas();

  page_metadatas_member.url = url;
  page_metadatas_member.css_id = 'pagination_member';

  page_metadatas_member.update_items = function() {
	  var members = new MARVL.Collections.Members();
	  
	  members.url = this.url;

	  members.fetch({
		success: function() {
		  var membersView = new MARVL.Views.Members({
		        collection: members,
		        tagName: 'tbody'
		  });
		      
		  membersView.view_case = "member list table";
		  $('#members-list-table').find('tbody').remove();
		  $('#members-list-table').append(membersView.render().el);
		      
		  var membersView = new MARVL.Views.Members({
		    collection: members,
		    tagName: 'div'
		  });
		        
		  membersView.view_case = "member modal details";
		  $('#member-details-modal').empty();
		  $('#member-details-modal').append(membersView.render().el);
		         
		  var membersView = new MARVL.Views.Members({
		      collection: members,
		      tagName: 'div'
		  });
		      
		  membersView.view_case = "member modal delete";
		  $('#member-delete-modal').empty();
		  $('#member-delete-modal').append(membersView.render().el);       
	    }
	  });	  
  };
    
  page_metadatas_member.update_items()  
  
  page_metadatas_member.fetch({
    success: function() {
      update_pagination('pagination_member', page_metadatas_member);
    }	
  });

}); 
