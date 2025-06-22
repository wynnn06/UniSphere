console.log("Search script loaded"); // Logs a message to confirm the script has loaded

//Load DOM 
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-input"); // Get the search input element
    const tableBody = document.getElementById("org-table-body"); // Get the table body containing rows

    // Custom function to check if searchTerm is partially present in text
    function manualPartialMatch(text, searchTerm) {
        if (searchTerm.length === 0) return true; // Show all if search is empty
        if (searchTerm.length > text.length) return false; // Skip if search is longer than text

        // Slide through text to check for a matching substring
        for (let i = 0; i <= text.length - searchTerm.length; i++) {
            let match = true;
            for (let j = 0; j < searchTerm.length; j++) {
                if (text[i + j] !== searchTerm[j]) {
                    match = false;
                    break;
                }
            }
            if (match) return true; // Match found
        }
        return false; // No match found
    }

    // Listen for input in the search box
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase(); // Convert search term to lowercase
        const rows = tableBody.getElementsByTagName("tr"); // Get all table rows

        // Loop through each row to check for a match
        for (let i = 0; i < rows.length; i++) {
            const orgNameCell = rows[i].getElementsByTagName("td")[1]; // Get the 2nd column (organization name)

            if (orgNameCell) {
                const orgName = orgNameCell.textContent.toLowerCase(); // Convert org name to lowercase
                const isMatch = manualPartialMatch(orgName, searchTerm); // Check for partial match

                rows[i].style.display = isMatch ? "" : "none"; // Show or hide the row based on match
            }
        }
    });
});
