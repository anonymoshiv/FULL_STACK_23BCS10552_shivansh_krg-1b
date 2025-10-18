// Sample Data
let properties = [
    { id: 1, address: "123 MG Road, Pune", rent: 25000, status: "Occupied" },
    { id: 2, address: "456 Koramangala, Bangalore", rent: 35000, status: "Vacant" }
  ];
  
  // Load Properties on Page Load
  document.addEventListener('DOMContentLoaded', function() {
    renderProperties();
  });
  
  function renderProperties() {
    const container = document.getElementById('properties-container');
    container.innerHTML = properties.map(property => `
      <div class="property-card">
        <h3>${property.address}</h3>
        <p>Rent: ₹${property.rent}</p>
        <p>Status: <span class="status-${property.status.toLowerCase()}">${property.status}</span></p>
        <button onclick="editProperty(${property.id})">Edit</button>
      </div>
    `).join('');
  }
  
  function addProperty() {
    const address = document.getElementById('new-property').value;
    if (address) {
      const newProperty = {
        id: properties.length + 1,
        address: address,
        rent: 0,
        status: "Vacant"
      };
      properties.push(newProperty);
      renderProperties();
      document.getElementById('new-property').value = "";
    }
  }