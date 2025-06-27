 /*
        Parameters:
        - array:      Array of organization objects to be sorted
        - key:        Property to sort by ("organization_name" or "control_no")
        - ascending:  Boolean; true = ascending, false = descending (default: true)
    */

let sortCount = 0;
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
    
/*------------------------------- MERGE SORT ALGORITHM -------------------------------*/    
    
    //Divide
    function mergesort(array, key, ascending = true) {

        // Base case: arrays with 0 or 1 element are already sorted
            if (array.length <= 1) return array; 

            const mid = Math.floor(array.length / 2); // Find the middle point to divide the array into two halves
            const left = mergesort(array.slice(0, mid), key, ascending); // Recursively sort the left half
            const right = mergesort(array.slice(mid), key, ascending); // Recursively sort the right half

         // Merge the two sorted halves
            return merge(left, right, key, ascending);
     }

    //Conquer and Merge 
    function merge(left, right, key, ascending) {
        const result = [];

        while (left.length && right.length) {
        // Get the values to compare from each array's first element
            let a = left[0][key];
            let b = right[0][key];

            if (key === "control_no") {
            // Use numeric sorting for control numbers (e.g. 2425-001)
                a = parseInt(a.split("-")[1]); //gets only the numeric part
                b = parseInt(b.split("-")[1]);

            
             /*

                Use this if organizations have different year 
                
                const [yearA, suffixA] = a.split("-").map(Number);
                const [yearB, suffixB] = b.split("-").map(Number);

                a = yearA * 10000 + suffixA;
                b = yearB * 10000 + suffixB;
             */

            } else {
             // String sort for organization name (case-insensitive)
                a = a.toLowerCase();
                b = b.toLowerCase();
            }

            // Compare based on sort direction (ascending/descending)
            if (ascending) {
            if (a < b) {
                result.push(left.shift());  // Take from left if a < b (ascending)
            } else {
                result.push(right.shift()); // Otherwise take from right
            }
        } else {
            if (a > b) {
                result.push(left.shift());  // Take from left if a > b (descending)
            } else {
                result.push(right.shift()); // Otherwise take from right
            }
        }
        }

        return [...result, ...left, ...right];
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

            renderTable(sorted);
        });
});
