// script2.js (Project Fetching and Display - portfolio.js)
document.addEventListener("DOMContentLoaded", async function () {
    const portfolioContainer = document.querySelector(".portfolio-container");
    let category = localStorage.getItem("selectedCategory") || null; // Initial category from local storage

    // Event listener for category selection
    window.addEventListener('categorySelected', (event) => {
        category = event.detail.category;
        fetchAndDisplayProjects(category);
    });

    // Event listener to reload all projects if portfolio section is clicked from nav bar.
    window.addEventListener('portfolioSectionClicked', () => {
        category = null;
        fetchAndDisplayProjects(category);
    });

    // Function to fetch and display projects
    async function fetchAndDisplayProjects(category) {
        let url = category
            ? `http://localhost:5000/projects/category/${category}`
            : "http://localhost:5000/projects/";

        console.log("Fetching from URL:", url);

        try {
            const response = await fetch(url);
            const projects = await response.json();

            if (!Array.isArray(projects) || projects.length === 0) {
                throw new Error("No projects found");
            }

            portfolioContainer.innerHTML = `
                <div class="portfolio-box"></div>
                <div class="portfolio-box">
                    <div class="portfolio-carousel">
                        <div class="img-slide"></div>
                    </div>
                    <div class="navigation">
                        <button class="arrow-left disabled"><i class="fa-solid fa-chevron-left"></i></button>
                        <button class="arrow-right"><i class="fa-solid fa-chevron-right"></i></button>
                    </div>
                </div>
            `;

            const portfolioDetailsContainer = portfolioContainer.querySelector(".portfolio-box:first-child");
            const imageCarousel = portfolioContainer.querySelector(".img-slide");
            const arrowLeft = portfolioContainer.querySelector(".arrow-left");
            const arrowRight = portfolioContainer.querySelector(".arrow-right");

            projects.forEach((project, index) => {
                const projectElement = document.createElement("div");
                projectElement.classList.add("portfolio-detail");
                if (index === 0) projectElement.classList.add("active");

                projectElement.innerHTML = `
                    <p class="numb">${String(index + 1).padStart(2, "0")}</p>
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                    <p>${project.category}</p>
                    <div class="tech">
                        <p>${project.skills.join(", ")}</p>
                    </div>
                    <div class="live-github">
                        <a href="${project.liveProject}" target="_blank">
                            <i class="fa-solid fa-arrow-left"></i><span>Live Project</span>
                        </a>
                        <a href="${project.github}" target="_blank">
                            <i class="fa-brands fa-github"></i><span>Github Repository</span>
                        </a>
                    </div>
                `;
                portfolioDetailsContainer.appendChild(projectElement);

                if (project.img) {
                    const imgItem = document.createElement("div");
                    imgItem.classList.add("img-item");
                    imgItem.innerHTML = `<img src="${project.img}" alt="${project.title}">`;
                    imageCarousel.appendChild(imgItem);
                }
            });

            let currentIndex = 0;
            const projectDetails = document.querySelectorAll(".portfolio-detail");
            const imgItems = document.querySelectorAll(".img-item");

            function updateNavigation() {
                arrowLeft.classList.toggle("disabled", currentIndex === 0);
                arrowRight.classList.toggle("disabled", currentIndex === projectDetails.length - 1);

                projectDetails.forEach((detail, idx) => {
                    detail.classList.toggle("active", idx === currentIndex);
                });

                imgItems.forEach((img, idx) => {
                    img.classList.toggle("active", idx === currentIndex);
                });

                imageCarousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            }

            updateNavigation();

            arrowLeft.addEventListener("click", () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateNavigation();
                }
            });

            arrowRight.addEventListener("click", () => {
                if (currentIndex < projectDetails.length - 1) {
                    currentIndex++;
                    updateNavigation();
                }
            });

        } catch (error) {
            console.error("Error fetching projects:", error);
            portfolioContainer.innerHTML = "<p>Failed to load projects. Please try again later.</p>";
        }
    }

    // Initial fetch when page loads.
    fetchAndDisplayProjects(category);
});