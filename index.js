const app = require("express")();

const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");

const getFilteredData = require("./filters");
const summaryRoutes = require("./routes/summary");

const APP_SERVER_PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());


app.get("/api/ping", (_, res) => res.status(200).send("pong"));

app.use("/api/v1/filters", getFilteredData(app));

app.use("/api/v1/summary", summaryRoutes(app));

app.get("/api/v1/data", (req, res, next) => {
  switch (`${req.query.dashboard_type}_${req.query.report_type}`) {
    // EXECUTIVE
    case "executive_card_summary":
      res.redirect(
        `/api/v1/summary/executive/cards?${req.originalUrl.split("?")[1]}`
      );
      break;
    case "executive_channels_tablereport":
      res.redirect(
        `/api/v1/summary/executive/channels/tablereport?${
          req.originalUrl.split("?")[1]
        }`
      );
      break;
    case "executive_categories_tablereport":
      res.redirect(
        `/api/v1/summary/executive/categories/tablereport?${
          req.originalUrl.split("?")[1]
        }`
      );
      break;

    default:
      next();
  }
});

app.listen(APP_SERVER_PORT, _ => {
  console.log(`Listening on ${APP_SERVER_PORT}`);
});
