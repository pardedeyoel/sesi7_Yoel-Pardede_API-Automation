const assert = require("assert");
const { expect } = require("chai");
const Ajv = require("ajv");

describe("Get List User", function () {
  it('should return user data with status 200', async function () {
    const response = await fetch("https://reqres.in/api/users?page=2", {
      method: 'GET',
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Content-Type': 'application/json',
      }
    });

    const responseData = await response.json();

    expect(response.status).to.equal(200); //verif status code dari response status 200
    expect(responseData.data[0].first_name).to.be.a('string'); // mengecek apakah nilah dr first_name itu tipe string atau bukan



    // Untuk menampilkan response JSON nya ke console jadi bisa pakai generator dari JSON ke JSON schema pakai web ini:
    // https://transform.tools/json-to-json-schema
    // console.log("Check Response JSON");
    // console.log(responseData);

    const schema = {
      type: "object",
      required: ["page", "per_page", "total", "total_pages", "data"],
      properties: {
        page: { type: "number" },
        per_page: { type: "number" },
        total: { type: "number" },
        total_pages: { type: "number" },
        data: {
          type: "array",
          items: {
            type: "object",
            required: ["id", "email", "first_name", "last_name", "avatar"],
            properties: {
              id: { type: "number" },
              email: { type: "string" },
              first_name: { type: "string" },
              last_name: { type: "string" },
              avatar: { type: "string" }
            }
          }
        }
      }
    };

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