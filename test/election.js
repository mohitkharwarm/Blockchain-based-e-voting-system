//const assert = require("assert");

var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {

  let app,acc
	before(async () => {
		app = await Election.deployed()
    acc=await web3.eth.getAccounts()
	})

  it("initializes with zero candidates", async()=> {
   let count=await app.count()
   assert.equal(count,0);
  });

  it("Addition of Candidate using Function",async()=>{
    app.addperson("Candidate 1")
    app.addperson("Candidate 2")
    let count=await app.count()
    assert.equal(count,2);
  });
  
  it("Allow voter to cast vote",async ()=>{
    let count=await app.count()
    assert.equal(count,2);
    app.vote(1,{from:acc[1]})
    app.vote(1,{from:acc[2]})
    app.vote(2,{from:acc[3]})
    let can1=await app.candidates(1)
    assert.equal(can1.voteCount,2);
    let can2=await app.candidates(2)
    assert.equal(can2.voteCount,1);
  });
 it("Double Voting",async()=>{
  let count=await app.count()
  assert.equal(count,2);
  app.vote(1,{from:acc[4]})
  var can1=await app.candidates(1)
  assert.equal(can1.voteCount,3);
  app.vote(1,{from:acc[4]})
  var can1=await app.candidates(1)
  assert.notEqual(can1.voteCount,4);
});
/*
  it("Voter validity",async()=>{
    let v1=await app.voters(acc[5])
    app.vote(2,{from:acc[5]})
    let v2=await app.voters(acc[5])
    assert.notEqual(v1,v2);
  });
*/
});