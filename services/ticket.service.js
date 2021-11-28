const service = {};

const dotenv = require("dotenv");
dotenv.config();

var zendesk = require('node-zendesk');

//pagination
paginator = (items, page) => {

    var page = page || 1,
        per_page = 25,
        offset = (page - 1) * per_page,

        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
    return {
        results: paginatedItems,
        total_pages: total_pages,
        page: page,
    };
}


var client = zendesk.createClient({
    username: process.env.EMAIL,
    token: process.env.ZENDESKTOKEN,
    remoteUri: process.env.REMOTEURI
});

service.getUser = (req, res, next) => {
    client.users.list(function (err, req, result) {
        if (err) {
            console.log(err);
            res.status(404).render('error', { error: "Sorry, API is not available" });
            return;
        }
        try {
            res.send({ user: result.map(function (user) { return user; }), totalUser: result.length });
        } catch (err) {
            console.log(err);
            res.status(404).render('error', { error: "Sorry, a program error has occured!" });
        }
    });
}

service.getTickets = (req, res, next) => {
    try {
        client.tickets.list(function (err, statusList, body, responseList, resultList) {
            if (err) {
                console.log(err);
                res.status(404).render('error', { error: "Sorry, API is not available" });
                return;
            }

            body = paginator(body, req.query.page)
            res.status(200).render('index', { results: body.results, total_pages: body.total_pages, page: body.page, totalItems: body.length });
            // res.send( { results: body.results, total_pages: body.total_pages, page: body.page});
        });
    } catch (err) {
        console.log(err);
        res.status(404).render('error', { error: "Sorry, page not found!" });


    };
}

service.getTicket = (req, res, next) => {

    try {
        client.search.query(req.params.id, function (err, req, result) {
            if (err) {
                console.log(err);
                res.status(404).render('error', { error: "Sorry, API is not available or invalid ticket id" });
                return;
            }

            res.render('details', { result: result });
            // res.send(result);
        });
    } catch {
        console.log(err);
        res.status(404).render('error', { error: "Sorry, page not found!" });
    }
}



module.exports = service;
