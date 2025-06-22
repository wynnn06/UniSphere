<?php
// Define the SQL Server connection parameters
$serverName = "LAPTOP-1CCLLEBE\\SQLEXPRESS"; //localhost  before
$connectionOptions = array(
    "Database" => "Datasets", // Name of the database  // "Database" => "Organizations", 
    "Uid" => "sa",                 // SQL Server username
    "PWD" => "Unisphere123!",      // SQL Server password
    "TrustServerCertificate" => true // Trust certificate for local connection
);

// Attempt to connect to SQL Server
$connection = sqlsrv_connect($serverName, $connectionOptions);

// Check if the connection was successful
if (!$connection) {
    // Output any connection errors and terminate the script
    die(print_r(sqlsrv_errors(), true));
}

// Define the SQL query to retrieve organization details
$sql = "SELECT Control_no, Organization_name, Org_classification, Department, Org_type FROM dbo.Datasets";

// Execute the SQL query
$stmt = sqlsrv_query($connection, $sql);

// Check if the query execution was successful
if ($stmt === false) {
    // Output any query errors and terminate the script
    die(print_r(sqlsrv_errors(), true));
}

// Loop through the query result set and output each row in HTML table format
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($row['Control_no']) . "</td>";
    echo "<td>" . htmlspecialchars($row['Organization_name']) . "</td>";
    echo "<td>" . htmlspecialchars($row['Org_classification']) . "</td>";
    echo "<td>" . htmlspecialchars($row['Department']) . "</td>";
    echo "<td>" . htmlspecialchars($row['Org_type']) . "</td>";
    echo "</tr>";
}

// Free the statement resource
sqlsrv_free_stmt($stmt);

// Close the SQL Server connection
sqlsrv_close($connection);
?>
