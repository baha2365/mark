
function style1(){
    let style = document.getElementById("style_changer"); 
    let grid_style = document.getElementById("list_electr_white"); 
    if(style.classList.contains("white_style") || grid_style.classList.contains("list_electr_white")){
        style.classList.remove("white_style")
        style.classList.add("black_style")
        grid_style.classList.remove("list_electr_white")
        grid_style.classList.add("list_electr_black")
        
        }else{ style.classList.remove("black_style")
            style.classList.add("white_style")
            grid_style.classList.remove("list_electr_black")
            grid_style.classList.add("list_electr_white") } }





// let link_home = document.getElementById("link_home");
// let button_style = document.getElementById("style_button");

// link_home.addEventListener("mouseenter", incr_link);
// link_home.addEventListener("mouseleave",decr_link);

// button_style.addEventListener("mouseenter", incr_button);
// button_style.addEventListener("mouseleave",decr_button);

// function incr_link() {
//     link_home.classList.add("incr_size");
//     link_home.classList.remove("decr_size");
// }

// function decr_link() {
//     link_home.classList.add("decr_size");
// }


// function incr_button() {
//     button_style.classList.add("incr_size");
//     button_style.classList.remove("decr_size");
// }

// function decr_button() {
//     button_style.classList.add("decr_size");
// }






const slides = document.getElementById("slides");
const totalSlides = slides.children.length;
let currentIndex = 0;

function updateSlide() {
    slides.style.transform = `translateX(-${currentIndex * 600}px)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
}





// function loadHTML(id, file) {
//   fetch(file)
//     .then(response => response.text())
//     .then(data => {
//       document.getElementById(id).innerHTML = data;
//     });
// }

// // header және footer жүктеу
// loadHTML("header", "header_page.html");
// loadHTML("footer", "footer_page.html");





function Toggle_Heart() {
    let heart = document.getElementById("heart");
    let no_heart = document.getElementById("no_heart");
    
    if (heart.style.display !== "none") {
        heart.style.display = "none";
        no_heart.style.display = "inline";
    } else {
        heart.style.display = "inline";
        no_heart.style.display = "none";
    }
}