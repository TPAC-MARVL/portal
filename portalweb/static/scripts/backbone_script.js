MARVL.Models.Member = Backbone.Model.extend({
	defaults: {
      organization: "Not specified",
	  aaf: "Not specified",
      name: "Not specified",
      email: "Not specified"   
    }
});

MARVL.Models.Page_Metadata = Backbone.Model.extend({
    defaults: {
	  total_page: "Not specified",
	  current_page: "Not specified",
	  iterms_per_page: "Not specified",
	  total_items: "Not specified"
    }	
});

MARVL.Models.Page = Backbone.Model.extend({
    defaults: {
	  page_number: "Not specified",
	  current_page: "Not specified"
    }
});

MARVL.Collections.Page_Metadatas = Backbone.Collection.extend({
	url: '/marvl/ajax/groups/my_group/members/list/1',
	model: MARVL.Models.Page_Metadata,
	
	parse: function(response) {
	  return response.page_metadata;
	}
});

MARVL.Collections.Pages = Backbone.Collection.extend({
	url: '/marvl/ajax/groups/my_group/members/list/1',
	model: MARVL.Models.Page,
	
	parse: function(response) {
	  return response.pages;
	}
});

MARVL.Views.Page = Backbone.View.extend({
	tagName: 'li',
	previous: '0',
	next: '0',
	total_page: '0',
	
	initialize: function(){
      this.template = Handlebars.templates['pagination']
    },
    
    events: {
      'click' : 'click_action'
    },

    click_action: function() {
    	
      if (this.model.get('current_page') != '1') {	
        page_number = this.model.get('page_number');
    	  
        if (this.previous == '1') {
    	  if (page_number > 1) {
            page_number = parseInt(page_number) - 1;  
    	  }
    	} else if (this.next == '1') {
          if (page_number < this.total_page) {
            page_number = parseInt(page_number) + 1;
          }    	    	  
    	}    	  
        
        window.members.url = '/marvl/ajax/groups/my_group/members/list/' + page_number;
        window.members.fetch({
            success: function() {
              update_members();
            }			
        });
        
        window.page_metadatas.url = '/marvl/ajax/groups/my_group/members/list/' + page_number;
        window.page_metadatas.fetch({
          success: function() {
            update_pagination();
          }			
        });
      }
    },
	
	render: function() {
    	
      if (this.previous == '1') {
    	  this.$el.html('<a href="#">&laquo;</a>'); 
      } else if (this.next == '1') {
    	  this.$el.html('<a href="#">&raquo;</a>');    	    	  
      } else {
    	this.$el.html(this.template({"page": this.model.get('page_number')}));
      
        if (this.model.get('current_page') == '1') {
          this.$el.addClass("active");
        }
      }
      
  	  return this;
  	  
    }
});

MARVL.Views.Page_Metadata = Backbone.View.extend({
	tagName: 'span',
	
	initialize: function(){
      this.template = Handlebars.templates['pagination_metadata']
    },
	
	render: function() {
	  	
 	  this.collection.each(function(page_metadata) {	  

 	    current_page = parseInt(page_metadata.get("current_page"));  
 		iterms_per_page = parseInt(page_metadata.get("iterms_per_page"));
 		total_page = parseInt(page_metadata.get("total_page"));
 		total_items = parseInt(page_metadata.get("total_items"));
 		
 		start = current_page * iterms_per_page - iterms_per_page +1
 		 		 		
 		
 		if (current_page == total_page) {
 		  end = total_items;	
 		} else {
  		  end = start + iterms_per_page - 1
 		}
 		
 		this.$el.html( this.template({"start": start,"end": end, "total_items":page_metadata.get("total_items")}) );    
         			
	  }, this);
    }	
});


