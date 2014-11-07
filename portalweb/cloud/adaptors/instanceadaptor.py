import boto

from boto.ec2.connection import EC2Connection
from boto.ec2.regioninfo import *

from ..entities.instance import Instance
from ..entities.instance import InstanceType
from ..entities.instance import InstanceState
from portalweb.configmanager import ConfigManager


class InstanceAdaptor:
    def convertInstance(self, instance):
        raise NotImplementedError
   
class InstanceAdaptorImpl(InstanceAdaptor):
    def convertInstance(self, i):
        instance = Instance()
        
        instance.setId(i.id)
        instance.setImageId(i.image_id)
        
        if i.instance_type == InstanceType.M_SMALL:
            instance.setInstanceType(InstanceType.M_SMALL)
        
        if i.instance_type == InstanceType.M_XLARGE:
            instance.setInstanceType(InstanceType.M_XLARGE)
        
        if i.instance_type == InstanceType.M_XXLARGE:
            instance.setInstanceType(InstanceType.M_XXLARGE)
        
        if i.instance_type == InstanceType.M_MEDIUM:
            instance.setInstanceType(InstanceType.M_MEDIUM)
        
        instance.setIpAddress(i.ip_address)
        instance.setLaunchTime(i.launch_time)
        
        if i.state == 'stopped':
            instance.setState(InstanceState.STOPPED)
        if i.state == 'running':
            instance.setState(InstanceState.RUNNING)    
            
        instance.setStateCode(i.state_code)
        
        return instance