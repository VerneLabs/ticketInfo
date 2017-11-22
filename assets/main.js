var client = ZAFClient.init();
client.invoke('resize', { width: '100%', height: '200px' });

client.get('ticket').then(function(response){
  var userId = response.ticket.requester.id
  requestUserInfo(client, userId).then(function(response){
    showInfo(response);
  }).catch(function(error){
    showError()
  })
})

function requestUserInfo(client, id) {
  var settings = {
    url: '/api/v2/users/' + id + '.json',
    type:'GET',
    dataType: 'json',
  };
  return client.request(settings)
}

function showInfo(response){
  var userData = {
    "name": response.user.name,
    "email": response.user.email,
    "role": response.user.role,
    "time_zone": response.user.time_zone,
    "created_at": response.user.created_at
  }

  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(userData);
  $("#content").html(html);
}

function showError() {
  var error_data = {
    'status': 404,
    'statusText': 'Not found'
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}
