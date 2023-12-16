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

class TransactionHistory {
    constructor() {
      this.transactions = [];
    }
  
    addTransaction(transaction) {
      this.transactions.push(transaction);
    }
  
    showHistory() {
      return this.transactions;
    }
  }
  
  // Assuming you have a single instance of TransactionHistory
  const transactionHistoryInstance = new TransactionHistory();
  
  
  
  
  class User {
    constructor(userId, name, email, mobileNumber) {
      this.userId = userId;
      this.name = name;
      this.email = email;
      this.mobileNumber = mobileNumber;
      this.balances = {};
      this.transactionHistory = []; // Store transaction history for each user
    }
  
    addExpense({ amount, type, users }) {
      const expense = new Expense(amount, type, users);
  
      let User_Shares = expense.calculateExpenses();
  
      User_Shares.map((share) => {
        this.balances[share.userId] =
          (this.balances[share.userId] || 0) + share.amount;
      });
  
      // Add the expense to the transaction history   single user specific. You can see per user transaction list
      this.transactionHistory.push({
        transactionId: 1, // Assume you have a function to generate unique IDs
        expense,
      });
  
      // Add the expense to the common transaction history  - Whole transaction history
      transactionHistoryInstance.addTransaction({
        userId: this.userId,
        transactionId: 1, // or use your unique ID generation logic
        expense,
      });
    }
  
    deleteExpense(transactionid) {
      // Logic to reverse the effects of the expense and reduce the balances accordingly
      // Also, remove the expense from the transaction history
  
      console.log(this.transactionHistory, "this.transactionHistory")
      let userTransaction = this.transactionHistory.find((Id) => {
        return Id.transactionId == transactionid;
      });
  
      if (!userTransaction) {
          console.log('Expense not found in user transaction history.');
          return;
        }
  
   
        const { expense } = userTransaction;
  
        if(expense.type=="EQUAL"){
          this.reverseEqualExpense(expense)
  
        }
        else if(expense.type=="PERCENT"){
          this.reversePercentExpense(expense)
        }
        else if(expense.type=="EXACT"){
          this.reverseExactExpense(expense)
        }
        else{
          throw new Error("Expense type not supported")
        }
  
        //removing that transaction history from the user transaction history
        this.transactionHistory= this.transactionHistory.filter((Id) => {
          return Id.transactionId !== transactionid;
        });
  
      }
  
      reverseEqualExpense(expense){
          let equalShareReverse = (expense.amount/ expense.users.length)
          expense.users.forEach(user => {
              this.balances[user.userId] -= equalShareReverse;
          })
      }
  
      reverseExactExpense(expense){
   
          expense.users.forEach(user => {
              this.balances[user.userId] -= user.amount;
          })
      }
  
      reversePercentExpense(expense) {
         
          expense.users.forEach((user) => {
            const amountToSubtract = (expense.amount * user.percentage) / 100;
            this.balances[user.userId] -= amountToSubtract;
          });
        }
  
  
  
    getBalances() {
      return this.balances;
    }
  
    showTransactionHistory() {
      return this.transactionHistory;
    }
  }
  





  
  class Expense {
    constructor(amount, type, users) {
      this.amount = amount;
      this.type = type;
      this.users = users;
    }
  
    calculateExpenses() {
      if (this.type === "EQUAL") {
        let equalShare = this.amount / this.users.length;
  
        return this.users.map((user) => {
          return {
            userId: user.userId,
            name: user.name,
            amount: equalShare,
          };
        });
      }
      // considering percentage
      else if (this.type === "PERCENT") {
        //checking among user percentage is becoming 100% or not
        const totalPercentage = this.users.reduce(
          (sum, user) => sum + user.percentage,
          0
        );
  
        if (totalPercentage !== 100) {
          throw new Error("percentage must be 100");
        }
  
        let data = this.users.map((user) => {
          return {
            userId: user.userId,
            name: user.name,
            amount: (this.amount * user.percentage) / 100,
          };
        });
  
        return data;
      } else {
        //if EXACT amount chosen
        //don't need to do any modification just return frontend array of object exact
        return this.users;
      }
    }
  }
  
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