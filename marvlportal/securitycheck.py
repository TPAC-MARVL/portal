'''
This is a WSGI middle ware aims to verify user id, instance id and security token with MARVL portal.
'''
import os
import socket
import httplib
import Cookie
import struct
from django.core.wsgi import get_wsgi_application

def make_mask(n):
    ''' return a mask of n bits as a long integer. '''
    return (2L<<n-1) - 1

def dotted_quad_to_num(ip):
    ''' convert decimal dotted quad string to long integer. '''
    return struct.unpack('L',socket.inet_aton(ip))[0]

def network_mask(ip, bits):
    ''' Convert a network address to a long integer. ''' 
    return dotted_quad_to_num(ip) & make_mask(bits)

def address_in_network(ip, net):
    ''' Is an address in a network. '''
    return ip & net == net

def verify_security_token(token, user_id, instance_id):
    ''' Connect to MARVL portal and check whether instance id, user id and security token are valid. '''
    
    connection = httplib.HTTPSConnection("144.6.224.136")
    connection.request("GET", "/security/token/check/" + str(instance_id) + "/" + str(user_id) + "/" + token)
    r1 = connection.getresponse()

    data = r1.read()
    connection.close()
        
    if 'true' in data:
        return True
        
    return False

def get_cookie_value(cookies, name):
    ''' Get cookie by name. '''
    cookie_manager = Cookie.SimpleCookie()  
    
    cookie_value = None
    if cookies:
        cookie_manager.load(cookies)
        if name in cookie_manager:
            cookie_value = cookie_manager[name].value

    return cookie_value

def security_check(environ, start_response):
    '''WSGI middle, it has all the logic to verify the token with MARVL portal.
    
    If the combination of user id, instance id and token are valid. django WSGI handler will be allowed to go through.
    Otherwise, it returns HTTP 403 back to the client.
    
    User Id, Instance Id and Token are first encapsulated in HTTP GET query string and saved in cookie for the following
    requests from client. 
    '''
    allowed_networks = []
           
    token_value = ""
    user_id = ""
    instance_id = ""
    client_ip = ""
    
    # Retrieve userId, instance Id and token.
    try: 
        query_string = environ["QUERY_STRING"]
          
        socket.gethostbyname(socket.gethostname())
        
        if query_string:
            query_string_array = query_string.split('&')
        
            for query_string_item in query_string_array:
                if query_string_item:
                    parameter = query_string_item.split('=')
                    
                    if parameter[0] == "token":
                        token_value = parameter[1]
                    
                    if parameter[0] == "user_id":    
                        user_id = parameter[1]
                    
                    if parameter[0] == "instance_id":
                        instance_id = parameter[1]

    except Exception as ex:
        print ex
    
    authenticated = False    
    
    # Retrieve client IP.
    if "HTTP_X_FORWARDED_FOR" in environ:
        client_ip = environ["HTTP_X_FORWARDED_FOR"]
    elif "REMOTE_ADDR" in environ:
        client_ip = environ["REMOTE_ADDR"]
    
    if not (token_value and user_id and instance_id):
        # we need to check whether the cookie has the token and retrieve it
        if "HTTP_COOKIE" in environ:
            token_value = get_cookie_value(environ["HTTP_COOKIE"], "marvl_token")
            user_id = get_cookie_value(environ["HTTP_COOKIE"], "user_id")
            instance_id = get_cookie_value(environ["HTTP_COOKIE"], "instance_id")   
    
    # Validate the user Id, instance Id and token   
    if token_value and user_id and instance_id:
        success = verify_security_token(token_value, user_id, instance_id)   
        if success:
            authenticated = True
    
    # We add exceptions if IP matches
    if not authenticated:
        try:
            allowed_networks_file_name= os.path.join(os.path.dirname(os.path.abspath(__file__)), "allowednetworks.txt")
            allowed_networks_file = open(allowed_networks_file_name, 'r')

            for line in allowed_networks_file:
                address_array = line.strip().split(',')
                           
                if address_array and len(address_array) == 2:
                    allowed_networks.append(network_mask(address_array[0], int(address_array[1])))
       
        except Exception as ex:
            print ex
        
        for network in allowed_networks:
            if address_in_network(dotted_quad_to_num(client_ip), network):
                authenticated = True 
    
    # If toke is valid, we call django WSGI handler and add token to cookie.     
    if authenticated:
        def my_start_response(status, headers, exc_info=None):
            cookies = Cookie.SimpleCookie()
            cookies["marvl_token"] = token_value
            cookies["marvl_token"]["path"] = "/"
            
            cookies["user_id"] = user_id
            cookies["user_id"]["path"] = "/"
            
            cookies["instance_id"] = instance_id
            cookies["instance_id"]["path"] = "/"
            
            for key in cookies:
                headers.append(('Set-Cookie', cookies[key].output(header="")))
            
            return start_response(status, headers, exc_info)
            
        django_app = get_wsgi_application()
        response = django_app(environ, my_start_response)
            
        return response
        
    # User is not authenticated. return http 403
    response_body = ""
    status = '403 Forbidden'
    response_headers = [('Content-Type', 'text/plain'),
                  ('Content-Length', str(len(response_body)))]
    
    start_response(status, response_headers)

    return [response_body] 