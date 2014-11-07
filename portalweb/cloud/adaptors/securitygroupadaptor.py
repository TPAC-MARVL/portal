from ..entities.securitygroup import SecurityGroup

class SecurityGroupAdaptor:
    def convertSecurityGroup(self, securityg):
        raise NotImplementedError
    
class SecurityGroupAdaptorImpl(SecurityGroupAdaptor):
    def convertSecurityGroup(self, securityg):
        securityGroup = SecurityGroup()
        
        securityGroup.setId(securityg.id)
        securityGroup.setDescription(securityg.description)
        securityGroup.setName(securityg.name)
        
        return securityGroup