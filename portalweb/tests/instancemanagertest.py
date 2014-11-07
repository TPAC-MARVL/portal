from django.test import TestCase

from ..models.instancemanager import InstanceManager
from ..models.usermanager import UserManager   
from portalweb.cloud.entities.instance import InstanceState   
   
class InstanceManagerTest(TestCase):    
    
    def test_crud_instance(self):
        userManager = UserManager()
        
        userManager.createUser(username='username1', password='password', aafuser=False, token='token')
        user = userManager.getUserByUsername('username1')
        
        instanceManager = InstanceManager()
        success = instanceManager.createInstance(name='instance', userId=user.id, instanceType='instanceType', state='state')
        self.assertTrue(success)
        
        success = instanceManager.createInstance(name='instance3', userId=user.id, instanceType='instanceType1', state=InstanceState.DELETED)
        self.assertTrue(success)
        
        ins = instanceManager.getInstancesByUserId(user.id)
        
        self.assertEqual(len(ins), 2)
        
        self.assertEqual(len(instanceManager.getInstances()), 1)
        
        instnace = instanceManager.getInstanceByName('instance')
        
        self.assertEqual(instnace.name, 'instance')
        self.assertEqual(instnace.user.username, 'username1')
        
        instance = instanceManager.getInstanceById(instnace.id)
        self.assertEqual(instance.name, 'instance')
        self.assertEqual(instance.user.username, 'username1')
        
        success = instanceManager.updateInstance(instanceId=instance.id, name='instance2', instanceType='type2', state='state2')
        self.assertTrue(success)
        
        instnace = instanceManager.getInstanceByName('instance2')
        
        self.assertEqual(instnace.name, 'instance2')
        self.assertEqual(instnace.type, 'type2')
        self.assertEqual(instnace.state, 'state2')
        