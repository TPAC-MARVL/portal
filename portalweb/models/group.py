from base import *   
from user import *
from usergroup import *
    
class GroupTbl(Base):
    
    class Meta(Base.Meta):
        db_table = 'group'
        ordering = ['name']
        
    name = models.CharField(db_index=True, max_length=100)
    description = models.CharField(max_length=500)
    users = models.ManyToManyField('UserTbl', through=UserGroupTbl, related_name="members")
    default = models.BooleanField()
    creator = models.ForeignKey('UserTbl', related_name="creator")
        
    def __unicode__(self):
        return self.name
    
    def get_default_group_name(self, current_user_name = None):
        group_name = ''
        
        if self.default:
            if current_user_name:
                if current_user_name == self.creator.name:
                    group_name = self.name
                else:
                    group_name = self.name + " (" + self.creator.name + ")"
            else:
                group_name = self.name + " (" + self.creator.name + ")"
        else:
            group_name = self.name
        
        return group_name