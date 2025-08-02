const assert = require("assert");
const { expect } = require("chai");
const Ajv = require("ajv");

describe("Update User (PATCH)", function () {
  it('should return user data with status 201', async function () {
    const response = await fetch("https://reqres.in/api/users/2", {
      method: 'PATCH',
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        job : "QA Engineer",
      })
    });

    const responseData = await response.json();

    expect(response.status).to.equal(200); //verif status code dari response status 201
    expect(responseData.job).to.equal("QA Engineer"); //check apakah job sudah sesuai

    // Untuk menampilkan response JSON nya ke console jadi bisa pakai generator dari JSON ke JSON schema pakai web ini:
        // https://transform.tools/json-to-json-schema
        // console.log("Check Response JSON");
        //  console.log(responseData);
    
      const schema = {
   "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "job": {
      "type": "string"
    },
    "updatedAt": {
      "type": "string"
    }
  },
  "required": [
    "job",
    "updatedAt"
  ]
}  
    
      //Validasi JSON  dengan AJV
        const ajv = new Ajv({ allErrors: true});
        const validate = ajv.compile(schema);
        //ini valid
        const isValid = validate(responseData);; 
        
        //ini tidak valid
        const errorMessage = JSON.stringify(validate.errors, null, 2);
        expect(isValid, errorMessage).to.be.true; //cetak error jika tidak valid
    

  });
});