import logging

def logger(func):
    def inner(*args, **kwargs):
        logger = logging.getLogger(func.__module__)    
        
        try:
            
            return func(*args, **kwargs) 
        except Exception as ex:
            logger.exception(ex)
      
    return inner