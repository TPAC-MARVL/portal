from portalweb.system.message import MessageManager
from portalweb.system.message import Message

from portalweb.models.nonsystemusergroupmap import UserGroupMapStatus

from baseservice import BaseService

class UserGroupMapService(BaseService):
    def getAllUserGroupMaps(self):
        return self._user_group_map_manager.getAllUserGroupMaps()
    
    def getUserGroupMaps(self, email, status):
        return self._user_group_map_manager.getMapsByEmail(email, status)
    
    def editUserGroupMap(self, map_id, email, group_id, creator, is_admin):
        token = ''
        group = self._group_manager.getGroupById(group_id)
         
        success  = self._user_group_map_manager.editMap(map_id, email, group, is_admin, creator, True)
        
        if success:
            token = MessageManager.setMessage("User Group Map has been successfully updated.", Message.SUCCESS)  
        else:
            token = MessageManager.setMessage("Error occurred when updating the user group map. Please try again later.", Message.ERROR)
        
        return token
        
                    
    def createUserGroupMap(self, email, group_id, creator, is_admin):
        token = ''
        
        group = self._group_manager.getGroupById(group_id)
        new_map = self._user_group_map_manager.createMap(email, group, is_admin, creator, True)
        
        if new_map:
            token = MessageManager.setMessage("New User Group Map has been successfully created.", Message.SUCCESS)  
        else:
            token = MessageManager.setMessage("Error occurred when creating the user group map. Please try again later.", Message.ERROR)
        
        return token