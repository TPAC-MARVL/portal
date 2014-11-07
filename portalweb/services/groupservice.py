'''
This is module contains group service class which provides group related operations.
'''

from datetime import datetime
from django.utils.timezone import utc

from portalweb.system.message import MessageManager
from portalweb.system.message import Message
from baseservice import BaseService
from ..models.groupmanager import GroupManager
from ..models.usergroupmanager import UserGroupManager
from ..models.usermanager import UserManager
from ..models.instancemanager import InstanceManager
from ..models.process import ProcessType
from ..models.process import ProcessStatus
from ..cloud.entities.instance import InstanceState
from ..configmanager import ConfigManager
from ..system.util import Util
from portalweb.decorators.transaction import transaction

class GroupService(BaseService):
    ''' 
    Group Service class provides all group related operations.
    '''
    def is_authorized(self, group, user):
        '''
        Check whether a user has permission to perform operations on the group.
        '''
        if group:
            if user.is_admin:
                return True
            else:
                if group:
                    if self.isMemberOfGroup(group, user):
                        return True
        
        return False
    
    def isMemberOfGroup(self, group, user):
        '''
        Check whether a user is member of group.
        '''
        user_group = self._usergroupManager.getUserGroupByGroupAndUser(group, user)
        
        if user_group:
            return True
        
        return False
    
    def isGroupAdmin(self, user_id, group_id):
        '''
        Check whether a user is group admin.
        '''
        user_group = self._usergroupManager.getUserGroupByGroupandUser(user_id, group_id)
        
        is_group_admin = False
        
        if user_group:
            if user_group[0].is_admin:
                is_group_admin = True
        
        return is_group_admin
        
    def removeMembersFromGroup(self, member_ids, group_id):
        group = self._group_manager.getGroupById(group_id);
                
        success = self._usergroupManager.deleteUserGroupByGroup(member_ids, group)
        
        token = ''
        message = ''
        
        if success:
            message = Util.get_replaced_text("1 2 been successfully removed from the group 3.", member_ids, [('1', 'User'), ('2', 'has'), ('3', group.name)])
                              
            token = MessageManager.setMessage(message, Message.SUCCESS)
        else:
            
            message = Util.get_replaced_text("Error occurred when removing 1 from the group 2. Please try again later.", member_ids, [('1', 'user'), ('2', group.name)])
            
            token = MessageManager.setMessage(message, Message.ERROR)
        
        return token    
    
    @transaction
    def _addMemberAdminsToGroup(self, admin_user_ids, non_admin_users_ids, group):
        success1 = self._usergroupManager.editUserGroupAdmins(admin_user_ids, group, True)
        success2 = self._usergroupManager.editUserGroupAdmins(non_admin_users_ids, group, False)
        
        if success1 and success2:
            return True;
        else:
            return False;   
            
    def addMemberAdminsToGroup(self, group, userIds, is_admins):
        admin_user_ids = []
        non_admin_users_ids = []
       
        for user_id in userIds: 
            if str(user_id) in is_admins:
                admin_user_ids.append(user_id)
            else:
                non_admin_users_ids.append(user_id)              
       
        token = ''
        message = ''
        
        success = self._addMemberAdminsToGroup(admin_user_ids, non_admin_users_ids, group)
        
        if success:            
            message = Util.get_replaced_text("Group 1 2 been successfully changed for the group.", userIds, [('1', 'admin'), ('2', 'has')])             
            token = MessageManager.setMessage(message, Message.SUCCESS)
        
        else:
            message = Util.get_replaced_text("Error occurred when changing group 1. Please try again later.", userIds, [('1', 'admin')])
            token = MessageManager.setMessage(message, Message.ERROR)
        
        return token 
     
    def addMembersToGroup(self, group, userIds, is_admins):
        users = self._userManager.getUsersByIds(userIds)
        
        success = self._usergroupManager.createUserGroups(users, group, is_admins)
               
        token = ''
        message = ''
             
        if success:
            message = Util.get_replaced_text("1 2 been successfully added to the group.", userIds, [('1', 'User'), ('2', 'has')])             
           
            token = MessageManager.setMessage(message, Message.SUCCESS)
        else:
            
            message = Util.get_replaced_text("Error occurred when adding 1 to the group. Please try again later.", userIds, [('1', 'user')])
            
            token = MessageManager.setMessage(message, Message.ERROR)
        
        return token  
    
    def addMemberToGroup(self, group, userId, email=''):        
        if email == '':
            user = self._userManager.getUserById(userId)
            usergroup = self._usergroupManager.createUserGroup(user, group, False)
        
            token = ''
        
            if usergroup:
                token = MessageManager.setMessage("User has been successfully added to the group.", Message.SUCCESS)
            else:
                token = MessageManager.setMessage("Error occurred when adding user to the group. Please try again later.", Message.ERROR)
        
            return token
        
        else:
            pass
    
    def getGroupById(self, group_id):
        return self._group_manager.getGroupById(group_id);    
    
    def getGroupsByIds(self, group_ids):
        return self._group_manager.getGroupsByIds(group_ids)
    
    def get_total_group_member_number(self, groups):
        return UserGroupManager.getUserGroupsByGroups(groups).count()
    
    def getGroupMembers(self, groups):
        users = []
        user_members = UserGroupManager.getUserGroupsByGroups(groups)
        
        if user_members:
            for user_member in user_members:      
                user_member.user.is_group_admin = user_member.is_admin
                users.append(user_member.user)
            
        return users;
    
    def has_default_group(self, user):
        group = self.getUserDefaultGroup(user)
        
        if group:
            return True
        
        return False
    
    def getUserDefaultGroup(self, user):
        userGroups = self._usergroupManager.getUserGroupsByUser(user)
        
        if userGroups:
            for userGroup in userGroups:
                if userGroup.group.default and userGroup.group.creator.name == user.name:
                    return userGroup.group
        
        return []
    
    def getAllGroups(self, exclude_groups=None):
        return self._group_manager.getAllGroups(exclude_groups) 
    
    def createGroup(self, group_name, group_description, group_default, user):
        group = self._group_manager.createGroup(group_name, group_description, group_default, user)
        
        token = ""
        successMessage = "Group ' " + group.name + "' has been successfully created. "
        errorMessage = "These was error when creating Group '" + group.name +"'. Please try again later."   
        if group:
            token = MessageManager.setMessage(successMessage, Message.SUCCESS)    
        else:    
            token = MessageManager.setMessage(errorMessage, Message.ERROR)
            
        return token
    
    def updateGroupNameAndDescriptionById(self, group_id, new_name, new_description):
        old_group = self._group_manager.getGroupById(group_id)
        success = self._group_manager.updateGroupById(group_id, {"name": new_name, "description": new_description})
        
        token = ""
        successMessage = "Group '" + old_group.name + "' has been successfully changed to '" + new_name + "'. "
        errorMessage = "These was error when changing Group name for group '" + old_group.name +"'. Please try again later."  
        
        if success:
            token = MessageManager.setMessage(successMessage, Message.SUCCESS)  
        else:
            token = MessageManager.setMessage(errorMessage, Message.ERROR)
                
        return token
    
    
    def getGroupAdminsByGroup(self, group_id):
        result = {}
        
        userGroups = self._usergroupManager.getGroupAdmins(group_id)
        
        for userGroup in userGroups: 
            result[userGroup.user.id] = userGroup.user
         
        return result
    
    def getAllGroupAdmins(self):
        result = {}
        
        userGroups = self._usergroupManager.getGroupAdmins()
        
        for userGroup in userGroups:
            if not userGroup.group.id in result:
                result[userGroup.group.id] = []
            
            result[userGroup.group.id].append((userGroup.user, userGroup.group))
                
        return result  
    
    def get_groups_by_user(self, user, exclude_group=None):            
        userGroups = self._usergroupManager.getUserGroupsByUser(user, exclude_group)
        groups = list()
        
        if userGroups:
            for userGroup in userGroups:
                groups.append(userGroup.group)
        
        return groups
           
        