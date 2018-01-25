

function get_timer(){
    var timer = $.ajax({
        type: "GET",
        url: "/timer/get",
        async: true,
        success: function(data){
          $('#timer').html(data);
          console.log(data)
            setTimeout(function(){get_timer();}, 500);
        }
    }).responseText;



}
get_timer();
