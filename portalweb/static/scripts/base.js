window.MARVL = {
    Models: {
	    Admin: {}
    },
    Collections: {
    	Admin: {}    	
    },
    Views: {
    	Modals: {},
    	Admin: {}
    }
};

MARVL.Models.Page = Backbone.Model.extend({
    defaults: {
	  page_number: "Not specified",
	  current_page: "Not specified"
    }
});

MARVL.Collections.Pages = Backbone.Collection.extend({
	model: MARVL.Models.Page,
	
	parse: function(response) {
	  return response.pages;
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

MARVL.Views.Page = Backbone.View.extend({
	tagName: 'li',
	previous: '0',
	next: '0',
	total_page: '0',
	page_metadatas: '',
	
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
        
        /*window.members.url = '/marvl/ajax/groups/my_group/members/list/' + page_number;
        window.members.fetch({
            success: function() {
              update_members();
            }			
        });*/
        
        var page = this;
       
        url = removeLastSlash(this.page_metadatas.url);
        this.page_metadatas.url = url + '/' + page_number;
        
        this.page_metadatas.update_items();
        
        
		this.page_metadatas.fetch({
          success: function() {
			 update_pagination(page.page_metadatas.css_id, page.page_metadatas);
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

MARVL.Views.Pages = Backbone.View.extend({
	tagName: 'ul',
	page_metadatas: '',
	
	render: function() {
	    page_number = '';
    	total_page = this.collection.models.length;
	    
    	if (total_page != 0) {
    	
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
	      previous_page_view.page_metadatas = this.page_metadatas;
	    	    
    	  this.$el.append(previous_page_view.render().el);    	
    	}
    	
    	this.collection.each(function(page) {
        
          page_view = new MARVL.Views.Page({model: page});
          page_view.page_metadatas = this.page_metadatas;
          
		  this.$el.append(page_view.render().el);
				
	    }, this);
	
    	if (total_page != 0) {
    	
    	  next_page = new MARVL.Models.Page();
	      next_page.set({'current_page':'0', 'page_number': page_number});
    	
    	  next_page_view = new MARVL.Views.Page({model: next_page});
    	  next_page_view.next = '1';
    	  next_page_view.total_page = total_page;
    	  next_page_view.page_metadatas = this.page_metadatas;
    	
    	  this.$el.append(next_page_view.render().el);   
    	}
    }
});

MARVL.Collections.Page_Metadatas = Backbone.Collection.extend({
	model: MARVL.Models.Page_Metadata,
	
	parse: function(response) {
	  return response.page_metadata;
	}
});

MARVL.Views.Page_Metadata = Backbone.View.extend({
	tagName: 'span',
	
	initialize: function() {
      this.template = Handlebars.templates['pagination_metadata']
    },
	
	render: function() {
	  	
 	  this.collection.each(function(page_metadata) {	  

 	    current_page = parseInt(page_metadata.get("current_page"));  
 		iterms_per_page = parseInt(page_metadata.get("iterms_per_page"));
 		total_page = parseInt(page_metadata.get("total_page"));
 		total_items = parseInt(page_metadata.get("total_items"));
 		
 		if (total_items == 0) {
 		  start = 0;
 		  end = 0;
 		  
 		} else {
 		
 		  start = current_page * iterms_per_page - iterms_per_page +1
 				
 		  if (current_page == total_page) {
 		    end = total_items;	
 		  } else {
  		    end = start + iterms_per_page - 1
 		  }
 		}
 		
 		this.$el.html( this.template({"start": start,"end": end, "total_items":page_metadata.get("total_items")}) );    
         			
	  }, this);
    }	
});

function update_pagination(id, page_metadatas) { 

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
	
	if (pages_view.collection.models.length > 0) {
	
	  pages_view.page_metadatas = page_metadatas;
	  pages_view.render();
	  pages_view.$el.addClass("pagination");
	  $('#'+id).empty();
	  $('#'+id).append(pages_view.el);
	
	  var page_metadata_view = new MARVL.Views.Page_Metadata({
      	collection: page_metadatas
      });
    
      page_metadata_view.render();
	  page_metadata_view.$el.addClass("total-page");
	  $('#'+id).append(page_metadata_view.el);
	} else {
	  $('#' + page_metadatas.css_id).append("No Items Available");
	}
}

MARVL.Models.Member = Backbone.Model.extend({
	defaults: {
	  id: "Not specified",
      organization: "Not specified",
	  aaf: "Not specified",
      name: "Not specified",
      email: "Not specified",
      is_group_admin: "Not specified",
      is_system_admin: "Not specified",
      groups: 'Not specified'
    }
});

MARVL.Collections.Members = Backbone.Collection.extend({
	model: MARVL.Models.Member,
	
	parse: function(response) {
	  return response.members;
	}
});

MARVL.Models.Instance = Backbone.Model.extend({
	defaults: {
      name: "Not specified",
	  type: "Not specified",
      state: "Not specified",
      group: 'Not specified',
      created: 'Not specified',
      ip:'Not specified',
      url:'Not specified',
      visibility: 'Not specified'
    }
});

MARVL.Collections.Instances = Backbone.Collection.extend({
	model: MARVL.Models.Instance,
	
	parse: function(response) {
	  return response.instances;
	}
});

MARVL.Models.Group = Backbone.Model.extend({
	defaults: {
	  id: "Not specified",
      name: "Not specified",
      group_admin: "Not specified",
      total_members: "Not specified",
      total_models: 'Not specified',
      created: 'Not specified',
      description: 'Not specified'
    }
});

MARVL.Collections.Groups = Backbone.Collection.extend({
	model: MARVL.Models.Group,
	
	parse: function(response) {
	  return response.groups;
	}
});

function removeLastSlash(url) {
    url_parts = url.split('/');
	result = ""
	
    for (i = 0; i < url_parts.length - 1; i++) {
        if (url_parts[i] != "") {
          result = result + '/' + url_parts[i];
        }	
    }
    
    return result;
}