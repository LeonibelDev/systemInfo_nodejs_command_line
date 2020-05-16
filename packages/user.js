const os = require('os')

module.exports = {
    user_info: [{
            propietary: os.userInfo()['username'],
            root: os.homedir() 
        }]
}