from mixin.jsonresponsemixin import JSONResponseMixin
from django.views.generic.detail import BaseDetailView

from django.http import HttpResponseRedirect
from django.views.generic.edit import ProcessFormView
from django.contrib import messages
from django.views.generic import TemplateView

from portalweb.system.message import MessageManager
from portalweb.system.message import Message

from base import BaseController
from base import AjaxBaseController

from ..forms.memberform import MemberForm  

class MemberAdminListController(JSONResponseMixin, BaseDetailView, AjaxBaseController): 
    
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:          
                        
            group_id = int(self.args[0])
            
            url_path = request.get_full_path()
            user_list = []
            group = self._groupService.getGroupById(group_id)
             
            if 'add' in url_path:             
                exclude_members = self._groupService.getGroupMembers([group])
            
                users = self._userService.getAllActiveUsers(exclude_members);              
            
                for user in users:                              
                    aaf = 'no'
                
                    if user.aafuser == '1':
                        aaf = 'yes'
                                  
                    user_list.append({"id": user.id, "name": user.name, "email": user.email, "organization": user.organization, "aaf": aaf}) 
            
            if 'edit' in url_path:        
                members = self._groupService.getGroupMembers([group]);
                
                for member in members:
                    user_list.append({"id": member.id, "name": member.name, "email": member.email, "is_group_admin": member.is_group_admin})    
            
            context = {'members' : user_list}
            return self.render_to_response(context)

class MembersSetAdminController(ProcessFormView, AjaxBaseController):
    def post(self, request, *args, **kwargs):
        
        member_ids = request.POST.getlist("member_ids");   
        group_admins = request.POST.getlist("group_admins");        
        group_id = request.POST["group_id"]
        page_token = request.POST["page_token"]
         
        if len(member_ids) == 0:
            messages.add_message(request, messages.ERROR, 'You must select at least one member.') 
        else:
            group = self._groupService.getGroupById(group_id)
            token = self._groupService.addMemberAdminsToGroup(group, member_ids, group_admins)
            
            message = MessageManager.getMessage(token)                
            messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())
            
        if page_token == 'system_admin':
            return HttpResponseRedirect("/marvl/groups/admin")
            
        if page_token == 'group_admin':
            return HttpResponseRedirect("/marvl/groups/view/" + group_id.strip())        
        
        return HttpResponseRedirect("/marvl/groups/admin")

class MembersRemoveController (ProcessFormView, AjaxBaseController):
    def post(self, request, *args, **kwargs):
        
        member_ids = request.POST.getlist("member_ids");  
        group_id = request.POST["group_id"]
        page_token = request.POST["page_token"]
         
        if len(member_ids) == 0:
            messages.add_message(request, messages.ERROR, 'You must select at least one user.') 
        else:
            token = self._groupService.removeMembersFromGroup(member_ids, group_id)
            
            message = MessageManager.getMessage(token)
            messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())             
            
            current_user = request.session["user"]
            group = self._groupService.getGroupById(group_id)
                       
            removed_members = self._userService.getUsersByIds(member_ids)
            members = self._groupService.getGroupMembers([group])
            
            title1, content1, title2, content2 = self._notificationService.sendGroupMemberRemoveNotification(current_user, removed_members, members, group, message.getType())
           
            self._emailService.sendEmail(title1, content1, members)
            self._emailService.sendEmail(title2, content2, removed_members)
           
        if page_token == 'system_admin':
            return HttpResponseRedirect("/marvl/groups/admin")
            
        if page_token == 'group_admin':
            return HttpResponseRedirect("/marvl/groups/view/" + group_id.strip())

class MembersAddController(ProcessFormView, AjaxBaseController):
    def post(self, request, *args, **kwargs):    
        member_ids = request.POST.getlist("member_ids");   
        group_admins = request.POST.getlist("group_admins");        
        group_id = request.POST["group_id"]
        page_token = request.POST["page_token"]
          
        if len(member_ids) == 0:
            messages.add_message(request, messages.ERROR, 'You must select at least one user.') 
        else:
            # These operations need to be in one unit, transaction support is only available in django 1.6.
            # It requires upgrade
                    
            group = self._groupService.getGroupById(group_id)
            
            new_members = self._userService.getUsersByIds(member_ids)
            members = self._groupService.getGroupMembers([group])
            
            token = self._groupService.addMembersToGroup(group, member_ids, group_admins)
            
            message = MessageManager.getMessage(token)                
            messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())   
           
            current_user = request.session["user"]            
        
            title1, content1, title2, content2 = self._notificationService.sendGroupMemberAddNotification(current_user, members, new_members, group, message.getType())
            
            self._emailService.sendEmail(title1, content1, members)
            self._emailService.sendEmail(title2, content2, new_members)
                        
        if page_token == 'system_admin':
            return HttpResponseRedirect("/marvl/groups/admin")
            
        if page_token == 'group_admin':
            return HttpResponseRedirect("/marvl/groups/view/" + group_id.strip())

class MemberRequestApproveController(BaseController, TemplateView):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            request_id = self.args[0]
            current_user = request.session["user"]
            
            token = self._memberRequestService.approveRequest(request_id, current_user.email)
                       
            message = MessageManager.getMessage(token)
            messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage()) 
        else:
            messages.add_message(request, messages.ERROR, 'Unknown Request.')        
        
        return HttpResponseRedirect("/marvl/group")
            
class MemberRequestController(BaseController, ProcessFormView):
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
       
            current_user = request.session["user"]
                     
            userDict = self._userService.getAllActiveUsersDict(current_user)
            
            form = MemberForm(userDict=userDict, postDict=request.POST) # A form bound to the POST data         
                  
            if form.is_valid():
                group = self._groupService.getUserDefaultGroup(current_user)
                
                userId = form.data["users"]
                email = form.data["email"]
                
                # we need to check and make sure either userId or email are not empty, this has been done in form validation.
                if userId and userId != '':
                    user = self._userService.getUserById(userId)
                    email = user.email
              
                token = self._memberRequestService.sendRequest(email, group, current_user)
              
                message = MessageManager.getMessage(token)
                messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())
                                       
            else:
                messages.add_message(request, messages.ERROR, form.errors["__all__"])
                
        return HttpResponseRedirect("/marvl/group")
      

'''      
class MemberAddController(BaseController, ProcessFormView):   
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            userDict = self._userService.getAllActiveUsersDict()
            
            form = MemberForm(userDict=userDict, postDict=request.POST) # A form bound to the POST data         
                  
            if form.is_valid():
                user = self.request.session.get("user")
                           
                group = self._groupService.getUserDefaultGroup(user)
                
                userId = form.data["users"]
                email = form.data["email"]
                
                userIdEmpty = False
                emailEmpty = False
                
                # we need to check and make sure either userId or email are not empty, this has been done in form validation.
                if userId and userId != '':
                    token = self._groupService.addMemberToGroup(group, userId, email)
                    
                if email and email != '':
                    token = self._groupService.addMemberToGroup(group, userId, email)
              
                message = MessageManager.getMessage(token)
                messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())
                                       
            else:
                messages.add_message(request, messages.ERROR, form.errors["__all__"])
                
        return HttpResponseRedirect("/marvl/group")
  '''  