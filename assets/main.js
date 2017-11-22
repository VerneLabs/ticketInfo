var client = ZAFClient.init();
client.invoke('resize', { width: '100%', height: '200px' });

client.get('ticket').then(function(response){
  var userId = response.ticket.requester.id
  requestUserInfo(client, userId).then(function(response){
    var userData = {
      "name": response.user.name,
      "email": response.user.email,
      "role": response.user.role,
      "time_zone": response.user.time_zone,
      "created_at": response.user.created_at
    }
    console.log("userData =>", userData)
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
