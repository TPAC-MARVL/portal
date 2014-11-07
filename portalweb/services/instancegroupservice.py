from portalweb.system.message import MessageManager
from portalweb.system.message import Message
from portalweb.decorators.transaction import transaction
from portalweb.system.util import Util

from baseservice import BaseService
from portalweb.cloud.entities.instance import InstanceState

class InstanceGroupService(BaseService):
    
    def is_authorized(self, instance, user):
        if instance.state == InstanceState.STOPPED:
            return False
        else:
            if user.is_admin:
                return True
            else:
                instances = self.getAllowedToViewInstancesByUser(user)           
                
                for ins in instances:
                    if ins.id == instance.id:
                        return True
    
        return False
   
    def get_total_instance_number_by_group(self, group):
        instance_groups = self._instance_group_manager.get_instance_groups_by_group(group)
        
        return instance_groups.count()    
    
    def get_instances_by_group(self, group=None, group_id=None):
        if group_id:
            group = self._group_manager.getGroupById(group_id)
        
        instance_groups = self._instance_group_manager.get_instance_groups_by_group(group)
        
        instances = []
        
        if instance_groups:
            for instance_group in instance_groups:
                instances.append(instance_group.instance)
                
        return instances
    
    def get_group_ids_by_insance(self, instance_id=None, instance=None):
        instance_groups = self.get_instance_groups_by_instance(instance_id, instance=instance)
                
        group_ids = []
        
        if instance_groups:
            for instance_group in instance_groups:
                group_ids.append(instance_group.group.id)
            
        return group_ids
    
    def getAllowedToViewInstancesByUser(self, user):
        instances = []
        
        instance_groups = self._instance_group_manager.getAllInstancesByUser(user)
        public_instances = self._instance_manager.get_public_instances() 
        old_instances = self._instance_manager.getAllInstancesByUser(user) 
        
        if instance_groups:                
            for instance_group in instance_groups:
                instances.append(instance_group.instance)
        
        if public_instances:
            for public_instance in public_instances:
                instances.append(public_instance)
        
        if old_instances:
            for old_instance in old_instances:
                instances.append(old_instance)
           
        refined_instances = []  
        
        for instance in instances:
            if instance.state != InstanceState.STOPPED:
                refined_instances.append(instance)
           
        return refined_instances
        
    def get_instance_groups_by_instance(self, instance_id=None, instance=None):
    
        if instance_id:
            instance = self._instance_manager.getInstanceById(instance_id)
        
        if instance:
            return self._instance_group_manager.get_instance_groups_by_instance(instance)        
        else:
            return []
    
    def edit_instance_groups(self, instance_id, group_ids, creator):
        success = self._edit_instance_groups(instance_id, group_ids, creator)
        
        token = ''
        
        if success:
            message = Util.get_replaced_text("1 2 been changed successfully.", group_ids, [('1', 'Group'), ('2', 'has')])             
        
            token = MessageManager.setMessage(message, Message.SUCCESS)
        else:
            
            message = Util.get_replaced_text("Error occurred when changing the 1. Please try again later.", group_ids, [('1', 'group')])
            
            token = MessageManager.setMessage(message, Message.ERROR)
        
        return token
        
    @transaction
    def _edit_instance_groups(self, instance_id, group_ids, creator):
        instance = self._instance_manager.getInstanceById(instance_id)
        groups = self._group_manager.getGroupsByIds(group_ids)
        
        success1 = self._delete_instance_group(instance)
        success2 = self._instance_group_manager.create_instance_groups(instance, groups, creator)

        if success1 and success2:
            return True
        else:
            return False
     
    def delete_instance_group(self, instance_id=None, instance=None, group_ids=None):
        success = self._delete_instance_group(instance_id, instance)
        
        if success:
            message = Util.get_replaced_text("1 2 been removed successfully.", group_ids, [('1', 'Group'), ('2', 'has')])             
        
            token = MessageManager.setMessage(message, Message.SUCCESS)
        else:
            
            message = Util.get_replaced_text("Error occurred when removing the 1. Please try again later.", group_ids, [('1', 'group')])
            
            token = MessageManager.setMessage(message, Message.ERROR)
        
        return token
        
    def _delete_instance_group(self, instance_id=None, instance=None):
        if instance_id:
            instance = self._instance_manager.getInstanceById(instance_id)
        
        return self._instance_group_manager.remove_instance_group(instance=instance)    
    
    def create_instance_group(self, instance_id, group_id, creator):
        instance = self._instance_manager.getInstanceById(instance_id)
        group = self._group_manager.getGroupById(group_id)
        
        success = self._instance_group_manager.create_instance_group(instance, group, creator)
                
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
            
        
        