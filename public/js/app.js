const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector("#message-2")
const mapQuery = document.querySelector('#map')


mapboxgl.accessToken =
  "pk.eyJ1IjoiMi1jb21tYS1jbHViIiwiYSI6ImNrYWk4YW1xZjBubXkyc295YTUwc3N5dnEifQ.aAg07OOU135yBzlmn4Acww";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
}); 


weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()

    const location = search.value;
    search.value = "";
    messageTwo.textContent = "";
    messageOne.textContent = 'Loading...';
        

    fetch(`/weather?address=${location}`).then(
      (response) => {
        response.json().then((data) => {
            if(data.error) return messageOne.textContent = data.error
            messageOne.textContent = data.address;
            messageTwo.textContent = data.forecast;                                                                               
                        
            map.flyTo({
              center: data.center.reverse(),
              zoom: 13,
              essential: true,
            })
        })             
      })       
}) 

