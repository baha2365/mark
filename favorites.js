let list_of_electronics = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let favorites_list = document.getElementById("favorites_list");

// JSON-нан тауарларды алу
fetch("electronics.json")
  .then(response => response.json())
  .then(data => {
    list_of_electronics = data;
    renderFavorites();
  })
  .catch(error => console.error("Error loading JSON:", error));

// Favorites-ті шығару
function renderFavorites() {
  favorites_list.innerHTML = "";

  if (favorites.length === 0) {
    favorites_list.innerHTML = "<p>No favorite products yet.</p>";
    return;
  }

  favorites.forEach(favName => {
    let phone = list_of_electronics.find(p => p.name === favName);
    if (phone) {
      let item = createProductCard(phone);
      favorites_list.appendChild(item);
    }
  });
}

// Карточка жасау
function createProductCard(phone) {
  let item = document.createElement('li');
  item.classList.add("product-card");

  item.addEventListener("click", () => {
    window.location.href = `description.html?id=${encodeURIComponent(phone.name)}`;
  });

  let img = document.createElement('img');
  img.src = phone.images[0];
  img.alt = phone.name;
  img.style.width = "auto";
  img.style.height = "222px";

  let name = document.createElement('p');
  name.textContent = phone.name;

  let price = document.createElement('h4');
  price.textContent = phone.price;

  let buyBtn = document.createElement('button');
  buyBtn.textContent = 'Buy';
  buyBtn.classList.add("buy-btn");

  buyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    alert(`${phone.name} purchased!`);
  });


  let heartButton = document.createElement('button');
  let heartIcon = document.createElement('i');
  heartIcon.classList.add("fa-solid", "fa-heart");
  heartIcon.style.color = "red";

  heartButton.appendChild(heartIcon);
  heartButton.classList.add("heart_button");

  heartButton.addEventListener("click", (e) => {
    e.stopPropagation();
    favorites = favorites.filter(fav => fav !== phone.name);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  });

  item.appendChild(img);
  item.appendChild(name);
  item.appendChild(price);
  item.appendChild(buyBtn);
  item.appendChild(heartButton);

  return item;
}

