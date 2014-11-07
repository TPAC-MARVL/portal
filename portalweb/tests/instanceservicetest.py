import time

from django.test import TestCase

from ..models.instancemanager import InstanceManager
from ..models.usermanager import UserManager   
from portalweb.cloud.entities.instance import *   
from ..services.instanceservice import InstanceService
from portalweb.configmanager import ConfigManager
from ..system.message import MessageManager  
from ..system.message import Message

class InstanceServiceTest(TestCase):
    def test_stopInstance(self):
        pass     
    
    def test_launchInstance(self):                            
        userManager = UserManager()
        success = userManager.createUser(username='username111', password='password', aafuser=True, token='token')
         
        self.assertTrue(success)
         
        user = userManager.getUserByUsername(username='username111')
         
        self.assertTrue(user != None)
         
        instanceService = InstanceService()
        
        self.assertTrue(instanceService._isInstanceAllowedToLaunch(InstanceType.M_SMALL))
        
        token = instanceService.launchInstance(user.id, InstanceType.M_SMALL)
        
        self.assertTrue(token != None)
        message = MessageManager.getMessage(token)
        
        self.assertEqual(message.getType(), Message.SUCCESS)
        
        instanceManager = InstanceManager()
        instances = instanceManager.getInstancesByUserId(user.id)
        
        self.assertTrue(len(instances) == 1)
        self.assertTrue(instances[0].state == InstanceState.PENDING)
        
        time.sleep(140)
        
        i = instanceService.getInstanceByName(instances[0].name)
        
        self.assertTrue(i.state == InstanceState.RUNNING)
        
        # Test stop
        token = instanceService.stopInstance(user.id, i.id)
        message = MessageManager.getMessage(token)
        self.assertEqual(message.getType(), Message.SUCCESS)
        
        time.sleep(20)
        i = instanceService.getInstanceByName(instances[0].name)
        
        self.assertEqual(i.state, InstanceState.STOPPED) 
        
        # Test start
        token = instanceService.startInstance(user.id, i.id)
        message = MessageManager.getMessage(token)
        self.assertEqual(message.getType(), Message.SUCCESS)
        
        time.sleep(40)
        i = instanceService.getInstanceByName(instances[0].name)
        
        self.assertEqual(i.state, InstanceState.RUNNING) 
        
        # Test terminate
        time.sleep(30)
               
        token = instanceService.terminateInstance(user.id, i.id)
        
        message = MessageManager.getMessage(token)
        
        self.assertEqual(message.getType(), Message.SUCCESS)
        
        i = instanceService.getInstanceByName(instances[0].name)
        self.assertEqual(i.state, InstanceState.DELETED)