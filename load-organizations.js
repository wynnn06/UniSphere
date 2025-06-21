// LOAD DOM 
document.addEventListener("DOMContentLoaded", function () {

    // Fetch the content from OrgList.php using an HTTP GET request
    fetch("OrgList.php") 
        .then(response => response.text()) // Convert the response to plain text (HTML table rows)
        .then(data => {
            // Insert the fetched HTML rows into the table body with ID 'org-table-body'
            document.getElementById("org-table-body").innerHTML = data;
        })
        .catch(error => 
            // Log any errors that occur during the fetch process
            console.error('Error loading organizations:', error)
        );
});
