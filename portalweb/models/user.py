from base import *   
from group import *
    
class UserTbl(Base):
    class Meta(Base.Meta):
        db_table = 'user'
        ordering = ['name']

    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    aafuser = models.CharField(max_length=1)
    logout = models.CharField(max_length=1)
    token = models.CharField(max_length=270)
    email = models.CharField(max_length=50)
    name = models.CharField(db_index=True, max_length=20)
    organization = models.CharField(max_length=200)
    groups = models.ManyToManyField('GroupTbl', through=UserGroupTbl)
    is_greeting_sent = models.BooleanField()
    is_admin = models.BooleanField()
    is_system_user = models.BooleanField()
    
    def __unicode__(self):
        return self.username