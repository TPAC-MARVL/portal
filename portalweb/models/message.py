from base import *   
from user import *

class MessageTbl(Base):
    class Meta(Base.Meta):
        db_table = 'message'
           
    user_from = models.ForeignKey("UserTbl", related_name='message_user_from')
    user_to = models.ForeignKey("UserTbl", related_name='message_user_to')
    content = models.CharField(max_length=500)
    title = models.CharField(max_length=50)
    active = models.BooleanField()
    is_group = models.BooleanField()
    
    def __unicode__(self):
        return self.title