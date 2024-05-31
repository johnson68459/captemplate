sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/m/MessageBox",
        'sap/ui/export/library',
        'sap/ui/export/Spreadsheet'
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, exportLibrary, Spreadsheet) {
        "use strict";

        var EdmType = exportLibrary.EdmType;

        return Controller.extend("masterui.controller.MasterView", {
            onInit: function () {
                debugger;
            },
            onAfterRendering: function (oEvent) {
                debugger;

                setTimeout(() => {
                    // Get the Select control by its ID
                    var oSelect = this.byId("selectitems");

                    // Ensure the Select control and its items are available
                    if (oSelect && oSelect.getItems().length > 0) {
                        // Get the first item
                        var oFirstItem = oSelect.getItems()[0];

                        // Set the selected key to the first item's key
                        oSelect.setSelectedKey(oFirstItem.getKey());

                        // Manually trigger the change event
                        oSelect.fireChange({
                            selectedItem: oFirstItem
                        });
                    }
                }, 300);
            },

            onSelectChange: async function (oEvent) {
                debugger;
                var myTable = this.byId("myTable")
                var seriveName = oEvent.getSource().getSelectedKey();
                var oFunc = this.getView().getModel().bindContext("/getDynamicCol(...)");
                oFunc.setParameter("sName", seriveName);
                await oFunc.execute()
                var result = oFunc.getBoundContext().getValue().value;
                result = JSON.parse(result);

                //
                myTable.destroyColumns()
                myTable.destroyItems()

                function formatCompanyCode(company_code) {
                    // Convert the company code to title case (capitalize each word)
                    var formattedCompanyCode = company_code.toLowerCase().replace(/\b\w/g, function (c) {
                        return c.toUpperCase();
                    });

                    // Replace underscores with spaces
                    formattedCompanyCode = formattedCompanyCode.replace(/_/g, ' ');

                    return formattedCompanyCode;
                }

                for (let i = 0; i < result.length; i++) {
                    debugger
                    myTable.addColumn(new sap.m.Column({
                        styleClass: 'columnStyleClass',
                        hAlign: "Center",
                        header: new sap.m.Text({ text: `${formatCompanyCode(result[i])}` })
                    }));
                }
                myTable.addColumn(new sap.m.Column({
                    styleClass: "lastColumn",
                    hAlign: "Center",
                    header: new sap.m.Text({ text: `` })
                }));

                myTable.bindItems({
                    path: `/${seriveName}`,
                    template: new sap.m.ColumnListItem({
                        cells: [
                            ...result.map(function (colName) {
                                return new sap.m.Input({ value: `{${colName}}`, tooltip: `{${colName}}`, textAlign: "Center", editable: false }).addStyleClass("inputClass");
                            }),
                            new sap.m.HBox({
                                justifyContent: "SpaceBetween",
                                width: "100px",
                                items: [
                                    new sap.m.Button({
                                        text: "Modify", press: function (oEvent) {
                                            debugger
                                            let currText = oEvent.getSource().getText();
                                            let oListCells = oEvent.getSource().getParent().getParent().getCells();
                                            if (currText == 'Modify') {
                                                oEvent.getSource().setText("Save");
                                                oEvent.getSource().getParent().getParent().addStyleClass("selectedColumnList")
                                                for (let i = 0; i < oListCells.length - 1; i++) {
                                                    oListCells[i].setEditable(true)
                                                }
                                            }
                                            else if (currText == 'Save') {
                                                oEvent.getSource().setText("Modify");
                                                oEvent.getSource().getParent().getParent().removeStyleClass("selectedColumnList")
                                                for (let i = 0; i < oListCells.length - 1; i++) {
                                                    oListCells[i].setEditable(false)
                                                }
                                            }
                                        }
                                    }),
                                    new sap.ui.core.Icon({
                                        src: "sap-icon://delete", color: "red", press: function (oEvent) {
                                            debugger
                                            var oSelectedItem = oEvent.getSource().getParent().getParent();
                                            var selectedContext = oSelectedItem.getBindingContext();

                                            new MessageBox.confirm("Are you sure you want to delete?", {
                                                title: "Confirmation",
                                                onClose: function (oAction) {
                                                    debugger
                                                    if (oAction === MessageBox.Action.OK) {
                                                        debugger
                                                        selectedContext.delete().then(function () {
                                                            debugger
                                                            MessageBox.alert("Deleted Successfully",
                                                                { icon: MessageBox.Icon.SUCCESS, title: "Success" });
                                                        }, function (oError) {
                                                            debugger
                                                            MessageBox.alert("Could not delete Sales Order: "
                                                                + oError.message, { icon: MessageBox.Icon.ERROR, title: "Error" });
                                                        });
                                                    }
                                                }
                                            });



                                        }
                                    }).addStyleClass("deleteIcon")
                                ]
                            })
                        ]
                    })
                });


                var oModel = oEvent.getSource().getModel();
                var sPath = "/Default_master"

                oModel.read(sPath, {
                    success: function (oData) {
                        debugger
                        // oData contains the JSON response from the OData service
                        console.log(oData); // Log the JSON response to the console
                    },
                    error: function (oError) {
                        debugger
                        // Handle any errors that occur during the read operation
                        console.error("Error reading data:", oError);
                    }
                });

            },
            onExcelUpload: function (oEvent) {
                debugger
                var file = oEvent.getParameter("files")[0];
                var oMainTable = this.byId("myTable");
                if (file) {
                    var reader = new FileReader();

                    reader.onload = function (oEvent) {
                        debugger;
                        var arrayBuffer = oEvent.target.result;

                        // Process the ArrayBuffer using the XLSX library
                        var workbook = XLSX.read(arrayBuffer, { type: 'array' });

                        // Example: Access the first worksheet
                        var firstSheetName = workbook.SheetNames[0];
                        var worksheet = workbook.Sheets[firstSheetName];

                        // Convert the worksheet to JSON
                        var excelData = XLSX.utils.sheet_to_json(worksheet);

                        // Now you can use excelData for further processing
                        console.log(excelData);

                    };

                    debugger;

                    // Read the file as an ArrayBuffer
                    reader.readAsArrayBuffer(file);

                }
            },
            onExcelExport: function (oEvent) {
                debugger
                var myTable = this.byId("myTable");
                var oRowBinding = myTable.getBinding('items').getContexts();
                var oTotalCols = myTable.getColumns(); //[0].getHeader().getText()

                //getting columns
                var aCols = [];
                var aRowData = [];
                for (let i = 0; i < oTotalCols.length - 1; i++) {
                    aCols.push({
                        label: `${oTotalCols[i].getHeader().getText()}`,
                        type: EdmType.String,
                        property: `${oTotalCols[i].getHeader().getText()}`,
                        scale: 0
                    });

                }

                for (let i = 0; i < oRowBinding.length; i++) {
                    var j = 0;
                    var tempDataObj = {};
                    let currObj = oRowBinding[i].getObject();
                    for (var key in currObj) {
                        tempDataObj[aCols[j].property] = `${currObj[key] ?? ''}`
                        j++;
                    }
                    aRowData.push(tempDataObj);
                }
                debugger

                var oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: aRowData,
                    fileName: `${this.byId("selectitems").getSelectedKey()}.xlsx`
                };

                var oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function () {
                    debugger
                    oSheet.destroy();
                });

            }
        });
    }
);
