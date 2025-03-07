document.addEventListener("DOMContentLoaded", async function () {
    const catBtns = document.querySelectorAll('.services-box .icon a');
const portfolioContainer = document.querySelector(".portfolio-container .portfolio-box");
const imageCarousel = document.querySelector(".portfolio-carousel .img-slide");
let category; // Default category

function getCategory(cat) {
    category = cat; 
    sections.forEach(section => section.classList.remove('active'));
    portfolioSection.classList.add('active');

    // Activate portfolio link
    navLinks.forEach(link => link.classList.remove('act'));
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#portfolio') {
            link.classList.add('act');
        }
    });

    console.log("Selected Category:", category); 
}

catBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        getCategory(this.getAttribute('data-category')); 
    });
});


    let url = category 
        ? `http://localhost:5000/projects/category/${category}` 
        : "http://localhost:5000/projects/";

    console.log("Fetching from URL:", url);

    try {
        const response = await fetch(url);
        const projects = await response.json();

        if (!Array.isArray(projects)) throw new Error("Invalid data format");

        portfolioContainer.innerHTML = "";
        imageCarousel.innerHTML = "";

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
            portfolioContainer.appendChild(projectElement);

            // Add project image to carousel
            if (project.img) {
                const imgItem = document.createElement("div");
                imgItem.classList.add("img-item");
                imgItem.innerHTML = `<img src="${project.img}" alt="${project.title}">`;
                imageCarousel.appendChild(imgItem);
            }
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        portfolioContainer.innerHTML = "<p>Failed to load projects. Please try again later.</p>";
    }
});
