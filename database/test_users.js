// CS-546 FP
// M. Scully
// Testing the Users DB

const connection = require("./mongoConnection");
const users = require("./db_users");
const bcrypt = require('bcrypt');

async function main() {
	/*
	1. Create a simple User
	*/

	await users.removeAllUsers()
	let user = await users.getUserByName("User1");
	if (!user) {
		let usersName = "User1";
		let passWord = "Password";
		let hashedPW = bcrypt.hashSync(passWord, 10);
		let createdUser1 = await users.createUser(usersName, hashedPW, "email@email.com");
	}
	/*
	2. Create a total User
		createTotalUser: (usersSession, usersName, hashedPW, usersEmail, 
						  usersActivities, usersInvited, usersTags)
	/ 
	let act1 = { "activity": "ba5ec7db", "tags": ["gaming", "family"] };
	let act2 = { "activity": "72e5ffa8", "tags": ["friends"] };
	let act3 = { "activity": "660c0ce9", "tags": ["work"]};
	let tags = [ "gaming", "family", "work", "friends"];
	let createdUser2 = await users.createTotalUser("7b7997a2", "Tiger Woods", "$2a$08$Xd", "Tiger@email.com", [act1,act2], [act3], tags);
	  console.log(createdUser2);
	/   
	3. After the users are inserted, query all users and log them
	/
	let getUsers = await users.getAllUsers();
		console.log(getUsers);
	/
	4. After all the users are logged, remove some
	/
	let user1 = await users.getUserByName("Mike Scully");
	let removeUser = await users.removeUser(user1._id);
	/
	let user2 = await users.getUserByName("Tiger Woods");
	let removeUser = await users.removeUser(user2._id);
	/*
	5. Query all the remaining users and log them
	*/
	let allUsers = await users.getAllUsers();
	console.log(allUsers);
	/*
	6. Update a user's activities
	/
	let user3 = await users.getUserByName("Tiger Woods");
	let act4 = {"activity": "12345678", "tags": ["other"]};
	let updatedUser = await users.addUserActivities(user3._id, act4);
		console.log(updatedUser);
	*/
} //end main()

main();
