    //Load DOM
    document.addEventListener("DOMContentLoaded", function () {
        const filterTags = document.querySelectorAll(".filter-tag");
        const clearAllButton = document.querySelector(".clear-all");
        const searchInput = document.querySelector(".search-input");
        const sortDropdown = document.querySelector(".sort-dropdown");
        const tableBody = document.getElementById("org-table-body");
        
        // Object to track selected filters for classification and department
        const activeFilters = {
            classification: [],
            department: []
        };
        
        // Keep reference to original table data
        let originalTableData = [];

        // Apply current filters
        function applyFilters() {
            const rows = tableBody.getElementsByTagName("tr");
            const searchQuery = searchInput.value.trim().toLowerCase();

            for (let i = 0; i < rows.length; i++) {
             const cells = rows[i].getElementsByTagName("td");

            // Get classification and department values from the current row
                const classification = rows[i].getElementsByTagName("td")[2]?.textContent;
                const department = rows[i].getElementsByTagName("td")[3]?.textContent;

            // Check if current row matches the selected classification filters
                const matchesClassification =
                    activeFilters.classification.length === 0 ||
                    activeFilters.classification.includes(classification);

            // Check if current row matches the selected department filters
                const matchesDepartment =
                    activeFilters.department.length === 0 ||
                    activeFilters.department.includes(department);

            // Combine search and filter   
                const matchesSearch = !searchQuery || Array.from(cells).some(cell =>
                    cell.textContent.toLowerCase().includes(searchQuery)
                );
                
            // Show or hide the row based on filter match
                rows[i].style.display = 
                    (matchesClassification && matchesDepartment && matchesSearch) ? "" : "none";    
            }
        }

        // Reset to original table data
        function renderTable(data) {
            tableBody.innerHTML = ""; // Clear table

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

    // Delay the storing of original table data to ensure it's fully loaded
        setTimeout(() => {
            const rows = tableBody.querySelectorAll("tr");
            originalTableData = Array.from(rows).map(row => {
                const cells = row.querySelectorAll("td");
                return {
                    control_no: cells[0].textContent.trim(),
                    organization_name: cells[1].textContent.trim(),
                    org_classification: cells[2].textContent.trim(),
                    department: cells[3].textContent.trim(),
                    org_type: cells[4].textContent.trim()
                };
            });
        }, 300); 

        // Clear All functionality
            clearAllButton.addEventListener("click", function () {
                // Reset filters
                activeFilters.classification = [];
                activeFilters.department = [];
                filterTags.forEach(tag => tag.classList.remove("selected"));

                // Reset search
                if (searchInput) searchInput.value = "";

                // Reset dropdown
                if (sortDropdown) sortDropdown.selectedIndex = 0;

                // Reset table to original state
                renderTable(originalTableData);
            });

            if (searchInput) {
                searchInput.addEventListener("input", applyFilters);
            }

        // Filter tag click event
        filterTags.forEach(tag => {
            tag.addEventListener("click", function () {
                const group = tag.getAttribute("data-group");
                const value = tag.getAttribute("data-value");

                const index = activeFilters[group].indexOf(value);
                if (index > -1) {
                    activeFilters[group].splice(index, 1);
                    tag.classList.remove("selected");
                } else {
                    activeFilters[group].push(value);
                    tag.classList.add("selected");
                }

                applyFilters();
            });
        });
    });
