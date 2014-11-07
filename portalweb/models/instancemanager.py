import logging

from django.utils import timezone
from django.db.models import Q

from ..models.instance import InstanceTbl
from ..models.user import UserTbl
from portalweb.cloud.entities.instance import InstanceState 

from portalweb.decorators.logger import logger

class InstanceManager:
    
    @logger
    def createInstance(self, name, userId, instanceId, instanceType, state, ip, groupId, url, public=False):
        instance = None
        
        user = UserTbl.objects.get(pk = userId)
        instance = InstanceTbl.objects.create(user=user, name=name, instance_id=instanceId, type=instanceType, state=state, created=timezone.now(), ip=ip, group_id=groupId, url=url, public=public)
        
        return instance
    
    @logger
    def deleteInstances(self, instance_ids):
        success = False

        InstanceTbl.objects.filter(id__in = instance_ids).delete()
        success = True
        
        return success
    
    @logger
    def updateInstance(self, instanceId, name=None, instanceType=None, state=None, ip=None, group=None, url=None, public=False):
        success = False
        
        instance = InstanceTbl.objects.get(pk = instanceId)
            
        if name:
            instance.name = name
            
        if instanceType:
            instance.type = instanceType
            
        if state:
            instance.state = state
            
        if ip:
            instance.ip = ip
            
        if url:
            instance.url = url
            
        if group:
            instance.group = group
        else:
            instance.group = None
            
        instance.public = public
                
        instance.save(force_update=True)
        success = True
        
        return success
    
    @logger
    def get_public_instances(self):
        return InstanceTbl.objects.filter(public=True)    
    
    @logger
    def getInstanceById(self, instance_id):
        try:
            instance = InstanceTbl.objects.get(pk = instance_id)
            return instance
        
        except Exception as e:
            self._logger.exception(e)
        
        return None
    
    @logger
    def getInstancesByUserId(self, userId):
        user = UserTbl.objects.get(id = userId)
        return InstanceTbl.objects.filter(~Q(state = InstanceState.DELETED), user = user)
        
        return None
    
    @logger
    def getInstanceByName(self, name):
        return InstanceTbl.objects.get(name = name)

    @logger
    def getInstancesByGroup(self, group):
        return InstanceTbl.objects.filter(~Q(state = InstanceState.DELETED), group=group)

    @logger
    def getInstancesByState(self, state):
        return InstanceTbl.objects.filter(state = state)

    @logger
    def getInstancesByGroups(self, groups):
        return InstanceTbl.objects.filter(~Q(state = InstanceState.DELETED), group__in=groups)

    @logger
    def getInstances(self):
        return InstanceTbl.objects.exclude(state = InstanceState.DELETED)
 
    @logger
    def getInstancesByType(self, instanceType):
        return InstanceTbl.objects.get(type = instanceType)

    @logger
    def getAllInstancesByUser(self, user):
        if user.is_admin:
            return InstanceTbl.objects.exclude(state=InstanceState.DELETED)
        else:
            return InstanceTbl.objects.filter(group__users =user, state=InstanceState.RUNNING)
