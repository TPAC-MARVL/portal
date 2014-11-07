from django import forms

class InstanceForm(forms.Form):
    def __init__(self, imageDict, typeDict, postDict=None, *args, **kwargs):
        super(InstanceForm, self).__init__(postDict, *args, **kwargs)
        
        self.fields['name'] = forms.CharField(max_length=20)
        
        imageChoice = list()
        
        for key, value in imageDict.iteritems():
            imageChoice.append((key,value))
            
        self.fields['images'] = forms.ChoiceField(choices=imageChoice)

        typeChoice = list()
        
        for key, value in typeDict.iteritems():
            typeChoice.append((key,value))
            
        self.fields['types'] = forms.ChoiceField(choices=typeChoice,required=True)