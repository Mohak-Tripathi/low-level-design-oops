const Expense = require('../expense/Expense');
const transactionHistoryInstance = require("../transaction/Transaction")

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









  // Export the User class
module.exports = User;