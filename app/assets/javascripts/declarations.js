// initializing variables for canvas
var canvas,
    context,
    circles = [],
    ballsCounter = 0,
    score = 0,
    COLORS = {
      pink:'pink',
      green:'lightgreen',
      blue:'royalblue',
      purple:'mediumpurple'
    },
    SCORES = {
      pink:1,
      green:3,
      blue:5,
      purple:15
    };

// initializing variables for access_server
var xhr = new XMLHttpRequest(),
    url = "",
    complete_url = "",
    token = "",
    data = null;

//these variables below are here for future porposes; maybe they can change

// rails controller of the method
var rails_controller = "balls_core"

// action name of the method
var action = "send_sum";

// parameter name sum
var parameter_sum = "sum"

// parameter name score
var parameter_score = "score"


// getting every element after window load
window.onload = function(){
  url = window.location.href;
  complete_url = url + rails_controller + "/" + action;
  token = document.getElementsByName('csrf-token')[0].content;

  canvas = document.getElementById("balls_canvas");
  context = canvas.getContext('2d');
};
