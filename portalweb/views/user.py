from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError

from mixin.jsonresponsemixin import JSONResponseMixin

from django.views.generic.detail import BaseDetailView
from django.views.generic.edit import ProcessFormView

from django.contrib import messages

from portalweb.system.message import MessageManager

from django.http import HttpResponseRedirect

from base import BaseController
from base import AjaxBaseController
from base import FormBaseController

from portalweb.models.nonsystemusergroupmap import UserGroupMapStatus
  

class UserMapEditController(ProcessFormView,FormBaseController):
    success_url ="/marvl/users/map"
    
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            
            email = request.POST["email"]
            is_admin = request.POST.get('is_admin', False)
            group_id = request.POST["group_id"]
            
            validaton_failed = False
        
            if is_admin:
                is_admin = True
        
            if not email:
                validaton_failed = True
                messages.add_message(request, messages.ERROR, 'Email cannot be empty.') 
            else:
                validate = EmailValidator()
                
                try:
                    validate(email)
                except ValidationError:
                    messages.add_message(request, messages.ERROR, 'You must enter a valid Email.')
                    return HttpResponseRedirect(self.success_url)
                        
            if not group_id:
                validaton_failed = True
                messages.add_message(request, messages.ERROR, 'You must select one group.')
                return HttpResponseRedirect(self.success_url)
            
            if not validaton_failed:
                
                url_path = request.get_full_path()
                user = self.request.session.get("user")
                
                if "create" in url_path: 
                    token = self._userMapService.createUserGroupMap(email, group_id, user, is_admin)
                if "edit" in url_path:
                    map_id = request.POST["map_id"]
                    token = self._userMapService.editUserGroupMap(map_id, email, group_id, user, is_admin)
                                    
                message = MessageManager.getMessage(token)                
                messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())
            
            return HttpResponseRedirect(self.success_url)


class UserMapListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            
            current_page = int(self.args[0])
            user = self.request.session.get("user")
            
            if user.is_admin:
                iterms_per_page = self._configManager.getItermsPerPage()
                maps = self._userMapService.getAllUserGroupMaps()
                
                total_items,total_page,start,end = self.get_pagination_metadata(iterms_per_page, maps, current_page)         
                        
                maps = maps[start-1:end]
                map_list = []               
                
                for index, map in enumerate(maps):          
                    
                    created = map.created.strftime('%d-%m-%Y')
                             
                    is_admin = 'No'
                    if map.is_admin:
                        is_admin = 'Yes'
                    
                    proved = 'No'
                    if map.proved:
                        proved = 'Yes'
                    
                    show_checkbox = False
                    if UserGroupMapStatus.get_status(map.status) == UserGroupMapStatus.NOT_APPLIED:
                        show_checkbox = True
                    
                    map_list.append({"id": map.id, "group_id":map.group.id, "is_admin":is_admin, "group": map.group.name, "email": map.email, "created":created, "creator": map.creator.name, "proved":proved, "status":UserGroupMapStatus.get_status(map.status), "show_checkbox": show_checkbox})
                                
                page_metadata = [
                             {
                               'total_page': total_page,
                               'current_page': current_page,
                               'iterms_per_page': iterms_per_page,
                               'total_items': total_items
                             }
                            ]            
                
                context = {'page_metadata' : page_metadata, 'maps' : map_list};        
                return self.render_to_response(context) 


class UserAdminListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            
            current_page = int(self.args[0])
            user = self.request.session.get("user")
            
            if user.is_admin:
                iterms_per_page = self._configManager.getItermsPerPage()
                users = self._userService.getAllActiveUsers()
                
                total_items,total_page,start,end = self.get_pagination_metadata2(iterms_per_page, users.count(), current_page)         
                        
                users = users[start-1:end]
                user_list = []
                
                for index, user in enumerate(users):          
                    name = user.name
                    created = user.created.strftime('%d-%m-%Y')                
                    group_names = []
                    
                    groups = self._groupService.get_groups_by_user(user)
                       
                    for group in groups:
                        group_names.append(group.name)       
                    
                    is_admin = 'No'
                    if user.is_admin:
                        is_admin = 'Yes'
                        
                    aaf = "No"
                    if user.aafuser == '1':
                        aaf = "Yes"
                    
                    user_list.append({"id": user.id, "aaf":aaf, "is_system_admin":is_admin, "groups":" -|- ".join(group_names), "name": user.name, "created":created, "email": user.email, "organization":user.organization})
                
                    page_metadata = [
                             {
                               'total_page': total_page,
                               'current_page': current_page,
                               'iterms_per_page': iterms_per_page,
                               'total_items': total_items
                             }
                            ]            
                
                context = {'page_metadata' : page_metadata, 'members' : user_list};        
                return self.render_to_response(context) 

class UserMapController(BaseController):
    template_name = "user/map/list.html"

    def get_context_data(self, **kwargs):
        result = {}
        
        result["current_page"] = "Map"
        result["current_page_sub_title"] = "(User Group Map Manager)"
        
        self._add_breadcrumbs('Home', '/marvl/home', True)
        self._add_breadcrumbs('User Group Map Manager', '/marvl/users/map')

        return result

class UserAdminController(BaseController):
    template_name = "user/admin.html"
    
    def get_context_data(self, **kwargs):
        result = {}
        
        self._add_breadcrumbs('Home', '/marvl/home', True) 
        result["current_page"] = "Users"
        result["current_page_sub_title"] = "(User Manager)"
            
        self._add_breadcrumbs('User Manager', '/marvl/users/admin')

        return result

class UsersSetAdminController(ProcessFormView, AjaxBaseController):
    success_url ="/marvl/users/admin"
    
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            
            user_ids = request.POST.getlist("user_ids")
            url_path = request.get_full_path()
            token = ''
            
            if 'add' in url_path:
                token = self._userService.setSystemAdmin(user_ids, True)    
                        
            if 'remove' in url_path:
                token = self._userService.setSystemAdmin(user_ids, False)
             
            message = MessageManager.getMessage(token)
            messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())
            
            current_user = request.session["user"]
            
            if 'add' in url_path:
                title, content = self._notificationService.sendSystemAdminAddNotification(current_user, user_ids, message.getType())
                            
            if 'remove' in url_path:
                title, content = self._notificationService.sendSystemAdminRemoveNotification(current_user, user_ids, message.getType())
                
                
            receivers = self._userService.getUsersByIds(user_ids)
            self._emailService.sendEmail(title, content, receivers)
                
            return HttpResponseRedirect(self.success_url)