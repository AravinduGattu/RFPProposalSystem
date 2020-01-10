export class JobFamily {
  job_description: string;
  cat_description: string;
  sub_cat_description: string;
}


export class JobFamilyDropdown {

  job_name: string;
  categories: CategoryDropdown[];
  
}


export class  CategoryDropdown{

  cat_name: string;
  subCategories: SubCategoryDropdown[];

}

export class SubCategoryDropdown {

  subCat_name: string;
}
