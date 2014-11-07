from ..cloud.provider.cloudprovideropenstack import CloudProviderOpenStack
from ..cloud.entities.instance import InstanceType
from ..cloud.entities.instance import InstanceState

from portalweb.models.instancemanager import InstanceManager
from portalweb.models.processmanager import ProcessManager
from portalweb.models.usermanager import UserManager
from portalweb.configmanager import ConfigManager
from portalweb.system.message import MessageManager
from portalweb.system.message import Message
from baseservice import BaseService
from processservice import ProcessService
from portalweb.decorators.transaction import transaction
from portalweb.system.util import Util

class InstanceService(BaseService):
    
    @transaction
    def _removeInstancesDB(self, instance_ids):
        success1 = self._instance_manager.deleteInstances(instance_ids)    
        success2 = self._instance_group_manager.remove_instance_groups(instance_ids)
        
        return self._return_success([success1, success2])    
    
    def removeInstancesDB(self, instance_ids):
        success = self._removeInstancesDB(instance_ids)
        
        if success:
            message = Util.get_replaced_text("Virtual 1 2 been removed successfully.", instance_ids, [('1', 'machines'), ('2', 'has')])             
           
            token = MessageManager.setMessage(message, Message.SUCCESS)
        else:
            
            message = Util.get_replaced_text("Error occurred when removing the virtual 1. Please try again later.", instance_ids, [('1', 'machines')])
            
            token = MessageManager.setMessage(message, Message.ERROR)
        
        return token
    
    def editInstanceDB(self, name, state, ip, url, instance_id, visibility, instanceType):
        
        instance = self._instance_manager.getInstanceById(instance_id)
           
        if instance:
            group = None
            
            if instance.group:
                group = instance.group 
            
            if visibility == 'public':
                public = True
            else:
                public = False
            
            success = self._instance_manager.updateInstance(instanceId=instance_id, instanceType=instanceType, name=name, state=state, ip=ip, url=url, group=group, public=public) 
        
        else:
            success = False
    
        token = ''
        
        if success:
            token = MessageManager.setMessage("Virtual machine has been updated successfully.", Message.SUCCESS)
        else:
            token = MessageManager.setMessage("Error occurred when updating the virtual machine. Please try again later.", Message.ERROR)
        
        return token
    
    def insertInstanceDB(self, name, user, state, ip, url, visibility="private", instanceType='m1.small'):
        
        if visibility == "public":
            public = True
        else:
            public = False
                        
        instanceDB = self._instance_manager.createInstance(name=name, userId=user.id, instanceType=instanceType, instanceId='', state=state, ip=ip, url=url, groupId='', public=public)
        token = ''
        
        if instanceDB:
            token = MessageManager.setMessage("New virtual machine has been created successfully.", Message.SUCCESS)
        else:
            token = MessageManager.setMessage("Error occurred when creating the new virtual machine. Please try again later.", Message.ERROR)    
        
        return token
        
    
    def updateInstanceGroup(self, instance_id, group_id):
        
        group = None
        if group_id:
            group = self._group_manager.getGroupById(group_id)
        
        
        success = self._instance_manager.updateInstance(instance_id, group=group)
    
        if success:
            if group_id:
                token = MessageManager.setMessage("Group has been changed successfully.", Message.SUCCESS)
            else:
                token = MessageManager.setMessage("Group has been removed successfully.", Message.SUCCESS)
        else:
            if group_id:
                token = MessageManager.setMessage("Error occurred when changing the group. Please try again later.", Message.ERROR)
            else:
                token = MessageManager.setMessage("Error occurred when removing the group. Please try again later.", Message.ERROR)          
        return token 
        
    def terminateInstance(self, instanceId):
        cloudProvider = CloudProviderOpenStack()
        cloudProvider.connect(ConfigManager.CLOUD_ACCOUNT)
        
        instanceManager = InstanceManager()
        instance = instanceManager.getInstanceById(instanceId)
        
        success = cloudProvider.terminateInstance(instance.instance_id)
        token = ''
                
        if success:
            processService = ProcessService()
            processService.createTerminateProcess(instanceId)
            
            # We should wait until the instance is actually deleted in openstack.
            #instanceManager.updateInstance(instanceId, state = InstanceState.DELETED)
            token = MessageManager.setMessage("Virtual Machine is terminated successfully.", Message.SUCCESS)
        else:
            token = MessageManager.setMessage("Error occurred when terminating the Virtual Machine. Please try again later.", Message.ERROR)
        
        return token;
    
    def getInstanceById(self, instance_id):
        return self._instance_manager.getInstanceById(instance_id)
    
    def getAllInstances(self, user):
        return self._instance_manager.getAllInstancesByUser(user)
    
    def getInstancesByGroups(self, groups):
        return self._instance_manager.getInstancesByGroups(groups)
        
    def getInstancesByGroup(self, group):        
        return self._instance_manager.getInstancesByGroup(group)
    
    def getAvailableRAMS(self, userId=None):
        instanceTypes = self._configManager.getInstanceTypes()
        
        instanceManager = InstanceManager()
        
        totalUsedInstances = None
        totalRAMs = 0
        
        if userId:
            totalUsedInstances = instanceManager.getInstancesByUserId(userId)
            totalRAMs = self._configManager.getUserAllowedRAMs()
        else:    
            totalUsedInstances = instanceManager.getInstances()
            totalRAMs = self._configManager.getTotalRAMs()
            
        totalUsedRAMs = 0
 
        if totalUsedInstances:
            for usedInstance in totalUsedInstances:
                iType = instanceTypes.get(usedInstance.type)
                if iType:
                    totalUsedRAMs = totalUsedRAMs + iType.getRAMs()
                                             
        availableRAMS = totalRAMs - totalUsedRAMs
        
        return availableRAMS
    
    def getAvailableVCPUs(self, userId=None):
        instanceTypes = self._configManager.getInstanceTypes()
        
        instanceManager = InstanceManager()
        
        totalUsedInstances = None
        totalVCPUs = 0
        
        if userId:
            totalUsedInstances = instanceManager.getInstancesByUserId(userId)
            totalVCPUs = self._configManager.getUserAllowedCPUs()
        else:    
            totalUsedInstances = instanceManager.getInstances()
            totalVCPUs = self._configManager.getTotalCPUs()
            
        totalUsedVCPUs = 0
                        
        if totalUsedInstances:
            for usedInstance in totalUsedInstances:
                iType = instanceTypes.get(usedInstance.type)
                if iType:
                    totalUsedVCPUs = totalUsedVCPUs + iType.getVCPUs()
                                             
        availableVCPUs = totalVCPUs - totalUsedVCPUs
        
        return availableVCPUs
    
    def getAllowedToViewInstancesByUser(self, user):
        return self._instance_manager.getAllInstancesByUser(user)
    
    def getAllRunningInstances(self):
        return self._instance_manager.getInstancesByState(InstanceState.RUNNING)
    
    def getAvailableInstances(self):
        
        instanceManager = InstanceManager()
        totalUsedInstances = instanceManager.getInstances()
    
        return len(totalUsedInstances)
    
    def _isInstanceAllowedToLaunch(self, instanceType):
        instanceTypes = self._configManager.getInstanceTypes()
                                             
        availableRAMS = self.getAvailableRAMS()
        availableVCPUs = self.getAvailableVCPUs()
                      
        if instanceTypes.get(instanceType).getRAMs() > availableRAMS:
            return False
        
        if instanceTypes.get(instanceType).getVCPUs() > availableVCPUs:
            return False
    
        return True
    
    def getInstanceByName(self, instanceName):
        instanceManager = InstanceManager()
        instanceDB = instanceManager.getInstanceByName(instanceName)
    
        cloudProvider = CloudProviderOpenStack()
        cloudProvider.connect(ConfigManager.CLOUD_ACCOUNT)
        
        instance = cloudProvider.getInstance(instanceDB.name)
        
        if instance:
            success = instanceManager.updateInstance(instanceDB.id, state=instance.getState())
            
            if success:
                return instanceManager.getInstanceById(instanceDB.id)
          
        return None
        
    def getInstancesByUserId(self, userId):
        instanceManager = InstanceManager()
        
        return instanceManager.getInstancesByUserId(userId)
    
    def rebootInstance(self, instanceId):
        token = ''
        
        cloudProvider = CloudProviderOpenStack()
        cloudProvider.connect(ConfigManager.CLOUD_ACCOUNT)
                
        instanceManager = InstanceManager()
        instance = instanceManager.getInstanceById(instanceId)        
                
        success = cloudProvider.rebootInstance(instance.instance_id)
        
        if success:
            
            processService = ProcessService()
            processService.createRebootProcess(instanceId)
            
            #instanceManager = InstanceManager()
            #instanceManager.updateInstance(instanceId, state = InstanceState.RUNNING)
                    
            token = MessageManager.setMessage("Virtual Machine is rebooted successfully.", Message.SUCCESS)
        else:
            token = MessageManager.setMessage("Error occurred when rebooting the Virtual Machine. Please try again later.", Message.ERROR)
        
        return token
    
    def stopInstance(self, instanceId):
        
        cloudProvider = CloudProviderOpenStack()
        cloudProvider.connect(ConfigManager.CLOUD_ACCOUNT)
        
        instanceManager = InstanceManager()
        instance = instanceManager.getInstanceById(instanceId)
          
        success = cloudProvider.stopInstance(instance.instance_id)
        
        token = ''
        if success:
            processService = ProcessService()
            processService.createStopProcess(instanceId)
            
            token = MessageManager.setMessage("Virtual Machine is stopped successfully.", Message.SUCCESS)
        else:
            token = MessageManager.setMessage("Error occurred when stopping the Virtual Machine. Please try again later.", Message.ERROR)
        
        return token
    
    '''
      The method is not supported in the new release.
      Instead, reboot is used to start the instance again.
    '''
    def startInstance(self, instanceId):
        cloudProvider = CloudProviderOpenStack()
        cloudProvider.connect(ConfigManager.CLOUD_ACCOUNT)   
                
        instanceManager = InstanceManager()
        instance = instanceManager.getInstanceById(instanceId)
        
        success = cloudProvider.startInstance(instance.instance_id)
        
        token = ''
        if success:
            processService = ProcessService()
            processService.createStartProcess(instanceId)
           
            token = MessageManager.setMessage("Virtual Machine is started successfully. Please wait until the process is finished.", Message.SUCCESS)  
        else:
            token = MessageManager.setMessage("Error occurred when restarting Virtual Machine. Please try again later.", Message.ERROR)
          
        return token
   
    def getInstanceFromDB(self, dbInstanceId):
        instanceManager = InstanceManager()
        instanceDb = instanceManager.getInstanceById(dbInstanceId)
        
        '''cloudProvider = CloudProviderOpenStack()
        cloudProvider.connect(ConfigManager.CLOUD_ACCOUNT)
        
        instance = cloudProvider.getInstance(instanceDb.instance_id)'''
        
        return instanceDb;
   
    def getInstanceByInstanceId(self, dbInstanceId):
        instanceManager = InstanceManager()
        instanceDb = instanceManager.getInstanceById(dbInstanceId)
        
        cloudProvider = CloudProviderOpenStack()
        cloudProvider.connect(ConfigManager.CLOUD_ACCOUNT)
        
        instance = cloudProvider.getInstance(instanceDb.instance_id)
        
        # update db instance record
        if instance:
            instanceManager.updateInstance(instanceDb.id, state=instance.getState(), ip=instance.getIpAddress())
        else:
            #if instance exists in db, but not in the cloud, we assume it is deleted
            instanceManager.updateInstance(instanceDb.id, state=InstanceState.DELETED)
            
        return instance
    
    def launchInstance(self, userId, instanceType, imageId=None, securityGroup=None, keypareName=None, name=None, groupId=None):
        
        if not imageId:
            imageId = self._configManager.getImageId()
        
        if not securityGroup:
            securityGroup = self._configManager.getSecurityGroup()
        
        if not keypareName:
            keypareName = self._configManager.getKeypareName()
        
        if not groupId:
            #By default, we use the user's default group   
            userManager = UserManager();
            group = userManager.getUserDefaultGroup(userId);         
        
        #Check the capacity of the cloud provider
        if self._isInstanceAllowedToLaunch(instanceType):
            cloudProvider = CloudProviderOpenStack()
            cloudProvider.connect(ConfigManager.CLOUD_ACCOUNT)
                
            #Launch Instance
            instance = cloudProvider.launchInstance(imageId=imageId, keypairName=keypareName, securityGroups=securityGroup, instanceType=instanceType)
           
            errorMessage = "Error occurred when launching the virtual machine, please try again later."
            successMessage = "Virtual machine is launched successfully, please wait until the boot process is complete."
            token = ""
        
            if instance:
                # Instance is launched, status will be updated after a few minutes, log instance as pending.
                instanceManager = InstanceManager()
                instanceDB = instanceManager.createInstance(name=name, userId=userId, instanceType=instanceType, instanceId=instance.getId(), state=InstanceState.PENDING, ip=instance.getIpAddress(), groupId=group.id)
        
                if instanceDB:
                    processService = ProcessService()
                    processService.createLaunchProcess(instanceDB.id)
                    token = MessageManager.setMessage(successMessage, Message.SUCCESS)
                else:
                    # Instance is launched, however database insertion is failed. Delete the instance and try again.
                    cloudProvider.terminateInstance(instance.getId())
                    token = MessageManager.setMessage(errorMessage, Message.ERROR)
            else:
                token = MessageManager.setMessage(errorMessage, Message.ERROR)
        
        else:
            token = MessageManager.setMessage("No more Virtual Machines are allowed to launch, please contact site administrator.", Message.ERROR)
        
        return token