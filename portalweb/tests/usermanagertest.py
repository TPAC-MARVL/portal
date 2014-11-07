from django.test import TestCase

from ..models.usermanager import UserManager

class UserManagerTest(TestCase):
    def test_user_create(self):
        userService = UserManager()
        success = userService.createUser(username='username', password='password', aafuser=True, token='token')
        
        self.assertTrue(success)
    
    def test_user_delete(self):
        userService = UserManager()
        success = userService.createUser(username='username', password='password', aafuser=False, token='token')
               
        if success:
            user = userService.getUserByUsername('username')
            
            self.assertNotEqual(user, None)
            deletedSuccess = userService.deleteUser(user.id)
            
        self.assertTrue(deletedSuccess)
    
    def test_user_get_id_and_name(self):
        userService = UserManager()
        userService.createUser(username='username', password='password', aafuser='1', token='token')
               
        user = userService.getUserByUsername('username')
        self.assertNotEqual(user, None)
        
        user = userService.getUserById(user.id)
        self.assertNotEqual(user, None)
        
    def test_user_update(self):
        userService = UserManager()
        userService.createUser(username='username', password='password', aafuser=True, token='token')
        
        user = userService.getUserByUsername('username')
        success = userService.updateUser(user.id, username='username1', password='password1', affuser=False, token='token1')
        
        self.assertTrue(success)
        
        user = userService.getUserById(user.id)
        
        self.assertEqual(user.username, 'username1')
        self.assertEqual(user.password, 'password1')
        self.assertEqual(user.aafuser, '0')
        self.assertEqual(user.token, 'token1')