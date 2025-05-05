**Accessing the Platform** 
To access the plaform, users are welcome to create their own accounts. 
<br>If you would like to browse using a pre-existing account, you are welcome to use the following login details:
Email: TEST@TEST.com
Password: TEST123
** Please note: By using JWT/Bcrypt, password information is encrypted before being inputted into the database. I will have no access to any passwords.

--- 

This repository holds my submission for the Launchpad / Tech Returners 'Exhibition Curator' project.
This project tasks developers with creating a traversable web app / platform which can be used to view and collate artworks from different museums or universities. 

Currently, this application allows users to view art from the following sources:
The Art Institute of Chicago [https://www.artic.edu/]
The Metropolitan Musuem of Art [https://www.metmuseum.org/]

---

**Known Bugs / Future Changes**
- AllArtwork is lacking a back button; Users may scroll a number of pages, select an artwork to inspect, and have no way to quickly return to the page they were browsing from
- CreateUser does not correctly stop duplicate emails from creating accoudns; Logic regarding the CreateUser function fails, and currently allows a user to override their login details when attempting to create another user using the same email address
- ArtCard inconsitency; The structure of ArtCard is fine, but is repeated for each institution. This can be refactored into a single component.  
