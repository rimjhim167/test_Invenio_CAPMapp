module.exports = cds.service.impl(async function(){
 
    const { POs, EmployeeSet } = this.entities;
    
    this.before('UPDATE', EmployeeSet, (req) => {
        console.log("Aa gya", req.data.salaryAmount);
        if(parseFloat(req.data.salaryAmount) >= 1000000){
            req.error(500, "Salary requested is not allowed");
        }
    });

    this.on('getOrderDefaults', (req,res) => {  // setting default value of status to NEW i.e. N
        return {
            "OVERALL_STATUS": "N"
        };
    });

    this.on('boost', async function(req,res){
        try {
            const ID = req.params[0];
            console.log("hey anubhav you gave me id :", JSON.stringify(ID));
            const tx = cds.tx(req);
            await tx.update(POs).with({
                GROSS_AMOUNT: { '+=' : 20000 }
            }).where(ID);
        } catch (error) {
            return "Error " + error.toString();
        }
    });
    //Implementation [service.js]
    this.on('setOrderProcessing', POs, async req => {
        const tx = cds.tx(req);
        await tx.update(POs, req.params[0].ID).set({OVERALL_STATUS: 'A'});
    });
    
    this.on('getLargestOrder',async function(req,res){
        try {
            const tx = cds.tx(req);
            //SELECT SINGLE * FROM db ORDER BY amount desc
            const reply = await tx.read(POs).orderBy({
                GROSS_AMOUNT : 'desc'
            }).limit(1);
 
            return reply;
        } catch (error) {
           
        }
    });
})