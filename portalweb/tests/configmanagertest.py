from django.test import TestCase

from ..cloud.entities.instance import InstanceType

from ..configmanager import ConfigManager

class ConfigManagerTest(TestCase):
    def test_totalRAMs(self):
        configManager = ConfigManager()
        self.assertEqual(configManager.getTotalRAMs(), 327680)
    
    def test_totalCPUs(self):
        configManager = ConfigManager()
        self.assertEqual(configManager.getTotalCPUs(), 80)
    
    def test_totalInstances(self):
        configManager = ConfigManager()
        self.assertEqual(configManager.getTotalInstances(), 80)
    
    def test_instanceType(self):
        instanceType = InstanceType()
        instanceType.setName('name')
        instanceType.setRAMs('rams')
        instanceType.setVCPUs('vcpus')
        
        self.assertEqual(instanceType.getName(), 'name')
        self.assertEqual(instanceType.getRAMs(), 'rams')
        self.assertEqual(instanceType.getVCPUs(), 'vcpus')
    
    def test_get_instanceTypes(self):
        configManager = ConfigManager()
        instanceTypes = configManager.getInstanceTypes()
        
        self.assertEqual(len(instanceTypes), 4)
        
        self.assertEqual(InstanceType.M_SMALL, 'm1.small')
        self.assertEqual(InstanceType.M_MEDIUM, 'm1.medium')
        self.assertEqual(InstanceType.M_XLARGE, 'm1.xlarge')
        self.assertEqual(InstanceType.M_XXLARGE, 'm1.xxlarge')
        
    def test_get_allowedInstances(self):
        configManager = ConfigManager()
        self.assertEqual(configManager.getUserAllowedInstances(), 1)
    
    def test_get_allowedCPUs(self):
        configManager = ConfigManager()
        self.assertEqual(configManager.getUserAllowedCPUs(), 1)
    
    def test_get_allowedRAMs(self):
        configManager = ConfigManager()
        self.assertEqual(configManager.getUserAllowedRAMs(), 4096)
    
    def test_get_allowedFlavors(self):
        configManager = ConfigManager()
        flavors = configManager.getUserAllowedFlavors()
        
        self.assertTrue(len(flavors)==1)
        for flavor in flavors:
            self.assertEqual(flavor, 'm1.small')          
   
    def test_get_images(self):
        configManager = ConfigManager()
        #self.assertEqual(configManager.getImages(), 'ami-00000005')
        self.assertEqual(len(configManager.getImages()), 1)
    
    def test_get_keypareName(self):
        configManager = ConfigManager()
        self.assertEqual(configManager.getKeypareName(), 'ming')
    
    def test_get_SecurityGroup(self):
        configManager = ConfigManager()
        self.assertEqual(configManager.getSecurityGroup(), 'SSH')
    
    def test_get_cloudAccount(self):
        configManager = ConfigManager()
             
        account = configManager.getCloudAccount()
        
        self.assertEqual(account.getEndPoint(), 'nova.rc.nectar.org.au')
        self.assertEqual(account.getPassword(), '7257794e-a583-9ebe-efce-1c9eac432ecc')
        self.assertEqual(account.getPath(), '/services/Cloud')
        self.assertEqual(account.getPort(), 8773)
        self.assertEqual(account.getRegionName(), 'NeCTAR')
        self.assertEqual(account.getUsername(), '81acf4e56686735acc9ca115fa1a4af0')
        self.assertEqual(account.isSecure(), True)
        
        