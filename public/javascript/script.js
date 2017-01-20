
//
// const edit = id => {
//   let item = document.getElementById(id)
//   console.log("item: ", id)
//
//   $(document).ready( () => {
//
//     $( `#${id}` ).click( (  ) => {
//       $(`#${id}`).addClass('hidden');
//       $( `#edit-${id}` ).addClass('display')
//     });
//
//     $( `#${id}` ).click( (  ) => {
//       $(`#${id}`).addClass('strikethrough');
//       $("#checkmark").css({"color": "green"});
//     });
//
//
//   });
// }

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

//event listener ensures that the page is loaded before proceeding
document.addEventListener( "DOMContentLoaded", () => {
  //checks = all checkboxes
  const checks = document.querySelectorAll( '.fa.fa-check-circle-o' )
  checks.forEach( checkbox => {
    //event listener when checkboxes are checked
    checkbox.addEventListener( "click", event => {
      const { id } = checkbox.dataset

      //completed = checks the checkbox
      const completed = checkbox.checked

      //creates a post request to the respective route
      //sets the checkbox to checked
      //uses header to allow json
      fetch( `/completed/${id}`, {
        method: 'POST',
        body: JSON.stringify({ completed }),
        headers: new Headers({
          "Content-Type": "application/json",
          "Accept": "application/json"
        })
      })
        .then( result => result.json() )
        .then( result => {
          if( completed ) {
            document.querySelector( `#todo-label-${id}` ).classList.add( 'completed' )

            const todo = document.querySelector( `#todo-${id}` )
            document.querySelector( '#completed-todos' ).appendChild( todo )
          } else {
            document.querySelector( `#todo-label-${id}` ).classList.remove( 'completed' )

            const todo = document.querySelector( `#todo-${id}` )
            document.querySelector( '#open-todos' ).appendChild( todo )
          }
        })
    })
  })
})
