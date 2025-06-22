//Load DOM 
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-input"); 
    const tableBody = document.getElementById("org-table-body"); 

/*------------------------------- LINEAR SEARCH ALGORITHM -------------------------------*/    
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
        const searchTerm = searchInput.value.toLowerCase(); //convert input toLowerCase
        const rows = tableBody.getElementsByTagName("tr");
        let matchFound = false;

        // Remove any existing "no results" row
            const existingNoResult = document.querySelector("#no-results-row");
                if (existingNoResult) {
                    existingNoResult.remove();
                }
            
        // Iterate over each row to check if it matches the search term        
            for (let i = 0; i < rows.length; i++) {
                const orgNameCell = rows[i].getElementsByTagName("td")[1]; // Second column = organization name

                if (orgNameCell) {
                    const orgName = orgNameCell.textContent.toLowerCase(); // Normalize text
                    const isMatch = manualPartialMatch(orgName, searchTerm);

                    rows[i].style.display = isMatch ? "" : "none"; // Show/hide row based on match

                    if (isMatch) matchFound = true;
                }
            }

        // If no matches found, display a "no results" row
            if (!matchFound) {
                const noRow = document.createElement("tr");
                noRow.id = "no-results-row";
                noRow.innerHTML = `<td colspan="5" style="text-align:center; color: #888; font-style: italic; padding: 100px 0;">
                No organization named "${searchTerm}" found.
                </td>`;
                tableBody.appendChild(noRow);
                console.log(`No organization named "${searchTerm}"`);
            }
    });
});
