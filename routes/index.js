const { error, log } = require("console");
const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { tittle: "Sport Teams" });
});

router.get("/teams", (req, res) => {
  fs.readFile("./resources/teams.json", "utf-8", (error, data) => {
    if (error) {
      console.log("An error has ocurred:" + error);
    } else {
      const teams = JSON.parse(data);
      res.render("teams", { tittle: "Sport teams", teams: teams});
    }
  })
});

router.post("/", (req, res) => {
  fs.readFile("./resources/teams.json", "utf-8", (error, data) => {
    if (error) {
      console.log("An error has ocurred:" + error);
    } else {
      const teams = JSON.parse(data);
      const { teamId, teamName, teamSport, teamLeague, teamBudge } = req.body;

      const team = {
        teamId: teamId,
        teamName: teamName,
        teamSport: teamSport,
        teamLeague: teamLeague,
        teamBudge: teamBudge,
      };
      teams.push(team);
      fs.writeFile("./resources/teams.json", JSON.stringify(teams), (error) => {
        if (error) {
          console.log("An error has ocurred:" + error);
        } else {
          res.redirect("/teams");
        }
      });
    }
  });
});

router.post("/editTeam", (req, res) => {
  fs.readFile("./resources/teams.json", "utf-8", (error, data) => {
    if (error) {
      console.log("An error has ocurred:" + error);
    } else {
      const teams = JSON.parse(data);
      const { teamId, teamName, teamSport, teamLeague, teamBudge } = req.body;

      teams.forEach(team => {
        if (team.teamId == teamId) {
          team.teamName = teamName
          team.teamSport = teamSport
          team.teamLeague = teamLeague
          team.teamBudge = teamBudge
        }else {
          console.log("There is no team with that id");
        }
      });
      fs.writeFile("./resources/teams.json", JSON.stringify(teams), (error) => {
        if (error) {
          console.log("An error has ocurred:" + error);
        } else {
          res.redirect("/teams");
        }
      });
    }
  });
});

router.post("/deleteTeam", (req, res) => {
  fs.readFile("./resources/teams.json", "utf-8", (error, data) => {
    if (error) {
      console.log("An error has ocurred:" + error);
    } else {
      const teams = JSON.parse(data);
      teams.splice(req.body.index, 1)
      fs.writeFile("./resources/teams.json", JSON.stringify(teams), (error) => {
        if (error) {
          console.log("An error has ocurred:" + error);
        } else {
          res.send("All good");
        }
      });
    }
  });
});

module.exports = router;
