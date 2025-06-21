DROP TABLE IF EXISTS Organizations;
CREATE TABLE Organizations (
    control_no VARCHAR(50) PRIMARY KEY,        
    organization_name VARCHAR(MAX) NOT NULL,     
    org_classification VARCHAR(50),              
    Department VARCHAR(100),                         
    org_type VARCHAR(50),                        
    org_description TEXT,
	Social_link VARCHAR (100),
	org_email VARCHAR (100)
);