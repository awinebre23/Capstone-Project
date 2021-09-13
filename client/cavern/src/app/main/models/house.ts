import { Investor } from "./investor";

export class House {
    id: number;
    address: string;
    state: string;
    city: string;
    zipCode: string;
    organizationName: string;
    description: string;
    requiredFunds: number;
    currentFunds: number;
    progress: string;
    images: Array<string>;
    investors: Array<Investor>;

    constructor(id, address, state, city, zipCode, organizationName, description, requiredFunds, currentFunds, progress, images, investors) {
        this.id = id;
        this.address = address;
        this.state = state;
        this.city = city;
        this.zipCode = zipCode;
        this.organizationName = organizationName;
        this.description = description;
        this.requiredFunds = requiredFunds;
        this.currentFunds = currentFunds;
        this.progress = progress;
        this.images = images;
        this.investors = investors;
    }
}
