from __future__ import division

from django.views.generic import TemplateView
from django.views.generic.base import RedirectView

from ..services.instanceservice import InstanceService
from ..services.userservice import UserService
from portalweb.configmanager import ConfigManager

from base import BaseController

class HomeController(BaseController):
    template_name = "home/overview.html"
    
    def get_context_data(self, **kwargs):
                
        userService = UserService()
        success = userService.aafLogin(self.request)
        configManager = ConfigManager()

        result = {}
        if success:
            result['current_page'] = 'Home'
            self._add_breadcrumbs('Home', '/marvl/home',True)
            
            members = self._userService.getAllActiveUsers()    
            result['total_members'] = len(members)

            '''
            phase = configManager.getPhase()
            result = {}
                
                user = self.request.session["user"]
                userId = user.id        
            
                instanceService = InstanceService()
            
                usedInstances = instanceService.getInstancesByUserId(userId)
            
                if usedInstances:
                    usedInstances = len(usedInstances)
                else: 
                    usedInstances = 0
            
                totalInstances = configManager.getUserAllowedInstances()
                instanceProgress = usedInstances / totalInstances
                    
                totalCPUs = configManager.getUserAllowedCPUs()
                usedCPUs = totalCPUs - instanceService.getAvailableVCPUs(userId)
                cpuProgress = usedCPUs / totalCPUs
            
                totalRAMs = configManager.getUserAllowedRAMs()
                usedRAMs = totalRAMs - instanceService.getAvailableRAMS(userId)
                ramProgress = usedRAMs / totalRAMs
                    
                self._result['usedInstances'] = usedInstances
                self._result['totalInstances'] = totalInstances
                self._result['instanceProgress'] = instanceProgress * 100        
                self._result['totalCPUs'] = totalCPUs
                self._result['usedCPUs'] = usedCPUs
                self._result['cpuProgress'] = cpuProgress * 100
            
                self._result['totalRAMs'] = totalRAMs
                self._result['usedRAMs'] = usedRAMs
                self._result['ramProgress'] = ramProgress * 100'''

                #instances = self._instanceService.getAllowedToViewInstancesByUser(user)
                #self._result['instance_list'] = instances     

            #self._result['phase'] = configManager.getPhase()
        
        return result
  
class LoginController(TemplateView):
    template_name = 'login.html'
    
    def get_context_data(self, **kwargs):
        pass

class LogoutController(RedirectView):
  
    def get_redirect_url(self, **kwargs):
        userService = UserService()
        userService.logout(self.request)
        
        return 'https://portal.marvl.org.au/Shibboleth.sso/Logout?return=https://portal.marvl.org.au/'
