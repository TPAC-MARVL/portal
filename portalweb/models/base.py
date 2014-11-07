import datetime
from django.db import models 

class Base(models.Model):
    id = models.AutoField(primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        app_label = 'portalweb'
        
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = datetime.datetime.today()
        
        self.modified = datetime.datetime.today()
        return super(Base, self).save(*args, **kwargs)