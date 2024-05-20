const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {


    this.on('getDynamicCol', async (req) => {
        debugger

        var serive = req.data.sName;
        var tablename = `db_${serive}`;
        var rawdata = await cds.db.run(`PRAGMA table_info(${tablename});`)

        var returnData = [];

        for (let i = 0; i < rawdata.length; i++) {
            returnData.push(rawdata[i].name)
        }


        return JSON.stringify(returnData);
    })

})