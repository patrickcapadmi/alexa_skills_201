'use strict';
/* globals
module 
*/

const HELP_MESSAGE = "To play Fizz Buzz, simply say Fizz on multiples of three and Buzz on multiples of five. Ask to start a new game!";
const ERROR_MESSAGE = "I'm sorry, there was a problem completing your request.";
const CANCEL_MESSAGE = "";

const ACTION_ASK = ":ask";
const ACTION_TELL = ":tell";
const ACTION_TELL_WITH_CARD = ":tellWithCard";

const ELICIT_SLOT = ':elicitSlot';
const CONFIRM_SLOT = ':confirmSlot';
const CONFIRM_INTENT = ":confirmIntent";

const SAVE_STATE = ":saveState";

const confirmation = {
    CONFIRMED:'CONFIRMED',
    DENIED:'DENIED'
};

module.exports = {
    HELP_MESSAGE : HELP_MESSAGE,
    ERROR_MESSAGE : ERROR_MESSAGE,
    CANCEL_MESSAGE : CANCEL_MESSAGE,
    ACTION_ASK : ACTION_ASK,
    ACTION_TELL : ACTION_TELL,
    ACTION_TELL_WITH_CARD : ACTION_TELL_WITH_CARD,
    ELICIT_SLOT: ELICIT_SLOT,
    CONFIRM_SLOT: CONFIRM_SLOT,
    CONFIRM_INTENT : CONFIRM_INTENT,
    SAVE_STATE: SAVE_STATE,
    confirmation: confirmation
}
