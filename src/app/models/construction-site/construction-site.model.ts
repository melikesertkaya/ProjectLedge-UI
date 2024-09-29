export class ConstructionSites {
  constructionSiteName: string;
  constructionSiteNo: number; // number tipi
  companyId: string; // Guid yerine string kullanıyoruz

  constructor(
    constructionSiteName: string,
    constructionSiteNo: number,
    companyId: string
  ) {
    this.constructionSiteName = constructionSiteName;
    this.constructionSiteNo = constructionSiteNo;
    this.companyId = companyId;
  }
}
