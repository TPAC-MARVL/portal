from baseservice import BaseService

from ..models.messagemanager import MessageTblManager
from portalweb.system.message import MessageManager
from portalweb.system.message import Message

from portalweb.system.util import Util

class MessageService(BaseService):
    def sendGreeting(self, receiver):
        greeting_content = self._configManager.getGreetingContent()
        greeting_title = self._configManager.getGreetingTitle() 
        
        system_user = self._userManager.getSystemUser()   
        token = self.sendMessage(system_user, receiver, greeting_title, greeting_content)   
    
        message = MessageManager.getMessage(token)
        
        if not message.getType() == Message.ERROR:
            self._userManager.updateUserGreeting(receiver.id, True)
    
    def sendMessages(self, sender, receivers, title, content, is_group_message=False):
        
        success_list = []
        failed_list = []
        tokens = []
        type_text = ""
        
        if is_group_message:
            type_text = "group member"    
        else:
            type_text = "user"
        
        for receiver in receivers:
            token = self.sendMessage(sender, receiver, title, content, is_group_message)
            message = MessageManager.getMessage(token)
            if message.getType() == Message.SUCCESS:
                success_list.append(receiver.name);
            else:    
                failed_list.append(receiver.name);
        
        message = ''
        
        if len(success_list) > 0:
            
            message = Util.get_replaced_text("1 2 been successfully sent to 3 (4).", success_list, [('1', 'Message'), ('2', 'has'), ('3', type_text), ('4', ','.join(success_list))])          
            
            tokens.append(MessageManager.setMessage(message, Message.SUCCESS));
            
        if len(failed_list) > 0:
            
            message = Util.get_replaced_text("Error occurred when sending 1 to 2 (3).", failed_list, [('1', 'message'), ('2', type_text), ('3', ','.join(failed_list))])         
            
            tokens.append(MessageManager.setMessage(message, Message.ERROR));       
        
        return tokens
    
    def sendMessage(self, sender, receiver, title, content, is_group=False):
        token = ''
        
        message = MessageTblManager.createMessage(title, content, sender, receiver, is_group)    
    
        if message:
            token = MessageManager.setMessage("Message has been successfully sent to User " + receiver.name + ".", Message.SUCCESS)
        else:
            token = MessageManager.setMessage("Error occurred when sending message to User " + receiver.name + ". Please try again later.", Message.ERROR)
        
        return token
        
    def getMessagesbySender(self, sender, latest=False):
        messages = MessageTblManager.getMessagesByUser(sender, MessageTblManager.CONST_SENDER)
    
        messages_list = []
        
        if messages:
            if latest:
                messages = messages[0:5] 
            for message in messages:
                messages_list.append(message);
            
        return messages_list;
    
    def getMessagesbyUser(self, receiver):
        return MessageTblManager.getMessagesByUser(receiver, MessageTblManager.CONST_RECEIVER)