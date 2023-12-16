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
//   const transactionHistoryInstance = new TransactionHistory();

  // Export the TransactionHistory class
module.exports = TransactionHistory;