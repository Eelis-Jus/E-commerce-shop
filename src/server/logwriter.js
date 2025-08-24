const { error } = require('console');
const fs = require('fs')

//https://dev.to/shaileshhb/readstream-and-writestream-explained-5b9h
//https://dev.to/franciscomoretti/nodejs-file-writing-methods-createwritestream-vs-writefilesync-11do
//check if this works

// get current date
// adjust 0 before single digit date

const newdate = new Date();

let date = ("0" + newdate.getDate()).slice(-2);

// get current month
let month = ("0" + (newdate.getMonth() + 1)).slice(-2);

// get current year
let year = newdate.getFullYear();

// get current hours
let hours = newdate.getHours();

// get current minutes
let minutes = newdate.getMinutes();

// get current seconds
let seconds = newdate.getSeconds();

// prints date & time in YYYY-MM-DD HH:MM:SS format
let currentTimeAndDate =  year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

const ServerLogWriter = (Serverlog) =>{

  const serverWriter = fs.createWriteStream('../server/server_logs/server.log', {flags : 'a'}); //try flags a, so that it makes the file even if it doesn't exist
  const serverMessage = currentTimeAndDate+ " | "+ Serverlog;

  serverWriter.write(serverMessage+"\r\n")
  serverWriter.end()

  // Handle finish event
  serverWriter.on('finish', () => {
    console.log(currentTimeAndDate)
    console.log('Write completed.')
  })

  // Handle error event
  serverWriter.on('error', (err) => {
    console.error('An error occurred:', err.message)
  })

}

const ErrorLogWriter = (Errorlog) =>{

  const errorWriter = fs.createWriteStream('../server/server_logs/error.log', {flags : 'a'});    //try flags a, so that it makes the file even if it doesn't exist
  const errorMessage = currentTimeAndDate+ " | "+ Errorlog+"\n";

  errorWriter.write(errorMessage+"\r\n")
  errorWriter.end()

  // Handle finish event
  errorWriter.on('finish', () => {
    console.log(currentTimeAndDate)
    console.log('Error write completed.')
  })

  // Handle error event
  errorWriter.on('error', (err) => {
    console.error('An error occurred:', err.message)
  })
        
}

module.exports = {
    ServerLogWriter,
    ErrorLogWriter,
    };