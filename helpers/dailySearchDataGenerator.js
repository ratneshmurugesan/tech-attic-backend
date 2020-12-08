const faker = require("faker");
const addDays = require("date-fns/addDays");
const differenceInDays = require("date-fns/differenceInDays");
const metrics = require("../entities").metrics;
const programs = require("../entities").programs;
const campaigns = require("../entities").campaigns;

const startDate = new Date("2020-01-01");
const endDate = new Date();
const dateDiff = differenceInDays(endDate, startDate);
const result = [];
const randomMetricGen = metrics => {
  const visits = faker.random.number({ min: 400, max: 500 });

  const spend = faker.random.number({ min: 30, max: 50 });
  const spend_target = faker.random.number({ min: 50, max: 55 });

  const leads = faker.random.number({ min: 200, max: 300 });

  const prospects = faker.random.number({ min: 50, max: 75 });

  const applications = faker.random.number({ min: 40, max: 50 });
  const applications_target = faker.random.number({ min: 50, max: 55 });

  const va = faker.random.number({ min: 10, max: 30 });

  const conversions = faker.random.number({ min: 5, max: 10 });

  const clicks = faker.random.number({ min: 200, max: 350 });
  const impressions = faker.random.number({ min: 10000, max: 12500 });

  const cpv = +(spend / visits).toFixed(2);
  const cpl = +(spend / leads).toFixed(2);
  const cpp = +(spend / prospects).toFixed(2);
  const cpa = +(spend / applications).toFixed(2);
  const cpva = +(spend / va).toFixed(2);
  const cpc = +(spend / conversions).toFixed(2);
  const ctr = +((clicks / impressions) * 100).toFixed(2);

  return metrics.reduce((acc, m) => {
    switch (m.name) {
      case "spend":
        acc[m.name] = spend;
        acc["spend_target"] = spend_target;
        break;
      case "visits":
        acc[m.name] = visits;
        break;
      case "leads":
        acc[m.name] = leads;
        break;
      case "prospects":
        acc[m.name] = prospects;
        break;
      case "applications":
        acc[m.name] = applications;
        acc["applications_target"] = applications_target;
        break;
      case "va":
        acc[m.name] = va;
        break;
      case "conversions":
        acc[m.name] = conversions;
        break;
      case "clicks":
        acc[m.name] = clicks;
        break;
      case "impressions":
        acc[m.name] = impressions;
        break;

      case "cpv":
        acc[m.name] = cpv;
        break;
      case "cpl":
        acc[m.name] = cpl;
        break;
      case "cpp":
        acc[m.name] = cpp;
        break;
      case "cpa":
        acc[m.name] = cpa;
        break;
      case "cpva":
        acc[m.name] = cpva;
        break;
      case "cpc":
        acc[m.name] = cpc;
        break;
      case "ctr":
        acc[m.name] = ctr;
        break;

      default:
        break;
    }
    return acc;
  }, {});
};

for (let i = 0; i < dateDiff; i++) {
  for (let j = 0; j < campaigns.length; j++) {
    const dailyData = Object.assign(
      {},
      { date: addDays(startDate, i) },
      campaigns[j],
      {
        program_name: programs.filter(pgm => pgm.id === campaigns[j].program)[0]
          .name,
      },
      randomMetricGen(metrics)
    );
    result.push(dailyData);
  }
}

module.exports = result;
