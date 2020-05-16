const os = require('os')

module.exports = {
    System: [{
            os_name: os.hostname(),   
            os_distro: ((param)=>{
                this.param = param
    
                switch (this.param){
                    case 'darwin':
                        return `Mac [${param}]`
                    break
                    
                    case 'win32':
                        return `Windows [${param}]`
                    break
                    
                    default:
                        return `Linux [${param}]`
                    break
                }                
            })(os.platform()),
            os_version: os.release(),
            os_arch: os.arch(),
            os_cpu: os.cpus()[0].model,
            os_threads: os.cpus().length
        }]
}