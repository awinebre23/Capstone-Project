"use strict";

let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");

let app = express();
app.use(bodyParser.json());

// Create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

// enable CORS
// Since we're not serving pages from Node, you'll get the following error if CORS isn't "enabled"
// Error:  Failed to load http://localhost:3000/login/:
// No 'Access-Control-Allow-Origin' header is present on the requested resource. 
// Origin 'null' is therefore not allowed access.
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

// ------ Debugging support ------------------

function logArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}


// ------ Get next ID helper ------------------

function getNextId(counterType)  // use 'house' or 'investor' or 'user' as counterType
{
    // read the counter file
    let data = fs.readFileSync(__dirname + "/data/counters.json", "utf8");
    data = JSON.parse(data);

    // find the next id from the counters file and then increment the
    // counter in the file to indicate that id was used
    let id = -1;
    switch (counterType.toLowerCase()) {
        case "house":
            id = data.nextHouse;
            data.nextHouse++;
            break;
        case "investor":
            id = data.nextInvestor;
            data.nextInvestor++;
            break;
        case "user":
            id = data.nextUser;
            data.nextUser++;
            break;
    }

    // save the updated counter
    fs.writeFileSync(__dirname + "/data/counters.json", JSON.stringify(data));

    return id;
}

// ------ Validation helpers ------------------

function isValidHouse(house) {
    if (house.Address == undefined || house.Address.trim() == "")
        return 1;
    if (house.State == undefined || house.State.trim() == "")
        return 2;
    if (house.City == undefined || house.City.trim() == "")
        return 3;
    if (house.ZipCode == undefined || house.ZipCode.trim() == "")
        return 4;
    if (house.OrganizationName == undefined || house.OrganizationName.trim() == "")
        return 5;
    if (house.Description == undefined || house.Description.trim() == "")
        return 6;
    if (house.RequiredFunds == undefined)
        return 7;
    if (house.CurrentFunds == undefined)
        return 8;
    if (house.Progress == undefined || house.Progress.trim() == "")
        return 9;
    if (house.Images == undefined || house.Images.length == 0)
        return 10;

    return -1;
}

function calculateFunds(house) {
    console.log("House = " + house);
    let currentFunds = 0;
    house.Investors.forEach(investor => {
        currentFunds += investor.Investment;
    });
    if (currentFunds >= house.RequiredFunds) {
        currentFunds = house.RequiredFunds;
        house.Status = "Investment Total Reached"
    }
    house.CurrentFunds = currentFunds;
}

function isValidInvestor(investor) {
    if (investor.InvestorEmail == undefined || investor.InvestorEmail.trim() == "")
        return 1;
    if (investor.InvestorName == undefined || investor.InvestorName.trim() == "")
        return 2;
    if (investor.InvestorPhone == undefined || investor.InvestorPhone.trim() == "")
        return 3;
    if (investor.Investment == undefined)
        return 3;

    return -1;
}

// ------------------------------------------------------------------------------

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
});

app.get("/index.html", function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
});


// ------------------------------------------------------------------------------
// THIS CODE ALLOWS REQUESTS FOR THE API THROUGH 

/* ************************************************************************* */
// NOTE:  To make debugging easy, these methods echo their processing through
//        to the terminal window.  This means there may be some unnecessary
//        parsing and stringifying.  But it is worth it as you debug your code.
/* ************************************************************************* */

// GET ORGANIZATION
app.get("/api/organizations", function (req, res) {
    console.log("Received a GET request for all organizations");

    let data = fs.readFileSync(__dirname + "/data/organizations.json", "utf8");
    data = JSON.parse(data);

    console.log("Returned data is: ");
    console.log(data);
    res.end(JSON.stringify(data));
});

// GET ALL HOUSES
app.get("/api/houses", function (req, res) {
    console.log("Received a GET request for all houses");

    let data = fs.readFileSync(__dirname + "/data/houses.json", "utf8");
    data = JSON.parse(data);

    console.log("Returned data is: ");
    console.log(data);
    res.end(JSON.stringify(data));
});

// GET ONE HOUSE BY ID
app.get("/api/houses/:id", function (req, res) {
    let id = req.params.id;
    console.log("Received a GET request for house " + id);

    let data = fs.readFileSync(__dirname + "/data/houses.json", "utf8");
    data = JSON.parse(data);

    let match = data.find(element => element.HouseId == id);
    if (match == null) {
        res.status(404).send("House Not Found");
        return;
    }

    console.log("Returned data is: ");
    console.log(match);
    res.end(JSON.stringify(match));
});

