export class Investor {
    InvestorId: number;
    InvestorEmail: string;
    InvestorName: string;
    InvestorPhone: string;
    Investment: number;

    constructor(id, name, investment) {
        this.InvestorId = id;
        this.InvestorName = name;
        this.Investment = investment;
    }
}
