// Implementation of service service.cds
const cds = require('@sap/cds');
const {employees} = cds.entities("anubhav.db.master");

module.exports = function(srv) {
   //DPC extension class in ABAP
    srv.on('hello', function(req,res){  // implement the event
        let name = req.data.name;
        return "Hello " + name;
    });


    srv.on('READ','ReadEmplyeeSrv', async(req,res) => {
        let result = [];
       
        // //Example 1 : return hardcoded data
        // result.push({"ID":"DUMMY", "nameFirst":"Reena", "nameLast":"Roy"});
         
        // // //Exmaple 2: get top 10 records
        // result = cds.tx(req).run(SELECT.from(employees).limit(10));

    //     //Exmaple 3: get record by where
        result = cds.tx(req).run(SELECT.from(employees).limit(10).where(
    {
        salaryAmount: {'>=' : 90000}
    }));

        var tot = 0;
        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            tot = tot + parseInt(element.salaryAmount);
        }
      

return result;
  
    });
}