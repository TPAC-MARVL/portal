

'''from django.db import models

# Create your models here.
class Base(models.Model):
    id = models.AutoField(primary_key=True)
    created = models.DateTimeField()
    modified = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
    
class UserTbl(Base):
    class Meta(Base.Meta):
        db_table = 'User'
        
    name = models.CharField(max_length=100)
    token = models.CharField(max_length=100)
    
    def __unicode__(self):
        return self.name

class InstanceTbl(Base):
    class Meta(Base.Meta):
        db_table = 'Instance'
    
    name = models.CharField(max_length=100)
    user = models.ForeignKey(UserTbl)
    type = models.CharField(max_length=20)
    state = models.CharField(max_length=20)
    
    def __unicode__(self):
        return self.name '''