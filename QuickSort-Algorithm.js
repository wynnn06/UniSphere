/* Main Sorting Algorithm Used: Quick Sort algorithm for sorting an array of objects by a given key (e.g., org name or control no)
   Parameters:
     - array: the data to sort (array of organization objects)
     - key: the property to sort by ("organization_name" or "control_no")
     - ascending: true for ascending order, false for descending

     Comparison-Based Sorting Algorithm: Merge Sort

*/

//Load DOM 
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".sort-dropdown");  // Get references to the dropdown 
    const tableBody = document.getElementById("org-table-body"); //and the table body where organizations are displayed

     //Function to extract table data into a usable array of objects
        function getTableData() {
            const rows = Array.from(tableBody.querySelectorAll("tr"))
                .filter(row => row.style.display !== "none"); // only use visible rows

            return rows.map(row => {
                const cells = row.querySelectorAll("td");
                return {
                        control_no: cells[0].textContent.trim(),
                        organization_name: cells[1].textContent.trim(),
                        org_classification: cells[2].textContent.trim(),
                        department: cells[3].textContent.trim(),
                        org_type: cells[4].textContent.trim()
                };
            });
        }

    // Function to Re-render the table using the provided array of organization objects
        function renderTable(data) {
        
            // Remove only the currently visible rows
                const allRows = Array.from(tableBody.querySelectorAll("tr"));
                allRows.forEach(row => {
                    
                    if (row.style.display !== "none") {
                    row.remove();
                    }
                });

            // Rebuild rows with new sorted data
                data.forEach(row => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                    <td>${row.control_no}</td>
                    <td>${row.organization_name}</td>
                    <td>${row.org_classification}</td>
                    <td>${row.department}</td>
                    <td>${row.org_type}</td>
                    `;
                    tableBody.appendChild(tr);
                });
        }

/*------------------------------- QUICK SORT ALGORITHM -------------------------------*/    

   function quicksort(array, key, ascending = true) {
   
    // Base case
        if (array.length <= 1) return array;

    // Random pivot selection
        const pivotIndex = Math.floor(Math.random() * array.length);
        const pivot = array[pivotIndex];

    // Extract and normalize comparison values
        const getValue = (item) => {
            if (key === "control_no") {
                return parseInt(item[key].split("-")[1]); // numeric part only
            }
                return item[key].toLowerCase(); // string (case-insensitive)
            };

        const pivotValue = getValue(pivot);

    // Partitioning without explicit left/right arrays
        const less = array.filter((item, index) => {
            if (index === pivotIndex) return false;
                const value = getValue(item);
            return ascending ? value < pivotValue : value > pivotValue;
            });

        const greater = array.filter((item, index) => {
            if (index === pivotIndex) return false;
            const value = getValue(item);
            return ascending ? value >= pivotValue : value <= pivotValue;
        });

        // Recursively sort and combine
        return [...quicksort(less, key, ascending), pivot, ...quicksort(greater, key, ascending)];
}
    

    // Dropdown selection handler
        dropdown.addEventListener("change", function () {
            const selected = dropdown.value;   
            const data = getTableData();        
            let sorted;
            let key = "";
            let ascending = true;                        

            switch (selected) {
                case "orgname-asc":
                    key = "organization_name";
                    ascending = true;
                    break;
                case "orgname-desc":
                    key = "organization_name";
                    ascending = false;
                    break;
                case "controlno-asc":
                    key = "control_no";
                    ascending = true;
                    break;
                case "controlno-desc":
                    key = "control_no";
                    ascending = false;
                    break;
                case "reset":
                    location.reload();
                    return;
            }

            const t0 = performance.now();

        // To test Quick Sort
        sorted = quicksort(data, key, ascending);
        const t1 = performance.now();
        console.log(`Sorted by ${key} (${ascending ? "ASC" : "DESC"}) using QUICK SORT in ${(t1 - t0).toFixed(2)}ms`);

            renderTable(sorted);
        });
});