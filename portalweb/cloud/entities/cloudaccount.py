class CloudAccount:
    _username = ''
    _password = ''
    _endpoint = ''
    _regionName = ''
    _path = ''
    _secure = True
    _port = ''
        
    def __init__(self):
        pass
    
    def getUsername(self):
        return self._username
    def setUsername(self, username):
        self._username = username
    def getPassword(self):
        return self._password
    def setPassword(self, password):
        self._password = password
    def getEndPoint(self):
        return self._endpoint
    def setEndPoint(self, endpoint):
        self._endpoint = endpoint
    def getRegionName(self):
        return self._regionName
    def setRegionName(self, regionName):
        self._regionName = regionName
    def getPath(self):
        return self._path
    def setPath(self, path):
        self._path = path
    def isSecure(self):
        return self._secure
    def setSecure(self, secure):
        self._secure = secure
    def getPort(self):
        return self._port
    def setPort(self, port):
        self._port = port