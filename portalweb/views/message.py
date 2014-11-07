from django.views.generic.detail import BaseDetailView
from mixin.jsonresponsemixin import JSONResponseMixin
from django.views.generic.edit import ProcessFormView
from django.http import HttpResponseRedirect
from django.contrib import messages

from portalweb.system.message import MessageManager

from base import BaseController
from base import AjaxBaseController

class MessageSendController(ProcessFormView, AjaxBaseController):
    success_url ="/marvl/messages/list"
    
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            
            title = request.POST["message_title"]
            content = request.POST["message_content"]
            
            group_ids = request.POST.getlist("group_ids")
            user_ids = request.POST.getlist("member_ids")
            
            sendOption = request.POST["sendOption"]
            sender = self.request.session.get("user")
            token = ''  
            
            validaton_failed = False
        
            if not title:
                validaton_failed = True
                messages.add_message(request, messages.ERROR, 'Message Title cannot be empty.') 
            else:
                if len(title) > 30:
                    validaton_failed = True
                    messages.add_message(request, messages.ERROR, 'Message Title cannot have more than 30 characters.')
        
            if not content:    
                validaton_failed = True
                messages.add_message(request, messages.ERROR, 'Message Content cannot be empty.')
            else:
                if len(content) > 500:
                    validaton_failed = True
                    messages.add_message(request, messages.ERROR, 'Message Content cannot have more than 500 characters.')  
            
            if len(group_ids) == 0 and len(user_ids) == 0:
                validaton_failed = True
                messages.add_message(request, messages.ERROR, 'You must select at least one user or group.')     
            
            if not validaton_failed:
                      
                if 'member' == sendOption:
                    is_group_message = False 
                    receivers = self._userService.getUsersByIds(user_ids)
                            
                if 'group' == sendOption:               
                    is_group_message = True 
                    groups = self._groupService.getGroupsByIds(group_ids)
                    receivers = self._groupService.getGroupMembers(groups)
                 
                tokens = self._messageService.sendMessages(sender, receivers, title, content, is_group_message)
                
                for token in tokens: 
                    message = MessageManager.getMessage(token)
                    messages.add_message(request, MessageManager.getDjangoType(message.getType()), message.getMessage())
                
            return HttpResponseRedirect(self.success_url)

class MessageUserListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        user = self.request.session.get("user")    
        
        member_list = []
        members = None
        
        if user.is_admin:
            members = self._userService.getAllActiveUsers()
        else:
            groups = self._groupService.get_groups_by_user(user)
            members = self._groupService.getGroupMembers(groups)
        
        for member in members:
            member_list.append({"id": member.id, "name": member.name})
                     
        context = {'members' : member_list}
        return self.render_to_response(context) 
 
class MessageGroupListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        user = self.request.session.get("user")
        group_list = []
        groups = None
            
        if user.is_admin:
            groups = self._groupService.getAllGroups()
        else:
            groups = self._groupService.get_groups_by_user(user)
        
        for group in groups:
            group_list.append({"id": group.id, "name": group.name})
        
        context = {'groups' : group_list}
        return self.render_to_response(context)  

class MessageListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            
            current_page = int(self.args[0])
            user = self.request.session.get("user")
            
            iterms_per_page = self._configManager.getItermsPerPage()
            message = None
            
            url_path = request.get_full_path()
                        
            if 'inbox' in url_path:
                messages = self._messageService.getMessagesbyUser(user)
                        
            if 'sent' in url_path:
                messages = self._messageService.getMessagesbySender(user)
               
            total_items,total_page,start,end = self.get_pagination_metadata(iterms_per_page, messages, current_page)         
                        
            messages = messages[start-1:end]
            message_list = []
                                  
            for message in messages:          
                createdTime = message.created.strftime('%d-%m-%Y') 
             
                message_list.append({"id": message.id, "title": message.title,"createdBy":message.user_from.name, "sentTo":message.user_to.name,"createdTime":createdTime, "content":message.content})
                
            page_metadata = [
                             {
                               'total_page': total_page,
                               'current_page': current_page,
                               'iterms_per_page': iterms_per_page,
                               'total_items': total_items
                             }
                            ]
            
            
            context = {'page_metadata' : page_metadata, 'messages' : message_list};        
            return self.render_to_response(context) 

class MessageViewController(BaseController):
    template_name = "message/list.html"
    
    def get_context_data(self, **kwargs):  
        result = {}
                    
        self._add_breadcrumbs("Messages", '/marvl/messages/list')
                
        return result