MARVL.Views.Pages = Backbone.View.extend({
	tagName: 'ul',
	
	render: function() {
	    page_number = '';
    	total_page = this.collection.models.length;
	    for (i = 0; i < total_page; i++) {
	      if (this.collection.models[i].get('current_page') == '1') {
	    	page_number = this.collection.models[i].get('page_number');
	        break;	  
	      }
        }
	
	    previous_page = new MARVL.Models.Page();
	    previous_page.set({'current_page':'0', 'page_number': page_number});	    
	    
	    previous_page_view = new MARVL.Views.Page({model:previous_page});
	    previous_page_view.previous = '1';
	    previous_page_view.total_page = total_page;
	    
    	this.$el.append(previous_page_view.render().el);    	
    	
    	this.collection.each(function(page) {
        
          page_view = new MARVL.Views.Page({model: page});
          
		  this.$el.append(page_view.render().el);
				
	    }, this);
	
    	next_page = new MARVL.Models.Page();
	    next_page.set({'current_page':'0', 'page_number': page_number});
    	
    	next_page_view = new MARVL.Views.Page({model: next_page});
    	next_page_view.next = '1';
    	next_page_view.total_page = total_page;
    	    	
    	this.$el.append(next_page_view.render().el);   
    }
});

MARVL.Collections.Members = Backbone.Collection.extend({
	url: '/marvl/ajax/groups/my_group/members/list/1',
	model: MARVL.Models.Member,
	
	parse: function(response) {
	  return response.members;
	}
});

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

var members = new MARVL.Collections.Members();

members.fetch({
	success: function() {
	    update_members();      
    }
});

/*var pages = new MARVL.Collections.Pages();

pages.fetch({
	success: function() {
	  var pages_view = new MARVL.Views.Pages({
	    collection: this.pages,
        tagName: 'ul'
	  });	  
		  
	  pages_view.render();
	  pages_view.$el.addClass("pagination");
	  	  
	  $('#pagination').append(pages_view.el);
	  //$('#pagination').append('<span class="total-page">View 11 - 20 of 23</span>');
    }	
});*/

var page_metadatas = new MARVL.Collections.Page_Metadatas();

page_metadatas.fetch({
  success: function() {
    update_pagination();
  }		
});

function update_members() {
	var membersView = new MARVL.Views.Members({
        collection: members,
        tagName: 'tbody'
      });
      
      membersView.view_case = "member list table";
      $('#members-list-table').find('tbody').remove();
      $('#members-list-table').append(membersView.render().el);
      
      var membersView = new MARVL.Views.Members({
        collection: this.members,
        tagName: 'div'
      });
        
      membersView.view_case = "member modal details";
      $('#member-details-modal').empty();
      $('#member-details-modal').append(membersView.render().el);
         
      var membersView = new MARVL.Views.Members({
          collection: this.members,
          tagName: 'div'
      });
      
      membersView.view_case = "member modal delete";
      $('#member-delete-modal').empty();
      $('#member-delete-modal').append(membersView.render().el); 
}

function update_pagination() { 

    var pages = new MARVL.Collections.Pages();
	
	total_page = parseInt(page_metadatas.models[0].get('total_page'));
	current_page = parseInt(page_metadatas.models[0].get('current_page'));
		
	for (i = 1; i <= total_page; i++) {
	  var page = new MARVL.Models.Page();
	  page.set({'page_number':i});
	  
	  if (current_page == i) {
	    page.set({"current_page": '1'});	  
	  } else {
		page.set({"current_page": '0'});  
	  }
	  
	  pages.add(page);
	}
	
	var pages_view = new MARVL.Views.Pages({
	    collection: pages,
        tagName: 'ul'
	});
	
	pages_view.render();
	pages_view.$el.addClass("pagination");
	$('#pagination').empty();
	$('#pagination').append(pages_view.el);
	
	var page_metadata_view = new MARVL.Views.Page_Metadata({
      	collection: page_metadatas
    });	
    
    page_metadata_view.render();
	page_metadata_view.$el.addClass("total-page");
	$('#pagination').append(page_metadata_view.el); 
}