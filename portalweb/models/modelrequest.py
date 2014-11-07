from base import *   
from user import *
from usergroup import *
    
class ModelRequestTbl(Base):
    class Meta(Base.Meta):
        db_table = 'model_request'
        
    type = models.CharField(max_length=30)
    description = models.CharField(max_length=300, null=True)
    creator = models.ForeignKey('UserTbl', related_name="model_request_creator")
    status = models.SmallIntegerField()
    shared_by = models.CharField(max_length=20, null=True)
    notes = models.CharField(max_length=500, null=True)
    changed_by = models.ForeignKey('UserTbl', related_name="model_request_changed_by", null=True)  
    request_id = models.CharField(max_length=50)
            
    def __unicode__(self):
        return self.name

class ModelRequestStatus:
    SUBMITTED = 'submitted'
    PENDING = 'pending'
    APPROVED = 'approved'
    REJECTED = 'rejected'
    SAVED = 'saved'
        
    @classmethod
    def get_status(cls, status_id):
        if status_id == 1:
            return cls.SUBMITTED
        if status_id == 2:
            return cls.PENDING
        if status_id == 3:
            return cls.APPROVED
        if status_id == 4:
            return cls.REJECTED
        if status_id == 5:
            return cls.SAVED        
            
    @classmethod
    def get_status_id(cls, status):
        if status == cls.SUBMITTED:
            return 1
        if status == cls.PENDING:
            return 2
        if status == cls.APPROVED:
            return 3
        if status == cls.REJECTED:
            return 4
        if status == cls.SAVED:
            return 5
        