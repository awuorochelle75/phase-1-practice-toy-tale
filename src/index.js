let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

const toyList=document.getElementById('toy-collection')
  //This here is displaying the toys in my db.json in a card kinda way.
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data =>{
        
        data.forEach(toy => {
          if(toy.name && toy.image && toy.likes !== undefined){
            rendersToy(toy);
          } else {
            console.warn('skip incomplete toy:',toy)
          } 
        })
      })
      

          function rendersToy(toy){
           
          const card = document.createElement('div')
          card.className = 'card'

          card.innerHTML=`
          <h2> ${toy.name}</h2>
          <img src = "${toy.image}" class='toy-avatar' /> 
          <p id ="likes-${toy.id}">${toy.likes} Likes </p>
          <button class ='like-btn' id='${toy.id}'> Like  ❤️</button>
          `
          toyList.appendChild(card)


          const likeButton = card.querySelector(".like-btn");
          likeButton.addEventListener('click',function(){
            handleLike(toy,card)
          })
        }

        function handleLike(toy){
          const newLikes = toy.likes + 1;

          fetch(`http://localhost:3000/toys/${toy.id}`,{
            method:'PATCH',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({likes:newLikes}) 
          })
          .then(response => response.json())
          .then(toyUpdate =>{

            document.getElementById(`likes-${toy.id}`).textContent=`${toyUpdate.likes} Likes`;
            toy.likes = toyUpdate.likes;
          })
        }
        
       
   

    const formToy=document.querySelector('.add-toy-form')

    formToy.addEventListener('submit', e => {
      e.preventDefault();
      const toyName = e.target.name.value;
      const toyImage = e.target.image.value;
  

    fetch('http://localhost:3000/toys',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        Accept:'application/json'
      },
      body:JSON.stringify({
        "name": toyName,
        "image":toyImage,
        "likes": 0

      })
     
      })
      .then(response => response.json())
      .then(data =>{
        console.log('Toy succesfully created:', data)
          rendersToy(data);
        formToy.reset()
      })
    })

  })