export class Investor {
    id: number;
    email: string;
    name: string;
    phone: string;
    investment: number;

    constructor(id, email, name, phone, investment) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.investment = investment;
    }
}
