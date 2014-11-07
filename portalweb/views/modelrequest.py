from django.views.generic.detail import BaseDetailView
from mixin.jsonresponsemixin import JSONResponseMixin
from django.views.generic.edit import ProcessFormView
from django.http import HttpResponseRedirect
from django.contrib import messages

from portalweb.system.message import MessageManager
from portalweb.models.modelrequest import ModelRequestStatus

from base import BaseController
from base import AjaxBaseController
from portalweb.system.util import Util

class ModelRequestViewController(BaseController):
    template_name = "modelrequest/list.html"
    
    def get_context_data(self, **kwargs):
        
        result = {}
      
        result["current_page"] = "Model Request Form"  
           
        self._add_breadcrumbs('Home', '/marvl/home', True)  
        self._add_breadcrumbs('Model Request', '/marvl/model_request_form/list')
        
        return result

class ModelRequestListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            
            current_page = int(self.args[0])
            user = self.request.session.get("user")
            
            iterms_per_page = self._configManager.getItermsPerPage()
            requests = None
               
            requests = self._modelRequestService.getModelRequestByUser(user)        
               
            total_items,total_page,start,end = self.get_pagination_metadata(iterms_per_page, requests, current_page)         
                        
            requests = requests[start-1:end]
            requests_list = []
                                  
            for request in requests:          
                createdTime = request.created.strftime('%d-%m-%Y')
                modifiedTime = Util.get_time_stamp(request.modified)
                
                show_checkbox = False
                show_created_by = False
                show_changed_by = False
                
                if ModelRequestStatus.get_status(request.status) == ModelRequestStatus.SUBMITTED:
                    show_checkbox = True
                
                created_by = "None"
                changed_by = "None"
                
                if user.is_admin:
                    show_created_by = True
                    created_by = request.creator.name
                    
                    show_changed_by = True
                    if request.changed_by:
                        changed_by = request.changed_by.name  
                
                requests_list.append({"show_changed_by":show_changed_by, "show_created_by":show_created_by, "show_checkbox":show_checkbox, "type":request.type, "request_id": request.request_id, "id": request.id, "description": request.description,"createdBy": created_by, "status": ModelRequestStatus.get_status(request.status).capitalize(),"createdTime":createdTime, "notes":request.notes, "modifiedTime": str(modifiedTime), "changedBy": changed_by})
                
            page_metadata = [
                             {
                               'total_page': total_page,
                               'current_page': current_page,
                               'iterms_per_page': iterms_per_page,
                               'total_items': total_items
                             }
                            ]
            
            
            context = {'page_metadata' : page_metadata, 'requests' : requests_list};        
            return self.render_to_response(context)

class ModelRequestEditController(ProcessFormView, AjaxBaseController):
    success_url = "/marvl/model_request_form/list"
         
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            request_ids = request.POST.getlist('request_ids[]')
            request_modified_times = request.POST.getlist('request_modified_times[]')
            
            notes = request.POST["notes"]
            user = self.request.session.get("user")
            url_path = request.get_full_path()
            token = ""
            
            if "approve" in url_path:
                token = self._modelRequestService.approveModelRequest(request_ids, user, notes, request_modified_times)
                    
            if "reject" in url_path:
                token = self._modelRequestService.rejectModelRequest(request_ids, user, notes, request_modified_times)    
            
            message = MessageManager.getMessage(token)                
            messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())
            
            if "approve" in url_path:
                title, content, receivers = self._notificationService.sendModelRequestApproveNotification(user, request_ids, message.getType())
            
            if "reject" in url_path:
                title, content, receivers = self._notificationService.sendModelRequestRejectNotification(user, request_ids, message.getType())
            
            self._emailService.sendEmail(title, content, receivers)
            
            return HttpResponseRedirect(self.success_url)
     
class ModelRequestSubmitController(ProcessFormView, AjaxBaseController):
    success_url ="/marvl/model_request_form/list"
    
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            
            description = request.POST["description"]
            model_type = request.POST["model_type"]
            group_id = request.POST["group_id"]
            
            validaton_failed = False
        
            if not description:
                validaton_failed = True
                messages.add_message(request, messages.ERROR, 'Description cannot be empty.') 
            else:
                if len(description) > 300:
                    validaton_failed = True
                    messages.add_message(request, messages.ERROR, 'Description cannot have more than 300 characters.')
            
            if not model_type:
                validaton_failed = True
                messages.add_message(request, messages.ERROR, 'You must select one model type.')
            
            if not group_id:
                validaton_failed = True
                messages.add_message(request, messages.ERROR, 'You must select one group.')
            
            
            if not validaton_failed:
                user = self.request.session.get("user")
                token = self._modelRequestService.submitModelRequest(description, user, model_type, group_id)
                              
                message = MessageManager.getMessage(token)                
                messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())
                
                self._emailService.sendModelRequestReceivedEmail(message.getType())                    
                        
            return HttpResponseRedirect(self.success_url)