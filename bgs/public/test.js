var socket = undefined;

function doStuff(token) {
  socket = io('http://192.168.56.101:3000/main', {query: 'token='+token});
  if (socket) {
    document.getElementById('connected').innerHTML = 'CONNECTED !!!';

    socket.emit('getUsers');
    socket.on('hereAreTheUsers', function(data){
      var list = '<ul id="users-ul">';
      for(var i=0;i<data.users.length;i++) {
        list += '<li id="user-'+data.users[i].id+'">'+data.users[i].username+'</li>';
      }
      list += '</ul>';
      document.getElementById('user-list').innerHTML = list;
    });

    socket.on('userJoined', function(data){
      console.log(data);
      var html = '<li id="user-'+data.user.id+'">'+data.user.username+'</li>';
      document.getElementById('users-ul').innerHTML += html;
    });

    socket.on('userLeft', function(data){
      document.getElementById('user-'+data.user.id).remove();
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



