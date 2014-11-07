import logging

from django.utils import timezone

from ..models.process import ProcessTbl
from ..models.process import ProcessType
from ..models.process import ProcessStatus

from portalweb.decorators.logger import logger

class ProcessManager:
   
    
    @classmethod
    @logger
    def createProcess(cls, instanceId, status, processType):
        process = None

        process = ProcessTbl.objects.create(instance_id=instanceId, status=status, type=processType, created=timezone.now(), active='1')

        return process;
    
    @classmethod
    @logger
    def getActiveProcessByInstanceId(cls, instanceId):
        process = None

        process = ProcessTbl.objects.filter(instance_id=instanceId, active='1')
            
        return process
    
    @classmethod
    @logger
    def updateProcessStatus(cls, processId, status):
        success = False

        process = ProcessTbl.objects.get(pk = processId)
            
        if status:
            process.status = status
            if status == ProcessStatus.FINISHED or status == ProcessStatus.ERROR:
                process.active = '0';  
            
        process.save()
        success = True
      
        return success
        
    @classmethod
    @logger
    def getProcessById(cls, processId):
        instance = ProcessTbl.objects.get(pk = processId)
        return instance