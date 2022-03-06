// Create a configuration object for our Azure SQL connection parameters
// const dbConfig = {
//     server: "dulichhuflit.database.windows.net", // Use your SQL server name
//     database: "TOURDULICH", // Database to connect to
//     user: "ndk2810", // Use your username
//     password: "Kh@ng123", // Use your password
//     port: 1433,
//     // Since we're on Windows Azure, we need to set the following options
//     options: {
//         encrypt: true
//     }
// };

const dbConfig = {
  database: "TOURDULICH",
  server: ".\\SQLEXPRESS",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
};

module.exports = dbConfig