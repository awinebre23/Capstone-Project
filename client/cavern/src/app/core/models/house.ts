

export class House {
    HouseId: number;
    Address: string;
    State: string;
    City: string;
    ZipCode: string;
    OrganizationName: string;
    Description: string;
    RequiredFunds: number;
    CurrentFunds: number;
    Progress: string;
    Images: Array<string>;
    Investors: Array<Investor>;

    constructor(id, address, state, city, zipCode, organizationName, description, requiredFunds, currentFunds, progress, images, investors) {
        this.HouseId = id;
        this.Address = address;
        this.State = state;
        this.City = city;
        this.ZipCode = zipCode;
        this.OrganizationName = organizationName;
        this.Description = description;
        this.RequiredFunds = requiredFunds;
        this.CurrentFunds = currentFunds;
        this.Progress = progress;
        this.Images = images;
        this.Investors = investors;
    }
}
