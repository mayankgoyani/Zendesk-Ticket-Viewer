const request = require("supertest");
const app = require("./app");

describe("Home Page & Ticket List", () => {
    test("It should be HTML page and contains tickets", done => {
        request(app)
            .get("/ticket")
            .expect("Content-type", /html/)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.text.toString().includes('Ticket id:')).toBe(true);
                done();
            });
    });
});


describe("Page with Pagination & Ticket List", () => {
    test("It should be HTML page and contains tickets", done => {
        request(app)
            .get("/ticket?pag=1")
            .expect("Content-type", /html/)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.text.toString().includes('Ticket id:')).toBe(true);
                done();
            });
    });
});

describe("Page that contains detailed information of ticket", () => {
    test("It should be HTML page and contain ticket details", done => {
        request(app)
            .get("/ticket/202")
            .expect("Content-type", /html/)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.text.toString().includes('Ticket id:')).toBe(true);
                done();
            });
    });
});

describe("Ticket id that is not exist", () => {
    test("It should be error page", done => {
        request(app)
            .get("/ticket/5000")
            .expect("Content-type", /html/)
            .then(response => {
                expect(response.statusCode).toBe(404);
                expect(response.text.toString().includes('page not found')).toBe(true);
                done();
            });
    });
});

describe("Page that is not exist", () => {
    test("It should be error page", done => {
        request(app)
            .get("/xyz")
            .expect("Content-type", /html/)
            .then(response => {
                expect(response.statusCode).toBe(404);
                expect(response.text.toString().includes('page not found')).toBe(true);
                done();
            });
    });
});

describe("getUser API", () => {
    test("It should return response in json format", done => {
        request(app)
            .get("/ticket/getUser")
            .expect("Content-type", /json/)
            .then(response => {
                expect(response.statusCode).toBe(200);
                // expect(response.text.toString().includes('page not found')).toBe(true);
                done();
            });
    });
});