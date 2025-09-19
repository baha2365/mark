let list_of_electronics = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let phone_list = document.getElementById("list_electr_white");

// JSON-нан тауарларды алу
fetch("electronics.json")
  .then(response => response.json())
  .then(data => {
    list_of_electronics = data;
    renderPhoneList(list_of_electronics);
  })
  .catch(error => console.error("Error loading JSON:", error));




function renderPhoneList(array) {
  phone_list.innerHTML = "";

  array.forEach(phone => {
    let item = document.createElement('li');
    item.classList.add("product-card");


    // ===================
    item.addEventListener("click", () => {
      window.location.href = `description.html?id=${encodeURIComponent(phone.name)}`;
    });
    // ===================

    let img = document.createElement('img');
    img.src = phone.images[0];
    img.alt = phone.name;
    img.style.width = "auto";
    img.style.height = "222px";

    let name = document.createElement('p');
    name.textContent = phone.name;

    let price = document.createElement('h4');
    price.textContent = phone.price;


    let buttons = document.createElement('button');
    buttons.textContent = 'Buy';
    buttons.classList.add("buy-btn");


    buttons.addEventListener('click', (e) => {
      e.stopPropagation();
      alert(`${phone.name} purchased!`);
    });

    let heartButton = document.createElement('button');
    let heartIcon = document.createElement('i');

    if (favorites.includes(phone.name)) {
      heartIcon.classList.add("fa-solid", "fa-heart");
    } else {
      heartIcon.classList.add("fa-regular", "fa-heart");
    }
    heartIcon.style.color = "red";

    heartButton.appendChild(heartIcon);
    heartButton.classList.add("heart_button");

    heartButton.addEventListener("click", (e) => {
      e.stopPropagation();
      if (favorites.includes(phone.name)) {
        favorites = favorites.filter(fav => fav !== phone.name);
        heartIcon.classList.remove("fa-solid");
        heartIcon.classList.add("fa-regular");
      } else {
        favorites.push(phone.name);
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa-solid");
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    });

    item.appendChild(img);
    item.appendChild(name);
    item.appendChild(price);
    item.appendChild(buttons);
    item.appendChild(heartButton);

    phone_list.appendChild(item);
  });
}



function filterPhones() {
  let query = document.getElementById("search_input").value.toLowerCase();
  let newUrl = `search.html?query=${encodeURIComponent(query)}`;

  // Егер қазір search.html бетінде тұрсақ
  if (window.location.pathname.includes("search.html")) {
    // Жай ғана жаңа query қойып қайта жүктейміз
    window.location.search = `?query=${encodeURIComponent(query)}`;
  } else {
    // Басқа беттерден іздесе search.html-ға жібереміз
    window.location.href = newUrl;
  }
}



// function filterByApple(event) {
//   event.preventDefault();
//   let filtered = list_of_electronics.filter(phone =>
//     phone.name.toLowerCase().includes("iphone")
//   );
//   renderPhoneList(filtered);
// }

// function filterByPs(event){
//   event.preventDefault();
//   let filtered = list_of_electronics.filter(phone =>
//     phone.name.toLowerCase().includes("playstation 5")
//   );
//   renderPhoneList(filtered);
// }

// let text = "The rain in SPAIN";
// let indexRegex = text.search(/rain/); // indexRegex will be 4

