import logging

from django.utils import timezone

from ..models.message import MessageTbl
from portalweb.decorators.logger import logger

class MessageTblManager:
    _logger = logging.getLogger(__name__)
    CONST_RECEIVER = "receiver"    
    CONST_SENDER = "sender"
    
    @classmethod
    @logger    
    def createMessage(cls, title, content, user_from, user_to, is_group=False):
        message = None  
        
        message = MessageTbl.objects.create(title=title, content=content, user_from = user_from, user_to = user_to, created=timezone.now(), active=True, is_group=is_group)
                                        
        return message
    
    @classmethod
    @logger
    def getMessagesByUser(cls, user, type_flag="receiver"):
        messages = None
                
        if type_flag == cls.CONST_RECEIVER:
            messages = MessageTbl.objects.filter(user_to=user, active=True).order_by('-created')
        if type_flag == cls.CONST_SENDER:
            messages = MessageTbl.objects.filter(user_from=user, active=True).order_by('-created')
            
        return messages