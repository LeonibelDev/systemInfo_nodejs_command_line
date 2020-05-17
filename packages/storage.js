const os = require('os')

module.exports = {
    storage : [{
            memory_total: os.totalmem()
        }]
}