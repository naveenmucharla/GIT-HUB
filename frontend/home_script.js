// Wait until the DOM is fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Function to show the current slide and hide the others
    function showSlide(index) {
        // Loop back to the first slide if we're at the end
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        // Hide all slides
        slides.forEach((slide, i) => {
            slide.style.display = 'none';
        });

        // Show the current slide
        slides[currentSlide].style.display = 'block';
    }

    // Show the first slide initially
    showSlide(currentSlide);

    // Set interval to automatically change slides every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000); // 5000ms = 5 seconds

    // Optional: Manual next and previous controls (if you want to add buttons)
    // Add the following HTML code for next and previous buttons:
    // <button class="prev" onclick="showSlide(currentSlide - 1)">&#10094;</button>
    // <button class="next" onclick="showSlide(currentSlide + 1)">&#10095;</button>

    // Add event listeners for next and previous buttons (if using them)
    // const prevButton = document.querySelector('.prev');
    // const nextButton = document.querySelector('.next');
    // prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
    // nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
});
