import express from 'express';

const PORT = 8888; // app is going to run on this port. 

const app = express(); // instantiating express app here.

/**
 *  @description simple endpoint /ping for health check
 */
app.get('/ping', function (req, res) {
    res.send("pong");
});

app.get("/greetings", function (req, res) {
    //console.log("req =", req);
    //res.send("Hello from Greetings");
    //res.send(req.query);
    const { name, location, occupation } = req.query;

    // lets say we go and query database
    // this.adapter.find({
    // query: {name, location, occupation }
    //  });

    res.send ({
        _id: '1',
        name,
        location,
        occupation,
        age: 35,
        favoriteFood: 'chocolate ice cream',
        hobbies: ["hockey", "jogging"],
    });
});

app.listen(PORT, function () {
    console.log('App is running on port: ' + PORT);
})