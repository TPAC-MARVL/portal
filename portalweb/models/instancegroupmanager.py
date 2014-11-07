import logging

from django.utils import timezone
from django.db.models import Q

from ..models.instancegroup import InstanceGroupTbl
from ..models.group import GroupTbl 
from portalweb.cloud.entities.instance import InstanceState

from portalweb.decorators.logger import logger

class InstanceGroupManager:   
    
    @classmethod
    @logger
    def get_instance_groups_by_group(cls, group):
        return InstanceGroupTbl.objects.filter(group=group)
        
    @classmethod
    @logger    
    def get_instance_group_by_insatnce_and_group(cls, instance, group):
        return InstanceGroupTbl.objects.filter(group=group, instance=instance)
        
    @classmethod
    @logger
    def create_instance_groups(cls, instance, groups, creator):
        success = False
        instance_groups = []        
        
        for group in groups:
            instance_group = cls.get_instance_group_by_insatnce_and_group(instance, group)
            
            if not instance_group:
                instance_groups.append(InstanceGroupTbl(instance=instance, group=group, creator=creator, created=timezone.now()))
        
        if len(instance_groups) > 0:           
            InstanceGroupTbl.objects.bulk_create(instance_groups);         
        
        success = True

        return success
    
    @classmethod
    @logger
    def get_instance_groups_by_instance(cls, instance):
        return InstanceGroupTbl.objects.filter(instance=instance)
    
    
    @classmethod
    @logger
    def remove_instance_groups(cls, instance_ids):
        success = False
        
        InstanceGroupTbl.objects.filter(instance__id__in=instance_ids).delete()
        
        success = True
        
        return success
    
    
    @classmethod
    @logger
    def remove_instance_group(cls, instance=None, group=None):
        success = False

        if instance and group:
            InstanceGroupTbl.objects.filter(group=group, instance=instance).delete()
        elif instance:
            InstanceGroupTbl.objects.filter(instance=instance).delete()
        elif group: 
            InstanceGroupTbl.objects.filter(group=group).delete()
            
        success = True

        return success
    
    @classmethod
    @logger
    def create_instance_group(cls, instance, group, creator):
        return InstanceGroupTbl.objects.create(instance=instance, group=group, created=timezone.now(), creator=creator)
    
    @classmethod
    @logger
    def getAllInstancesByUser(cls, user):
        if user.is_admin:
            return InstanceGroupTbl.objects.exclude(instance__state=InstanceState.DELETED)
        else:
            return InstanceGroupTbl.objects.filter(group__users=user, instance__state=InstanceState.RUNNING)