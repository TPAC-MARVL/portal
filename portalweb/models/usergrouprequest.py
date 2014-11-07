from user import *
from group import *
    
class UserGroupRequestTbl(Base):
    
    class Meta(Base.Meta):
        db_table = 'user_group_request'
    
    email = models.CharField(max_length=50)
    proved = models.BooleanField()
    group = models.ForeignKey("GroupTbl")
    is_admin = models.BooleanField()
    user = models.ForeignKey('UserTbl')