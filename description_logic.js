// URL-дегі параметрді оқу
const params = new URLSearchParams(window.location.search);
const productName = params.get("id");

// JSON-ды оқу
fetch("electronics.json")
  .then(res => res.json())
  .then(data => {
    const product = data.find(p => p.name === productName);

    if (product) {
      let container = document.getElementById("product-container");

      let hr = document.createElement("hr");
      hr.classList.add("hr_style");

      // Галерея
      let gallery = document.createElement("div");
      gallery.classList.add("product-gallery");

      let mainDisplay = document.createElement("div");
      mainDisplay.classList.add("main-display");

      let thumbnails = document.createElement("div");
      thumbnails.classList.add("thumbnails");

      gallery.appendChild(mainDisplay);
      gallery.appendChild(thumbnails);

      // main img
      if (product.images && product.images.length > 0) {
        mainDisplay.innerHTML = `<img id="main-media" src="${product.images[0]}" alt="Product">`;
      }


      if (product.images) {
        product.images.forEach(imgG => {
          const thumb = document.createElement("img");
          thumb.src = imgG;
          thumb.classList.add("thumb");
          thumb.onclick = () => {
            mainDisplay.innerHTML = `<img id="main-media" src="${imgG}" alt="Product">`;
          };
          thumbnails.appendChild(thumb);
        });
      }




      if (product.video) {
      let videoThumb;

      if (product.video.includes("youtube.com") || product.video.includes("youtu.be")) {

        let videoId;
        if (product.video.includes("youtu.be")) {
          videoId = product.video.split("youtu.be/")[1].split("?")[0];
        } else {
          const urlParams = new URL(product.video).searchParams;
          videoId = urlParams.get("v");
        }

        const imgThumb = document.createElement("img");
        imgThumb.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        imgThumb.alt = "YouTube Video";

        imgThumb.onclick = () => {
          mainDisplay.innerHTML = `
            <iframe 
              id="main-media"
              src="https://www.youtube.com/embed/${videoId}?autoplay=1"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          `;
        };

        videoThumb = imgThumb;
      } else {
        const vidThumb = document.createElement("video");
        vidThumb.src = product.video;
        vidThumb.muted = true;
        vidThumb.loop = true;
        vidThumb.autoplay = true;
        vidThumb.playsInline = true;
        vidThumb.width = 120;

        vidThumb.onclick = () => {
          mainDisplay.innerHTML = `
            <video id="main-media" src="${product.video}" controls autoplay></video>
          `;
        };

        videoThumb = vidThumb;
      }

      thumbnails.appendChild(videoThumb);
    }




      let name = document.createElement("h2");
      name.textContent = product.name;
      name.classList.add("name_product");

      let price = document.createElement("h3");
      price.textContent = product.price;
      price.classList.add("price_product");


      if (product.description) {
      let ul = document.createElement("ul");
      ul.classList.add("description_product");
        
      for (let key in product.description) {
        let li = document.createElement("li");
        
        // Басты текст
        let boldText = document.createElement("strong");
        boldText.textContent = key + ": ";
        li.appendChild(boldText);

        // description
        let span = document.createElement("span");
        span.textContent = product.description[key];
        li.appendChild(span);

        ul.appendChild(li);
      }

      container.appendChild(ul);
    }


      let cartBtn = document.createElement("button");
      cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add to cart`;
      cartBtn.classList.add("cart_btn");

      cartBtn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (!cart.some(item => item.name === product.name)) {
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert(`${product.name} added to cart!`);
        } else {
          alert(`${product.name} is already in your cart!`);
        }
      });


      let buyNowButton = document.createElement("button");
      buyNowButton.classList.add("buy_now-btn");
      buyNowButton.innerHTML = `<i class="fa-solid fa-money-bill"></i> Buy Now`;

      buyNowButton.addEventListener("click", () => {
        alert(`You are buying: ${product.name} for ${product.price}`);
        // window.location.href = "checkout.html?id=" + product.name;
      });


      container.appendChild(name);
      container.appendChild(hr);
      container.appendChild(price);
      
      container.appendChild(gallery);
      container.appendChild(cartBtn);
      container.appendChild(buyNowButton);
    } else {
      document.getElementById("product-container").textContent = "Product not found!";
    }
  })
  .catch(error => console.error("JSON жүктеу қатесі:", error));
