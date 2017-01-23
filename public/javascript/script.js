function clicky(i) {

  let it = document.getElementById(`${i}`);

  it.contentEditable = 'true';
  it.addEventListener('keypress', function(e) {
      let key = e.which || e.keyCode;
      if (key === 13) {
          it.setAttribute("contentEditable", "false")

          fetch( `/edit`, {
            method: 'POST',
            body: JSON.stringify({ newToDo: it.innerText, id: i }),
            headers: new Headers({
              "Content-Type": "application/json",
              "Accept": "application/json"
            })
          })
        }
    })
}

$(document).ready(function(){

  $('.woody').on('click', function(){
    $('.addTaskInput').submit();
  })
  
  $('.completeContainer').on('click','i', function(event){
    $(this).toggleClass('completedGreen', 'uncompletedBlack')
    //const itemId = $(this).parent('form').find('input[name="itemId"]')[0].value
    const itemId = $(this)[0].dataset.id
    a = $(this)
    console.log('id::', itemId)
    const data = {itemId: itemId}
    $.ajax({
      type: 'POST',
      url: '/toggle_complete',
      data: data,
      success: function(data){
        //do something with the data via front-end framework
        console.log('toggle success!')
      }
    });
  });
});
