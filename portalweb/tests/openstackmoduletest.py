import time

from django.test import TestCase
from portalweb.cloud.provider.cloudprovideropenstack import CloudProviderOpenStack
from portalweb.cloud.entities.cloudaccount import CloudAccount

from portalweb.cloud.entities.instance import *
from portalweb.cloud.entities.image import *
from portalweb.cloud.entities.securitygroup import *

class OpenStackModuleTest(TestCase):
    
    def initAccount(self):
        """
        Initialize Cloud Provider account.
        """
        cloud_account = CloudAccount()
        cloud_account.setEndPoint("nova.rc.nectar.org.au")
        cloud_account.setPassword("87a744579e2743a98d34e22d3c2bd40f")
        cloud_account.setSecure(True)
        cloud_account.setPath("/services/Cloud")
        cloud_account.setPort(8773)
        cloud_account.setRegionName("NeCTAR")
        cloud_account.setUsername("fe2d6d6d51434a0e866f8f428420b293") 
        return cloud_account

    def test_account(self):
        cloudAccount = self.initAccount()
        
        self.assertEqual(cloudAccount.getEndPoint(), "nova.rc.nectar.org.au")
        self.assertEqual(cloudAccount.getPassword(), "87a744579e2743a98d34e22d3c2bd40f")
        self.assertEqual(cloudAccount.isSecure(), True)
        self.assertEqual(cloudAccount.getPath(), "/services/Cloud")
        self.assertEqual(cloudAccount.getPort(), 8773)
        self.assertEqual(cloudAccount.getRegionName(), "NeCTAR")
        self.assertEqual(cloudAccount.getUsername(), "fe2d6d6d51434a0e866f8f428420b293")
       
    def test_instance(self):
        instance = Instance()
        
        instance.setId('id')
        instance.setImageId('imageId')
        instance.setInstanceType('instanceType')
        instance.setIpAddress('ipAddress')
        instance.setLaunchTime('launchTime')
        instance.setState('state')
        instance.setStateCode('code')
        
        self.assertEqual(instance.getId(), 'id')
        self.assertEqual(instance.getImageId(), 'imageId')
        self.assertEqual(instance.getInstanceType(), 'instanceType')
        self.assertEqual(instance.getIpAddress(), 'ipAddress')
        self.assertEqual(instance.getLaunchTime(), 'launchTime')
        self.assertEqual(instance.getState(), 'state')
        self.assertEqual(instance.getStateCode(), 'code')
        
    def test_image(self):
        image = Image()
        
        image.setId('id')
        image.setArchitecture('architecture')
        image.setDescription('description')
        image.setName('name')
        image.setPlatform('platform')
        image.setState('state')
        image.setType('imageType')
        
        self.assertEqual(image.getId(), 'id')
        self.assertEqual(image.getArchitecture(), 'architecture')
        self.assertEqual(image.getDescription(), 'description')
        self.assertEqual(image.getName(), 'name')
        self.assertEqual(image.getPlatform(), 'platform')
        self.assertEqual(image.getState(), 'state')
        self.assertEqual(image.getType(), 'imageType')
    
    def test_security_group(self):
        securityGroup = SecurityGroup()
        
        securityGroup.setDescription('description')
        securityGroup.setId('iid')
        securityGroup.setName('name')
        
        self.assertEqual(securityGroup.getId(), 'iid')
        self.assertEqual(securityGroup.getName(), 'name')
        self.assertEqual(securityGroup.getDescription(), 'description')
        
    def test_connect(self):
        """
        Tests Cloud Provider connect method.
        """
        cloudAccount = self.initAccount()
        cloud_provider = CloudProviderOpenStack()       
        
        result = cloud_provider.connect(cloudAccount)
        self.assertTrue(result)
    
    def test_close(self):
        """
        Tests Cloud Provider close method.
        """
        cloudAccount = self.initAccount()
        cloud_provider = CloudProviderOpenStack()
        
        cloud_provider.connect(cloudAccount)
        
        self.assertTrue(cloud_provider.close())
        self.assertFalse(cloud_provider._connected)
    
    def test_getInstances(self):
        """
        Tests Cloud Provider getInstances method.
        """
        
        cloudAccount = self.initAccount()
        cloud_provider = CloudProviderOpenStack()
        
        self.assertTrue(cloud_provider.getInstances() == None)
        
        cloud_provider.connect(cloudAccount)
        instances = cloud_provider.getInstances()
        
        self.assertTrue(instances != None)
        #self.assertEqual(len(instances), 2)
    
    def test_getSecurityGroups(self):
        """
        Tests Cloud Provider getSecurityGroups method.
        """
        cloudAccount = self.initAccount()
        cloud_provider = CloudProviderOpenStack()
        
        cloud_provider.connect(cloudAccount)
        securityGroups = cloud_provider.getSecurityGroups()
        
        for key in securityGroups:
            print securityGroups[key].getName()
            self.assertTrue(securityGroups[key].getName() != '')
        
    
    def test_getImages(self):
        """
        Tests Cloud Provider getImages method.
        """
        cloudAccount = self.initAccount()
        cloud_provider = CloudProviderOpenStack()
        
        cloud_provider.connect(cloudAccount)
        images = cloud_provider.getImages()
    
        for key in images:
            self.assertTrue(images[key].getId() != '')
            
    def ntest_terminateInstance(self):
        """
        Tests Cloud Provider terminateInstance method.
        """
        cloudAccount = self.initAccount()
        cloud_provider = CloudProviderOpenStack()
        
        cloud_provider.connect(cloudAccount)
        instances = cloud_provider.getInstances()
        
        for key in instances:
            if instances[key].getIpAddress() == '115.146.84.198':
                cloud_provider.terminateInstance(instances[key].getId())
        
        time.sleep(20)
        instances = cloud_provider.getInstances()
        
        self.assertEqual(len(instances), 1)     
    
    def ntest_launchInstance(self):
        """
        Tests Cloud Provider launchInstance method.
        """
        cloudAccount = self.initAccount()
        cloud_provider = CloudProviderOpenStack()
        
        cloud_provider.connect(cloudAccount)
               
        newInstance = cloud_provider.launchInstance(imageId="ami-00000005", keypairName="ming", securityGroups=["default"])
        
        self.assertTrue(newInstance.getId() != '')        
    
    def ntest_rebootInstance(self):
        """
        Tests Cloud Provider rebootInstance method.
        """
        cloudAccount = self.initAccount()
        cloud_provider = CloudProviderOpenStack()
        
        cloud_provider.connect(cloudAccount)
        instances = cloud_provider.getInstances()
    
        for key in instances: 
            if instances[key].getIpAddress() == '115.146.84.198':
                cloud_provider.rebootInstance(instances[key].getId())
        
        time.sleep(20)
        instances = cloud_provider.getInstances()
    
        for key in instances: 
            if instances[key].getIpAddress() == '115.146.84.198':
                self.assertEqual(instances[key].getState(), InstanceState.RUNNING)
        
    def ntest_startInstance(self):
        """
        Tests Cloud Provider startInstance method.
        """
        cloudAccount = self.initAccount()
        cloud_provider = CloudProviderOpenStack()
        
        cloud_provider.connect(cloudAccount)
        instances = cloud_provider.getInstances()
           
        for key in instances:            
            if instances[key].getState() == InstanceState.STOPPED:
                cloud_provider.startInstance(instances[key].getId())    
        
        time.sleep(15)
        
        instances = cloud_provider.getInstances()
        
        for key in instances:
            self.assertEqual(instances[key].getState(), InstanceState.RUNNING)         
                
    def ntest_stopInstance(self):
        """
        Tests Cloud Provider stopInstance method.
        """
        
        cloudAccount = self.initAccount()
        cloud_provider = CloudProviderOpenStack()
        
        cloud_provider.connect(cloudAccount)
        instances = cloud_provider.getInstances()
        
        for key in instances:            
            if instances[key].getState() == InstanceState.RUNNING:
                cloud_provider.stopInstance(instances[key].getId())    
        
        time.sleep(15)
        
        instances = cloud_provider.getInstances()
        
        for key in instances:
            self.assertEqual(instances[key].getState(), InstanceState.STOPPED)