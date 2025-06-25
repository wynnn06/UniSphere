<!DOCTYPE html>
<html>
    <head>
        <meta charset = "utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>UNISPHERE</title>
        <meta name="description" content="">
        <meta name="viewport" content="">
        <link rel="stylesheet" href="style.css">
        <link rel="icon" href="images/LOGO.png" type="image/png" />

    </head>
    <body>
        <header>
                <img class="logo" src="images/UNISPHERE.png" alt="logo">

<!--Navigation-->           
                <nav>
                <ul class="nav_links">
                    <li><a href="Home.php">Home</a></li>
                    <li><a href="About.html">About us</a></li>
                    <li><a href="Contact.html">Contact us</a></li>
                </ul>
            </nav>
        </header>

<main>        
        <!--Hero Section-->
        <section class="hero">
            <h1> PUP Student Organizations </h1>
            <p>Browse and discover student organizations that match your interests and passions. Search by name, 
             <br>filter by classification, or sort to explore your options.</p>
        </section>

         <!--Searching, Sorting and Filter Section-->
         <section class="searching-sorting-filter-section">
           
            <!-- Search Bar -->
            <div class="searchbar-sortselection">
                <input type="text" placeholder="Search Organization Name" class="search-input"/>
                
                 <!-- Sorting Dropdown Selection-->
                <select class="sort-dropdown">
                    <option value="reset">Sort by</option>
                    <option value="orgname-asc">Organization Name (A-Z)</option>
                    <option value="orgname-desc">Organization Name (Z-A)</option>
                    <option value="controlno-asc">Control No. (Ascending)</option>
                    <option value="controlno-desc">Control No. (Descending)</option>
                </select>
            </div>

            <!-- Filter (CLASSIFICATION)-->
            <div class="filters">
                <div class="filter-header">
                <h4>Filters</h4>
                    <div class="clear-all">Clear all</div>
                </div>

                <hr>

                <div class="filter-grid">
        
                <!-- Left Column: Classification -->
                    <div class="filter-group">
                        <strong>Classification</strong>
                            <div class="tags">
                                <span class="filter-tag" data-group="classification" data-value="Academic">Academic</span>
                                <span class="filter-tag" data-group="classification" data-value="Advocacy">Advocacy</span>
                                <span class="filter-tag" data-group="classification" data-value="Arts">Arts</span>
                                <span class="filter-tag" data-group="classification" data-value="Cultural">Cultural</span>
                                <span class="filter-tag" data-group="classification" data-value="Fraternities">Fraternities</span>
                                <span class="filter-tag" data-group="classification" data-value="Political">Political</span>
                                <span class="filter-tag" data-group="classification" data-value="Religious">Religious</span>
                                <span class="filter-tag" data-group="classification" data-value="Scholars">Scholars</span>
                                <span class="filter-tag" data-group="classification" data-value="Socio-civic">Socio-civic</span>
                                <span class="filter-tag" data-group="classification" data-value="Special Interest">Special Interest</span>
                                <span class="filter-tag" data-group="classification" data-value="Sports">Sports</span>
                            </div>
                    </div>

                    <!-- Right Column: Department -->
                    <div class="filter-group">
                        <strong>Department</strong>
                            <div class="tags">
                                <span class="filter-tag" data-group="department" data-value="CAF">CAF</span>
                                <span class="filter-tag" data-group="department" data-value="CAL">CAL</span>
                                <span class="filter-tag" data-group="department" data-value="CADBE">CADBE</span>
                                <span class="filter-tag" data-group="department" data-value="CBA">CBA</span>
                                <span class="filter-tag" data-group="department" data-value="COC">COC</span>
                                <span class="filter-tag" data-group="department" data-value="CCIS">CCIS</span>
                                <span class="filter-tag" data-group="department" data-value="COED">COED</span>
                                <span class="filter-tag" data-group="department" data-value="CE">CE</span>
                                <span class="filter-tag" data-group="department" data-value="ITECH">ITECH</span>
                                <span class="filter-tag" data-group="department" data-value="CL">CL</span>
                                <span class="filter-tag" data-group="department" data-value="CPSPA">CPSPA</span>
                                <span class="filter-tag" data-group="department" data-value="CSSD">CSSD</span>
                                <span class="filter-tag" data-group="department" data-value="CS">CS</span>
                                <span class="filter-tag" data-group="department" data-value="CTHTM">CTHTM</span>
                                <span class="filter-tag" data-group="department" data-value="OUS">OUS</span>
                                <span class="filter-tag" data-group="department" data-value="UWIDE">U-Wide</span>

                            </div>
                    </div>
                </div>
                <hr>
            </div>

        </section>
                
     <!-- Table Section -->            
            <section> 
                <div class="table-container">
                    <table class="org-table">
                        <thead>
                            <tr> 
                                <th>Control No.</th>
                                <th>Organization Name</th>
                                <th>Classification</th>
                                <th>Department</th>
                                <th>Type</th>
                            </tr>
                            </thead>
                         <tbody id="org-table-body"> </tbody>
                     </table>
                </div>
            </section>
    
    <footer class="site-footer">
        <p>&copy; 2025 UNISPHERE. All rights reserved.</p>
    </footer>

    </main>

    <script src="load-organizations.js"></script>
    <script src="SequentialSearch-Algorithm.js"></script>
    <script src="MergeSort-Algorithm.js"></script> 
    <script src="Filters-Algorithm.js"></script>
   <!--  <script src="QuickSort-Algorithm.js"></script>-->  

    </body>
</html>
