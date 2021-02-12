const express = require("express");
app = express();

app.use(express.json());

var profile_obj = {};
var tank_array = [];
var tank_count = 0;

app.get("/profile", (req, res) => {
  res.json(profile_obj);
});

app.post("/profile", (req, res) => {
  profile_obj["username"] = req.body["username"];
  profile_obj.role = req.body.role;
  profile_obj["color"] = req.body["color"];
  profile_obj.last_updated = new Date(new Date()).toLocaleString(); // can also use this -> new Date()

  res.json(profile_obj);
});

app.patch("/profile", (req, res) => {
  profile_obj.username = req.body.username || profile_obj.username;
  profile_obj.role = req.body.role || profile_obj.role;
  profile_obj.color = req.body.color || profile_obj.color;
  profile_obj.last_updated = new Date(new Date()).toLocaleString();

  res.json(profile_obj);
});

app.get("/data", function (req, res) {
  res.json(tank_array);
});

app.post("/data", (req, res) => {
  let newTank = {
    id: (tank_count += 1),
    location: req.body.location,
    lat: req.body.lat,
    long: req.body.long,
    percentage_full: req.body.percentage_full,
  };

  tank_array.push(newTank);
  res.json(newTank);
});

app.patch("/data/:id", (req, res) => {
  let id = req.params.id;

  tank_array.forEach((tank) => {
    if (tank.id == id) {
      tank.location = req.body.location || tank.location;
      tank.lat = req.body.lat || tank.lat;
      tank.long = req.body.long || tank.long;
      tank.percentage_full = req.body.percentage_full || tank.percentage_full;
    }
  });

  res.json(tank_array[id - 1]);
});

app.delete("/data/:id", function (req, res) {
  let id = req.params.id;
  tank_array.forEach((tank) => {
    if (tank.id == id) {
      tank_array.splice(tank_array.indexOf(tank), 1);
    }
  });

  res.json({
    success: true,
  });
});
app.listen(5000);
