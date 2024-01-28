// NAVBAR SEARCH TOGGLE
var headerNav = document.querySelector("#headerNav");
var headerNavSearch = document.querySelector("#headerSearchNav");
var searchBtn = document.querySelector("#searchBtn");
var cancelBtn = document.querySelector("#cancelBtn");
var searchInput = document.querySelector("#searchInput");

const toggleSearchNavbar = () => {
  if (headerNavSearch.style.display === "flex"){
    headerNavSearch.style.display = "none";
    headerNav.style.display = "flex";
  }
  else {
    headerNavSearch.style.display = 'flex';
    headerNav.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  console.log('Search button clicked');
  toggleSearchNavbar();
})

cancelBtn.addEventListener("click", () => {
  console.log("Cancel button clicked");
  searchInput.value = "";
  toggleSearchNavbar();
})

// DETECTING THE DIRECTION OF THE SCROLL 
var scrollDirection = "none";

const detectScrollDirection = (callback) => {
  var lastScrollTop = 0;

  window.addEventListener("wheel", () => {
    var currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      scrollDirection = "down";
    } 
    else if (currentScrollTop < lastScrollTop) {
      scrollDirection = "up";
    }
    lastScrollTop = currentScrollTop;

    callback(scrollDirection);
  });
};

// TRANSLATING THE BANNERS IN THE DIRECTION OF THE SCROLL
var bannerRight = document.querySelector("#bannerRight");
var bannerLeft = document.querySelector("#bannerLeft");

var bannerRightCard = document.querySelector("#bannerRightCard");
var bannerRightCanvasWrapper = document.querySelector("#bannerRightCanvasWrapper");

var bannerLeftCard = document.querySelector("#bannerLeftCard");
var bannerLeftCanvasWrapper = document.querySelector("#bannerLeftCanvasWrapper");


detectScrollDirection((updatedScrollDirection) => {
  console.log("Updated scroll direction: " + updatedScrollDirection);

  const observeBanner = (bannerDirection, card, canvasWrapper, translateY) => {
    return new IntersectionObserver((entries) => {
      console.log(entries);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          card.style.transform = `translateY(${(updatedScrollDirection === "down") ? -translateY : 0}px)`;
          canvasWrapper.style.transform = `translateY(${(updatedScrollDirection === "down") ? translateY : 0}px)`;
        }
      });
    });
  };
  
  const observerRight = observeBanner(bannerRight, bannerRightCard, bannerRightCanvasWrapper, 48);
  observerRight.observe(bannerRight);
  
  const observerLeft = observeBanner(bannerLeft, bannerLeftCard, bannerLeftCanvasWrapper, -48);
  observerLeft.observe(bannerLeft);
});

