$.ajax({
  url: '../users.json',
  dataType: 'json',
  type: 'get',
  cache: 'false',
  success: function(data) {
              $(data.UserStats).each(function(index, value) {
        $('#wrap').append(
'<div class="flex-item">' + '<table cellpadding="1" cellspacing="1" >' + '<tr><td colspan="1" rowspan="5"><img src="images/' + value.userName + '.jpg"></td>' + '<td colspan="2" rowspan="1"><a href="https://zap.ru/users/' + value.userName + '">' + value.userName + '</a></td></tr>' + '<tr><td>Группа:</td>' + '<td>' + value.userGroup + '</td></tr>' +'<tr><td>Комментариев:</td>' + '<td>' + value.comments + '</td></tr>' + '<tr><td>Друзей:</td>' + '<td>' + value.friends + '</td></tr>' + '<tr><td>Регистрация:</td>' + '<td>' + value.registrationDate + '</td></tr>' + '<tr><td>' + value.rank + '</td>' + '<td> Активность:</td>' + '<td>' + value.timeLastActivities + '</td></tr>' + '</table>' + '</div>');
     });
   }
});