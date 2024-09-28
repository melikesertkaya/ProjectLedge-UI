export interface Company {
    id: string;
    name: string;
    address: string | null;
    phoneNumber: string | null;
    taxNumber: string | null;
    companyCode: string | null;
    description: string | null;
    kdvTypes: number | null;
    billNumber: string | null;
    currentAccountType: number | null;
}
