$(document).ready(function() {

  $( '.clickedOn' ).click( function () {
    $('.clickedOn').addClass('hidden');
    $( '.edit' ).addClass('display');
  });


  // $('.item__toggle').on('click', function(){
  //     var item = $('form .input-new-item');
  //     var todo = {item: item.val()};
  //
  //     $.ajax({
  //       type: 'POST',
  //       url: '/todo',
  //       data: todo,
  //       success: function(data){
  //         //do something with the data via front-end framework
  //         location.reload();
  //       }
  //     });
  //     return false;
  // });

});