const readline = require('readline');
const ScratchBridge = require('../scratch3-bridge');

const projectOne = 391068012;
const projectTwo = 391078105;
let msgrbridge1 = new ScratchBridge(process.env.username, process.env.password, projectOne);
let msgrbridge2 = new ScratchBridge(process.env.username, process.env.password, projectTwo);

msgrbridge2.connect();
msgrbridge1.connect();
let sender;

//Project 1 server

msgrbridge1.on('data', (msg,asender) =>{ //when the server gets a message
    console.log(`>(${asender}): ${msg}`);
    sender = asender;
    msgrbridge1.send( sender, `Data recieved: ${msg.toString()}`);
    msgrbridge2.send( sender, `Project1 says: ${msg.toString()}`); //respond to the project when the server gets data
});

msgrbridge1.on('connect', () => {
    console.log( "Connected!! Sending your messages to Project1:")
    
    const stdinput = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    stdinput.on('line', (msg) => {
        sender= 0;
        msgrbridge1.send( sender, `Server says: ${msg}` ); //what to send to the client
        msgrbridge2.send( sender, `Server says: ${msg}` ); //what to send to the client
        if(msg === "quit"){
        
            stdinput.close();
        }
    })

})

//Project 2 server

msgrbridge2.on('data', (msg,asender) =>{
    console.log(`>(${asender}): ${msg}`);
    sender = asender;
    msgrbridge2.send( sender, `Data recieved: ${msg.toString()}`);
    msgrbridge1.send( sender, `Project2 says: ${msg.toString()}`); //respond to the project when the server gets data
});

msgrbridge2.on('connect', () => {
    console.log( "Connected!! Sending messages to Project2")
    
    //const stdinput = readline.createInterface({
    //    input: process.stdin,
    //    output: process.stdout
    //});

    //stdinput.on('line', (msg) => {
        
    //    msgrbridge2.send( sender, `Server says: ${msg}` ); //what to send to the client
    //    if(msg === "quit"){
    //        stdinput.close();
    //    }
    //})

})
