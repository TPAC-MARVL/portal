from django.conf.urls import patterns, include, url

from portalweb.views.home import *
from portalweb.views.help import *
from portalweb.views.instance import *
from portalweb.views.group import *
from portalweb.views.member import *
from portalweb.views.message import *
from portalweb.views.notification import *
from portalweb.views.user import *
from portalweb.views.modelrequest import *
from portalweb.views.system import *
from portalweb.views.error import *

from django.conf.urls import handler404
from django.conf.urls import handler500


# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    
    url(r'^marvl$', HomeController.as_view(), name='overview'),
    url(r'^marvl/$', HomeController.as_view(), name='overview'),
    url(r'^marvl/home$', HomeController.as_view(), name='overview'),
    url(r'^marvl/instances$', InstanceHomeController.as_view(), name='instance home'),
    url(r'^marvl/instances/view$', InstanceTabViewController.as_view(), name='instance tab view'),
    url(r'^marvl/instances/launch$', InstanceLaunchController.as_view(), name='launch instance'),
    url(r'^marvl/instances/stop/(\d+)$', InstanceStopController.as_view(), name='stop instance'),
    url(r'^marvl/instances/start/(\d+)$', InstanceStartController.as_view(), name='start instance'),
    url(r'^marvl/instances/terminate/(\d+)$', InstanceTerminateController.as_view(), name='terminate instance'),
    url(r'^marvl/instances/reboot/(\d+)$', InstanceRebootController.as_view(), name='reboot instance'),
    url(r'^marvl/instances/status/(\d+)$', InstanceStatusController.as_view(), name='get instance status'),
    url(r'^marvl/instances/view/(\d+)$', InstanceViewController.as_view(), name='loan instance into iframe'),
    url(r'^marvl/groups/admin$', GroupAdminController.as_view(), name='group admin home'),
    url(r'^marvl/groups/user$', GroupUserController.as_view(), name='group user home'),
    
    url(r'^marvl/users/admin$', UserAdminController.as_view(), name='user admin home'),
    url(r'^marvl/instances/admin$', InstanceAdminController.as_view(), name='instance admin home'),
    url(r'^marvl/instances/user$', InstanceUserController.as_view(), name='instance user home'),        
        
    url(r'^marvl/instances/admin/add_instance$', InstanceAdminEditInstanceController.as_view(), name='instance admin add new instance'), 
    url(r'^marvl/instances/admin/edit_instance$', InstanceAdminEditInstanceController.as_view(), name='instance admin edit instance'),  
    url(r'^marvl/instances/admin/remove_instance$', InstanceAdminEditInstanceController.as_view(), name='instance admin remove instance'),  

    url(r'^marvl/groups/my_group$', GroupMyGroupController.as_view(), name='my group home'),
        
    url(r'^marvl/ajax/groups/my_group/members/list/(\d+)/(\d+)$', GroupMemberListController.as_view(), name='group member list ajax end point'),
    url(r'^marvl/ajax/groups/my_group/instances/list/(\d+)/(\d+)$', GroupInstanceListController.as_view(), name='group instance list ajax end point'),  
    url(r'^marvl/ajax/groups/admin/list/(\d+)$', GroupUserListController.as_view(), name='admin groups list ajax end point'),
    url(r'^marvl/ajax/groups/user/list/(\d+)$', GroupUserListController.as_view(), name='user groups list ajax end point'),  
    
    url(r'^marvl/ajax/users/admin/list/(\d+)$', UserAdminListController.as_view(), name='admin user list ajax end point'),  
    url(r'^marvl/ajax/users/map/admin/list/(\d+)$', UserMapListController.as_view(), name='admin user map list ajax end point'), 
    
    
    url(r'^marvl/ajax/groups/admin/members/add/list/(\d+)$', MemberAdminListController.as_view(), name='list users to be added to a group'),          
    url(r'^marvl/ajax/groups/admin/members/edit/list/(\d+)$', MemberAdminListController.as_view(), name='list users to be removed from a group'),         
    
    url(r'^marvl/ajax/groups/list$', GroupListController.as_view(), name='list groups by user'),            
    
    url(r'^marvl/ajax/instances/admin/list/(\d+)$', InstanceUserListController.as_view(), name='admin instance list ajax end point'),
    url(r'^marvl/ajax/instances/user/list/(\d+)$', InstanceUserListController.as_view(), name='user instance list ajax end point'),
    
    url(r'^marvl/ajax/instances/admin/groups/add/list/(\d+)$', InstanceAdminGroupsListController.as_view(), name='list groups for instance to attach'),
    url(r'^marvl/ajax/instances/admin/groups/remove/list/(\d+)$', InstanceAdminGroupsListController.as_view(), name='list groups for instance to remove'),
    
    url(r'^marvl/ajax/notification/list/(\d+)$', NotificationListController.as_view(), name='list notifications'),
    url(r'^marvl/ajax/messages/inbox/list/(\d+)$', MessageListController.as_view(), name='list notifications'),
    url(r'^marvl/ajax/messages/sent/list/(\d+)$', MessageListController.as_view(), name='list notifications'),
   
    url(r'^marvl/ajax/model_request/list/(\d+)$', ModelRequestListController.as_view(), name='list model requests'),
    
    url(r'^marvl/ajax/model_request_type/list$', VirtualMachineTypeListController.as_view(), name='list virtual machine types'),
    
    url(r'^marvl/messages/users/list$', MessageUserListController.as_view(), name='list users to send messages'),
    url(r'^marvl/messages/groups/list$', MessageGroupListController.as_view(), name='list groups to send messages'),
    
    url(r'^marvl/instances/admin/instance_add_group$', InstanceAdminEditGroupsController.as_view(), name='add group to instance'),
    url(r'^marvl/instances/admin/instance_remove_group$', InstanceAdminEditGroupsController.as_view(), name='remove group from instance'),
                            
    url(r'^marvl/groups/admin/add_group$', GroupAddController.as_view(), name='add new group'),   
    url(r'^marvl/groups/admin/rename_group$', GroupRenameController.as_view(), name='add new group'),  
    url(r'^marvl/groups/admin/group_add_members$', MembersAddController.as_view(), name='add new group members'),  
    url(r'^marvl/groups/admin/group_remove_members$', MembersRemoveController.as_view(), name='remove group members'), 
    
    url(r'^marvl/groups/admin/group_add_admins$', MembersSetAdminController.as_view(), name='edit group members'),
    
    url(r'^marvl/users/admin/user_add_system_admin$', UsersSetAdminController.as_view(), name='add system admins'),
    url(r'^marvl/users/admin/user_remove_system_admin$', UsersSetAdminController.as_view(), name='remove system admins'),
      
    url(r'^marvl/messages/list$', MessageViewController.as_view(), name='message list'), 
    url(r'^marvl/message/send$', MessageSendController.as_view(), name='message list'),
      
    url(r'^marvl/model_request_form/list$', ModelRequestViewController.as_view(), name='model request form list'), 
    url(r'^marvl/model_request_form/submit$', ModelRequestSubmitController.as_view(), name='model request form list'),
    url(r'^marvl/model_request_form/approve$', ModelRequestEditController.as_view(), name='approve model request'),    
    url(r'^marvl/model_request_form/reject$', ModelRequestEditController.as_view(), name='reject model request'),     
        
    url(r'^marvl/users/map$', UserMapController.as_view(), name='new user map for creating group '),  
    url(r'^marvl/users/map/admin/create$', UserMapEditController.as_view(), name='new user map for creating group '),     
    url(r'^marvl/users/map/admin/edit$', UserMapEditController.as_view(), name='new user map for editing group '),
     
           
    url(r'^marvl/notifications/list$', NotificationViewController.as_view(), name='notification view'),
    url(r'^marvl/groups/view/(\d+)$', GroupViewController.as_view(), name='group view page'),
    url(r'^marvl/member/request$', MemberRequestController.as_view(), name='send member group request'),    
    url(r'^marvl/member/request/approve/(\d+)$', MemberRequestApproveController.as_view(), name='approve member group request'),   
    url(r'^security/token/check/(\d+)/(\d+)/([a-zA-Z0-9_-]+)$', InstanceSecurityVerifyController.as_view(), name='verify security token'),  
    
    url(r'^marvl/help', HelpController.as_view(), name='help'),
    url(r'^marvl/logout$', LogoutController.as_view(), name='logout'),
    url(r'^login$', LoginController.as_view(), name='login'),
    url(r'^$', LoginController.as_view(), name='login'),
    # Examples:
    # url(r'^$', 'marvlportal.views.home', name='home'),
    # url(r'^marvlportal/', include('marvlportal.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

handler404=Error404ViewController.as_error_view()
handler500=Error500ViewController.as_error_view()