// WONT NEED
// GET MANY HOUSES BY ORGANIZATION
app.get("/api/houses/byorganization/:id", function (req, res) {
    let id = req.params.id;
    console.log("Received a GET request for houses in organization " + id);

    let orgData = fs.readFileSync(__dirname + "/data/organizations.json", "utf8");
    orgData = JSON.parse(orgData);

    let organization = orgData.find(element => element.OrganizationId.toLowerCase() == id.toLowerCase());
    if (organization == null) {
        res.status(404).send("Organization Not Found");
        return;
    }

    let data = fs.readFileSync(__dirname + "/data/houses.json", "utf8");
    data = JSON.parse(data);

    // find the matching houses for a specific organization
    let matches = data.filter(element => element.OrganizationName == organization.OrganizationName);

    console.log("Returned data is: ");
    console.log(matches);
    res.end(JSON.stringify(matches));
});

// WONT NEED
// GET A SPECIFIC INVESTOR IN A SPECIFIC HOUSE
app.get("/api/houses/:houseid/investors/:investorid", function (req, res) {
    let houseId = req.params.houseid;
    let investorId = req.params.investorid;
    console.log("Received a GET request for investor " + investorId + " in house " + houseId);

    let data = fs.readFileSync(__dirname + "/data/houses.json", "utf8");
    data = JSON.parse(data);

    // find the house
    let matchingHouse = data.find(element => element.HouseId == houseId);
    if (matchingHouse == null) {
        res.status(404).send("House Not Found");
        return;
    }

    // find the investor 
    let match = matchingHouse.Investors.find(m => m.InvestorId == investorId);
    if (match == null) {
        res.status(404).send("Investor Not Found");
        return;
    }

    console.log("Returned data is: ");
    console.log(match);
    res.end(JSON.stringify(match));
});

// ADD A HOUSE
app.post("/api/houses", urlencodedParser, function (req, res) {
    console.log("Received a POST request to add a house");
    console.log("BODY -------->" + JSON.stringify(req.body));

    // assemble house information so we can validate it
    let house = {
        HouseId: getNextId("house"),
        Address: req.body.Address,
        State: req.body.State,
        City: req.body.City,
        ZipCode: req.body.ZipCode,
        OrganizationName: req.body.OrganizationName,
        Description: req.body.Description,
        RequiredFunds: req.body.RequiredFunds,
        CurrentFunds: 0,
        Progress: req.body.Progress,
        Images: req.body.Images,
        Investors: []
    };

    console.log("Performing validation...");
    let errorCode = isValidHouse(house);
    if (errorCode != -1) {
        console.log("Invalid data found! Reason: " + errorCode);
        res.status(400).send("Bad Request - Incorrect or Missing Data");
        return;
    }

    let data = fs.readFileSync(__dirname + "/data/houses.json", "utf8");
    data = JSON.parse(data);

    // add the house
    data.push(house);

    fs.writeFileSync(__dirname + "/data/houses.json", JSON.stringify(data));

    console.log("House added: ");
    console.log(house);

    //res.status(201).send();
    res.end(JSON.stringify(house));  // return the new house w it's HouseId
});

