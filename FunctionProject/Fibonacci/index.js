var bigInt = require("big-integer");

let memo = {
    0: bigInt.zero,
    1: bigInt.one
};

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request with Memoization.');

    const nth = req.body.nth;

    if (nth === undefined || nth < 0) {
        context.res = {
            status: 400,
            body: "Please pass a non-negative number 'nth' in the request body."
        };
        return;
    }

    function fibRecursive(n) {
        if (n in memo) {
            return memo[n];
        }
        memo[n] = fibRecursive(n - 1).add(fibRecursive(n - 2));
        return memo[n];
    }

    const answer = fibRecursive(nth);

    context.res = {
        body: answer.toString()
    };
};