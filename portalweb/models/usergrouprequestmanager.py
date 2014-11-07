import logging

from django.utils import timezone

from ..models.usergrouprequest import UserGroupRequestTbl

from portalweb.decorators.logger import logger

class UserGroupRequestManager:
    _logger = logging.getLogger(__name__)    
    
    @classmethod
    @logger
    def createUserGroupRequest(cls, email, group, isAdmin, user):
        userGroupRequest = None

        userGroupRequest = UserGroupRequestTbl.objects.create(email=email, group=group, is_admin=isAdmin, proved=False, user=user, created=timezone.now())

        return userGroupRequest
    
    @classmethod
    @logger
    def getUserGroupRequestByUser(cls, user):
        user_group_stages = UserGroupRequestTbl.objects.filter(user = user)
        return user_group_stages
 
    @classmethod
    @logger
    def getUserGroupRequests(cls, email, group, user):
        userGroupRequest = None
        userGroupRequest = UserGroupRequestTbl.objects.get(email=email, group=group, user=user)
            
        return userGroupRequest       
   
    @classmethod
    @logger
    def getWaitingUserGroupRequestsByEmail(cls, email):
        user_group_request = UserGroupRequestTbl.objects.filter(email = email, proved=False)
        return user_group_request

    @classmethod
    @logger
    def getUserGroupRequestsByEmail(cls, email):
        user_group_request = UserGroupRequestTbl.objects.filter(email = email)
        return user_group_request
 
    @classmethod
    @logger
    def getUserGroupRequestById(cls, request_id):
        
        user_group_request = UserGroupRequestTbl.objects.get(id = request_id)
        return user_group_request
  
    @classmethod
    @logger
    def approveUserGroupRequest(cls, request_id):
        success = False
        
        user_group_request = UserGroupRequestTbl.objects.get(id=request_id)
        user_group_request.proved = True
        user_group_request.save()
        success = True    
        
        return success