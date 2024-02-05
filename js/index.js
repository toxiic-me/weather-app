// dom variables
const searchBtn = document.getElementById('searchBtn');
const searchInput =  document.getElementById('searchInput');
const toggleMenu = document.getElementById('toggleMenu');
const mainTemp = document.getElementById('mainTemp');
const maxTemp = document.getElementById('maxTemp');
const minTemp = document.getElementById('minTemp');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const windDegree = document.getElementById('windDegree');
const cloudPact = document.getElementById('cloudPact');
const myTime = document.getElementById('time');
const myDate = document.getElementById('date');
const cityName = document.getElementById('cityName');
const links = document.getElementById('links');
const changeTheme = document.getElementById('changeTheme');
const body = document.getElementById('body');
const innerBody =  document.getElementById('innerBody');

// defining fetch api for getting weather with city parameter
const fetchData = async(city)=>{
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'acfe366f2emshd92fb24e344a931p11a157jsna63d8165285a',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data)
        if(data.temp != undefined){
            cityName.innerText = city;
            cityName.style.textTransform = 'uppercase';
            mainTemp.innerText = data.temp;
            minTemp.innerText = data.min_temp;
            maxTemp.innerText = data.max_temp;
            humidity.innerText = data.humidity;
            windSpeed.innerText = data.wind_speed;
            windDegree.innerText = data.wind_degrees;
            cloudPact.innerText = data.cloud_pct;    
        }else{
            mainTemp.innerText = '--';
            minTemp.innerText = '--';
            maxTemp.innerText = '--';
            humidity.innerText = '--';
            windSpeed.innerText = '--';
            windDegree.innerText = '--';
            cloudPact.innerText = '--';
            cityName.innerText = 'Weather'; 
            alert('Enter place name properly :)')   
        }
        
    } catch (error) {
        console.error(error);
        mainTemp.innerText = '--';
        minTemp.innerText = '--';
        maxTemp.innerText = '--';
        humidity.innerText = '--';
        windSpeed.innerText = '--';
        windDegree.innerText = '--';
        cloudPact.innerText = '--';
        cityName.innerText = 'Weather';
    }
}

// calling api once to load start data
fetchData('mohali');
cityName.innerText = 'Weather';

// function to call api which is defined in fetchData function
searchBtn.addEventListener('click',async (e)=>{
    e.preventDefault();
    if(searchInput.value != ''){
    let city = searchInput.value;
    console.log(`Getting data for ${city}...`)
    fetchData(city);
    }else{ alert('Enter name of place :)') }
    });

// function to show time
const showTime = ()=>{
    let date = new Date();
    let currTime = date.toLocaleTimeString();
    myTime.innerText = currTime;
}
setInterval(() => {
    showTime();
}, 1000);

// function to show date
let date = new Date();
let currDate = date.toLocaleDateString();
myDate.innerText = currDate;

// toggle menu function
toggleMenu.addEventListener('click',()=>{
    if(links.style.marginTop == '-55vh'){
        links.style.transition = '1s';
        links.style.marginTop = '10vh';
    }else{
        links.style.transition = '1s';
        links.style.marginTop = '-55vh';
    }
})

// daymode theme funtion
const dayMode = ()=>{
    console.log(`Switching to Day Mode.`);
    body.style.backgroundImage = "url('../images/body.jpg')";
    innerBody.style.backgroundImage = "url('../images/cloud.jpeg')";
    mainTemp.style.background = "url('../images/darkmode.jpeg')";
    mainTemp.style.webkitBackgroundClip= 'text';
    mainTemp.style.color = 'transparent';
    changeTheme.innerHTML = `<i class="fa-solid fa-moon"></i>`
}

// nightmode theme function 
const nightMode = ()=>{
    console.log(`Switching to Night Mode.`);
    body.style.backgroundImage = "url('../images/rain.jpg')";
    innerBody.style.backgroundImage = "url('../images/darkmode.jpeg')";
    mainTemp.style.background = "url('../images/cloud.jpeg')";
    mainTemp.style.webkitBackgroundClip= 'text';
    mainTemp.style.color = 'transparent';
    changeTheme.innerHTML = `<i class="fa-solid fa-sun"></i>`
}

// toggle theme function
changeTheme.addEventListener('click',()=>{
mainTemp.style.background == 'url("../images/cloud.jpeg") text' ? dayMode() : nightMode(); })
