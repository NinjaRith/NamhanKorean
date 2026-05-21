function loadPage(pageUrl, element) {
  const contentContainer = document.getElementById("content-container");
  const navLinks = document.querySelectorAll(".nav-links a");

  fetch(pageUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${pageUrl}`);
      }
      return response.text();
    })
    .then((html) => {
      contentContainer.innerHTML = html;
      navLinks.forEach((nav) => nav.classList.remove("active"));
      element.classList.add("active");
      if (pageUrl === "courses.html") {
        contentContainer.className = "courses-section";
        console.log("Courses page loaded");
        createCourseCards();
      } else if (pageUrl === "aboutus.html") {
        contentContainer.className = "about-section";
        console.log("About Us page loaded");
      } else {
        contentContainer.className = "home-section";
        console.log("Home page loaded");
        const coursesLink = document.getElementById("courses-link");
        const exploreBtn = document.getElementById("explore-btn");
        if (exploreBtn) {
          exploreBtn.addEventListener("click", (event) => {
            event.preventDefault();
            loadPage("courses.html", coursesLink);
          });
        }
      }
    })
    .catch((error) => {
      console.error("Error loading page:", error);
      contentContainer.innerHTML = `<p>Failed to load the requested page.</p>`;
    });
}
document.addEventListener("DOMContentLoaded", function () {
  loadPage("home.html", document.querySelector(".nav-links a"));

  const homeLink = document.getElementById("home-link");
  const coursesLink = document.getElementById("courses-link");
  const aboutUsLink = document.getElementById("aboutus-link");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    loadPage("home.html", homeLink);
  });

  coursesLink.addEventListener("click", (event) => {
    event.preventDefault();
    loadPage("courses.html", coursesLink);
  });

  aboutUsLink.addEventListener("click", (event) => {
    event.preventDefault();
    loadPage("aboutus.html", aboutUsLink);
  });

  const slideshow = document.querySelector(".team-slideshow");
  const teamMembers = document.querySelectorAll(".team-member");
  if (!teamMembers.length) return;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;
  let memberWidth = teamMembers[0].offsetWidth + 100;

  function updateSlidePosition() {
    slideshow.style.transform = `translateX(-${currentIndex * memberWidth}px)`;
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = teamMembers.length - 1;
    }
    updateSlidePosition();
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < teamMembers.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlidePosition();
  });

  let startX = 0;
  let isDragging = false;

  slideshow.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slideshow.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (diff > 50) {
      nextBtn.click();
      isDragging = false;
    } else if (diff < -50) {
      prevBtn.click();
      isDragging = false;
    }
  });

  slideshow.addEventListener("touchend", () => {
    isDragging = false;
  });

  window.addEventListener("resize", () => {
    memberWidth = teamMembers[0].offsetWidth + 20;
    updateSlidePosition();
  });
});
const courses = [
  {
    title: "Web Development",
    image: "images/web-development.png",
    price: "$49.99",
    rating: "★★★★☆",
    description:
      "Learn how to build modern websites using HTML, CSS, and JavaScript.",
    duration: "12 hours",
    lectures: 30,
    status: "Coming Soon",
    link: "course_page.html",
  },
  {
    title: "Data Science",
    image: "images/DataScience.jpg",
    price: "$59.99",
    rating: "★★★★★",
    description: "Dive into the world of data analytics and machine learning.",
    duration: "15 hours",
    lectures: 40,
    status: "Coming Soon",
    link: "course_page.html",
  },
  {
    title: "Digital Marketing",
    image: "images/digital-marketing.jpeg",
    price: "$39.99",
    rating: "★★★★☆",
    description:
      "Master the art of online marketing with industry-proven strategies.",
    duration: "10 hours",
    lectures: 25,
    status: "Coming Soon",
    link: "course_page.html",
  },
];

function createCourseCards() {
  console.log("loading course cards");
  const courseList = document.getElementById("course-list");
  if (!courseList) return;

  courses.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");
    courseCard.onclick = function () {
      window.location.href = course.link;
    };

    courseCard.innerHTML = `
        <img src="${course.image}" alt="${course.title}" />
        <h3>${course.title}</h3>
        <div class="course-details">
          <span class="price">${course.price}</span>
          <div class="stars">${course.rating}</div>
        </div>
        <p>${course.description}</p>
        <p><strong>Duration:</strong> ${course.duration} • <strong>Lectures:</strong> ${course.lectures}</p>
        <div class="status">${course.status}</div>
        <a href="${course.link}" class="view-course-btn">View Course</a>
      `;

    courseList.appendChild(courseCard);
  });
}
