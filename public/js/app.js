const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector("#message-2")

mapboxgl.accessToken =
  "pk.eyJ1IjoiMi1jb21tYS1jbHViIiwiYSI6ImNrYWk4YW1xZjBubXkyc295YTUwc3N5dnEifQ.aAg07OOU135yBzlmn4Acww";  
var map = new mapboxgl.Map({
  container: "map",
  center: [0,0],
  zoom: 3,
  style: "mapbox://styles/mapbox/streets-v11"
}); 

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()

    const location = search.value;
    search.value = "";
    messageTwo.textContent = "";
    messageOne.textContent = 'Loading...';   
    
    map.flyTo({
      center: [0,0],
      zoom: 2,
      essential: true
    });

    fetch(`/weather?address=${location}`).then(
      (response) => {
        response.json().then((data) => {
            if(data.error) return messageOne.textContent = data.error
            messageOne.textContent = data.address;
            messageTwo.textContent = data.forecast;
            
            messageOne.insertAdjacentHTML(
              "afterbegin",
              `<img src=${data.icon} style="width:60px; height:60px;"><br>`
            );

            map.flyTo({
              center: data.center.reverse(),
              zoom: 13,
              essential: true
            })
        })             
      })       
}) 

