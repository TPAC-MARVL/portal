from portalweb.system.message import MessageManager
from portalweb.system.message import Message

from baseservice import BaseService
from portalweb.models.usermanager import UserManager
from portalweb.models.groupmanager import GroupManager
from portalweb.models.usergroupmanager import UserGroupManager
from portalweb.system.util import Util
from portalweb.models.nonsystemusergroupmap import UserGroupMapStatus
from portalweb.services.groupservice import GroupService

from django.conf import settings

from portalweb.decorators.transaction import transaction

class UserService(BaseService):
    '''
      User is authenticated by AAF before calling the method.
      This method simply insert a new user to db.
    '''
    def aafLogin(self, request):
        success = False
 
        '''print request.META['HTTP_COMMONNAME']
        print request.META['HTTP_EDUPERSONAFFILIATION']
        print request.META['HTTP_EMAIL']
        print request.META['HTTP_ORGANIZATIONNAME']
        print request.META['HTTP_AUEDUPERSONSHAREDTOKEN']'''             
        
        # Verify whether this use has been authenticated by AAF.
        #aafToken = Util.get_http_header(request, 'AUEDUPERSONSHAREDTOKEN')
        
        if settings.PRODUCTION:
            organization = Util.get_http_header(request, 'ORGANIZATIONNAME')
            username = Util.get_http_header(request, 'EMAIL')
            email = Util.get_http_header(request, 'EMAIL')
            name = Util.get_http_header(request, 'COMMONNAME')
            aafToken = Util.get_http_header(request, 'EDUPERSONTARGETEDID')
                        
            password = ''  
        
        else:          
            username,email,password,aafToken,organization,name = self.getDummyUser(2)
                              
        if not email or email == '':
            return success
        else:
            success = True
            
        # Verify whether this is the first time login.
        # If Not,  insert the new users        

        userManager = UserManager()
        user = userManager.getUserByToken(aafToken)
        
        if not user:
            user = userManager.getUserByEmail(email)
        
        # user also has a default group
        if not user:
            user = userManager.createUser(username=username, password=password, aafuser=True, token=aafToken, name=name, organization=organization, email=email)    
        
            if self._configManager.is_default_group_allow():
                self.create_default_group(user)
            
            self.linkUserToGroups(email)
                                
        else:
            if settings.PRODUCTION:
                if not user.token:
                    self.setUserAAFToken(aafToken, user.id)
                
            if self._configManager.is_default_group_allow():
                group_service = GroupService()
                if not group_service.has_default_group(user):
                    self.create_default_group(user)
                   
                       
        ''' if not user.is_greeting_sent:
            message_service = MessageService()    
            message_service.sendGreeting(user)
            notification_service = NotificationService()
            notification_service.sendInitialNotifications(user) '''
            
        #user = userManager.getUserByUsername(username)
        
        request.session["user"] = user
         
        userManager.setUserLogout(user.id, False)

        return success;
  
    def getDummyUser(self, user_id):
        user_id = user_id-1
        dummy_users = []
        
        dummy_users.append(('Benedicte.Pasquer@utas.edu.au', 'Benedicte.Pasquer@utas.edu.au','123456', 'token10', 'university of tasmania','Benedicte Pasquer'))
        dummy_users.append(('xiao.fu@utas.edu.au', 'xiao.fu@utas.edu.au','123456', 'token', 'university of tasmania','Ming Fu')) 
        dummy_users.append(('lin.zhang@unsw.edu.au', 'lin.zhang@unsw.edu.au','123456', 'token11', 'university of new south wales','Lin zhang UNSW'))               
               
        return dummy_users[user_id]
    
    @transaction
    def linkUserToGroups(self, email):
        user_group_maps = self._user_group_map_manager.getMapsByEmail(email, UserGroupMapStatus.get_status_id(UserGroupMapStatus.NOT_APPLIED))
        user = self._userManager.getUserByEmail(email)       
        
        success_count = 0;
        for user_group_map in user_group_maps:
            success1 = self._usergroupManager.createUserGroup(user, user_group_map.group, user_group_map.is_admin)
            success2 = self._user_group_map_manager.updateUserGroupMapStatus(user_group_map.id, UserGroupMapStatus.get_status_id(UserGroupMapStatus.APPLIED))
        
            if success1 and success2:
                success_count = success_count + 1
        
        if len(user_group_maps) == success_count:
            return True
        else:
            return False
  
    
    @transaction
    def create_default_group(self, user):
        group = self._group_manager.createGroup("Default Group", user.name + " default group", True, user)
        
        if group:
            user_group = self._usergroupManager.createUserGroup(user, group, True)
            if user_group:
                return True
        
        return False 
  
    def isUserExist(self, request):
        exist = False         
              
        #aafToken = Util.get_http_header(request, 'AUEDUPERSONSHAREDTOKEN')
        email = Util.get_http_header(request, 'EMAIL')
        
        userManager = UserManager()
        user = userManager.getUserByEmail(email)

        if user:
            exist = True

        return exist
 
    def isUserLogout(self, request):
        logout = True
        #aafToken = Util.get_http_header(request, 'AUEDUPERSONSHAREDTOKEN')
        email = Util.get_http_header(request, 'EMAIL')
        
        userManager = UserManager()
        user = userManager.getUserByEmail(email)

        if user:
            if user.logout == '0':
                logout = False
        
        return logout    
    
    def setUserAAFToken(self, aaf_token, user_id):
        self._userManager.updateUser(user_id, None, None, True, aaf_token)    
        
    def setSystemAdmin(self, user_ids, is_admin):
        success = self._userManager.editSystemAdmin(user_ids, is_admin);
        
        token = ''
        message = ''
        
        if success:
            if is_admin:
                message = Util.get_replaced_text("1 2 been successfully set as system 3.", user_ids, [('1', 'User'), ('2', 'has'), ('3', 'admin')])
                
                token = MessageManager.setMessage(message, Message.SUCCESS)
            else:
                
                message = Util.get_replaced_text("1 2 been successfully removed system admin 3.", user_ids, [('1', 'User'), ('2', 'has'), ('3', 'role')])
                            
                token = MessageManager.setMessage(message, Message.SUCCESS)    
        else:
            if is_admin:
                
                message = Util.get_replaced_text("Error occurred when setting system admin 1. Please try again later.", user_ids, [('1', 'role')])
                
                token = MessageManager.setMessage(message, Message.ERROR)
            
            else:
                message = Util.get_replaced_text("Error occurred when removing system admin 1. Please try again later.", user_ids, [('1', 'role')])
                token = MessageManager.setMessage(message, Message.ERROR)
                
        return token               
    
    def getSystemUser(self):
        return self._userManager.getSystemUser()
    
    def getUserByEmail(self, email):
        return self._userManager.getUserByEmail(email)
    
    def getAllActiveUsers(self, exclude_user=None):
        return self._userManager.getUsers(exclude_user)
 
    def getUserById(self, userId):
        return self._userManager.getUserById(userId)
 
    def getUsersByIds(self, userIds):
        return self._userManager.getUsersByIds(userIds)
 
    def getAllActiveUsersDict(self, exclude_user=None):
        users = self.getAllActiveUsers(exclude_user)
        
        userDict = dict()
         
        for user in users:
            userDict[user.id] = user.email
        
        return userDict
 
    def logout(self, request):

        user = request.session["user"]
        
        if user:
            userId = user.id
            request.session.flush()
            userManager = UserManager()
            userManager.setUserLogout(userId, True)
