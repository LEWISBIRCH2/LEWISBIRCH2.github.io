**Welcome to my Exhibition Curator project**    
This repository holds my submission for the Launchpad / Tech Returners 'Exhibition Curator' project.  
This project tasks developers with creating a traversable web app / platform which can be used to view and collate artworks from different museums or universities.   

Currently, this application allows users to view art from the following sources:
<br>The Art Institute of Chicago [https://www.artic.edu/]
<br>The Metropolitan Musuem of Art [https://www.metmuseum.org/]  

---  

**Accessing the Platform**   
To access the plaform, users are welcome to create their own accounts.   
If you would like to browse using a pre-existing account, you are welcome to use the following login details:  
  
Email: TEST@TEST.com  
Password: TEST123

Please note: By using JWT/Bcrypt, password information is securely stored in an encrypted format. 

---  

**Project Specifications**  
This project was developed using a MERN stack, which consists of MongoDB, Express, React, and Node.js.  
The key features of this application include (but aren't limited to):
- The ability for users to create and login to their own accounts, with encryption security measures built in
- Swift API calls being returned in a custom, user-legible format, whilst making use of paginatation to minimise server stress 
- Thematic styling and WCAG friendly layouts, resulting in a consistently high Lighthouse Accessibility score
- Coherent naming conventions which help users using assistive technology to navigate all pages 

---  
    
**Login Page**  
![Screenshot from 2025-05-05 13-15-36](https://github.com/user-attachments/assets/2893770a-8923-4906-ba83-d06208dd6e8b)

  
**About Page**  
![Screenshot from 2025-05-05 13-15-15](https://github.com/user-attachments/assets/8d4ec2b9-2baf-4a81-a685-a427b02e1bf5)

  
**All Artwork Page**  
![Screenshot from 2025-05-05 13-15-24](https://github.com/user-attachments/assets/c1e71aa6-3a07-4c42-baa3-13d2e1716728)

  
**Single Artwork Page**  
![Screenshot from 2025-05-05 13-14-54](https://github.com/user-attachments/assets/24c05d05-6966-4861-93f5-a8adc17e1cc4)

---

**Local Configuration Steps**  
To run this project locally, follow the steps below:     
1.  Clone this repo by running "git clone https://github.com/LEWISBIRCH2/Launchpad.git"
2.  Run "cd Launchpad" - to move to the correct folder
3.  Run "npm i" - to install the required dependencies
4.  Create a DOTENV file (config.env) in the 'server' folder
5.  Establish a MongoDB Database named "Museums", and a collection named "Users"
6.  Populate 'config.env' with the provided ATLAS_URI and SECRETKEY from your selected cluster [May look similar to: ATLAS_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/your-db]
7.  Change any appropraiate URL (Onrender / Github.io) to Localhost on selected port
8.  Open a terminal and run "cd server" && "node server.js" - to run the server 
9.  Open a new terminal and run "cd src" && "npm start" - to run the frontend
10.  Your browser should now be running the application 
  
---   
  
**Known Bugs / Future Changes**  
- 'AllArtwork' is lacking a back button; Users may scroll a number of pages, select an artwork to inspect, and have no way to quickly return to the page they were browsing from    
- 'CreateUser' does not correctly stop duplicate emails from creating accounts; Logic regarding the CreateUser function fails, and currently allows a user to override their login details when attempting to create another user using the same email address    
- 'ArtCard' inconsistency; The structure of ArtCard is fine, but is repeated for each institution. This can be refactored into a single component
- Additional institutions are to be added in the future to allow for a more full viewing experience
- Addiitonal filter/sort options to help users better locate what they are looking for
