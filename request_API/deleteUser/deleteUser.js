const assert = require("assert");
const { expect } = require("chai");
const Ajv = require("ajv");

describe("Delete User", function () {
  it('should return with status 204 when user is deleted', async function () {
    const response = await fetch("https://reqres.in/api/users/2", {
      method: 'DELETE',
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Content-Type': 'application/json',
      },
    });

    expect(response.status).to.equal(204); //verif status code dari response status 201
  });
});