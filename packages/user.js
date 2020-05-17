const os = require('os')

module.exports = {
    user: [{
            propietary: os.userInfo()['username'],
            root: os.homedir() 
        }]
}