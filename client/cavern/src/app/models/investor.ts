export class Investor {
    InvestorId: number;
    InvestorEmail: string;
    InvestorName: string;
    InvestorPhone: string;
    Investment: number;

    constructor(id, email, name, phone, investment) {
        this.InvestorId = id;
        this.InvestorEmail = email;
        this.InvestorName = name;
        this.InvestorPhone = phone;
        this.Investment = investment;
    }
}
