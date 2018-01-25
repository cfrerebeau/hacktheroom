
$("#lights").click( function(){
  $.ajax({
      type: "GET",
      url: "/lights"
    })
});
