


const weatherform= document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')     // # is used for id
const messageTwo = document.querySelector('#message-2')     

// messageOne.textContent= "From Javascript"

weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()      //prevent default is used to stop page from getting reloaded again and again and allows it to simply do nothing
    messageOne.textContent= "Loading..."
    messageTwo.textContent=""
    const location= search.value        // value extracts the input value user entered
    fetch('/weather?address='+ location ).then((response)=>{      //fetch data from this url and then run this function

    

        response.json().then((data)=>{
        if(data.error){
            // console.log(data.error)
            
            messageOne.textContent=data.error
        }
        else{
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent=data.location
            messageTwo.textContent= data.forecast
        }
        
      })   
   })   //Call back function

    
})
