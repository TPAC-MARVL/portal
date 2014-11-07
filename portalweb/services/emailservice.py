'''This Module contains email service class.

.. moduleauthor:: Ming Fu <xiao.fu@utas.edu.au>

'''

from django.core.mail import send_mass_mail

from django.core.mail import send_mail
from baseservice import BaseService
from portalweb.decorators.logger import logger

from portalweb.system.message import Message

class EmailService(BaseService):
    '''Email Service class provides methods to send emails
    
    Two methods are defined in this class. One is to send single email and
    one is to send a specific acknowledge email to system administrator.
    
    '''
    
    # General Email Footer
    _body_post_fix = '\n\n\nMARVL Administrator \nThe Marine Virtual Laboratory'
    
    @logger
    def sendEmail(self, subject, body, receivers, message_type=Message.SUCCESS):
        '''Send an email.
        
        This method is a help method and sends a single email to a list of receivers.
        The sender is from systemEmail name/pair in system.cfg.
        
        The email will be send if the message type is success.
        
        Args:
          subject (string): The subject of the email.
          body (string): The body of the email.
          receivers (UserTbl): List of UserTbl objects.
          message_type (string): type of message to indicate whether the email should be sent or not.
        
        '''
        if (self._isOkToSend(message_type)):            
            if len(receivers) != 0:
                body = body + self._body_post_fix
                messages = []
                for receiver in receivers:      
                    messages.append((subject, 'Hi ' + receiver.name + ',\n\n' + body, self._configManager.getSystemEmail(), [receiver.email]))
            
                send_mass_mail(messages, fail_silently=False)
    
    @logger
    def sendModelRequestReceivedEmail(self, message_type):
        '''
        Send an acknowledge email to system admin.
        '''
        if (self._isOkToSend(message_type)):
            subject = 'New request is lodged'
            body = "New request has been successfully lodged."
            body = body + self._body_post_fix
        
            send_mail(subject, 'Hi admin' + ',\n\n' + body, self._configManager.getSystemEmail(), [self._configManager.getAdminEmail()], fail_silently=False)