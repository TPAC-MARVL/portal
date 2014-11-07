from base import * 

class SecurityTokenTbl(Base):
    class Meta(Base.Meta):
        db_table = 'security_token'
    
    token = models.CharField(max_length=36, null=True)
    instance = models.ForeignKey('InstanceTbl', related_name="instance_security_token", null=False)  
    client = models.ForeignKey('UserTbl', null=False)         
            
    def __unicode__(self):
        return self.name