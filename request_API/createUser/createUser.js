const assert = require("assert");
const { expect } = require("chai");
const Ajv = require("ajv");

describe("Create New User", function () {
  it('should return user data with status 201', async function () {
    const response = await fetch("https://reqres.in/api/users", {
      method: 'POST',
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name : "Yoel",
        job : "Developer",
      })
    });

    const responseData = await response.json();

    expect(response.status).to.equal(201); //verif status code dari response status 201
    expect(responseData.name).to.equal("Yoel"); // mengecek apakah nama sesuai input
    expect(responseData.job).to.equal("Developer");


// Untuk menampilkan response JSON nya ke console jadi bisa pakai generator dari JSON ke JSON schema pakai web ini:
    // https://transform.tools/json-to-json-schema
    // console.log("Check Response JSON");
    //console.log(responseData);

  const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "job": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "createdAt": {
      "type": "string"
    }
  },
  "required": [
    "name",
    "job",
    "id",
    "createdAt"
      ]  
    }  

    // //Validasi JSON  dengan AJV
    const ajv = new Ajv({ allErrors: true});
    const validate = ajv.compile(schema);
    //ini valid
    const isValid = validate(responseData);; 
    
    // //ini tidak valid
    const errorMessage = JSON.stringify(validate.errors, null, 2);
    expect(isValid, errorMessage).to.be.true; //cetak error jika tidak valid

  });
});