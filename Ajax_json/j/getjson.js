$.ajax({
  url: '//martyushovmv.github.io/Ajax_json/users.json',
  dataType: 'json',
  type: 'get',
  cache: 'false',
  success: function(data) {
              $(data.UserStats).each(function(index, value) {
        $('#wrap').append(
'<div class="flex-item">' + '<table cellpadding="1" cellspacing="1" >' + '<tr><td colspan="1" rowspan="5"><img src="images/' + value.userName + '.jpg"></td>' + '<td colspan="2" rowspan="1"><a href="https://zap.ru/users/' + value.userName + '">' + value.userName + '</a></td></tr>' + '<tr><td>Группа:</td>' + '<td align="center">' + value.userGroup + '</td></tr>' +'<tr><td>Комментариев:</td>' + '<td align="center">' + value.comments + '</td></tr>' + '<tr><td>Друзей:</td>' + '<td align="center">' + value.friends + '</td></tr>' + '<tr><td>Регистрация:</td>' + '<td align="center">' + value.registrationDate + '</td></tr>' + '<tr><td align="center">' + value.rank + '</td>' + '<td align="center"> Активность:</td>' + '<td>' + value.timeLastActivities + '</td></tr>' + '</table>' + '</div>');
     });
   }
});