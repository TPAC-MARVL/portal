'''
This is module contains base service class which provides common properties and methods.
'''

import logging

from ..models.usermanager import UserManager
from ..models.usergroupmanager import UserGroupManager
from ..models.usergrouprequestmanager import UserGroupRequestManager
from ..models.instancemanager import InstanceManager
from portalweb.configmanager import ConfigManager
from ..models.groupmanager import GroupManager
from ..models.modelrequestmanager import ModelRequestManager
from ..models.nonsystemusergroupmapmanager import NonSystemUserGroupMapManager
from ..models.instancegroupmanager import InstanceGroupManager
from ..models.securitytokenmanager import SecurityTokenTblManager

from portalweb.system.message import Message

class BaseService:
    '''
    This is a parent service class which provides common properties (various db manager classes) and methods.
    '''
    _configManager = ConfigManager()
    _logger = logging.getLogger(__name__)
    _userManager = UserManager()
    _usergroupManager = UserGroupManager()
    _user_group_request_manager = UserGroupRequestManager()
    _instance_manager = InstanceManager()
    _group_manager = GroupManager()
    _model_request_manager = ModelRequestManager()
    _user_group_map_manager = NonSystemUserGroupMapManager()
    _instance_group_manager = InstanceGroupManager()
    _security_token_manager = SecurityTokenTblManager()
    
    def _return_success(self, success_list):
        ''' Return True if all elements are True in the list. '''
        return all(success_list)
    
    def _isOkToSend(self, message_type):
        ''' Check message is successful or not. '''
        if message_type == Message.SUCCESS:
            return True
        else:
            return False