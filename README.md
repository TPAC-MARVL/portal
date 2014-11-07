MARVL Portal
======

#Introduction

This is the web portal to access model runs. It authenticates users through AAF and allows users
to invoke webtrike, a web interface enables users to access workflow of model runs.

Besides, the web portal provides group management for users to enable
sharing of webtrike for group members. The portal manages virtual machines
in where webtrike is running and it has functions to enable launching a virtual
machine in Ec2 compatible Cloud such as OpenStack.

The portal also implements the security measures through WSGI middleware to insure webtrike can only be accessed through the portal. However, exceptions can be made by adding a single IP or an IP range.
The web interface is implemented by Django 1.6 framework and the front end is implemented by using css framework bootstrap and javascript framework backbone.
Less is also used to make css more flexible and easy reuse.

#Layout
* /marvlportal includes the Django settings, url bindings, wsgi setup and wsgi middleware.
* /portalweb includes the Django project source code.

# Dependencies
## Python 
Python 3 is not tested and It is best to use python 2.7.0 and above version. 

## Django
It requires Django 1.6 and Django 1.7 is not tested.

## Less
Latest Less version is required.

## Backbone
Latest Backbone version is required.

## MySql
Latest MySql version is required.

Other dependencies can be found in requirements.txt
