import urllib

import socket
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError

from django.http import HttpResponseRedirect
from django.contrib import messages

from django.views.generic import TemplateView
from django.views.generic.detail import BaseDetailView
from django.views.generic.edit import ProcessFormView

from ..services.instanceservice import InstanceService
from ..cloud.entities.instance import InstanceState
from ..forms.instanceform import InstanceForm
from ..configmanager import ConfigManager
from mixin.jsonresponsemixin import JSONResponseMixin
from portalweb.system.message import MessageManager

from ..services.processservice import ProcessService
from ..models.process import ProcessStatus

from base import BaseController
from base import AjaxBaseController

class InstanceSecurityVerifyController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:    
            instance_id = int(self.args[0])
            user_id = int(self.args[1])
            token = self.args[2]
            
            success = self._security_token_service.verify_instance_security_token(instance_id, user_id, token)
                        
            context = {'results' : success}
            return self.render_to_response(context)     

class InstanceAdminEditInstanceController(ProcessFormView, AjaxBaseController):
    success_url ="/marvl/instances/admin"
    
    def post(self, request, *args, **kwargs):  
        if request.method == 'POST':
            url_path = request.get_full_path()
            
            if 'remove' in url_path:
                instance_ids = request.POST.getlist("instance_ids")
            
                token = self._instanceService.removeInstancesDB(instance_ids)
                
            else:
                user = self.request.session.get("user")
                
                name = request.POST["instance_name"]
                ip = request.POST["instance_ip"]
                url = request.POST["instance_url"]
                state = request.POST["instance_state"]
                visibility = request.POST["instance_visibility"]  
                instanceType =  request.POST["instance_type"] 
                    
                if name == '':
                    messages.add_message(request, messages.ERROR, 'You must enter a name for a virtual machine.')
                    return HttpResponseRedirect(self.success_url)
                                    
                try:
                    socket.inet_aton(ip)
                except socket.error:
                    messages.add_message(request, messages.ERROR, 'You must enter a valid IP address for a virtual machine.')
                    return HttpResponseRedirect(self.success_url)
                    
                if ip == '':
                    messages.add_message(request, messages.ERROR, 'You must enter a name for a virtual machine.')
                    return HttpResponseRedirect(self.success_url)
                    
                validate = URLValidator()
                    
                try:
                    validate(url)
                except ValidationError:
                    messages.add_message(request, messages.ERROR, 'You must enter a valid URL for a virtual machine.')
                    return HttpResponseRedirect(self.success_url)
                
                if 'add' in url_path:
                    token = self._instanceService.insertInstanceDB(name, user, state, ip, url, visibility, instanceType)
                    
                if 'edit' in url_path:
                    instance_id = None
                    if "instance_id" in request.POST:
                        instance_id = request.POST["instance_id"]
                    
                    if instance_id:
                        token = self._instanceService.editInstanceDB(name, state, ip, url, instance_id, visibility, instanceType)
                    else:
                        messages.add_message(request, messages.ERROR, 'Instance ID cannot be empty.')
                        return HttpResponseRedirect(self.success_url)
            
            
                 
            message = MessageManager.getMessage(token)
                
            messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage()) 
            
            return HttpResponseRedirect(self.success_url)
        
class InstanceAdminEditGroupsController(ProcessFormView, AjaxBaseController):
    success_url ="/marvl/instances/admin"
    
    def post(self, request, *args, **kwargs):   
        if request.method == 'POST':           
            instance_id = request.POST["instance_id"]
            
            #group_id = None
            
            group_ids = request.POST.getlist('group_ids')
            
            '''if "group_id" in request.POST: 
                group_id = request.POST["group_id"]'''
            
            validaton_failed = False
            
            if not group_ids or len(group_ids) == 0:
                validaton_failed = True
                messages.add_message(request, messages.ERROR, 'You must select at least one Group.') 
            
            if not validaton_failed:    
                url_path = request.get_full_path()
                                     
                if 'remove' in url_path:
                    token = self._instance_group_service.delete_instance_group(instance_id = instance_id, group_ids = group_ids)    
                
                #token = self._instanceService.updateInstanceGroup(instance_id, group_id)
                #token = self._instance_group_service.create_instance_group(instance_id, group_id, creator)
                
                if 'add' in url_path:
                    creator = self.request.session.get("user")
                    token = self._instance_group_service.edit_instance_groups(instance_id, group_ids, creator)
             
                message = MessageManager.getMessage(token)
                
                messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())
                
            return HttpResponseRedirect("/marvl/instances/admin")  

