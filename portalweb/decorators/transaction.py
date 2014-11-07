from django.db.transaction import *

def transaction(func):
    
    def inner(*args, **kwargs):            
        
        set_autocommit(False)
        
        success = func(*args, **kwargs)
            
        if success:
            commit()
        else:
            rollback()
                      
        set_autocommit(True)
        
        return success
        
    return inner