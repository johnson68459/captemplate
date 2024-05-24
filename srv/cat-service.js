const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {

    let { Setting } = this.entities;

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
    this.on('getSettingData', async (req) => {
        debugger

        var data = await SELECT.from(Setting);
        // console.log(data[0])

        return JSON.stringify({
            setting: data[0]
        });
    })
    this.on('PUT', Setting, async (req, next) => {
        debugger
        var filename =  req.headers?.slug;
        if(filename){
        req.data.filename = filename
        }
        return next();
    });

})