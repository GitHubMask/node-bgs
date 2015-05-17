var socket = undefined;

function doStuff(token) {
  socket = io('http://192.168.56.101:3000/main', {query: 'token='+token});
  if (socket) {
    document.getElementById('connected').innerHTML = 'CONNECTED !!!';
    socket.on('hereAreTheUsers', function(data){
      var list = '<ul>';
      for(var i=0;i<data.users.length;i++) {
        list += '<li>'+data.users[i].username+'</li>';
      }
      list += '</ul>';
      document.getElementById('user-list').innerHTML = list;
    });
  }
}

function getUsers() {
  socket.emit('getUsers');
}

function logMe() {
  var r = new XMLHttpRequest();
  r.open("POST", "auth", true);
  r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return;
    doStuff(JSON.parse(r.responseText).token);
  }
  r.setRequestHeader("Content-type","application/json");
  r.send(JSON.stringify({
    username: document.getElementsByName('username')[0].value,
    password: document.getElementsByName('password')[0].value,
  }));
}



