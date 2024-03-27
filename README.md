# TODO List
[Notes for midterm and final](notes.md)

## Specification Deliverable

### Elevator Pitch
Why is it that collaborative task management always has to be so complicated? Have you ever wanted a simple list of tasks that you can share with anyone you want? The TODO List software will allow you to create and manage the members of a list. Individuals can pick tasks to assign themselves to and mark them done when they have finished. This site makes it easy to organize the completion of a seemingly random set of tasks.

### Design
This is the screen which lists which todo lists you have.

![Alt text](assets/image.png)

This screen is where you can assign yourself to tasks, add more, or check them off.

![Alt text](assets/image-1.png)

### Key Features
- Accounts with secure login and encrypted passwords
- Ability to create todo lists
- Invite other users to your todo lists
- Assign yourself to items in the lists
- Mark items as completed
- Changes to the list are displayed live to other users

### Technologies
The required technologies will be used as such:
- **HTML** - Structure of the web pages. There will be various pages used for login, list overview, todo list, etc.
- **CSS** - Style the UI in a way that is visually appealing and efficient with screen real-estate.
- **JavaScript** - Control login page and live UI changes to TODO lists.
- **Web Services** - Endpoints for
	- Creating lists
	- Registering
	- Retrieving available lists
	- Retrieving list data
- **Persistence/Accounts** - Use a database to store account information and allow logins.
- **WebSocket** - Communicate with the clients when you or other users make changes to or invite others to todo lists.

# CSS Deliverable
- Prerequisite: Simon CSS deployed to your production environment
	- Done
- Prerequisite: A link to your GitHub startup repository prominently displayed on your application's home page
	- Bottom right corner GitHub icon
- Prerequisite: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the voter app as an example.
	- Information here
- Prerequisite: At least 10 git commits spread consistently throughout the assignment period.
	- Done
- Properly styled CSS
	- Header, footer, and main content body
		- Header and footer styled and stored in separate files to avoid repeating
		- Each page uses a flex display for the body which includes these three elements
	- Navigation elements
		- Nav links at top
	- Responsive to window resizing
		- Element sizes mostly based on viewport size
	- Application elements
		- There are styled tables for the list of lists and the TODO lists themselves
	- Application text content
		- Done
	- Application images
		- There is an image in the about page that scales with viewport
		- The GitHub logo and checkbox images are SVGs which are styled to adjust with the current theme pallette

# JavaScript Deliverable
- Represent required technologies
	- *HTML* and *CSS* are used by *JavaScript* to dynamically change the appearance of the page.
	- *JavaScript* is used for all the interaction with the lists: adding lists, adding elements to lists, changing the done status of items, changing the assignee of an item, etc.
	- *Authentication*: The main page allows you to login using a username and password which are then displayed in the header on the top right of the page. Passwords are not yet used due to lack of encryption for storage into a database. The username to assign a creator when creating a list.
	- *Database data*: Right now the site uses a mock database in the form of localStorage. It stores the username, lists, and list items. Lists contain a name, creator, and items. List items contain a task, assignee, and is done status.
	- *WebSocket data*: The lists themselves are going to change as other using make changes to shared lists. A mock representation of this is given where the checkboxes change as if from a WebSocket message.
	- *Colormind*: The site is going to use the external service from colormind to randomly select a color palette to apply to the site. For now you can only manually set the values of the color palette.

# Service Deliverable
- **Create an HTTP service using Node.js and Express**
	- Site is statically hosted and endpoints were made with express
- **Frontend served up using Express static middleware**
	- done
- **Your frontend calls third party service endpoints**
	- If you navigate to the Theme page using the link at the top, you can now press a button to choose theme based on a "random" palette. This palette is retrieved from `colormind.io` using their api endpoint.
	- In the frontend code it references `color.bdm260.click`, but this is a proxy for the actual `colormind.io` endpoint due to it being http instead of https.
- **Your backend provides service endpoints**
	- I created service endpoints for getting lists, getting items of a list, adding lists, adding items to lists, updating the done state of items, and changing the assignee of items.
- **Your frontend calls your service endpoints**
	- The frontend code uses all the endpoints listed above to populate dynamic html elements and enable functionality.

# Login Deliverable
- User registration
	- You can register, login, and logout
	- Data stored in MongoDB
- API requests not related to user require an authentication token from logging in. Attempting to access the list related pages will redirect to home if not logged in.
- User and list data is stored in MongoDB

# WebSocket Deliverable
- You can now share lists with other users using the button in the top right of the list page. This enables WebSocket update messages when multiple users are viewing the same list.
- Backend listens to requests from the client and redirects some to other clients
	- It receives `joinList` messages which will tell the server which connections to direct list-related messages to.
	- It receives other messages related to list changes which it will then redirect to clients within that list group.
- Frontend sends the `joinList` message and listens for list change messages
	- When the WebSocket connection is made, the clint sends a `joinList` message to the server.
	- The client sends messages `setAssignee`, `setIsDone`, and `addItem` for list changes.
	- When the client receives these list change messages, it updates the data in the application interface.