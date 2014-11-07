MARVL.Models.InstanceType = Backbone.Model.extend({
	defaults: {
	  id: "Not specified",
	  vcpus: "Not specified",
	  rams: "Not specified",
      name: "Not specified",
      createdTime: "Not specified",
      status: "Not specified",
      notes: "Not specified"
    }
});

MARVL.Collections.InstanceTypes = Backbone.Collection.extend({
	url: '/marvl/ajax/model_request_type/list',
	model: MARVL.Models.InstanceType,
	
	parse: function(response) {
	  return response.instance_types;
	}
});