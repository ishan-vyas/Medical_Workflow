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

Group 7
Group Members:
    Ishan Vyas, Kevin Sunkwa-Mills, Xingrui Zhu