import logging

from ..models.securitytoken import SecurityTokenTbl
from portalweb.decorators.logger import logger

class SecurityTokenTblManager:
    
    @classmethod
    @logger    
    def create_security_token(cls, token, instance, user):
        security_token = None  
        
        security_token = SecurityTokenTbl.objects.create(token=token, instance=instance, client=user)
                                        
        return security_token
    
    @classmethod
    @logger
    def get_security_token_by_user_and_instance(self, user, instance):
        return SecurityTokenTbl.objects.get(client=user, instance=instance)
    
    @classmethod
    @logger    
    def update_security_token(cls, security_token, token):        
        success = False
                
        if security_token and token:
            security_token.token = token
        
        security_token.save()
        success = True
                        
        return success    
    
    