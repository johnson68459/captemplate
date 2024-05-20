namespace db;

entity MasterSearchHelp {
  mastervalue : String;
  masterkey : String;
}

entity Company_code {
  key code          : String;
      description   : String;
      tax_treatment : String;
}

entity Cost_center {
  key code        : String;
      description : String;
      master_name : String;
}

entity Document_type {
  key code        : String;
      description : String;
      master_name : String;
}

entity Currency {
  key code        : String;
      description : String;
      master_name : String;
}

entity Default_master {
  key company_code      : String;
      country           : String;
      currency          : String;
      document_type     : String;
      gl_account_header : String;
      payment_method    : String;
      plant             : String;
      vendor_code       : String;
      tax_per           : String;
      tds_per           : String;
}

entity Dept_budget {
      budget          : Integer;
  key department_id   : String;
      department_name : String;
      limit_per       : Integer;
      valid_from      : Date;
      valid_to        : Date;
      warning_per     : Integer;
}


entity Department {
      cost_center          : String;
      default_master_check : Boolean;
      department_id        : String;
      department_name      : String;
      email                : String;
      gl_account           : String;
      internal_order       : String;
      userid               : String;
      member_name          : String;
  key sr_no                : String;
}

entity G_L_Account {
  key code        : String;
      description : String;
      master_name : String;
}

entity Internal_order {
  key code        : String;
      description : String;
      master_id   : Integer;
      master_name : String;
}

entity Item_category {
  key code        : String;
      description : String;
      master_id   : Integer;
      master_name : String;
}

entity Jurisdiction_code {
  key code        : String;
      description : String;
      master_id   : Integer;
}

entity Material_master {
      gl_account      : String;
      gst_per         : String;
      hsn_code        : String;
      material_name   : String;
  key material_no     : String;
      unit_price      : String;
      uom             : String;
      uom_description : String;
}

entity Plant {
  key code        : String;
      description : String;
      master_name : String;
}

entity Tax_code {
  key company_code : String;
      country      : String;
      description  : String;
  key tax_code     : String;
      tax_per      : String;
}

entity Unit_Measures {
  key code        : String;
      description : String;
      master_name : String;
}

entity Vendor_master {
      currency           : String;
      email              : String;
      gst_per            : String;
      gst_treatment      : String;
      gstin_uin          : String;
      international_code : String;
      jurisdiction_code  : String;
      member_id          : String;
      member_name        : String;
      pan                : String;
      payment_terms      : String;
      source_of_supply   : String;
      email1             : String;
      email2             : String;
      email3             : String;
      tds                : String;
      vendor_name        : String;
  key vendor_no          : String;
}