class InstanceAdminGroupsListController(JSONResponseMixin, BaseDetailView, AjaxBaseController): 
    
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:    
            instance_id = int(self.args[0])
            
            url_path = request.get_full_path()
            group_list = []
            
            instance = self._instanceService.getInstanceById(instance_id)
            group_ids = self._instance_group_service.get_group_ids_by_insance(instance=instance)
            groups = []
            
            if 'add' in url_path:                                
                if group_ids:  
                    groups = self._groupService.getAllGroups(group_ids)
                else:
                    if instance:
                        if instance.group:
                            groups = self._groupService.getAllGroups([instance.group.id])
                        else:
                            groups = self._groupService.getAllGroups()
            
                for group in groups:
                    name = group.get_default_group_name()                                                      
                    
                    group_list.append({"id": group.id, "name": name}) 
            
            if 'remove' in url_path:   
                if group_ids:
                    groups = self._groupService.getGroupsByIds(group_ids)
                    
                    for group in groups:
                        name = group.get_default_group_name()
                        group_list.append({"id": group.id, "name": name})
                                    
                else:
                    if instance:
                        if instance.group:
                            name = instance.group.get_default_group_name()  
                            group_list.append({"id": instance.group.id, "name": name})
            
            context = {'groups' : group_list}
            return self.render_to_response(context)


class InstanceUserListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            
            current_page = int(self.args[0])
            user = self.request.session.get("user")
                            
            iterms_per_page = self._configManager.getItermsPerPage()
            
            if user.is_admin:
                instances = self._instanceService.getAllInstances(user)
            else:
                instances = self._instance_group_service.getAllowedToViewInstancesByUser(user)
                            
            total_items,total_page,start,end = self.get_pagination_metadata2(iterms_per_page, len(instances), current_page)         
                        
            instances = instances[start-1:end]
            instance_list = []
                  
            for index, instance in enumerate(instances):          
                created = instance.created.strftime('%d-%m-%Y')
                    
                group_name = 'None'
                group_names = []
                                        
                instance_groups = self._instance_group_service.get_instance_groups_by_instance(instance=instance)
                    
                for instance_group in instance_groups:
                    name = instance_group.group.get_default_group_name()
                    group_names.append(name)
                    
                if len(group_names) > 0:
                    group_name = " -|- ".join(group_names) 
                else:
                    if instance.group:
                        group_name = instance.group.get_default_group_name()
                    
                if instance.public:
                    visibility = "public"
                else:
                    visibility = "private"
                           
                instance_list.append({"id": instance.id, "type":instance.type, "name": instance.name,"state": instance.state,"group":group_name,"created":created, "ip":instance.ip, "url":instance.url, "visibility":visibility})
                
                page_metadata = [
                             {
                               'total_page': total_page,
                               'current_page': current_page,
                               'iterms_per_page': iterms_per_page,
                               'total_items': total_items
                             }
                            ]
            
            context = {'page_metadata' : page_metadata, 'instances' : instance_list};        
            return self.render_to_response(context)    


class InstanceUserController(BaseController):
    template_name = "instance/user.html"
    
    def get_context_data(self, **kwargs):
        result = {}
        
        result["current_page"] = "My Model Controls"
        result["current_page_sub_title"] = "(My Model Controls)"
        
        self._add_breadcrumbs('Home', '/marvl/home', True)   
        self._add_breadcrumbs('My Model Controls', '/marvl/instances/user')

        return result


class InstanceAdminController(BaseController):
    template_name = "instance/admin.html"
    
    def get_context_data(self, **kwargs):
        result = {}
        
        result["current_page"] = "Virtual Machines"
        result["current_page_sub_title"] = "(Virtual Machine Manager)"
        
        self._add_breadcrumbs('Home', '/marvl/home', True)   
        self._add_breadcrumbs('Virtual Machine Manager', '/marvl/instances/admin')

        return result