// EDIT A HOUSE
app.put("/api/houses", urlencodedParser, function (req, res) {
    console.log("Received a PUT request to house a team");
    console.log("BODY -------->" + JSON.stringify(req.body));

    // assemble house information so we can validate it
    let house = {
        HouseId: req.body.HouseId,
        Address: req.body.Address,
        State: req.body.State,
        City: req.body.City,
        ZipCode: req.body.ZipCode,
        OrganizationName: req.body.OrganizationName,
        Description: req.body.Description,
        RequiredFunds: req.body.RequiredFunds,
        CurrentFunds: req.body.CurrentFunds,
        Progress: req.body.Progress,
        Images: req.body.Images,
        Investors: req.body.Investors
    };

    console.log("Performing validation...");
    let errorCode = isValidHouse(house);
    if (errorCode != -1) {
        console.log("Invalid data found! Reason: " + errorCode);
        res.status(400).send("Bad Request - Incorrect or Missing Data");
        return;
    }

    let data = fs.readFileSync(__dirname + "/data/houses.json", "utf8");
    data = JSON.parse(data);

    // find the house
    let match = data.find(element => element.HouseId == req.body.HouseId);
    if (match == null) {
        res.status(404).send("House Not Found");
        return;
    }

    calculateFunds(house);

    // update the house
    match.HouseId = house.HouseId;
    match.Address = house.Address;
    match.State = house.State;
    match.City = house.City;
    match.ZipCode = house.ZipCode;
    match.OrganizationName = house.OrganizationName;
    match.Description = house.Description;
    match.RequiredFunds = house.RequiredFunds;
    match.CurrentFunds = house.CurrentFunds;
    match.Progress = house.Progress;
    match.Images = house.Images;
    match.Investors = house.Investors;

    fs.writeFileSync(__dirname + "/data/houses.json", JSON.stringify(data));

    console.log("Update successful!  New values: ");
    console.log(match);
    res.status(200).send();
});

// DELETE A HOUSE
app.delete("/api/houses/:id", function (req, res) {
    let id = req.params.id;
    console.log("Received a DELETE request for house " + id);

    let data = fs.readFileSync(__dirname + "/data/houses.json", "utf8");
    data = JSON.parse(data);

    // find the index number of the house in the array
    let foundAt = data.findIndex(element => element.HouseId == id);

    // delete the house if found
    if (foundAt != -1) {
        data.splice(foundAt, 1);
    }

    fs.writeFileSync(__dirname + "/data/houses.json", JSON.stringify(data));

    console.log("Delete request processed");
    // Note:  even if we didn't find the house, send a 200 because they are gone
    res.status(200).send();
});

// ADD AN INVESTOR TO A HOUSE
app.post("/api/houses/:id/investors", urlencodedParser, function (req, res) {
    let id = req.params.id;
    console.log("Received a POST request to add a investor to house " + id);
    console.log("BODY -------->" + JSON.stringify(req.body));

    // assemble investor information so we can validate it
    let investor = {
        InvestorId: getNextId("investor"),   // assign new id
        InvestorEmail: req.body.InvestorEmail,
        InvestorName: req.body.InvestorName,
        InvestorPhone: req.body.InvestorPhone,
        Investment: req.body.Investment
    };

    console.log("Performing investor validation...");
    let errorCode = isValidInvestor(investor);
    if (errorCode != -1) {
        console.log("Invalid data found! Reason: " + errorCode);
        res.status(400).send("Bad Request - Incorrect or Missing Data");
        return;
    }

    let data = fs.readFileSync(__dirname + "/data/houses.json", "utf8");
    data = JSON.parse(data);

    // find the house
    let match = data.find(element => element.HouseId == id);
    if (match == null) {
        res.status(404).send("House Not Found");
        return;
    } else if (match.CurrentFunds >= match.RequiredFunds) {
        res.status(400).send("Funds have already been met, cannot add more investors.");
        return;
    }

    // add the investor
    match.Investors.push(investor);
    calculateFunds(match);

    fs.writeFileSync(__dirname + "/data/houses.json", JSON.stringify(data));

    console.log("New investor added!");
    res.status(200).send();
});

// EDIT AN INVESTOR IN A HOUSE
app.put("/api/houses/:id/investors", urlencodedParser, function (req, res) {
    let id = req.params.id;
    console.log("Received a PUT request to edit a investor in house " + id);
    console.log("BODY -------->" + JSON.stringify(req.body));

    // assemble investor information so we can validate it
    let investor = {
        InvestorId: req.body.InvestorId,
        InvestorEmail: req.body.InvestorEmail,
        InvestorName: req.body.InvestorName,
        InvestorPhone: req.body.InvestorPhone,
        Investment: req.body.Investment
    };

    console.log("Performing investor validation...");
    let errorCode = isValidInvestor(investor);
    if (errorCode != -1) {
        console.log("Invalid data found! Reason: " + errorCode);
        res.status(400).send("Bad Request - Incorrect or Missing Data");
        return;
    }

    // find the house
    let data = fs.readFileSync(__dirname + "/data/houses.json", "utf8");
    data = JSON.parse(data);

    // find the house
    let matchingHouse = data.find(element => element.HouseId == id);
    if (matchingHouse == null) {
        res.status(404).send("House Not Found");
        return;
    }

    // find the investor
    let match = matchingHouse.Investors.find(m => m.InvestorId == req.body.InvestorId);
    if (match == null) {
        res.status(404).send("Investor Not Found");
        return;
    }

    // update the investor
    match.InvestorEmail = req.body.InvestorEmail;
    match.InvestorName = req.body.InvestorName;
    match.InvestorPhone = req.body.InvestorPhone;
    match.Investment = req.body.Investment;
    calculateFunds(matchingHouse);

    fs.writeFileSync(__dirname + "/data/houses.json", JSON.stringify(data));

    console.log("Investor updated!");
    res.status(200).send();
});

