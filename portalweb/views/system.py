from django.views.generic.detail import BaseDetailView
from mixin.jsonresponsemixin import JSONResponseMixin

from base import BaseController
from base import AjaxBaseController

class VirtualMachineTypeListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        instance_types = self._configManager.getInstanceTypes()
                   
        instance_type_list = []
        
        for key, instance_type in instance_types.iteritems():
            instance_type_list.append({"id": instance_type.getSequence(), "name": instance_type.getName(),"rams": instance_type.getRAMs(),"vcpus": instance_type.getVCPUs()})
            
        context = {'instance_types' : instance_type_list}    
              
        return self.render_to_response(context)