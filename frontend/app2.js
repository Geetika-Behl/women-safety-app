document.addEventListener('DOMContentLoaded', () => {
    // Dummy data for Uber Fare (replace with actual backend data)
    const fareData = {
      startLocation: 'Location A',
      endLocation: 'Location B',
      fare: 100,
      margin: 10,
      finalFare: 110
    };
  
    // Display Uber Fare Data
    document.getElementById('start-location').textContent = fareData.startLocation;
    document.getElementById('end-location').textContent = fareData.endLocation;
    document.getElementById('fare').textContent = fareData.fare;
    document.getElementById('margin').textContent = fareData.margin;
    document.getElementById('final-fare').textContent = fareData.finalFare;
  
    // Dummy product data (replace with actual backend data)
    const products = [
      {
        id: 1,
        name: 'Pepper Spray',
        price: 25,
        description: 'Effective pepper spray for women safety'
      },
      {
        id: 2,
        name: 'Safety Alarm',
        price: 15,
        description: 'Compact alarm to alert others in emergencies'
      },
      {
        id: 3,
        name: 'Self-defense Keychain',
        price: 10,
        description: 'Portable self-defense tool in the form of a keychain'
      }
    ];
  
    // Display product data
    const productListElement = document.getElementById('product-list');
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
  
      productCard.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <button onclick="purchaseProduct(${product.id})">Purchase</button>
      `;
  
      productListElement.appendChild(productCard);
    });
  });
  
  // Function to simulate product purchase
  function purchaseProduct(productId) {
    alert(`Product with ID ${productId} purchased successfully!`);
  }
  