import os
import ConfigParser

from portalweb.cloud.entities.instance import InstanceType
from portalweb.cloud.entities.cloudaccount import CloudAccount

from collections import OrderedDict

class ConfigManager:
    _config = None
    CLOUD_ACCOUNT = None
        
    def __init__(self):
        self._config = ConfigParser.RawConfigParser()
        #self._config.read("/home/ubuntu/public_html/marvl.com/marvlportal/portalweb/system.cfg")
        
        current_dir = os.path.dirname(os.path.realpath(__file__));
        
        #self._config.read("C:\\projects\\marvlportal\\portalweb\\system.cfg")
        self._config.read(os.path.join(current_dir, "system.cfg"))
      
    def initialize(self):
        if self._config.has_section("Flavor"):
            for name in self._config.get("Flavor", "names").split(','):
                if name == 'm1.small':
                    InstanceType.M_SMALL = 'm1.small'
                if name == 'm1.medium':
                    InstanceType.M_MEDIUM = 'm1.medium'
                if name == 'm1.xlarge':   
                    InstanceType.M_XLARGE = 'm1.xlarge'
                if name == 'm1.xxlarge':
                    InstanceType.M_XXLARGE = 'm1.xxlarge'
        
        ConfigManager.CLOUD_ACCOUNT = self.getCloudAccount() 
            
    def getCloudAccount(self):
        cloud_account = None
        
        if self._config.has_section("CloudAccount"):
            cloud_account = CloudAccount()
            cloud_account.setEndPoint(self._config.get("CloudAccount", "endpoint"))
            cloud_account.setPassword(self._config.get("CloudAccount", "password"))
            cloud_account.setPath(self._config.get("CloudAccount", "path"))
            cloud_account.setPort(self._config.getint("CloudAccount", 'port'))
            cloud_account.setRegionName(self._config.get("CloudAccount", "regionName"))
            cloud_account.setUsername(self._config.get("CloudAccount", "username"))
            cloud_account.setSecure(self._config.getboolean("CloudAccount", 'secure'))        
        
        return cloud_account
    
    def getAdminEmail(self):
        email = None
        
        if self._config.has_section("System"):
            email = self._config.get("System", "adminEmail")
            
        return email    
    
    def getSystemEmail(self):
        email = None
        
        if self._config.has_section("System"):
            email = self._config.get("System", "systemEmail")
                    
        return email
    
    def getPhase(self):
        phase = None
        if self._config.has_section("System"):
            phase = self._config.get("System", "phase")
                    
        return phase
    
    def getImages(self):
        images = list()
        imagesIds = list()
        imageDict = {}
        
        if self._config.has_section("Instance"):
            for image in self._config.get("Instance", "imageNames").split(','):
                images.append(image)
        
        if self._config.has_section("Instance"):
            for imageId in self._config.get("Instance", "imageIds").split(','):
                imagesIds.append(imageId)
                
        for i in range(len(images)):
            imageDict[imagesIds[i]] = images[i]
            
        return imageDict  
    
    def getKeypareName(self):
        if self._config.has_section("Instance"):
            return self._config.get("Instance", "keypareName")
        
    def getSecurityGroup(self):
        securityGroups = list()
        
        if self._config.has_section("Instance"):
            for securityGroup in self._config.get("Instance", "securityGroup").split(','):
                securityGroups.append(securityGroup)
        
        return securityGroups
  
    def getItermsPerPage(self):
        if self._config.has_section("System"):
            return self._config.getint("System", "itermsPerPage")    
    
    def getTotalCPUs(self):
        if self._config.has_section("System"):
            return self._config.getint("System", "totalCPUs")
     
    def getTotalInstances(self):
        if self._config.has_section("System"):
            return self._config.getint("System", "totalInstances")
    
    def getTotalRAMs(self):    
        if self._config.has_section("System"):
            return self._config.getint("System", "totoalRAMs")
    
    def getUserAllowedCPUs(self):
        if self._config.has_section("User"):
            return self._config.getint("User", "allowedCPUs")
    
    def getUserAllowedInstances(self):
        if self._config.has_section("User"):
            return self._config.getint("User", "allowedInstances")
    
    def getUserAllowedRAMs(self):
        if self._config.has_section("User"):
            return self._config.getint("User", "allowedRAMs")     
    
    def getTimeout(self):
        if self._config.has_section("System"):
            return self._config.get("System", "timeout")
     
    def getUserAllowedFlavors(self):
        flavors = {}
        
        if self._config.has_section("User"):
            for flavor in self._config.get("User", "allowedFlavors").split(','):
                flavors[flavor] = flavor
            
        return flavors
    
    def getGreetingTitle(self):
        if self._config.has_section("System"):
            return self._config.get("System", "greetingTitle")
    
    def getGreetingContent(self):
        if self._config.has_section("System"):
            return self._config.get("System", "greeting")
    
    def getCommonInstance(self):
        if self._config.has_section("System"):
            return self._config.get("System", "commonInstance")
    
    def is_default_group_allow(self):
        if self._config.has_section("System"):
            allowed = self._config.get("System", "defaultGroup")
            if allowed and str.lower(allowed) == 'true':
                return True
        
        return False                
    
    def getInstanceTypes(self):
        instanceTypes = OrderedDict() 
                
        names = []
        if self._config.has_section("Flavor"):
            for name in self._config.get("Flavor", "names").split(','):
                names.append(name)
        
        rams = []
        if self._config.has_section("Flavor"):
            for ram in self._config.get("Flavor", "rams").split(','):
                rams.append(ram)
        
        vcpus = []
        if self._config.has_section("Flavor"):
            for vcpu in self._config.get("Flavor", "vcpus").split(','):
                vcpus.append(vcpu)
        
        for i in range(0, len(names)):
            instanceType = InstanceType()            
            instanceType.setName(names[i])
            instanceType.setRAMs(int(rams[i]))
            instanceType.setVCPUs(int(vcpus[i]))
            instanceType.setSequence(i)
            instanceTypes[names[i]] = instanceType 
            
        return instanceTypes
