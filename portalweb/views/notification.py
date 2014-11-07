from django.views.generic.detail import BaseDetailView
from mixin.jsonresponsemixin import JSONResponseMixin

from base import BaseController
from base import AjaxBaseController

class NotificationListController(JSONResponseMixin, BaseDetailView, AjaxBaseController):
    def get(self, request, *args, **kwargs):
        if len(self.args) > 0:
            
            current_page = int(self.args[0])
            user = self.request.session.get("user")
            
            iterms_per_page = self._configManager.getItermsPerPage()
               
            notifications = self._notificationService.getNotificationsbyUser(user)
                
            total_items,total_page,start,end = self.get_pagination_metadata(iterms_per_page, notifications, current_page)         
                        
            notifications = notifications[start-1:end]
            notification_list = []
                                  
            for notification in notifications:          
                createdTime = notification.created.strftime('%d-%m-%Y') 
             
                notification_list.append({"id": notification.id, "title": notification.title,"createdBy":notification.user_from.name,"createdTime":createdTime, "content":notification.content})
                
            page_metadata = [
                             {
                               'total_page': total_page,
                               'current_page': current_page,
                               'iterms_per_page': iterms_per_page,
                               'total_items': total_items
                             }
                            ]
            
            
            context = {'page_metadata' : page_metadata, 'notifications' : notification_list};        
            return self.render_to_response(context) 


class NotificationViewController(BaseController):
    template_name = "notification/list.html"
    
    def get_context_data(self, **kwargs):  
        result = {}
            
        #result["current_page"] = "Notification"
        #result["current_page_sub_title"] = "(notification)"
        
        self._add_breadcrumbs("Notifications", '/marvl/notifications/list')
                
        return result