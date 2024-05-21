sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("settingui.controller.SettingView", {
            onInit: function () {
                // debugger

            },
            onBeforeRendering: async function (oEvent) {
                debugger
                var oFunc = this.getView().getModel().bindContext("/getSettingData(...)");
                await oFunc.execute()
                var result = oFunc.getBoundContext().getValue().value;
                result = JSON.parse(result);
                let settingdata = result.setting;

                let oModel = new sap.ui.model.json.JSONModel(settingdata);

                // Set the model to the view
                this.getView().setModel(oModel,"settingData");



            },
            onAfterRendering: function (oEvent) {
                // debugger

            },
            onBackEndSelect: function (oEvent) {
                debugger
                let selectedkey = oEvent.getSource().getSelectedKey();
                var contentVbox = this.byId("contentVbox");
                if (selectedkey != 'SAP') {

                    for (let i = 1; i <= 5; i++) {
                        contentVbox.getItems()[i].setVisible(false);
                    }
                }
                else {
                    for (let i = 1; i <= 5; i++) {
                        contentVbox.getItems()[i].setVisible(true);
                    }
                }

            }
        });
    });
