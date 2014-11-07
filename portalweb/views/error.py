from base import BaseController

class ErrorViewController(BaseController):
    def get_context_data(self, **kwargs):       

        result = {}
        self._add_breadcrumbs('Home', '/marvl/home', True)  
        self._add_breadcrumbs('Error', '/marvl/home')

        return result
    
    @classmethod
    def as_error_view(cls):
        v = cls.as_view()
        def view(request):
            r = v(request)
            r.render()
            return r
          
        return view 
    

class Error404ViewController(ErrorViewController):
    template_name = "error/404.html"
    
class Error500ViewController(ErrorViewController):
    template_name = "error/500.html"