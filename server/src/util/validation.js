module.exports = {

    validProps(valid) {
      return (propsToCheck) => {
        for (const databaseField in propsToCheck) {
          if (!valid.includes(databaseField)) {
            throw new Error("Invalid field: " + databaseField);
          }
        }
        return propsToCheck;
      };
    },
  
    requiredProps(required) {
      return (propsToCheck) => {
        for (const databaseField of required) {
          if (!propsToCheck[databaseField]) {
            throw new Error("Missing required field: " + databaseField);
          }
        }
        return propsToCheck;
      };
    },
};
  