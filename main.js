/*
    LeonibelDev https://github.com/LeonibelDev
    --Open Source [Apache License]--
*/
"use strict";

//  main dependencies

const path = require('path')
const os = require('os')
const fs = require('fs')
const inquirer = require('inquirer')
const color = require('colors')
const _ = require('lodash')

// packages

let { System } = require(path.join(__dirname, '/packages/os'))
let { user_info } = require(path.join(__dirname, '/packages/user'))

class SystemInfo {

    commendLine_view = (() => {
        return {
            System,
            user_info
        }
    })()

}

// Prompt Message
let main = () => {
    
    inquirer.prompt({
        name: 'Method',
        message: `View info In Terminal (1)\nSave Info On File In Desktop (2)`

    })

    .then(res =>{
        if (res['Method'] == 1 || res['Method'] == 2) {
            res['Method'] == 1 ? terminal() : save() 
        }
        else{
            console.error(`[${res['Method']}] is not a valid option`.red)
            main()
        }    
    })

    .catch(err =>{
        console.error('Error In Process, start again')
    })

}



// MAIN FUNCTIONS
// Show Info In Terminal
let terminal = () => {
    console.log(new SystemInfo().commendLine_view)
}

// Save File On Desktop
let save = () => {
    let root = path.resolve(os.homedir())


    let exist = fs.existsSync(path.join(root, '/Desktop'))
    // console.log(exist)

    exist ? (()=>{
            // console.log(true)

            inquirer.prompt({
                name: 'FileName',
                message: 'Write a name for the output file: ',
                default: 'SystemInfo'
            })

            .then(res => {

                let data = JSON.stringify(System)
                fs.writeFileSync(root+`/Desktop/${res['FileName']}.json`, data)
                // fs.mkdirSync(path.join(root, '/'))
                console.info('The File Was Created Success'.green)
            })
            
        })() 
        : (() =>{
                console.log(false)
            })()


}

main()