class InstanceHomeController(BaseController, TemplateView):
    template_name = "instance/overview.html"
    
    def get_context_data(self, **kwargs):
        instanceService = InstanceService()
        
        user = self.request.session.get("user")
                 
        result = {}
        result["currentPage"] = "virtualMachines"
        
        # Here, we dynamically add a flag to indicate whether the instance has an active process. 
        if self._configManager.getPhase() == "2":
            instances = instanceService.getInstancesByUserId(user.id)
            processService = ProcessService();
            for instance in instances:
                if processService.hasCurrentProcess(instance.id):
                    instance.hasCurrentProcess = 'true'
                else:
                    instance.hasCurrentProcess = 'false'
            
            result["instances"] = instances
        
            imageDict = self._configManager.getImages()
            typeDict = self._configManager.getUserAllowedFlavors()
        
            instanceForm = InstanceForm(imageDict=imageDict, typeDict=typeDict)
 
            result['instanceForm'] = instanceForm
        else:
            
            instances = self._instanceService.getAllowedToViewInstancesByUser(user)
            
            if len(instances) > 0:
                for i in range(len(instances)):
                    if i == 0:
                        instances[i].tab_active = True
                    else:
                        instances[i].tab_active = False
                        
                result['instances'] = instances  
                result['multiple_tap'] = 'true' 
            else:
                instance_url = self._configManager.getCommonInstance()
                result['instance_url'] = instance_url
                result['multiple_tap'] = 'false'
                  
            '''exclude_group = self._groupService.getUserDefaultGroup(user)
            groups = self._groupService.getUserGroups(user, exclude_group)         
            
            if len(groups) > 0:
                # Assume there is only one group at the moment.
                instances = self._instanceService.getInstancesByGroup(groups[0])         
            
                # Assume there is only one running instances at the moment.
                instance_url = instances[0].url
            else:
                instance_url = self._configManager.getCommonInstance()
            '''                
        result['showFooter'] = False
        result['phase'] = self._configManager.getPhase()
         
        return result

class InstanceCreateController(TemplateView):
    template_name = "instance/create.html"

class InstanceViewController(BaseController):
    template_name = "instance/view.html"
        
    def get_context_data(self, **kwargs):
        result = {}
        instance_id = self.args[0]
        
        instance = self._instanceService.getInstanceFromDB(instance_id)
        user = self.request.session.get("user")
       
        if not instance:
            result['security'] = 'failed'
        elif self._instance_group_service.is_authorized(instance, user):
               
            result["current_page"] = "Model Control"
            result["current_page_sub_title"] = "(" + instance.name  + ")"
        
            # Generate uuid and add this to instance security token
            # security token will be used in trike ui for secuirty check
            security_token = self._security_token_service.set_instance_security_token(instance_id, user)
            
            # prepare url with params
            #params = "?" + 'email=' + user.email + 'username=' + user.name + 'organisation=' + user.name
        
            params = urllib.urlencode({"email":user.email, "username":user.name, "organisation":user.organization, "token":security_token, "user_id":user.id, "instance_id":instance.id})
        
            if instance.url.endswith('/'):
                instance.url_with_params = instance.url + '?' + params;
            else:
                instance.url_with_params = instance.url + '/?' + params;
            
            result["instance"] = instance
        
            #self._add_breadcrumbs('Model Control', '/marvl/instances/view/'+ self.args[0], True)   
            self._add_breadcrumbs('Home', '/marvl/home', True)
            self._add_breadcrumbs(result["current_page_sub_title"], '/marvl/instances/view/'+ instance_id)
        
            result["show_instance_parent_menu"] = True 
        
        else:
            result['security'] = 'failed'
                    
        return result

class InstanceTabViewController(TemplateView):
    template_name = "instance/tab_view.html"

