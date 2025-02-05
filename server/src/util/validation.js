module.exports = {

    validProps(valid) {
      return (propsToCheck) => {
        for (const p in propsToCheck) {
          if (!valid.includes(p)) {
            throw new Error("Invalid field: " + p);
          }
        }
        return propsToCheck;
      };
    },
  
    requiredProps(required) {
      return (propsToCheck) => {
        for (const p of required) {
          if (!propsToCheck[p]) {
            throw new Error("Missing required field: " + p);
          }
        }
        return propsToCheck;
      };
    },
};
  