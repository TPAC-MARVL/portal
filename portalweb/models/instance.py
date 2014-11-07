from user import *
from portalweb.cloud.entities.instance import InstanceType

class InstanceTbl(Base):
    class Meta(Base.Meta):
        db_table = 'instance'
        ordering = ['name']
    
    name = models.CharField(db_index=True, max_length=100)
    instance_id = models.CharField(max_length=200)
    user = models.ForeignKey('UserTbl')
    type = models.CharField(max_length=20)
    state = models.CharField(max_length=20)
    ip = models.CharField(max_length=15)
    group = models.ForeignKey('GroupTbl', null=True)
    url = models.CharField(max_length=100)
    public = models.BooleanField(default=False)
    
    def __unicode__(self):
        return self.name
    
    # Help methods
    def getSizeString(self):
        if self.type == InstanceType.M_SMALL:
            return "m1.small | 4GB RAM | 1 VCPU | 40GB Disk"
        if self.type == InstanceType.M_MEDIUM:
            return "m1.medium | 8GB RAM | 2 VCPU | 70GB Disk"
        if self.type == InstanceType.M_XLARGE:
            return "m1.xlarge | 32GB RAM | 8 VCPU | 250GB Disk"
        if self.type == InstanceType.M_XXLARGE:
            return "m1.xxlarge | 64GB RAM | 16 VCPU | 490GB Disk"      
        
        
