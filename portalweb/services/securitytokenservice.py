import uuid
 
from baseservice import BaseService
 
class SecurityTokenService(BaseService):   
    def verify_instance_security_token(self, instance_id, user_id, token):
        
        instance = self._instance_manager.getInstanceById(instance_id)
        user = self._userManager.getUserById(user_id)
        
        security_token = self._security_token_manager.get_security_token_by_user_and_instance(user, instance)
        
        if security_token:
            if security_token.token == token:
                return True
            
        return False 
    
    def set_instance_security_token(self, instance_id, user):
        token = uuid.uuid4()
        instance = self._instance_manager.getInstanceById(instance_id)
        security_token = self._security_token_manager.get_security_token_by_user_and_instance(user, instance)
        
        stop = False
        
        while not stop:
            success = False
            if not security_token:
                # update token
                success = self._security_token_manager.create_security_token(token, instance, user)
            else:
                # insert token
                success = self._security_token_manager.update_security_token(security_token, token)
        
            if success:
                stop = True            

        
        return token