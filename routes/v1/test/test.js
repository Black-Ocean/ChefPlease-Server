import test from 'tape';
var request = require('request');


const before = test;
const after = test;

// beforeEach/afterEach rely on shared state.
// That's a big anti-pattern for testing.

// It's also silly to run something before and after
// ever test -- many of your tests won't need it.

// Try this, instead:
const setup = () => {
  const fixtures = {};

  // Insert your fixture code here.
  // Make sure you're creating fresh objects each
  // time setup() is called.
  return fixtures;
};

const teardown = (fixtures) => {
  // Dispose of your fixtures here.
};


before('before', function (assert) {

  assert.pass('Do something before tests here');

  assert.end();
});





// test('A GET request to users', (assert) => {
//   const fixture = setup();
//   request.get('http://127.0.0.1:3000/cuisines')
//     .on('response', function (resp) {
//       assert.equal(resp.statusCode, 200)
//     })

//   assert.equal(typeof fixture, 'object',
//     'fixture should return an object');

//   teardown(fixture);
//   assert.end();
// });

test('All chef routes handle good request and bad requests to not crash server', (assert) => {
  request.post('http://127.0.0.1:3000/chefs/userId/1',
      {'content-type': 'application/json'},
    )
    .on('response', function (err, resp, body) {
      assert.equal(resp.body, 'Dish was created!!')
  });

  assert.end();

})





test('A get from ', (assert) => {

  // assert.pass('This test will pass.');
  // request('http://www.google.com', function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     console.log(body) // Show the HTML for the Google homepage. 
  //   }
  // })
  assert.end();
});