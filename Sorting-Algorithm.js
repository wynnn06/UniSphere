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
        
        // Base case: already sorted
            if (array.length <= 1) 
                return array; 

        //Select Pivot = last element
            const pivot = array[array.length - 1];  
        
        //holds item: left (less than pivot) and right (greater than pivot)
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
            const selected = dropdown.value;   
            const data = getTableData();        
            let sorted;                        

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
                    location.reload();
                    return;
            }

            renderTable(sorted);
        });
});
