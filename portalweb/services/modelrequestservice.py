from baseservice import BaseService

from portalweb.system.message import MessageManager
from ..models.modelrequest import ModelRequestStatus
from portalweb.system.message import Message
from portalweb.system.util import Util
from portalweb.decorators.transaction import transaction

class ModelRequestService(BaseService):
    def submitModelRequest(self, description, creator, model_type, group_id):        
        new_request = self._model_request_manager.createRequest(description, creator, model_type, group_id)
    
        token = ''
        
        if new_request:
            token = MessageManager.setMessage("Request Form has been successfully submitted. A notification will be send to you when the request form is processed.", Message.SUCCESS)
        else:
            token = MessageManager.setMessage("Error occurred when submitting the request form. Please try again later.", Message.ERROR)
            
        return token             
    
    def rejectModelRequest(self, model_request_ids, changed_by, notes, request_modified_times):
        success = self._setModelRequestStatusByIds(model_request_ids, changed_by, ModelRequestStatus.REJECTED, notes, request_modified_times)
    
        message = Util.get_replaced_text("Request 1 2 been successfully rejected. A notification will be send to the relevant 3.", model_request_ids, [('1', 'Form'), ('2', 'has'), ('3', 'user')])
    
        error_message = Util.get_replaced_text("Error occurred when rejecting the request 1. Please try again later.", model_request_ids, [('1', 'form')])
    
        token = ''
        if success:
            token = MessageManager.setMessage(message, Message.SUCCESS)
        else:
            token = MessageManager.setMessage(error_message, Message.ERROR)
            
        return token
    
    @transaction
    def _setModelRequestStatusByIds(self, model_request_ids, changed_by, status, notes, request_modified_times):
        
        for index, model_request_id in enumerate(model_request_ids):
            success = self._model_request_manager.setModelRequestStatusById(model_request_id, changed_by, status, notes, request_modified_times[index])
    
            if not success:
                return False
            
        return True
        
    def approveModelRequest(self, model_request_ids, changed_by, notes, request_modified_times):
        
        success = self._setModelRequestStatusByIds(model_request_ids, changed_by, ModelRequestStatus.APPROVED, notes, request_modified_times)
        
        message = Util.get_replaced_text("Request 1 2 been successfully approved. A notification will be send to the relevant 3.", model_request_ids, [('1', 'Form'), ('2', 'has'), ('3', 'user')])
        error_message = Util.get_replaced_text("Error occurred when approving the request 1. Please try again later.", model_request_ids, [('1', 'form')])
        
        token = ''
        if success:                        
            token = MessageManager.setMessage(message, Message.SUCCESS)
        else:
            token = MessageManager.setMessage(error_message, Message.ERROR)
            
        return token
                
    def getModelRequestByUser(self, user):
        
        if user.is_admin:
            return self._model_request_manager.getAllModelRequests()
        else :
            return self._model_request_manager.getModelRequestsByUser(user)