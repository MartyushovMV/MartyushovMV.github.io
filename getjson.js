$(document).ready(function() {

$.getJSON('https://github.com/MartyushovMV/MartyushovMV.github.io/blob/master/users.json', function(data) {
      for(var i=0;i<data.UserStats.length;i++){
                 $('#users').append('<tr><td>' + data.UserStats[i].id + '</td><td>' + data.UserStats[i].userURL + 
                '</td><tr>');
            }
    });
});