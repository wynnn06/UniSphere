/*  Algorithm used: Quick Sort 
    Pivot selected: Last element
    Sort by key (Organization Name): Ascending and Descending
*/

document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".sort-dropdown");  // Get references to the dropdown and the table body where organizations are displayed
    const tableBody = document.getElementById("org-table-body");

     // To extract table data into a usable array of objects
    function getTableData() {
        const rows = Array.from(tableBody.querySelectorAll("tr")); // Get all table rows
        return rows.map(row => {
            const cells = row.querySelectorAll("td"); // Get all cells in the current row
            return {
                control_no: cells[0].textContent.trim(),
                organization_name: cells[1].textContent.trim(),
                org_classification: cells[2].textContent.trim(),
                department: cells[3].textContent.trim(),
                org_type: cells[4].textContent.trim()
            };
        });
    }

    // Function to update the table in the DOM with sorted data
    function renderTable(data) {
        tableBody.innerHTML = ""; // Clear the current table
        data.forEach(row => {
            // Rebuild each row with sorted data
            tableBody.innerHTML += `
                <tr>
                    <td>${row.control_no}</td>
                    <td>${row.organization_name}</td>
                    <td>${row.org_classification}</td>
                    <td>${row.department}</td>
                    <td>${row.org_type}</td>
                </tr>
            `;
        });
    }

    //Function Declartion of Quick Sort Algorithm
    function quicksort(array, key, ascending = true) {
        if (array.length <= 1) // Base case: already sorted
            return array; 

        const pivot = array[array.length - 1];  //Pivot is last element
        const left = [];
        const right = [];

        //Compare each item with the pivot 
        for (let i = 0; i < array.length - 1; i++) {
            let a = array[i][key];
            let b = pivot[key];

            if (key === "control_no") {
                // Use numeric sorting for control numbers (e.g. 2425-001)
                a = parseInt(a.split("-")[1]); //gets only the numeric part
                b = parseInt(b.split("-")[1]);
            } else {
                // String sort for organization name (case-insensitive)
                a = a.toLowerCase();
                b = b.toLowerCase();
            }
            
             // Compare values depending on ascending or descending sort
            if ((ascending && a < b) || (!ascending && a > b)) {
                left.push(array[i]);
            } else {
                right.push(array[i]);
            }
        }
        // Recursively sort the left and right parts and combine    
        return [...quicksort(left, key, ascending), pivot, ...quicksort(right, key, ascending)];
    }

    // Dropdown selection handler
    dropdown.addEventListener("change", function () {
        const selected = dropdown.value;   // Get selected sorting option
        const data = getTableData();        // Extract current table data
        let sorted;                        // Will store sorted result

        switch (selected) {
            case "orgname-asc":
                sorted = quicksort(data, "organization_name", true);
                break;
            case "orgname-desc":
                sorted = quicksort(data, "organization_name", false);
                break;
            case "controlno-asc":
                sorted = quicksort(data, "control_no", true);
                break;
            case "controlno-desc":
                sorted = quicksort(data, "control_no", false);
                break;
            case "reset":
                location.reload(); // Reload to original order
                return;
        }

        renderTable(sorted);
    });
});
