# Medical_Workflow
Welcome to Medical_Workflow

The system is an implementation of Problem 2 of the Programming Assignment.

Functionalities:
    1) Add a patient to the database
    2) View patients in the database
    3) View patient information of each patient in the database describing the patients diseases, health issues, their lab test results, their mr/ct scan image, and if they have been prescribed medications.
    4) Update patient information
    5) Generate clusters of patients using the kmeans clustering algorithm to find patients with similar diagnosis.
        a) Each centroid in the cluster has a treatment plan.
        b) The centroids get updated when a new patient is added or an existing patients information has updated
            - As the system learns more about the patients diagnosis, the centroids get more accurate, therefore, generating an optimized and updated treatment plan, for each patient.
            - To update the centroids just press the "Genereate Clusters" button in the 'Doctors Page'
    6) Notifications are sent out in the patient info page, to remind the staff if the patient's followup visit is nearby. If its already passed, it tells the user to pay attention. 
    
Setup Instructions:
The Node Package Manager (npm) is required to run this program. Thus please install this and Node.js before attempting setup.

Install npm and node:
    - Go to https://nodejs.org/en/download/ and download and install node.js on your respective platform
        - The package should install node.js and npm
    - Confirm your node and npm version in the terminal/cmd/powershell with ``node --version`` and ``npm --version``
    
Install MySQL:
    - Go to the MySQL Webpage at https://dev.mysql.com/ and downloa mySQL installer for your respective platform
    - Follow the prompts on the installer, note down the port it runs on and your password, and make sure the server is running at the end of the installation
    - If you already have mySQL, simply make sure the server is running and note the password for the root user

Install MySQLWorkbench:
    - In this project, MySQLWorkbench was used for database management, and these instruction will assume you are using this. You are welcome to use another software for this if you feel.
    - Go to https://www.mysql.com/products/workbench/ and download and install the software on your device for your respective OS

Clone the reposity:
    - Navigate to the location where you want to store the files
    - Run ``git clone https://github.com/ishan-vyas/Medical_Workflow.git`` if you have git installed
    - Otherwise, simply download the zip containing all the files in the repo and extract it

Install the Database:
    - In MySQL Workbench, add a new My SQL Connection with the '+' button on the main page
    - Make the connection name Local Instance (or some other name), set the username to root, and set the password to be the same as that in the mySQL set up
    - Open the new connection by double clicking it and entering the password
    - Click the schemas tab and create a new schema using the right click and 'Create Schema'
    - Name this ``medical_workflow``
    - Apply this schema
    - Go to administration tab again and click data import/restore
    - Import the file ``db.sql`` into the schema as a self contained file
    
Install the project dependencies:
    - Navigate to the location of the project with two terminals/command prompts, one in the client folder and one in the server folder
    - In both terminals/cmd/powershell, run the command ``npm install``
    - In MySQL Workbench, open a query tab and run ``ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`` where password is your passowrd
    - Then also in MySQL Workbench, run ``flush privileges;``
    
Run the application:
    - In the client side terminal, run the comman ``npm start`` and in the server side terminal, run ``npm run devStart``
    - The application should open in in a browser window
    

*** If there are any issues, please contact us for more information on installation. This project uses quite a lot of dependencies so may be a little finicky to run.
    
    
Group 7
Group Members:
    Ishan Vyas, Kevin Sunkwa-Mills, Xingrui Zhu
