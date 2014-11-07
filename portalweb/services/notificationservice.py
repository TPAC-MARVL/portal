from baseservice import BaseService

from ..models.notificationmanager import NotificationManager
from portalweb.system.message import MessageManager
from portalweb.system.message import Message

from ..system.util import Util

class NotificationService(BaseService):
    def sendInitialNotifications(self, receiver):
        system_user = self._userManager.getSystemUser() 
        
        notification_content = "Welcome to The Marine Virtual Laboratory."
        notification_title = "If you have any questions and suggestions, please send an email to " + system_user.email + "."
                  
        token = self.sendNotification(system_user, receiver, notification_title, notification_content)   
    
        message = MessageManager.getMessage(token)
        
        if not message.getType() == Message.ERROR:
            self._userManager.updateUserGreeting(receiver.id, True)
        
    def sendGroupRenameNotification(self, sender, receivers, old_group_name, new_group_name, message_type):
        title = 'Group renamed to ' + new_group_name
        content = "Group " + old_group_name + " has changed to " + new_group_name + "."
        
        self.sendNotifications(sender, None, receivers, title, content, message_type)
        return (title, content)
    
    def sendSystemAdminAddNotification(self, sender, receiverIds, message_type):
        title = 'Added you as system admin'
        content = 'You have been successfully added as system admin.'
        
        self.sendNotifications(sender, receiverIds, None, title, content, message_type)
        return (title, content) 
    
    def sendSystemAdminRemoveNotification(self, sender, receiverIds, message_type):
        title = 'Your system admin role removed'
        content = 'You have been removed from a system admin role.'
        
        self.sendNotifications(sender, receiverIds, None, title, content, message_type)
        return (title, content)   
        
    def sendGroupMemberRemoveNotification(self, sender, removed_members, members, group, message_type):
        title1 = Util.get_replaced_text("1 removed from group 2.", removed_members, [('1', 'Member'), ('2', group.name)])           
        removed_member_names = []
                
        for member_removed in removed_members:
            removed_member_names.append(member_removed.name) 
              
        content1 = Util.get_replaced_text("1 (2) 3 been successfully removed from group 4.", removed_member_names, [('1', 'Member'), ('2', ','.join(removed_member_names)), ('3', 'has'), ('4', group.name)]) 
                
        self.sendNotifications(sender, None, members, title1, content1, message_type)    
    
        title2 = "Removed from group " + group.name
        content2 = "You have been removed from group " + group.name + "."
    
        self.sendNotifications(sender, None, removed_members, title2, content2, message_type)    
    
        return (title1, content1, title2, content2)
    
    def sendGroupMemberAddNotification(self, sender, members, new_members, group, message_type):
        if len(new_members) > 1:
            title1 = 'New members added to group ' + group.name
            new_member_names = []
            
            for new_member in new_members:
                new_member_names.append(new_member.name)    
            
            content1 = 'New Members (' + ','.join(new_member_names) + ') have been successfully added to group ' + group.name + '.'
        else:
            title1 = 'New member added to group ' + group.name
            content1 = 'New Member (' + new_members[0].name + ') has been successfully added to group ' + group.name + '.'
            
        self.sendNotifications(sender, None, members, title1, content1, message_type)
        
        title2 = 'New member added to group ' + group.name
        content2 = "You have been added to group " + group.name + "."
        
        self.sendNotifications(sender, None, new_members, title2, content2, message_type)
                
        return (title1, content1, title2, content2)
    
    def sendModelRequestApproveNotification(self, sender, request_ids, message_type):
        model_requests = self._model_request_manager.getModelRequestByIds(request_ids)
        receivers = []
            
        for model_request in model_requests:
            title = "Model Request Approved"
            content = "Your request (" + model_request.request_id + ") has been approved." 
            self.sendNotifications(sender, None, [model_request.creator], title, content, message_type)
            receivers.append(model_request.creator)
        
        return (title, content, receivers)
    
    def sendModelRequestRejectNotification(self,sender, request_ids, message_type):
        model_requests = self._model_request_manager.getModelRequestByIds(request_ids)
        receivers = []
            
        for model_request in model_requests:
            title = "Model Request Rejected"
            content = "Your request (" + model_request.request_id + ") has been rejected." 
            self.sendNotifications(sender, None, [model_request.creator], title, content, message_type)
            receivers.append(model_request.creator)
        
        return (title, content, receivers)
    
    def sendNotifications(self, sender=None, receiverIds=None, receivers=None, title=None, content=None, message_type=None):
        if self._isOkToSend(message_type):
            if receiverIds:
                receivers = self._userManager.getUsersByIds(receiverIds)
            
            for receiver in receivers:
                self.sendNotification(sender, receiver, title, content)     
    
    def sendNotification(self, sender, receiver, title, content):
        token = ''
        
        notification = NotificationManager.createNotification(title, content, sender, receiver)    
    
        if notification:
            token = MessageManager.setMessage("Notification has been successfully sent to User " + receiver.name + ".", Message.SUCCESS)
        else:
            token = MessageManager.setMessage("Error occurred when sending notification to User " + receiver.name + ". Please try again later.", Message.ERROR)
        
        return token
      
    def getNotificationsbyUser(self, receiver):
        return NotificationManager.getNotificationsByUser(receiver, NotificationManager.CONST_RECEIVER)