'use strict';

module.exports = function(socket) {

  // --- Make a new room with a prefix
  // --- Join the room
  // --- Flag the user
  // --- Emit status change for the user ?
  socket.on('createGame', function(){

  });

  // --- Join the given room
  // --- Flag
  // --- Emit status change
  socket.on('joinGame', function(){

  });

  // --- Get all prefixed rooms and their infos
  // --- Emit something
  socket.on('getGames', function(){

  });

  // --- Check validity
  // --- Flag the room
  // --- Create game in DB
  // --- Launch a new socket ? io.of('/game_id_of_the_game') ?
  socket.on('launchGame', function(){

  });

};
