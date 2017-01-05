// initializing variables for canvas
var canvas,
    context,
    circles = [],
    ballsCounter = 0,
    score = 0;

// initializing variables for access_server
var xhr = new XMLHttpRequest(),
    url = "",
    complete_url = "",
    token = "",
    data = null;

// action name of rails controller
var action = "send_sum";

// getting every element after window load
window.onload = function(){
  url = window.location.href;
  complete_url = url + action;
  token = document.getElementsByName('csrf-token')[0].content;

  canvas = document.getElementById("balls_canvas");
  context = canvas.getContext('2d');
};
