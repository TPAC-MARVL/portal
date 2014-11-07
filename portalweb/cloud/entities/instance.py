class InstanceState:
    STOPPED = 'stopped'
    RUNNING = 'running'
    DELETED = 'deleted'
    PENDING = 'pending'

class InstanceType:
    
    M_SMALL = None
    M_MEDIUM = None
    M_XLARGE = None
    M_XXLARGE = None

    _name = None
    _vcpus = None
    _rams = None
    _sequence = None
    
    def setName(self, name):
        self._name = name
        
    def getName(self):
        return self._name
    
    def setVCPUs(self, vcpus):
        self._vcpus = vcpus
    
    def getVCPUs(self):
        return self._vcpus
    
    def setRAMs(self, rams):
        self._rams = rams
    
    def getRAMs(self):
        return self._rams
    
    def setSequence(self, sequence):
        self._sequence = sequence
    
    def getSequence(self):
        return self._sequence

class Instance:
    _id = None
    _state = None
    _stateCode = None
    _instanceType = None
    _launchTime = None
    _imageId = None
    _ipAddress = None
    
    def __init__(self):
        pass
    
    def getId(self):
        return self._id
    def setId(self, iid):
        self._id = iid
    def getState(self):
        return self._state
    def setState(self, state):
        self._state = state
    def getStateCode(self):
        return self._stateCode
    def setStateCode(self, code):
        self._stateCode = code
    def getInstanceType(self):
        return self._instanceType
    def setInstanceType(self, instanceType):
        self._instanceType = instanceType
    def getImageId(self):
        return self._imageId
    def setImageId(self, imageId):
        self._imageId = imageId
    def getLaunchTime(self):
        return self._launchTime
    def setLaunchTime(self, launchTime):
        self._launchTime = launchTime
    def getIpAddress(self):
        return self._ipAddress
    def setIpAddress(self, ipAddress):
        self._ipAddress = ipAddress
