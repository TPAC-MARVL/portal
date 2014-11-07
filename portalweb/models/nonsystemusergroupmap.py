from user import *
from group import *
    
class NonSystemUserGroupMapTbl(Base):
    
    class Meta(Base.Meta):
        db_table = 'non_system_user_group_map'
    
    email = models.CharField(max_length=50)
    proved = models.BooleanField()
    group = models.ForeignKey("GroupTbl")
    is_admin = models.BooleanField()
    creator = models.ForeignKey('UserTbl')
    status = models.SmallIntegerField()    
    
class UserGroupMapStatus:
    APPLIED = 'Applied'
    NOT_APPLIED = 'Not Applied'
           
    @classmethod
    def get_status(cls, status_id):
        if status_id == 2:
            return cls.APPLIED
        if status_id == 1:
            return cls.NOT_APPLIED  
            
    @classmethod
    def get_status_id(cls, status):
        if status == cls.APPLIED:
            return 2
        if status == cls.NOT_APPLIED:
            return 1