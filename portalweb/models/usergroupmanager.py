import logging

from django.utils import timezone

from ..models.user import UserGroupTbl

from portalweb.decorators.logger import logger

class UserGroupManager:
    
    @classmethod
    @logger
    def deleteUserGroupByGroup(cls, member_ids, group):
        success = False

        UserGroupTbl.objects.filter(group=group, user_id__in=member_ids).delete()
        success = True

        return success
    
    @classmethod
    @logger
    def editUserGroupAdmins(cls, user_ids, group, is_admin):
        success = False
        
        UserGroupTbl.objects.filter(group=group, user_id__in=user_ids).update(is_admin=is_admin)
        success = True

        return success
    
    @classmethod
    @logger
    def is_user_group_exist(cls, user, group):
        user_groups = cls.getUserGroupByGroupAndUser(group, user)
        
        if user_groups and len(user_groups) > 0:
            return True
        
        return False
    
    @classmethod
    @logger
    def createUserGroups(cls, users, group, is_admins):
        success = False
        userGroups = []        
        
        for user in users:
            is_admin = False
            if str(user.id) in is_admins:
                is_admin = True;
                
            # Check whether the membership is already exist. if yes, skip
            if not cls.is_user_group_exist(user, group):
                userGroups.append(UserGroupTbl(user=user, group=group, is_admin=is_admin, created=timezone.now()))
                    
        UserGroupTbl.objects.bulk_create(userGroups);         
        success = True

        return success   
    
    @classmethod
    @logger
    def getUserGroupByGroupandUser(cls, user_id, group_id):
        userGroups = None        
        
        userGroups = UserGroupTbl.objects.filter(group__id=group_id, user__id=user_id)

        return userGroups
     
    @classmethod
    @logger
    def createUserGroup(cls, user, group, isAdmin):
        userGroup = None
        
        userGroup = UserGroupTbl.objects.create(user=user, group=group, is_admin=isAdmin, created=timezone.now())
        
        return userGroup    
    
    @classmethod
    @logger
    def getGroupAdmins(cls, group_id=None):
        userGroups = None
        
        if group_id:
            userGroups = UserGroupTbl.objects.filter(group__id=group_id, is_admin=True)
        else:
            userGroups = UserGroupTbl.objects.filter(is_admin=True)
        
        return userGroups
    
    @classmethod
    @logger
    def getUserGroupsByUser(cls, user, exclude_group=None):
        userGroups = None
        
        if exclude_group:
            userGroups = UserGroupTbl.objects.filter(user=user).exclude(group=exclude_group)
        else:
            userGroups = UserGroupTbl.objects.filter(user=user)
       
        return userGroups
    
    @classmethod
    @logger
    def getUserGroupsByGroups(cls, groups):
        userGroups = None        
        
        userGroups = UserGroupTbl.objects.filter(group__in=groups).order_by('user')
 
        return userGroups
    
    @classmethod
    @logger  
    def getUserGroupByGroupAndUser(cls, group, user):      
        return UserGroupTbl.objects.filter(group=group, user=user)
    
    @classmethod
    @logger
    def getUserGroupsByGroup(cls, group):
        userGroups = None
        
        userGroups = UserGroupTbl.objects.filter(group=group)

        return userGroups