document.addEventListener("DOMContentLoaded", function() {
    // Handle navigation click events
    const navItems = document.querySelectorAll("nav li");
    navItems.forEach(item => {
        item.addEventListener("click", function() {
            navItems.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
