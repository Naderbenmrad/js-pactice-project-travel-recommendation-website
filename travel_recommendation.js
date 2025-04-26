document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const clearButton = document.getElementById('btnClear');
    const searchInput = document.getElementById('searchInput');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    clearButton.addEventListener('click', function() {
        searchInput.value = '';
    });
});

function thankyou() {
    alert("Thank you for your message!");
    document.getElementById("contactForm").reset();
}