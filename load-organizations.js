// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Fetch org data from PHP
    fetch("OrgList.php") 
        .then(response => response.text()) // Convert to text
        .then(data => {
            const tableBody = document.getElementById("org-table-body");

            // If data exists, show it
            if (data.trim()) {
                tableBody.innerHTML = data;
            } else {
                // If empty, show message
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align:center; color: #888;">No organizations found.</td>
                    </tr>`;
            }
        })
        .catch(error => {
            // On error, show error message
            console.error('Error loading organizations:', error);
            document.getElementById("org-table-body").innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center; color: red;">Error loading organizations.</td>
                </tr>`;
        });
});
