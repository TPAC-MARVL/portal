import os

from django.contrib import messages

class Message:
    ERROR = 'error'
    WARNING = 'warning'
    SUCCESS = 'success'
    
    _id = None
    _type = None
    _message = None
    
    def getId(self):
        return self._id
    
    def setId(self, iid):
        self._id = iid
        
    def setType(self, mtype):
        self._type = mtype
    
    def getType(self):
        return self._type
    
    def setMessage(self, message):
        self._message = message
    
    def getMessage(self):
        return self._message
    
class MessageManager:
    _MESSAGE = {}
    
    @staticmethod
    def setMessage(messageTxt, mtype):
        stringLength = 10
        mid = os.urandom(stringLength)
        
        message = Message()
        message.setId(mid)               
        message.setType(mtype)
        message.setMessage(messageTxt)
        
        MessageManager._MESSAGE[mid] = message
        
        return mid
    
    @staticmethod
    def getMessage(mid):
        message = MessageManager._MESSAGE.get(mid)
        del MessageManager._MESSAGE[mid]
        
        return message
    
    @staticmethod
    def getDjangoType(mtype):
        if mtype == Message.ERROR:
            return messages.ERROR 
        if mtype == Message.WARNING:
            return messages.WARNING
        if mtype == Message.SUCCESS:
            return messages.SUCCESS 