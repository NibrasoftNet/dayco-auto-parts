export type OemArticleType = {
  articleId: number;
  articleSearchNo: string;
  articleNo: string;
  articleProductName: string;
  manufacturerId: number;
  manufacturerName: string;
  supplierId: number;
  supplierName: string;
  articleMediaType: number;
  articleMediaFileName: string;
  imageLink: string;
  imageMedia: string;
  s3ImageLink: string;
  s3image: string;
};

export type OemArticleListType = OemArticleType[];
