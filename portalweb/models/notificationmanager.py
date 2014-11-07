import logging

from django.utils import timezone

from ..models.notification import NotificationTbl

from portalweb.decorators.logger import logger

class NotificationManager:
    _logger = logging.getLogger(__name__)
    CONST_RECEIVER = "receiver"    
    CONST_SENDER = "sender"
    
    @classmethod
    @logger
    def createNotification(cls, title, content, user_from, user_to):
        message = None
       
        message = NotificationTbl.objects.create(title=title, content=content, user_from = user_from, user_to = user_to, created=timezone.now(), active=True)

        return message
        
    @classmethod
    @logger
    def getNotificationsByUser(cls, user, type_flag=CONST_RECEIVER):
        notifications = None 

        if type_flag == cls.CONST_RECEIVER:
            notifications = NotificationTbl.objects.filter(user_to=user, active=True).order_by('-created')
        if type_flag == cls.CONST_SENDER:
            notifications = NotificationTbl.objects.filter(user_from=user, active=True).order_by('-created')
         
        return notifications       