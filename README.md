# Implementation
Since we are building an ERP system from scratch, we need both a strong front-end and back-end to meet the requirements of the project. Therefore, we deciced on a web application built using HTML, CSS, and Javascript, which is then fed data from a SQL databse.

---

### Front-End Implementation

### Back-End Implementation

# Testing
As our program is mainly web based and reliant on user provided data, our tests mainly consists of csv files with sample data. Most of our further testing is based on us using the program is specified ways to make sure of intended functionality. 

---

### Unit Testing
For our program, our unit tests mainly consists of uploading sample data through a Javascript csv interpreter that fills the table with sample inventory data. This also autofills the generarting graphs and tables with calculations based on the sample data and our own calculated totals.

### System Testing
Our system testing is very focused on a few different systems. We are trying browser compatibility with mainly Chrome, Firefox, Safari. We figured IE and Edge are no longer in use in the intended workspaces this ERP software would be found in. In addition we are running local and cloud-hosted copies of the code to ensure everything is correctly displaying and rendering for the user. This includes Windows, Linux, MacOS, and a Google Cloud Hosted Apache instance. This also tests the usability of our SQl database on multiple platforms and IP addresses.

### Acceptance Testing
The way we are testing to ensure that the software is up to the intended users' (mainly small businesses) standards is through comparison with other well known platforms and inspecting how loished the software is. We are mainly looking at the data given in other ERPs and seeing if we can replicate use cases in our software without breaking or changing existing code. This may be things like making sure certain datatypes can be read by the item logging function, checking to see if our graphs are up to quality with data outliers, etc. This again is something we inspect with sample data and compare to its known and intended functionality. 

# Deployment
Setting up the application for a GCP Ubuntu 19.10 VM instance.
## Install Requirements
Begin by running:
```
sudo apt-get update
```
Next, install Apache:
```
sudo apt-get install apache2
```
Install PHP for database access:
```
sudo apt-get install php
```
## Download and Setup
Navigate to the Apache server directory:
```
cd /var/www/
```
Download the repository and extract its contents to this directory.
With git:
```
sudo git clone https://github.com/Jackschwarz58/SoftwareEngineeringERP.git
```
and then
```
sudo cp -r SoftwareEngineeringERP/* html/
```
## Access
The application is now hosted on the instance, and can be accessed by inserting the public IP into a web browser.
