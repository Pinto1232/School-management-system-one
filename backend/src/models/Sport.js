const mongoose = require("mongoose");

const sportsSchema = new mongoose.Schema({
  sportsID: {
    type: String,
    required: true,
  },
  sportsName: {
    type: String,
    required: true,
  },
  sportsType: {
    type: String,
    required: true,
  },
  sportsSchedule: {
    type: String,
    required: true,
  },
  teamID: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  teamRoster: {
    type: Array,
    required: true,
  },
  playerID: {
    type: String,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
  playerPosition: {
    type: String,
    required: true,
  },
  gameID: {
    type: String,
    required: true,
  },
  gameDate: {
    type: Date,
    required: true,
  },
  gameLocation: {
    type: String,
    required: true,
  },
  gameStatisticsReport: {
    type: String,
    required: true,
  },
  sportsTrendAnalysis: {
    type: String,
    required: true,
  },
  sportsFeedbackReport: {
    type: String,
    required: true,
  },
  sportsImprovementPlan: {
    type: String,
    required: true,
  },
  sportsEventReport: {
    type: String,
    required: true,
  },
});

const Sports = mongoose.model("Sports", sportsSchema);

const createSports = async (
  sportsID,
  sportsName,
  sportsType,
  sportsSchedule,
  teamID,
  teamName,
  teamRoster,
  playerID,
  playerName,
  playerPosition,
  gameID,
  gameDate,
  gameLocation,
  gameStatisticsReport,
  sportsTrendAnalysis,
  sportsFeedbackReport,
  sportsImprovementPlan,
  sportsEventReport
) => {
  const sports = new Sports({
    sportsID,
    sportsName,
    sportsType,
    sportsSchedule,
    teamID,
    teamName,
    teamRoster,
    playerID,
    playerName,
    playerPosition,
    gameID,
    gameDate,
    gameLocation,
    gameStatisticsReport,
    sportsTrendAnalysis,
    sportsFeedbackReport,
    sportsImprovementPlan,
    sportsEventReport,
  });

  try {
    const result = await sports.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = createSports;
