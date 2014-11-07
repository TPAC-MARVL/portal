import copy
import collections
import math  

from django.conf import settings
  
from django.views.generic import TemplateView
from django.http import HttpResponseRedirect

from ..services.instanceservice import InstanceService
from ..services.userservice import UserService
from ..services.groupservice import GroupService
from ..services.messageservice import MessageService
from ..services.notificationservice import NotificationService
from ..configmanager import ConfigManager
from ..services.memberrequestservice import MemberRequestService
from ..services.modelrequestservice import ModelRequestService
from ..services.nonsystemusergroupmapservice import UserGroupMapService
from ..services.emailservice import EmailService
from ..services.instancegroupservice import InstanceGroupService
from ..services.securitytokenservice import SecurityTokenService

from ..system.util import Util

class AjaxBaseController():
    _instanceService = InstanceService()
    _groupService = GroupService()
    _userService = UserService()
    _configManager = ConfigManager()
    _memberRequestService = MemberRequestService()
    _notificationService = NotificationService()
    _messageService = MessageService()
    _modelRequestService = ModelRequestService()
    _userMapService = UserGroupMapService()
    _emailService = EmailService()
    _instance_group_service = InstanceGroupService()
    _security_token_service = SecurityTokenService()
   
   
    def get_pagination_metadata2(self, iterms_per_page, item_length, current_page):
        Pagination_Metadata = collections.namedtuple('Pagination_Metadata', 'total_items total_pages start end')
        
        total_items = item_length
        total_pages = int(math.ceil(total_items / float(iterms_per_page)))
        start = current_page * iterms_per_page - iterms_per_page + 1        
            
        if current_page == total_pages:
            end = total_items  
        else:
            end = start + iterms_per_page - 1       
        
        return Pagination_Metadata(total_items, total_pages, start, end)
    
    def get_pagination_metadata(self, iterms_per_page, items, current_page):
        return self.get_pagination_metadata2(iterms_per_page, len(items), current_page)

class FormBaseController(AjaxBaseController):
    pass

class BaseController(TemplateView):
    _instanceService = InstanceService()
    _groupService = GroupService()
    _userService = UserService()
    _configManager = ConfigManager()
    _memberRequestService = MemberRequestService()
    _messageService = MessageService()
    _notificationService = NotificationService()
    _emailService = EmailService()
    _instance_group_service = InstanceGroupService()
    _security_token_service = SecurityTokenService()
    
    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        
        if not "show_parent_menu" in context:       
            context["show_parent_menu"] = False
        
        user = self.request.session["user"]
        
        if user.is_admin:
            instances = self._instanceService.getAllRunningInstances()
            context['total_instances'] = len(instances)
        else:    
            instances = self._instance_group_service.getAllowedToViewInstancesByUser(user)
                
        context['instance_list'] = instances
                
        if not 'profile' in self.request.session:
            # Create User Profile
            profile = self._create_user_profile(user)
            profile.models = len(instances)
        
            self.request.session['profile'] = profile
        
        if user.is_admin:
            groups = self._groupService.getAllGroups()
            context['total_groups'] = len(groups)
        else:
            groups = self._groupService.get_groups_by_user(user)
        
        
        for group in groups:
            group.name = group.get_default_group_name(current_user_name = user.name)
                
        context['group_list'] = groups 
        
        if len(groups) == 0:
            context["show_alert"] = 'true'
        else:
            context["show_alert"] = 'false'        
                         
        
        # Get messages for the user
        messages = self._messageService.getMessagesbyUser(user)   
        context['messages_list'] = messages[0:5]             
        context['messages_total'] = len(messages)        
              
        # Get notification for the user
        notifications = self._notificationService.getNotificationsbyUser(user)
        
        context['notifications_list'] = notifications[0:5]  
        context['notifications_total'] = len(notifications)
        
        
        if settings.PRODUCTION:
            context['production'] = 'true'
         
        if 'security' in context and context['security'] == 'failed':
            return HttpResponseRedirect("/marvl/home") 
                        
        return self.render_to_response(context)
    
    def _create_user_profile(self, user):
        return copy.copy(user)
    
    def _add_breadcrumbs(self, item, url, is_top=False):
        icon_dict = dict()
        
        icon_dict["Home"] = 'glyphicon-home'
        icon_dict["Groups"] = 'glyphicon-user'
        icon_dict["About - Help"] = 'glyphicon-book'
        icon_dict["Model Control"] = 'glyphicon-open'
        
        if is_top:
            self.request.session["breadcrumbs_list"] = list()
            self.request.session["breadcrumbs_list"].append((item, url, icon_dict.get(item), True))
        else:
            breadcrumbls_list = self.request.session["breadcrumbs_list"];
            found = False
            found_index = 0;
            
            for index, breadcrumbs in enumerate(breadcrumbls_list):
                if breadcrumbs[0] == item:
                    found_index = index
                    found = True
                    break    
            
            if found:
                #index = breadcrumbls_list.index((item, url, 'none', False))
                breadcrumbls_list = breadcrumbls_list[0:found_index+1]
            else:
                breadcrumbls_list.append((item, url, 'none', False))
               
            self.request.session["breadcrumbs_list"] = breadcrumbls_list