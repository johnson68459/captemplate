using db as my from '../db/data-model';

service CatalogService {
    entity MasterSearchHelp  as projection on my.MasterSearchHelp;
    entity Company_code      as projection on my.Company_code;
    entity Cost_center       as projection on my.Cost_center;
    entity Document_type     as projection on my.Document_type;
    entity Currency          as projection on my.Currency;
    entity Default_master    as projection on my.Default_master;
    entity Dept_budget       as projection on my.Dept_budget;
    entity Department        as projection on my.Department;
    entity G_L_Account       as projection on my.G_L_Account;
    entity Internal_order    as projection on my.Internal_order;
    entity Item_category     as projection on my.Item_category;
    entity Jurisdiction_code as projection on my.Jurisdiction_code;
    entity Material_master   as projection on my.Material_master;
    entity Plant             as projection on my.Plant;
    entity Tax_code          as projection on my.Tax_code;
    entity Unit_Measures     as projection on my.Unit_Measures;
    entity Vendor_master     as projection on my.Vendor_master;
    
    //function import
    function getDynamicCol(sName : String) returns String;

}