class InstanceLaunchController(ProcessFormView):
    success_url ="instances"
    
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            configManager = ConfigManager()
        
            imageDict = configManager.getImages()
            typeDict = configManager.getUserAllowedFlavors()
            form = InstanceForm(imageDict=imageDict, typeDict=typeDict, postDict=request.POST) # A form bound to the POST data         
                  
            if form.is_valid():
                user = self.request.session.get("user")
                userId = user.id
                
                instanceService = InstanceService()
                imageId = form.data["images"]
                instanceType = form.data["types"]
                name = form.data["name"]
                
                token = instanceService.launchInstance(userId=userId, instanceType=instanceType, imageId=imageId, name=name)
                
                message = MessageManager.getMessage(token)
                
                messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())
            
            else:
                messages.add_message(request, messages.ERROR, 'Virtual Machine Name cannot be empty.')
    
        return HttpResponseRedirect("/marvl/instances")


class InstanceRebootController(TemplateView):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            instanceId = self.args[0]
            instanceService = InstanceService()
            token = instanceService.rebootInstance(instanceId)
            
            message = MessageManager.getMessage(token)
            messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage()) 
        else:
            messages.add_message(request, messages.ERROR, 'Unknown Virtual Machine.')
        
        return HttpResponseRedirect("/marvl/instances")

class InstanceStartController(TemplateView):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            instanceId = self.args[0]
            instanceService = InstanceService()
            token = instanceService.startInstance(instanceId)
            
            message = MessageManager.getMessage(token)
            messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage()) 
        else:
            messages.add_message(request, messages.ERROR, 'Unknown Virtual Machine.')
        
        return HttpResponseRedirect("/marvl/instances")

class InstanceTerminateController(TemplateView):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            instanceId = self.args[0]
            instanceService = InstanceService()
                   
            token = instanceService.terminateInstance(instanceId)
            
            message = MessageManager.getMessage(token)
            messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage()) 
        else:
            messages.add_message(request, messages.ERROR, 'Unknown Virtual Machine.')
        
        return HttpResponseRedirect("/marvl/instances")
   
class InstanceStopController(TemplateView):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            instanceId = self.args[0]
            instanceService = InstanceService()
            token = instanceService.stopInstance(instanceId)
            
            message = MessageManager.getMessage(token)
            messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage()) 
        else:
            messages.add_message(request, messages.ERROR, 'Unknown Virtual Machine.')
            
        return HttpResponseRedirect("/marvl/instances")
    
class InstanceStatusController(JSONResponseMixin, BaseDetailView):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            instanceId = self.args[0]
            instanceService = InstanceService()

            instanceDB = instanceService.getInstanceFromDB(instanceId)
            
            ip_address = ''
            state = ''
            id = ''
                        
            processService = ProcessService()
            
            if processService.hasCurrentProcess(instanceId):
                timeout = processService.getProcessTimeout(instanceId)
                configManager = ConfigManager()
            
                # timeout, if process takes too long
                if timeout < configManager.getTimeout():
                # we need to setup timeout, if the process takes too long.
                    instance = instanceService.getInstanceByInstanceId(instanceId)
                
                    if instance:
                        ip_address = instance.getIpAddress()
                        state = instance.getState()
                        id = instanceId
                    else:
                        state = InstanceState.DELETED
                        id = instanceDB.id
                        ip_address = instanceDB.ip
                         
                    if processService.isProcessFinished(instanceId, state):
                        processService.setProcessFinished(instanceId)
                        processStatus = ProcessStatus.FINISHED
                    else:
                        processStatus = ProcessStatus.PROCESSING
                else:
                    instanceService.setProcessError(instanceId)
                    
                    id = instanceDB.id
                    state = instanceDB.state
                    ip_address = instanceDB.ip
                    processStatus = ProcessStatus.ERROR
                    messages.add_message(request, messages.ERROR, 'The request is failed. Please try again later.')
                    
            else:
                processStatus = ProcessStatus.NO_PROCESS
                ip_address = instanceDB.ip
                state = instanceDB.state
                id = instanceDB.id

            context = {'ipAddress':  ip_address, 'state': state, 'id': id, 'processStatus' : processStatus}  
            return self.render_to_response(context)