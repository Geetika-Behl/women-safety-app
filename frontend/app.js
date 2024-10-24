
function initMap() {
    
  const userPosition = { lat: 28.7041, lng: 77.1025 };  //yha backend se ayegi location 
  
  const map = new google.maps.Map(document.getElementById('map'), {
    center: userPosition,
    zoom: 15,
  });

  new google.maps.Marker({
    position: userPosition,
    map: map,
  });
}

//yha pe api call lagegi backend se 
document.getElementById('send-location').addEventListener('click', function() {
  alert('Location sent to emergency contacts.');
});

//yha pe uber wali api call lagegi
document.getElementById('call-uber').addEventListener('click', function() {
  alert('Uber called to your location.');
});

// Sample news data
const newsData = [
  {
    title: "New Initiative for Women's Safety in Urban Areas",
    description: "A new government initiative aims to improve women's safety in major urban areas by increasing security patrols and installing more CCTV cameras.",
    url: "https://example.com/news-initiative-urban-areas",
    publishedAt: "2024-10-21T10:30:00Z"
  },
  {
    title: "Mobile App Launched for Women's Safety",
    description: "A new mobile app allows women to instantly send their location to emergency contacts during unsafe situations.",
    url: "https://example.com/mobile-app-launch",
    publishedAt: "2024-10-20T14:15:00Z"
  },
  {
    title: "Police Increase Patrols in Response to Recent Incidents",
    description: "Following a rise in safety concerns, local police have increased patrols in high-risk areas to ensure better protection for women.",
    url: "https://example.com/police-patrols-response",
    publishedAt: "2024-10-18T08:00:00Z"
  }
];

// Function to display news on the page
function displayNews() {
  const newsContainer = document.getElementById('news-container');

  newsData.forEach(article => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');

    newsItem.innerHTML = `
      <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
      <p>${article.description}</p>
      <small>Published at: ${new Date(article.publishedAt).toLocaleString()}</small>
    `;

    newsContainer.appendChild(newsItem);
  });
}

// Call the function to display news when the page loads
displayNews();


//ye site open hote hi map dikhega 
window.onload = initMap;
