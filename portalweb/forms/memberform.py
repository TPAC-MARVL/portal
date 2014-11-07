import re

from django import forms

from django.core.exceptions import ValidationError

class MemberForm(forms.Form):
    def __init__(self, userDict, postDict=None, *args, **kwargs):
        super(MemberForm, self).__init__(postDict, *args, **kwargs)
        
        self.fields['email'] = forms.CharField(label=("Email"), required=False)
        
        userChoice = list()
        
        userChoice.append(("0", "Please select an user"))
        for key, value in userDict.iteritems():
            userChoice.append((key,value))
            
        self.fields['users'] = forms.ChoiceField(choices=userChoice, label=("User"))
        
        
    def clean(self):
        email = self.cleaned_data.get('email', '')
        
        if (self.cleaned_data.get('email') == '' and self.cleaned_data.get('users') == '0'):
            raise ValidationError("Either email or users cannot be empty.")
        
        if email != '':
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                raise ValidationError("Invalid email address.")
        
        return self.cleaned_data
    
    def clean_email(self):           
        return self.cleaned_data.get('email', '')