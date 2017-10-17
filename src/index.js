/* globals
console, exports, require 
*/
'use strict';

const Alexa = require('alexa-sdk');
const constants = require('./constants');

const APP_ID = 'amzn1.ask.skill.your_skill_id_here';
const CURRENT_COUNT = "current_count";
const LONGEST_GAME = "longest_game";

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.dynamoDBTableName = "fizz_buzz_skill_table";
    let eventDescription = JSON.stringify(event);
    console.log(`Input event ${eventDescription}`);
    alexa.execute();
}

const handlers = {
    'LaunchRequest': function() {
        console.log(`Launch request`);
        handleHelpIntent(this, constants.HELP_MESSAGE);
    },
    'AMAZON.CancelIntent': function() {
        console.log(`Cancel Intent`);
        this.emit(constants.ACTION_TELL, constants.CANCEL_MESSAGE);
    },
    'AMAZON.HelpIntent': function() {
        handleHelpIntent(this, constants.HELP_MESSAGE);
    },
    "SessionEndedRequest" : function(){
        var longestCount = this.attributes[LONGEST_GAME];
        if(longestCount){
            console.log(`Session ended, longest count: ${longestCount}`);                    
        } else{
            console.log(`Session ended, no longest count`);
        }
        this.emit(constants.SAVE_STATE, true);        
    },
	"StartGame": function () {
        this.attributes[CURRENT_COUNT] = 1;
		var speechOutput = "1";
        //any intent slot variables are listed here for convenience
        var reprompt = "It's your turn, I said 1";
        //Your custom intent handling goes here
        this.emit(constants.ACTION_ASK, speechOutput, reprompt);
    },
	"TurnIntent": function () {
        handleTurn(this);
    },
    "LongestGame": function(){
        handleLongestGame(this);
    },
    'Unhandled': function() {
        unhandledIntent(this);
    }
};

function handleLongestGame(context){
    var longestCount = context.attributes[LONGEST_GAME];
    if(longestCount){
        context.emit(constants.ACTION_TELL, `Your longest game lasted ${longestCount} turns! Thanks for playing!`);
    } else{
        context.emit(constants.ACTION_TELL, `You haven't played a game yet!`);
    }
}

function handleTurn(context){
    var previousCount = context.attributes[CURRENT_COUNT];
    var newCount = previousCount + 1;
    //any intent slot variables are listed here for convenience
    var fizzBuzzSlotARaw = context.event.request.intent.slots.fizzBuzzA.value;
    console.log(fizzBuzzSlotARaw);
    var fizzBuzzSlotA = resolveCanonical(context.event.request.intent.slots.fizzBuzzA);
    console.log(`Slot A: ${fizzBuzzSlotA}`);
    var fizzBuzzSlotBRaw = context.event.request.intent.slots.fizzBuzzB.value;
    console.log(fizzBuzzSlotBRaw);
    var fizzBuzzSlotB = resolveCanonical(context.event.request.intent.slots.fizzBuzzB);
    console.log(`Slot A: ${fizzBuzzSlotB}`);
    var numberSlotRaw = context.event.request.intent.slots.number.value;
    console.log(numberSlotRaw);
    var numberSlot = resolveCanonical(context.event.request.intent.slots.number);
    console.log(`Number Slot: ${numberSlot}`);

    var input = getInput(fizzBuzzSlotA, fizzBuzzSlotB, numberSlot);
    var correctInput = getCorrectFizzBuzz(newCount);

    if(input == correctInput){
        console.log(`Correct input: ${input}`);        
        var nextOutput = getCorrectFizzBuzz(newCount + 1);
        var speechOutput = `<say-as interpret-as="cardinal">${nextOutput}</say-as>`;
        var reprompt = `It's your turn, I said ${speechOutput}`;
        context.attributes[CURRENT_COUNT] = newCount + 1;        
        context.emit(constants.ACTION_ASK, speechOutput, reprompt);
    } else{
        console.log(`Incorrect input: ${input}`);                
        var speechOutput = `I'm afraid that's not correct. I win. You lasted ${newCount} turns`;
        context.attributes[LONGEST_GAME] = newCount;
        context.emit(constants.ACTION_TELL, speechOutput);
    }
}

function getInput(fbA, fbB, number){
    var output = "";    
    if(fbA){
        output += fbA;
    }
    if(fbB){
        output += fbB;
    }
    if(output == ""){
        output = `${number}`;
    }
    return output;
}

function getCorrectFizzBuzz(input){
    var output = "";    
    if(input % 3 == 0){
        output += "fizz";
    }
    if(input % 5 == 0){
        output += "buzz";
    }
    if(output == ""){
        output = `${input}`;
    }
    return output;
}

function unhandledIntent(context){
    console.log('Unhandled');
    context.handler.state = '';
    context.emit(constants.ACTION_TELL, 'Sorry I didn\'t catch that');
}

function handleHelpIntent(context, message){
    console.log(`Help intent`);
    context.handler.state = '';
    context.emit(constants.ACTION_TELL, message);
}

function resolveCanonical(slot){
	//this function looks at the entity resolution part of request and returns the slot value if a synonyms is provided
    try{
		var canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
	}catch(err){
        console.log(err.message);
        canonical = slot.value;
	}
	return canonical;
}
