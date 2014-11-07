from base import BaseController

class HelpController(BaseController):
    template_name = "help/view.html"
    
    def get_context_data(self, **kwargs):
        result = {}
        
        result['current_page'] = 'Help'
        
        self._add_breadcrumbs('Home', '/marvl/home', True)  
        self._add_breadcrumbs('About - Help', '/marvl/help')
             
        return result