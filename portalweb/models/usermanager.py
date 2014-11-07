import logging

from django.utils import timezone

from ..models.user import UserTbl

from portalweb.decorators.logger import logger

class UserManager:
    _logger = logging.getLogger(__name__)    
    
    @classmethod
    @logger
    def createUser(self, username, password, aafuser, token, name, organization, email):
        user = None
        
        
        isAAF = '0'
        if aafuser:
            isAAF = '1'

        user = UserTbl.objects.create(username=username, password=password, aafuser=isAAF, token=token, name=name, email=email, organization=organization, logout='0', created=timezone.now(), is_greeting_sent=False, is_admin=False, is_system_user=False)
               
        return user;
    
    @classmethod
    @logger
    def getUsers(self, exclude_users=None):
        
        if exclude_users:
            exclude_user_ids = [user.id for user in exclude_users]
                
            return UserTbl.objects.all().exclude(id__in=exclude_user_ids).exclude(is_system_user=True)
        else:
            return UserTbl.objects.all().exclude(is_system_user=True)
        
    @classmethod
    @logger
    def setUserLogout(self, userId, logout):
        success = False
        
        isLogout = '0'
        if logout:
            isLogout = '1'

        user = UserTbl.objects.get(pk = userId)
                
        if user:
            user.logout = isLogout
            user.save()
            success = True
        
        return success

    
    @classmethod
    @logger
    def deleteUser(self, userId):
        success = False
       
        user = UserTbl.objects.get(pk = userId)
        user.delete()
        success = True
            
        return success
    
    @classmethod
    @logger
    def updateUserGreeting(self, userId, is_greeting_sent=False):
        success = False
        
        user = UserTbl.objects.get(pk = userId)
      
        if user:
            user.is_greeting_sent = is_greeting_sent
            
            user.save()
            success = True        
        
        return success
    
    @classmethod
    @logger
    def editSystemAdmin(cls, user_ids, is_admin):
        success = False
        
        UserTbl.objects.filter(id__in=user_ids).update(is_admin=is_admin)
        success = True
        
        return success
    
    @classmethod
    @logger
    def updateUser(self, userId, username, password, aafuser, token):
        success = False
        isAAF = '0'
        
        if aafuser:
            isAAF = '1'
        
        user = UserTbl.objects.get(pk = userId)
        
        if user:
            if username:
                user.username = username
            
            if password:
                user.password = password
            
            if aafuser:
                user.aafuser = isAAF
            
            if token:
                user.token = token
            
            user.save()
            success = True
    
        return success   
    
    @classmethod
    @logger
    def getSystemAdmins(self):

        users = UserTbl.objects.filter(is_admin = True)
        
        return users
    
    @classmethod
    @logger
    def getSystemUser(self):

        users = UserTbl.objects.filter(is_system_user = True)
                   
        if users and len(users) > 0:
            return users[0];
  
        return None
    
    @classmethod
    @logger
    def getUserDefaultGroup(self, userId):
        user = UserTbl.objects.get(pk = userId)
            
        if user.groups and len(user.groups.all()) > 0:
            return user.groups.all()[0];
      
        return None
    
    @classmethod
    @logger
    def getUsersByIds(cls, userIds):
        users = UserTbl.objects.filter(id__in=userIds)
        return users

    @classmethod
    @logger
    def getUserById(self, userId):
        user = UserTbl.objects.get(pk = userId)
        return user;
 
    @classmethod
    @logger
    def getUserByEmail(self, email):
        user = UserTbl.objects.get(email = email)
        return user

    @classmethod
    @logger
    def getUserByUsername(self, username):
        user = UserTbl.objects.get(username = username)
        return user
    
    @classmethod
    @logger
    def getUserByToken(self, token):
        user = UserTbl.objects.get(token = token)
        return user