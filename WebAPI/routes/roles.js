var express = require("express");
var router = express.Router();
const roleModel = require("./../model/roles");

/* creating new role */
router.post("/create", (req, res) => {
  let role = {
    RoleType: req.body.Role
  };

  roleModel.create(role, (err, data) => {
    if (err) {
      res.send({ status: 500, error: err });
    } else {
      roleModel.find({},{ _id: 0, RoleType: 1}).exec((err, data) => {
        if (err) {
          res.send({ status: 500, error: err });
        }
        res.send({ status: 200, roles: data });
      });
    }
  });
});

/* get all roles */
router.get("/", (req, res) => {
  roleModel.find({},{ _id: 0, RoleType: 1}).exec((err, data) => {
    if (err) {
      res.send({ status: 500, error: err });
    }
    res.send({ status: 200, roles: data });
  });
});

/* checking role */
router.post("/", (req, res) => {
  let role = {
    RoleType: req.body.Role
  };
  roleModel.findOne(role, (err, data) => {
    if (err) {
      res.send({ status: 500, error: err });
    } else {
      if(data)
        res.send({ status: 200, message: "found" });
      else
      res.send({ status: 404, message: "not found" });
    }
  });
});

module.exports = router;
