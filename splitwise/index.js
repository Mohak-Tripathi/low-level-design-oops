// Example data structure for sending expense information from frontend to backend

// (SAMPLE DATA FORMAT)
// const expenseData = {
//     amount: 1000, // Total expense amount
//     type: 'EQUAL', // Expense type (EQUAL, EXACT, PERCENT)
//     users: [
//       { userId: 'u1', name: 'User 1', email: "mohaktripathi029@gmail.com", mobileNumber: "9838532756", percentage: 25 }, // For PERCENT type
//       { userId: 'u2', name: 'User 2', email: "vertika029@gmail.com", mobileNumber: "9838532899", amount: 300 }, // For EXACT type

//     ],
//   };

const User = require("./src/users/Users"); // Import the User class
const TransactionHistory = require("./src/transaction/Transaction"); // Import the TransactionHistory class

const transactionHistoryInstance = new TransactionHistory()

// Create some user instances
const user1 = new User(
  "u1",
  "User 1",
  "mohaktripathi029@gmail.com",
  "9838532756"
);
const user2 = new User("u2", "User 2", "vertika029@gmail.com", "9838532899");
const user3 = new User("u3", "User 3", "pranav029@gmail.com", "9838532899");

// Example expense data
const expenseData = {
  amount: 1000, // Total expense amount
  type: "PERCENT", // Expense type (EQUAL, EXACT, PERCENT)
  users: [
    { userId: user1.userId, name: user1.name, percentage: 25 },
    { userId: user2.userId, name: user2.name, percentage: 75 },
  ],
};

const expenseData1 = {
  amount: 1000, // Total expense amount
  type: "EXACT", // Expense type (EQUAL, EXACT, PERCENT)
  users: [
    { userId: user2.userId, name: user2.name, amount: 900 },
    { userId: user3.userId, name: user3.name, amount: 100 },
  ],
};

const expenseData2 = {
  amount: 1000, // Total expense amount
  type: "EQUAL", // Expense type (EQUAL, EXACT, PERCENT)
  users: [
    { userId: user1.userId, name: user1.name, amount: 500 },
    { userId: user2.userId, name: user2.name, amount: 500 },
  ],
};

const expenseData3 = {
  amount: 1000, // Total expense amount
  type: "EXACT", // Expense type (EQUAL, EXACT, PERCENT)
  users: [
    { userId: user1.userId, name: user1.name, amount: 300 },
    { userId: user2.userId, name: user2.name, amount: 300 },
    { userId: user3.userId, name: user3.name, amount: 400 },
  ],
};

// Add the expense to the users
user1.addExpense(expenseData);
user2.addExpense(expenseData1);
user3.addExpense(expenseData2);
user3.addExpense(expenseData3);

// Retrieve balances
const balancesUser1 = user1.getBalances();
const balancesUser2 = user2.getBalances();
const balancesUser3 = user3.getBalances();

console.log("Balances for User 1:", balancesUser1);
console.log("Balances for User 2:", balancesUser2);
console.log("Balances for User 3:", balancesUser3);

const showTransactionHistoryUser1 = user1.showTransactionHistory();
const showTransactionHistoryUser2 = user2.showTransactionHistory();
const showTransactionHistoryUser3 = user3.showTransactionHistory();

console.log("Transaction History for User 1:", showTransactionHistoryUser1);
console.log("Transaction History for User 2:", showTransactionHistoryUser2);
console.log("Transaction History for User 3:", showTransactionHistoryUser3);

// Retrieve all transactions history
const allTransactions = transactionHistoryInstance.showHistory();
console.log("All Transactions:", allTransactions);

// user1.deleteExpense(1)

// const balancesUser11 = user1.getBalances();
// console.log("Balances for User 11:", balancesUser11);

// const showTransactionHistoryUser11 = user1.showTransactionHistory();
// // const showTransactionHistoryUser2 = user2.showTransactionHistory();
// // const showTransactionHistoryUser3 = user3.showTransactionHistory();

// console.log("Transaction History for User 11:", showTransactionHistoryUser11);

// // Retrieve all transactions history
// const allTransactions1 = transactionHistoryInstance.showHistory();
// console.log("All Transactions1:", allTransactions1);
