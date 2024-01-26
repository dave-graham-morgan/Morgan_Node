const { BadRequestError } = require("../expressError");

//This function will generate sql to update fields that passed to it as arguments. 
//dataToUpdate will contain javascript field names and the new values.  jsToSql will contain
//an object with javascript names and the corresponding sql-friendly database column names

function sqlForPartialUpdate(dataToUpdate, jsToSql) {

  //first check to see if there are any key-value pairs in the data to update
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // convert the data to sql friendly column names and variables to ward against sql injection.
  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  //function returns an object with sql friendly columns to update with variable names for the values (setCols) as well as the array of new values (values)
  //will require the calling function to execute the sql against the db. 
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