// DELETE AN INVESTOR IN A HOUSE
app.delete("/api/houses/:houseid/investors/:investorid", urlencodedParser, function (req, res) {
    let houseId = req.params.houseid;
    let investorId = req.params.investorid;
    console.log("Received a DELETE request for investor " + investorId + " in house " + houseId);

    // find the house
    let data = fs.readFileSync(__dirname + "/data/houses.json", "utf8");
    data = JSON.parse(data);

    let matchingHouse = data.find(element => element.HouseId == houseId);
    if (matchingHouse == null) {
        res.status(404).send("House Not Found");
        return;
    }

    // find the investor
    let foundAt = matchingHouse.Investors.findIndex(m => m.InvestorId == investorId);

    // delete the investor if found
    if (foundAt != -1) {
        matchingHouse.Investors.splice(foundAt, 1);
    }
    calculateFunds(matchingHouse);

    fs.writeFileSync(__dirname + "/data/houses.json", JSON.stringify(data));

    console.log("Delete request processed");
    // Note:  even if we didn't find them, send a 200 back because they are gone
    res.status(200).send();
});

// ----------------------------------------------------------------------------
// USER MANAGEMENT

// GET request to check if user name is available
app.get("/api/username_available/:username", function (req, res) {
    let username = req.params.username;
    console.log("Checking to see if this username " + username + " is available");

    let data = fs.readFileSync(__dirname + "/data/users.json", 'utf8');
    data = JSON.parse(data);

    let matchingUser = data.find(user => user.username.toLowerCase() == username.toLowerCase());

    let message;
    if (matchingUser == null) {
        message = "YES";
    }
    else {
        message = "NO";
    }

    console.log("Is user name available? " + message);
    res.end(message);
});

// POST request to add a user
app.post("/api/users", urlencodedParser, function (req, res) {
    console.log("Got a POST request to add a user");
    console.log("BODY -------->" + JSON.stringify(req.body));

    let data = fs.readFileSync(__dirname + "/data/users.json", 'utf8');
    data = JSON.parse(data);

    // check for duplicate username
    let matchingUser = data.find(user => user.username.toLowerCase() == req.body.username.toLowerCase());
    if (matchingUser != null) {
        // username already exists
        console.log("ERROR: username already exists!");
        res.status(403).send();   // forbidden
        return;
    }

    let user = {
        id: getNextId("user"),   // assign new id      
        name: req.body.name,
        role: req.body.role,
        username: req.body.username,
        password: req.body.password
    };

    data.push(user);

    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(data));

    console.log("New user added!");
    console.log(user);
    res.status(200).send();
});

// POST request to login -- sent username and password in request body 
app.post("/api/login", urlencodedParser, function (req, res) {
    console.log("Got a POST request for a user to login");
    console.log("BODY -------->" + JSON.stringify(req.body));

    let data = fs.readFileSync(__dirname + "/data/users.json", 'utf8');
    data = JSON.parse(data);

    // check to see if credentials match a user
    let match = data.find(user => user.username.toLowerCase() == req.body.username.toLowerCase() &&
        user.password == req.body.password);

    if (match == null) {
        // credentials don't match any user
        console.log("Error:  credentials don't match known user");
        res.status(403).send();   // forbidden
        return;
    }

    let user = {
        id: match.id,
        name: match.name,
        role: match.role,
        username: match.username
    };

    // login successful - return user w/o password
    console.log("Login successful for: ");
    console.log(user);
    res.end(JSON.stringify(user));
});

// ------------------------------------------------------------------------------
// SITE SET-UP

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

let server = app.listen(8082, function () {
    let port = server.address().port;

    console.log("App listening at port %s", port);
});
