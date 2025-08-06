const request = require('supertest');

const app = require("./server")

let defapi='localhost:3000/api/';

describe("",()=>{
it("", async () =>{
    const res=await request(app)
        .get("/item/itemname?item_name=naytonohjain")
        .expect("Content-Type", /json/)
        .expect(200);
        expect(res.body.message).toBe(""+"itemid"+": 1",
    "item_name"+": naytonohjain",
    "amount_in_stock"+": 40",
    "price"+": 200",
    "description"+": gpu for a computer. Will fit for multiple purposes",
    "category"+": electronics");
})});
