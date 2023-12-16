 
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


  // Export the Expense class
module.exports = Expense;