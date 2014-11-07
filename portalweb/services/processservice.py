from datetime import datetime

from django.utils.timezone import utc

from baseservice import BaseService
from ..models.processmanager import ProcessManager
from ..models.process import ProcessType
from ..models.process import ProcessStatus
from ..cloud.entities.instance import InstanceState
from ..configmanager import ConfigManager

class ProcessService(BaseService):
    def createLaunchProcess(self, instanceId):
        return ProcessManager.createProcess(instanceId, ProcessStatus.PROCESSING, ProcessType.LAUNCH)
    
    def createStartProcess(self, instanceId):
        return ProcessManager.createProcess(instanceId, ProcessStatus.PROCESSING, ProcessType.START)
    
    def createStopProcess(self, instanceId):
        return ProcessManager.createProcess(instanceId, ProcessStatus.PROCESSING, ProcessType.STOP)
    
    def createTerminateProcess(self, instanceId):
        return ProcessManager.createProcess(instanceId, ProcessStatus.PROCESSING, ProcessType.TERMINATE)
    
    def createRebootProcess(self, instanceId):
        return ProcessManager.createProcess(instanceId, ProcessStatus.PROCESSING, ProcessType.REBOOT)
    
    def getProcessTimeout(self, instanceId):
        process = ProcessManager.getActiveProcessByInstanceId(instanceId)
        
        if process and len(process) > 0:        
            currentTime = datetime.utcnow().replace(tzinfo=utc)    
            difference = currentTime - process[0].created
            
            return difference.seconds
        
        return 0

    def hasCurrentProcess(self, instanceId):
        process = ProcessManager.getActiveProcessByInstanceId(instanceId)
        
        if process and len(process) > 0:        
            return True;
        else:
            return False;
     
    def setProcessError(self, instanceId):
        process = ProcessManager.getActiveProcessByInstanceId(instanceId)
        
        if process and len(process) > 0:
            return ProcessManager.updateProcessStatus(process[0].id, ProcessStatus.ERROR)
        else:
            return False;    
        
    def setProcessFinished(self, instanceId):
        process = ProcessManager.getActiveProcessByInstanceId(instanceId)
        
        if process and len(process) > 0:
            return ProcessManager.updateProcessStatus(process[0].id, ProcessStatus.FINISHED)
        else:
            return False;
    
    def isProcessFinished(self, instanceId, currentStatus):
        processes = ProcessManager.getActiveProcessByInstanceId(instanceId)
        # This should only return one process for the instanceId.
        
        if processes and len(processes) > 0:
            process = processes[0]
            if process:
                if process.type == ProcessType.STOP and currentStatus == InstanceState.STOPPED:
                    return True
            
                if process.type == ProcessType.START and currentStatus == InstanceState.RUNNING:
                    return True
                
                if process.type == ProcessType.TERMINATE and currentStatus == InstanceState.DELETED:
                    return True
                
                if process.type == ProcessType.LAUNCH and currentStatus == InstanceState.RUNNING:
                    return True
                
                if process.type == ProcessType.REBOOT and currentStatus == InstanceState.RUNNING:
                    return True
                     
        return False;