// Simple user authentication for the practice web app.
// The demo account below is sample data only, not a real credential.
const users = [
  { username: 'student', password: 'devops123' },
];

function authenticate(username, password) {
  return users.some(
    (user) => user.username === username && user.password === password
  );
}

module.exports = { authenticate };
