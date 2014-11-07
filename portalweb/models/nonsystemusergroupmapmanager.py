import logging

from django.utils import timezone

from ..models.nonsystemusergroupmap import NonSystemUserGroupMapTbl
from ..models.nonsystemusergroupmap import UserGroupMapStatus

from portalweb.decorators.logger import logger

class NonSystemUserGroupMapManager:
    _logger = logging.getLogger(__name__)    
    
    @classmethod
    @logger
    def editMap(cls, map_id, email=None, group=None, isAdmin=None, creator=None, proved=None):
        user_group_map = cls.getMapById(map_id)
        success = False
        
        if user_group_map:
            if email:
                user_group_map.email = email
            
            if group:
                user_group_map.group = group
            
            if isAdmin:
                user_group_map.is_admin = True
            else:
                user_group_map.is_admin = False
                
            if proved:
                user_group_map.proved = proved
                
            if creator:
                user_group_map.creator = creator
               
            user_group_map.save()
            success = True
        
        return success        
        
    @classmethod
    @logger
    def createMap(cls, email, group, isAdmin, creator, proved):
        new_map = None

        new_map = NonSystemUserGroupMapTbl.objects.create(email=email, group=group, is_admin=isAdmin, proved=proved, creator=creator, created=timezone.now(), status = UserGroupMapStatus.get_status_id(UserGroupMapStatus.NOT_APPLIED))

        return new_map
    
    @classmethod
    @logger
    def getMapsByEmail(cls, email, status):
        maps = NonSystemUserGroupMapTbl.objects.filter(email = email, status = status, proved=True)
        return maps 
    
    @classmethod
    @logger
    def getAllUserGroupMaps(cls):
        maps = NonSystemUserGroupMapTbl.objects.all()
        return maps 
      
    @classmethod
    @logger
    def getMapById(cls, map_id):
        return NonSystemUserGroupMapTbl.objects.get(id = map_id)
  
    @classmethod
    @logger
    def updateUserGroupMapStatus(self, map_id, status):
        success = False
        
        map = NonSystemUserGroupMapTbl.objects.get(id=map_id)
        map.status = status
        
        map.save()
        success = True    
        
        return success    
  
    @classmethod
    @logger
    def approveUserGroupMap(cls, map_id):
        success = False
        
        map = NonSystemUserGroupMapTbl.objects.get(id=map_id)
        map.proved = True
        map.save()
        success = True    
        
        return success