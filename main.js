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
const csvWriter = require('csv-writer').createObjectCsvWriter
const package_json = require(path.join(__dirname, '/package.json'))


// packages
let { System } = require(path.join(__dirname, '/packages/os'))
let { user } = require(path.join(__dirname, '/packages/user'))
let { storage } = require(path.join(__dirname, '/packages/storage'))


// main class
class SystemInfo {
    commendLine_view = (() => {
        return {
            System,
            user,
            storage
        }
    })()
}

// Prompt Message
let main = () => {
    
    inquirer.prompt({
        name: 'Method',
        message: `View info In Terminal (1)\n  Save Info On File In Desktop (2)\n  Quite (x)\n `
    })

    .then(res =>{
        if (res['Method'] == 'about') {
            console.clear()

            console.log({
                name: package_json['name'],
                version: package_json['version'],
                main: 'main.js',
                author: package_json['author']
            })

            main()
        }

        else if (res['Method'] == 'clear' || res['Method'] == 'cls') {
            console.clear()
            main()
        }

        else if (res['Method'] == 'x' || res['Method'] == 'quite') {
            console.clear()
            process
        }

        else if (res['Method'] == 1 || res['Method'] == 2) {
            console.clear()
            res['Method'] == 1 ? terminal() : save() 
        }

        else{
            console.clear()
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
 
    exist ? (()=>{
            let obj = [{System, user, storage}]

            inquirer.prompt({
                name: 'FileName',
                message: 'Write a name for the output file: ',
                default: 'SystemInfo'
            })

            .then(res => {

                let data = JSON.stringify(obj)
                fs.writeFileSync(root+`/Desktop/${res['FileName']}.json`, data)
                console.info(' The File Was Created Success'.green, `\n output file is ${res['FileName']}.json`.green)

            })
            
        })() 
        : (() =>{
                console.log(false)
            })()


}

main()