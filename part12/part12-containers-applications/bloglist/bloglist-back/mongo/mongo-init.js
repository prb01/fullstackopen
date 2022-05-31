db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'blogApp',
    },
  ],
});

db.createCollection('blogs');
db.createCollection('comments');
db.createCollection('users');

db.users.insert({
  name: "Erik",
  username: "erikSand",
  passwordhash:
    "$2b$10$1U5YKvAxaldJj68wRx9F9eFsNZUXNC9wncmyIp.CHTwzX3Y2WLoqe",
})