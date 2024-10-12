export class ConstructionSites {
  constructionSiteName: string;
  constructionSiteNo: number; // number tipi
  companyId: string; // Guid yerine string kullanıyoruz
  companyName: string;

  constructor(
    constructionSiteName: string,
    constructionSiteNo: number,
    companyId: string,
    companyName: string
  ) {
    this.constructionSiteName = constructionSiteName;
    this.constructionSiteNo = constructionSiteNo;
    this.companyId = companyId;
    this.companyName=companyName
  }
}
