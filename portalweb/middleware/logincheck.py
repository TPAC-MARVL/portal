from django.http import HttpResponseRedirect
from portalweb.services.userservice import UserService

class LoginCheckMiddleware:
    def process_request(self, request):
 
        if "instances" in request.path:
            #Check whether user session is valid.
            if 'user' in request.session:
                return None
            else:
                return HttpResponseRedirect('/marvl/home')
        else:
            return None
