class SecurityGroup:
    _id = None
    _name = None
    _description = None
    
    def __init__(self):
        pass
    
    def getId(self):
        return self._id
    def setId(self, iid):
        self._id = iid
    def getName(self):
        return self._name
    def setName(self, name):
        self._name = name
    def getDescription(self):
        return self._description
    def setDescription(self, description):
        self._description = description