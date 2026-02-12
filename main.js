document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const searchValue = document.querySelector("input").value.toLowerCase();

    if (searchValue.includes("video")) {
        window.location.href = "page2.html";
    } else if (searchValue.includes("home")) {
        window.location.href = "index.html";
    } else {
        alert("No results found.");
    }
});
