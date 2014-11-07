import inflect
import time

class Util:
    @staticmethod
    def get_http_header(request, name):
        return request.META['HTTP_' + name]
    
    
    @staticmethod
    def get_replaced_text(text, items, keywords):
        p = inflect.engine()
                
        for keyword in keywords:            
            word = keyword[1]
            if len(items) > 1:           
                word = p.plural(keyword[1])
            
            text = text.replace(keyword[0], word) 
             
        return text    
    
    @staticmethod
    def get_time_stamp(date_time):
        return int(time.mktime(date_time.timetuple())*1000)