from user import *
from group import *
    
class UserGroupTbl(Base):
    
    class Meta(Base.Meta):
        db_table = 'user_group'
        index_together = [
            ["group", "is_admin"]
        ]
    
    user = models.ForeignKey("UserTbl")
    group = models.ForeignKey("GroupTbl")
    is_admin = models.BooleanField()
    


    