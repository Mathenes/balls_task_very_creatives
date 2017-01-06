// function that fires a JSON request sending the number of balls as a parameter
// and return the response in the "data" variable
function requisition(){
  var value_for_controller = {}, value_for_sum = {}

// the result of these two commands is = { "balls_core": { "sum": ballsCounter + 1 } }
  value_for_sum[parameter_sum] = ballsCounter + 1
  value_for_controller[rails_controller] = value_for_sum

  var params = JSON.stringify(value_for_controller);

  xhr.open('POST', complete_url, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.setRequestHeader("X-CSRF-TOKEN", token);
  xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && xhr.status == 200) {
      data = xhr.responseText;
    };
  };
  xhr.send(params);
};
