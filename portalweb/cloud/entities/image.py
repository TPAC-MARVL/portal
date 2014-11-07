class Image:
    _id = None
    _state = None
    _architecture = None
    _platform = None
    _type = None
    _name = None
    _description = None
    _virtualization_type = None
    _hypervisor = None
    
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
    def getArchitecture(self):
        return self._architecture
    def setArchitecture(self, architecture):
        self._architecture = architecture
    def getPlatform(self):
        return self._platform
    def setPlatform(self, platform):
        self._platform = platform
    def getName(self):
        return self._name
    def setName(self, name):
        self._name = name
    def getType(self):
        return self._type
    def setType(self, imageType):
        self._type = imageType
    def getDescription(self):
        return self._description
    def setDescription(self, description):
        self._description = description