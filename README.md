
# ERP Project
This is a simple web-based ERP tool that was created as part of The University of Oklahoma's CS-4273 course by **Jack Schwarz, Blake Ashcraft, Michael Jarriel, and Quyen Tran**. This was created over the course of a few months using programming tools new to us and, as a result, is slightly simplistic in its functionality and in its programming implementation .

Our intended use for the ERP software is small businesses that either cannot afford a larger-scale ERP, or just need the basics without many frills or unused features of more grand software. We analyzed other ERP softwares and diluted their functionality down to the essentials we think a business would mainly make use of.

# Implementation
Since we are building an ERP (Enterprise resource planning) system from scratch, we need both a strong front-end and back-end to meet the requirements of the project. Therefore, we decided on a web application built using HTML, CSS, and Javascript, which is then fed data from a NodeJS implemented backend.

### Front-End Implementation
For the front-end implementation, we figured we could either create a web application using HTML, CSS, and Javascript, or we could create a native application using a Java or Python GUI framework. We ultimately decided on a web application as this was a more convenient way for users to access our program. 

We used plain HTML, CSS, Javascript to create our views. In this, we made use of multiple templates and plugins such as Tabulator and Frappe.io in order to get a clean, usable, and customizable UI. We are also doing all of our data analytics functions in our client-side Javascript. We found this to be slightly quicker than doing these computations server side as our computations were simple enough to not take much time for the intended size of our users' data sets.

### Back-End Implementation
In order to get have persistent data that can be manipulated by the user, we needed some backend interface to keep track of our data and manipulate data for users' to see. We originally planned on creating a MySQL database hosted in GCP, but we were unable to get this working correctly and consistently across multiple platforms and devices. As a result, our web application uses a NodeJS built with the help of Express. This allows us to edit our data files and efficiently route data to the client. Using jQuery and AJAX, we can create PULL and GET requests to pull down the desired data and have our client side Javascript compute different statistics about our data for user convenience. 

As our goal was to create a useful ERP website for smaller operations (small local businesses, etc.) we did not put an extreme amount of focus into how scalable our implementation is. However, the current implementation allows for fast data transfers and accomplishes our goals adequately. Given more time and with our current knowledge of setting up this server-client relationship, we would go onto make this more efficient and scalable to larger/more diverse operations.


# Testing
As our program is mainly web based and reliant on user provided data, our tests mainly consists of .csv files with sample data. Most of our further testing is based on us using the program is specified ways to make sure of intended functionality. 

---

### Unit Testing
For our program, our unit tests mainly consists of uploading sample data through a Javascript .csv interpreter that fills the table with sample inventory data. This also autofills the generating graphs and tables with calculations based on the sample data and our own calculated totals.

### System Testing
Our system testing is very focused on a few different systems. We are trying browser compatibility with mainly Chrome, Firefox, Safari. We figured IE and Edge are no longer in use in the intended workspaces this ERP software would be found in. In addition we are running local and cloud-hosted copies of the code to ensure everything is correctly displaying and rendering for the user. This includes Windows, Linux, MacOS, and a Google Cloud Hosted Apache instance. This also tests the usability of our SQL database on multiple platforms and IP addresses.

### Acceptance Testing
The way we are testing to ensure that the software is up to the intended users' (mainly small businesses) standards is through comparison with other well known platforms and inspecting how polished the software is. We are mainly looking at the data given in other ERPs and seeing if we can replicate use cases in our software without breaking or changing existing code. This may be things like making sure certain datatypes can be read by the item logging function, checking to see if our graphs are up to quality with data outliers, etc. This again is something we inspect with sample data and compare to its known and intended functionality. 

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
