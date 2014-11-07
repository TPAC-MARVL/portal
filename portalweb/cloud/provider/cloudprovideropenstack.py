import boto
import logging

from boto.ec2.connection import EC2Connection
from boto.ec2.regioninfo import *
from boto.exception import *

from cloudprovider import CloudProvider
from ..entities.cloudaccount import CloudAccount

from ..adaptors.instanceadaptor import InstanceAdaptorImpl
from ..adaptors.securitygroupadaptor import SecurityGroupAdaptorImpl
from ..adaptors.imageadaptor import ImageAdaptorImpl

class CloudProviderOpenStack (CloudProvider):
    _logger = logging.getLogger(__name__)
    
    def __init__(self):
        self._connected = False
        self._region = None
        self._connection =None
        
    def launchInstance(self, imageId, keypairName, securityGroups, instanceType):
        if self._connected:
            try:
                reservation = self._connection.run_instances(image_id=imageId, key_name=keypairName, security_groups=securityGroups, instance_type=instanceType)
                if len(reservation.instances):
                    instanceAdaptor = InstanceAdaptorImpl()
                    return instanceAdaptor.convertInstance(reservation.instances[0])
            except EC2ResponseError, e:
                self._logger.error(e)
        
        return None

    def startInstance(self, instanceId):
        if self._connected:
            instanceIds = []
            instanceIds.append(instanceId)
                  
            try:
                self._connection.start_instances(instanceIds)
                return True
            except EC2ResponseError, e:
                self._logger.exception(e)
                return False 
        return False
    
    def stopInstance(self, instanceId):
        if self._connected:
            instanceIds = []
            instanceIds.append(instanceId)
            try:
                self._connection.stop_instances(instanceIds, force=True)
                return True
            except EC2ResponseError, e:
                self._logger.exception(e)
                return False
        
        return False
    def rebootInstance(self, instanceId):
        if self._connected:
            instanceIds = []
            instanceIds.append(instanceId)
            try:
                self._connection.reboot_instances(instanceIds)
                return True
            except EC2ResponseError, e:
                self._logger.exception(e)
                return False
        return False
    def terminateInstance(self, instanceId):
        if self._connected:
            instanceIds = []
            instanceIds.append(instanceId)
            try:
                self._connection.terminate_instances(instanceIds)
                return True
            except EC2ResponseError, e:
                self._logger.exception(e)
                return False
        return False
    def snapshotInstance(self, instanceId):
        pass
    
    def connect(self, cloudAccount):
        if not self._connected:
            try:
                self._region = RegionInfo(name=cloudAccount.getRegionName(), endpoint=cloudAccount.getEndPoint())
                self._connection = boto.connect_ec2(aws_access_key_id=cloudAccount.getUsername(), aws_secret_access_key=cloudAccount.getPassword(), is_secure=cloudAccount.isSecure(), region=self._region, port=cloudAccount.getPort(), path=cloudAccount.getPath())
                self._connection.get_all_instances()
                self._connected = True
            
            except EC2ResponseError, e:
                self._logger.exception(e)
                
        return self._connected
    def close(self):
        if self._connected:
            try:
                if self._connection:
                    self._connection = None
                    self._connected = False
                    return True
                
            except EC2ResponseError, e:
                self._logger.exception(e)
         
        return False
    
    def getSecurityGroups(self):
        securityGroups = {}
        if self._connected:
            securityGroupAdaptor = SecurityGroupAdaptorImpl()
            
            try:
                securityGroupsCloud = self._connection.get_all_security_groups()
                              
                for securityGroupCloud in securityGroupsCloud:
                    securityGroup = securityGroupAdaptor.convertSecurityGroup(securityGroupCloud)
                    securityGroups[securityGroup.getName()] = securityGroup
            
                return securityGroups
            except EC2ResponseError, e:
                self._logger.exception(e)
            
        return None
    
    def getCapability(self):
        pass
    
    def getInstance(self, instanceId):
        reservations = None
        
        if instanceId:
            if self._connected:
                instanceIds = []
                instanceIds.append(instanceId)
                try:
                    reservations = self._connection.get_all_instances(instance_ids=instanceIds)
                except EC2ResponseError, e:
                    self._logger.exception(e)
                    
        if reservations and len(reservations) > 0:
            instanceAdaptor = InstanceAdaptorImpl()
            reservations[0].instances[0].update()
            return instanceAdaptor.convertInstance(reservations[0].instances[0])
        else:
            return None
    
    def _getKeyPairs(self, name):
        if self._connection:
            names = []
            names.append(name)
            try:
                keypairs = self._connection.get_all_key_pairs(keynames=names)
            except EC2ResponseError, e:
                self._logger.exception(e)
                
        if keypairs and len(keypairs) > 0:
            return keypairs[0]
        else:
            return None
        
    def getInstances(self):
        instances = None
                
        if self._connected:
            instances = {}
            instanceAdaptor = InstanceAdaptorImpl()
            try:
                reservations = self._connection.get_all_instances()
                for reservation in reservations:
                    for ins in reservation.instances:
                        ins.update()
                        instance = instanceAdaptor.convertInstance(ins)
                        instances[instance.getId()] = instance
            except EC2ResponseError, e:
                self._logger.exception(e)
        
        return instances
    def getImages(self):
        images = {}
        
        if self._connected:
            try:
                imageAdaptor = ImageAdaptorImpl()
                imagesCloud = self._connection.get_all_images()
                for imageCloud in imagesCloud:
                    image = imageAdaptor.convertImage(imageCloud)
                    images[image.getId()] = image
            except EC2ResponseError, e:
                self._logger.exception(e)
        return images