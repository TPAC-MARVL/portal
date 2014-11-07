from base import *   
from user import *
from usergroup import *
from instance import *
    
class ProcessTbl(Base):
    class Meta(Base.Meta):
        db_table = 'process'
        
    status = models.CharField(max_length=10)
    type = models.CharField(max_length=10)
    instance = models.ForeignKey(InstanceTbl)
    active = models.CharField(max_length=1)
    
    def __unicode__(self):
        return self.id

class ProcessType:
    STOP = 'stop'
    START = 'start'
    TERMINATE = 'terminate'
    LAUNCH = 'launch'
    REBOOT = 'reboot'
    
class ProcessStatus:
    PROCESSING = 'processing'
    FINISHED = 'finished'
    NO_PROCESS = 'noprocess'
    ERROR = 'error'