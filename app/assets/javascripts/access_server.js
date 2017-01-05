function requisition(){
  var //sum = document.getElementById('sum').innerHTML,
      params = JSON.stringify({ "balls_core": {"sum": ballsCounter + 1} });

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

// xhr.setRequestHeader("Content-length", params.length);
// xhr.setRequestHeader("Connection", "close");
