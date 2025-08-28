export type VehicleArticlesResponseType = {
  vehicleId: number;
  productGroupId: number;
  countArticles: number;
  articles: ArticleType[];
};

export type ArticleType = {
  articleId: number;
  articleNo: string;
  supplierName: string;
  supplierId: number;
  articleProductName: string;
  productId: number;
  articleMediaType: number;
  articleMediaFileName: string;
  imageLink: string;
  imageMedia: string;
  s3ImageLink: string;
};

export type ArticleDetailsResponse = {
  articleNo: string;
  countArticles: number;
  articles: ArticleDetailType[];
};

export type ArticleDetailType = {
  articleId: number;
  articleNo: string;
  articleProductName: string;
  supplierName: string;
  supplierId: number;
  articleMediaType: number;
  articleMediaFileName: string;
  articleInfo: ArticleInfoType;
  allSpecifications: null | {
    criteriaName: string;
    criteriaValue: never;
  }[];
  eanNo: {
    eanNumbers: string[] | null;
  };
  oemNo: OemNumberType[] | null;
  imageLink: string;
  imageMedia: string;
  s3ImageLink: string;
  compatibleCars: CompatibleCarType[];
};

export type ArticleInfoType = {
  articleId: number;
  articleNo: string;
  supplierId: number;
  supplierName: string;
  isAccessory: number;
  articleProductName: string;
};

export type OemNumberType = {
  oemBrand: string;
  oemDisplayNo: string;
};

export type CompatibleCarType = {
  vehicleId: number;
  modelId: number;
  manufacturerName: string;
  modelName: string;
  typeEngineName: string;
  constructionIntervalStart: string; // ISO date string
  constructionIntervalEnd: string | null; // can be null if ongoing
};
