from django.http import HttpResponseRedirect
from portalweb.services.userservice import UserService
from portalweb.services.groupservice import GroupService

class SecurityCheckMiddleware:
    def process_request(self, request):        
        if "admin" in request.path:
            #Check whether user session is valid.
            if 'user' in request.session:
                user = request.session.get("user")
                
                if user.is_admin:
                    return None
                else:
                    if 'groups' in request.path:
                        group_id = ''
                        
                        path_parts = request.path.split('/')
                        group_id = path_parts [len(path_parts)-1]
                        
                        if 'group_id' in request.POST:
                            group_id = request.POST['group_id']
                        
                        
                        
                            
                        if group_id:
                            group_service = GroupService()
                            is_group_admin = group_service.isGroupAdmin(user.id, group_id)
                            
                            if is_group_admin:
                                return None    
                        
                return HttpResponseRedirect('/login')
            else:
                return HttpResponseRedirect('/login')
        else:
            return None
