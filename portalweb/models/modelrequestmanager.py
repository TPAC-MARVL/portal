from django.utils import timezone
import uuid

from ..models.modelrequest import ModelRequestTbl
from ..models.modelrequest import ModelRequestStatus

from portalweb.decorators.logger import logger
from portalweb.system.util import Util

class ModelRequestManager:
    @logger  
    def createRequest(self, description, creator, model_type, group_id):
        new_equest = None
        
        new_equest = ModelRequestTbl.objects.create(description=description, creator=creator, shared_by=group_id, type = model_type, status = ModelRequestStatus.get_status_id(ModelRequestStatus.SUBMITTED), created=timezone.now(), request_id=uuid.uuid4())
                                        
        return new_equest

    @logger
    def setModelRequestStatusByIds(self, model_request_ids, changed_by, status, notes=None):
        success = False
        
        ModelRequestTbl.objects.filter(id__in=model_request_ids).update(status=ModelRequestStatus.get_status_id(status), notes=notes, changed_by=changed_by, modified=timezone.now())
        
        success = True
    
        return success
    
    @logger
    def getModelRequestByIds(self, model_request_ids):
        return ModelRequestTbl.objects.filter(id__in=model_request_ids)    
    
    @logger
    def setModelRequestStatusById(self, model_request_id, changed_by, status, notes, request_modified_time):
        success = False
              
        model_request = ModelRequestTbl.objects.get(id = model_request_id)  
        
        if model_request:
            
            if int(request_modified_time) != Util.get_time_stamp(model_request.modified):
                return success
            
            model_request.status = ModelRequestStatus.get_status_id(status)
            model_request.changed_by = changed_by
            
            if notes:
                model_request.notes = notes
            
            model_request.save()
            success = True
            
        return success
   
    @logger
    def getAllModelRequests(self):
        model_requests = None
        
        model_requests = ModelRequestTbl.objects.all()
   
        return model_requests
   
    @logger
    def getModelRequestsByUser(self, user):
        model_requests = None
        
        model_requests = ModelRequestTbl.objects.filter(creator = user)
        
        return model_requests
    
    @logger
    def getModelRequestsByStatus(self, status):
        model_request = None
        
        model_request = ModelRequestTbl.objects.filter(status = status)
             
        return model_request