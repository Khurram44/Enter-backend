var module = require('./cyphercontroller');

var cypher = function (cypher) {
    this.cypher = cypher;

}
cypher.getCypher = (data , result) => {
    result(null, "data")

  
    }

module.exports = cypher;
