function updateTsunamiStatus() {
  // tsunami status banner text strings
  var tsunamiStatusText = "";
  var tsunamiStatusTimestamp = "";

  // GET TSUNAMI STATUS STORED IN DB
  fetch(update_tsunami_status_URL)
  .then((resp) => resp.json())
  .then(function(data) {

    tsunamiStatusText = data.StatusMsg;
    tsunamiStatusTimestamp = data.TimestampLocal;

    // Display tsunami status
    document.getElementById("tsunamistatus").innerHTML =  `<b>Status message:</b> ${tsunamiStatusText}<br>` +
                                                          `<b>Message timestamp:</b> ${tsunamiStatusTimestamp}`

   

  })
  .catch(error=>console.log(error));




}