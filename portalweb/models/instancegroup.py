from instance import *
from group import *
    
class InstanceGroupTbl(Base):
    
    class Meta(Base.Meta):
        db_table = 'instance_group'
    
    instance = models.ForeignKey("InstanceTbl")
    group = models.ForeignKey("GroupTbl")
    creator = models.ForeignKey('UserTbl', related_name="instance_group_creator")