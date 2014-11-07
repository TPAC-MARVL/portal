from datetime import datetime

from django.utils.timezone import utc

from baseservice import BaseService
from ..models.processmanager import ProcessManager
from ..models.process import ProcessType
from ..models.process import ProcessStatus
from ..cloud.entities.instance import InstanceState
from ..configmanager import ConfigManager
from portalweb.system.message import MessageManager
from portalweb.system.message import Message

from portalweb.decorators.transaction import transaction

class MemberRequestService(BaseService):
    
    @transaction
    def _approveRequest(self, request_id, member_request):
        success1 = self._user_group_request_manager.approveUserGroupRequest(request_id)
        
        user = self._userManager.getUserByEmail(member_request.email)
        usergroup = self._usergroupManager.createUserGroup(user, member_request.group, False)
        
        success2 = False
        if usergroup:
            success2 = True
            
        if success1 and success2:
            return True
        else:
            return False
     
    def approveRequest(self, request_id, email):
        member_request = self._user_group_request_manager.getUserGroupRequestById(request_id)
        
        token = ''
        success = False
        
        if member_request and member_request.email == email:
            success = self._approveRequest(request_id, member_request)
             
            if success:
                token = MessageManager.setMessage("You have successfully approved the request. Now you are the member of the group.", Message.SUCCESS)
            else:
                token = MessageManager.setMessage("Error occurred when approving the request. Please try again later.", Message.ERROR)
            
        else:
            token = MessageManager.setMessage("You don't have permission to approve the request.", Message.WARNING)
                
        return token
        
    def getWaitingRequest(self, email):
        return self._user_group_request_manager.getWaitingUserGroupRequestsByEmail(email)  
    
    def getRequestSent(self, user):
        return self._user_group_request_manager.getUserGroupRequestByUser(user)
    
    def sendRequest(self, email, group, user, isAdmin=False):
        
        request_is_sent = self.requestIsSent(email, group, user)
        
        if not request_is_sent:
            member_request = self._user_group_request_manager.createUserGroupRequest(email, group, isAdmin, user)
        
            token = ''
            if member_request:
                token = MessageManager.setMessage("Request has successfully sent. Please wait for user to approve it.", Message.SUCCESS) 
            else:
                token = MessageManager.setMessage("Error occurred when sending request. Please try again later.", Message.ERROR)
        else:
            token = MessageManager.setMessage("Request was sent before. Please wait for user to approve it.", Message.WARNING) 
        
        return token;
    
    def requestIsSent(self, email, group, user):
        member_request = self._user_group_request_manager.getUserGroupRequests(email, group, user)
        
        if member_request:
            return True
        else:
            return False