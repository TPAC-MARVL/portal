from django.contrib import messages
from django.http import HttpResponseRedirect
from django.views.generic.detail import BaseDetailView
from django.views.generic.edit import ProcessFormView

from mixin.jsonresponsemixin import JSONResponseMixin
from portalweb.system.message import MessageManager

from base import BaseController
from base import AjaxBaseController

class GroupListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):

        user = self.request.session.get("user")
        
        if user.is_admin:
            groups = self._groupService.getAllGroups()
        else:        
            groups = self._groupService.get_groups_by_user(user)              
            
        group_list = []
                     
        for index, group in enumerate(groups):
            name = group.get_default_group_name()         
            
            group_list.append({"id": group.id, "name": name}) 

            
        context = {'groups' : group_list};
                         
        return self.render_to_response(context)   


class GroupRenameController(ProcessFormView, AjaxBaseController):
    success_url ="/marvl/groups/admin"
    
    def post(self, request, *args, **kwargs):        
        if request.method == 'POST':
                       
            group_name = request.POST["group_name"]
            group_id = request.POST["group_id"]
            group_description = request.POST["group_description"]
            page_token = request.POST["page_token"]
            
            validaton_failed = False
            
            if not group_name:
                validaton_failed = True
                messages.add_message(request, messages.ERROR, 'Group Name cannot be empty.')
            else:
                if len(group_name) > 20:
                    validaton_failed = True
                    messages.add_message(request, messages.ERROR, 'Group Name cannot have more than 20 characters.')
                        
            if not validaton_failed:
                group = self._groupService.getGroupById(group_id)
                
                token = self._groupService.updateGroupNameAndDescriptionById(group_id, group_name, group_description)
             
                message = MessageManager.getMessage(token)
                
                messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())
                
                sender = self.request.session.get("user")
                
                members = self._groupService.getGroupMembers([group])
                self._notificationService.sendGroupRenameNotification(sender, members, group.name, group_name, message.getType())
            
            if page_token == 'system_admin':
                return HttpResponseRedirect("/marvl/groups/admin")
            
            if page_token == 'group_admin':
                return HttpResponseRedirect("/marvl/groups/view/" + group_id.strip())

class GroupAddController(ProcessFormView, AjaxBaseController):
    success_url ="/marvl/groups/admin"
    
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            user = self.request.session.get("user") 
            
            group_name = request.POST["group_name"]
            group_description = request.POST["group_description"]
            group_default = False
            
            if "group_default" in request.POST:
                group_default = True                           
        
            validaton_failed = False
        
            if not group_name:
                validaton_failed = True
                messages.add_message(request, messages.ERROR, 'Group Name cannot be empty.') 
            else:
                if len(group_name) > 20:
                    validaton_failed = True
                    messages.add_message(request, messages.ERROR, 'Group Name cannot have more than 20 characters.')
        
            if not group_description:    
                validaton_failed = True
                messages.add_message(request, messages.ERROR, 'Group Description cannot be empty.')
            else:
                if len(group_description) > 100:
                    validaton_failed = True
                    messages.add_message(request, messages.ERROR, 'Group Description cannot have more than 100 characters.')  
        
            if not validaton_failed:
                token = self._groupService.createGroup(group_name, group_description, group_default, user)
                
                message = MessageManager.getMessage(token)
                
                messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())
        
        return HttpResponseRedirect("/marvl/groups/admin")


class GroupUserListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            
            current_page = int(self.args[0])
            user = self.request.session.get("user")
            
            iterms_per_page = self._configManager.getItermsPerPage()
                
            if user.is_admin:
                groups = self._groupService.getAllGroups()
            else:
                groups = self._groupService.get_groups_by_user(user)                                        
                
            
            
            total_items,total_page,start,end = self.get_pagination_metadata2(iterms_per_page, len(groups), current_page)
                                 
            groups = groups[start-1:end]
            group_list = []
                  
            for index, group in enumerate(groups):     
                name = group.get_default_group_name()
                    
                admin_names = []
                created = group.created.strftime('%d-%m-%Y')
                    
                group_admins = self._groupService.getGroupAdminsByGroup(group.id)
                    
                if len(group_admins) > 0:
                    for key in group_admins:
                            admin_names.append(group_admins[key].name)
                else:
                    admin_names.append("No Group Admin")
                   
                total_models = self._instance_group_service.get_total_instance_number_by_group(group)                
                total_members = self._groupService.get_total_group_member_number([group])
                        
                group_list.append({"id": group.id, "name": name,"group_admin":",".join(admin_names),"total_members":total_members,"total_models":total_models,"created":created, "description":group.description})
                
                page_metadata = [
                             {
                               'total_page': total_page,
                               'current_page': current_page,
                               'iterms_per_page': iterms_per_page,
                               'total_items': total_items
                             }
                            ]
            
            context = {'page_metadata' : page_metadata, 'groups' : group_list};        
            return self.render_to_response(context)   

class GroupMemberListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        
        if len(self.args) > 0:          
            group_id = int(self.args[0])
            current_page = int(self.args[1])
            
            iterms_per_page = self._configManager.getItermsPerPage()
                                 
            group = self._groupService.getGroupById(group_id)
            user = self.request.session.get("user")
            
            if not self._groupService.is_authorized(group, user):
                return HttpResponseRedirect("/marvl/home")    
            
            groups = []
            groups.append(group)
            
            members = self._groupService.getGroupMembers(groups)
            members = list(members)
                  
            member_list = []
                        
            total_items,total_page,start,end = self.get_pagination_metadata(iterms_per_page, members, current_page)         
                        
            members = members[start-1:end]
             
            group_admins = self._groupService.getGroupAdminsByGroup(group_id)
             
            for member in members:                            
                aaf = 'no'
                
                if member.aafuser == '1':
                    aaf = 'yes'                
                
                is_group_admin = 'No'
                if member.id in group_admins:
                    is_group_admin = 'Yes'    
                          
                member_list.append({"id": member.id, "is_group_admin": is_group_admin, "name": member.name, "email": member.email, "organization": member.organization, "aaf": aaf}) 
                        
            page_metadata = [
                             {
                               'total_page': total_page,
                               'current_page': current_page,
                               'iterms_per_page': iterms_per_page,
                               'total_items': total_items
                             }
                            ]
            
            context = {'page_metadata' : page_metadata, 'members' : member_list};        
                        
            '''context = {
                      'page_metadata' : [
                         { 'total_page':'6',
                           'current_page': self.args[0],
                           'iterms_per_page':'5',
                           'total_items': '28'
                         }                  
                       ],         
                      'members' : [
                        {'id': '1', 'name': 'xiao ming fu', 'email': 'xiao.fu@utas.edu.au', 'organization': 'university of tasmania', 'aaf':'yes'},
                        {'id': '2', 'name': 'xiao ming fu', 'email': 'xiao.fu@utas.edu.au', 'organization': 'university of tasmania', 'aaf':'yes'},
                        {'id': '3', 'name': 'lin zhang', 'email': 'lin.zhang@utas.edu.au', 'organization': 'Commonwealth Scientific and Industrial Research Organisation', 'aaf':'yes'},
                        {'id': '4', 'name': 'xiao ming fu', 'email': 'xiao.fu@utas.edu.au', 'organization': 'university of tasmania', 'aaf':'yes'},
                        {'id': '5', 'name': 'xiao ming fu', 'email': 'xiao.fu@utas.edu.au', 'organization': 'university of tasmania', 'aaf':'yes'},
                        {'id': '6', 'name': 'lin zhang 2', 'email': 'lin.zhang@utas.edu.au', 'organization': 'Commonwealth Scientific and Industrial Research Organisation', 'aaf':'yes'},      
                      ]
                     }'''
                         
            return self.render_to_response(context)


class GroupInstanceListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            current_page = int(self.args[1])
            group_id = int(self.args[0])
              
            group = self._groupService.getGroupById(group_id)       
            user = self.request.session.get("user")
            
            if not self._groupService.is_authorized(group, user):
                return HttpResponseRedirect("/marvl/home") 
            
            #instances = self._instanceService.getInstancesByGroup(group)
            instances = self._instance_group_service.get_instances_by_group(group=group)
            
            if not instances or len(instances) == 0:
                instances = self._instanceService.getInstancesByGroup(group) 
            
            iterms_per_page = self._configManager.getItermsPerPage()
            
            total_items,total_page,start,end = self.get_pagination_metadata(iterms_per_page, instances, current_page) 
            instance_list = []
           
            instances = instances[start-1:end]
           
            for index, instance in enumerate(instances):
                created = instance.created.strftime('%d-%m-%Y')
                
                group_name = 'None'
                group_names = []
                                        
                instance_groups = self._instance_group_service.get_instance_groups_by_instance(instance=instance)
                    
                for instance_group in instance_groups:
                    name = instance_group.group.name
                    if instance_group.group.default:
                        name = name + " (" + instance_group.group.creator.name + ")"    
                    
                    group_names.append(name)
                    
                if len(group_names) > 0:
                    group_name = " -|- ".join(group_names) 
                else:
                    if instance.group:
                        name = instance.group.name
                        
                        if instance.group.default:
                            name = name + " (" + instance.group.creator.name + ")"    
                        
                        group_name = name
                
                instance_list.append({"id": instance.id, "name": instance.name, "type": instance.type, "state": instance.state, "group": group_name, 'created': created}) 
            
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

class GroupViewController(BaseController):
    template_name = "group/view.html"
    
    def get_context_data(self, **kwargs):
        group_id = self.args[0]
        
        result = {}
      
        group = self._groupService.getGroupById(group_id) 
        user = self.request.session.get("user")
        
        if self._groupService.is_authorized(group, user):
                        
            result["current_page"] = "Groups"
            result["current_page_sub_title"] = "(" + group.name + ")"
            result["current_group"] = group            
           
            self._add_breadcrumbs('Home', '/marvl/home', True)  
            self._add_breadcrumbs(group.name, '/marvl/groups/view/'+group_id)            
            
            is_group_admin = self._groupService.isGroupAdmin(user.id, group.id)
            
            if user.is_admin:
                is_group_admin = True;
              
            result["is_group_admin"] = is_group_admin
            result["show_group_parent_menu"] = True
        else:
            result['security'] = 'failed'
        
        return result 


class GroupUserController(BaseController):
    template_name = "group/user.html"
    
    def get_context_data(self, **kwargs):
        result = {}
        
        self._add_breadcrumbs('Home', '/marvl/home', True) 
        
        result["current_page"] = "Groups"
        result["current_page_sub_title"] = "(My Groups)"
            
        self._add_breadcrumbs('My Groups', '/marvl/groups/user')

        return result

class GroupAdminController(BaseController):
    template_name = "group/admin.html"
    
    def get_context_data(self, **kwargs):
        result = {}
        
        self._add_breadcrumbs('Home', '/marvl/home', True) 
        
        result["current_page"] = "Groups"
        result["current_page_sub_title"] = "(Group Manager)"
            
        self._add_breadcrumbs('Group Manager', '/marvl/groups/admin')

        return result
     
class GroupMyGroupController(BaseController):
    template_name = "group/overview.html"
    
    def get_context_data(self, **kwargs):       
        result = {}
         
        result["current_page"] = "Groups"
        result["current_page_sub_title"] = "(Default Model Group)"
        self._add_breadcrumbs('Groups', '/marvl/groups', True)   
        self._add_breadcrumbs('Default Model Group', '/marvl/groups')
           
        result["show_parent_menu"] = True  
        return result