import logging

from django.utils import timezone

from ..models.user import GroupTbl
from portalweb.decorators.logger import logger

class GroupManager:
     
    @classmethod
    @logger
    def createGroup(self, name, description, default, user):
        group = None
        
        group = GroupTbl.objects.create(name=name, description=description, created=timezone.now(), default=default, creator=user)
        
        return group;
    
    @classmethod
    @logger
    def getGroupsByIds(cls, groupIds):
        
        groups = GroupTbl.objects.filter(id__in=groupIds)
        return groups

    @classmethod
    @logger
    def getGroupById(cls, group_id):
        group = None

        group = GroupTbl.objects.get(pk = group_id)
     
        return group
    
    @classmethod
    @logger
    def updateGroupById(cls, group_id, items):
        success = False
        
        group = GroupTbl.objects.get(pk = group_id)
            
        if group:
            if 'name' in items:
                group.name = items['name']
            if 'description' in items:
                group.description = items['description']                
                
        group.save()
        success = True

        return success;
    
    @classmethod
    @logger
    def getAllGroups(cls, exclude_groups=None):
        groups = None
                
        if exclude_groups:
            groups = GroupTbl.objects.exclude(id__in=exclude_groups)
        else:
            groups = GroupTbl.objects.all()
             
        return groups
    
    @classmethod
    @logger
    def getDefaultGroups(cls):
        groups = None

        groups = GroupTbl.objects.filter(default=True)
        
        return groups