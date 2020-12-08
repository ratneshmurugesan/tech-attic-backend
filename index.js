const app = require("express")();

const bodyParser = require("body-parser");

const getFilteredData = require("./filters");
const summaryRoutes = require("./routes/summary");

const APP_SERVER_PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("*", (_, res) => res.status(200).send("tech-attic-node"));


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
    case "executive_channels_metrics_timeline":
      res.redirect(
        `/api/v1/summary/executive/channels/metrics-timeline?${
          req.originalUrl.split("?")[1]
        }`
      );
      break;
    case "executive_categories_metrics_timeline":
      res.redirect(
        `/api/v1/summary/executive/categories/metrics-timeline?${
          req.originalUrl.split("?")[1]
        }`
      );
      break;

    // SOCIAL - SUMMARY
    case "social_card_summary":
      res.redirect(
        `/api/v1/summary/social/cards?${req.originalUrl.split("?")[1]}`
      );
      break;
    case "social_categories_tablereport":
      res.redirect(
        `/api/v1/summary/social/categories/tablereport?${
          req.originalUrl.split("?")[1]
        }`
      );
      break;
    case "social_program_summary":
      res.redirect(
        `/api/v1/summary/social/program/table_with_legend?${
          req.originalUrl.split("?")[1]
        }`
      );
      break;
    // SOCIAL - CREATIVE
    case "social_headline_one":
      res.redirect(
        `/api/v1/summary/social/headline_one?${req.originalUrl.split("?")[1]}`
      );
      break;
    case "social_headline_two":
      res.redirect(
        `/api/v1/summary/social/headline_two?${req.originalUrl.split("?")[1]}`
      );
      break;
    case "social_headline_three":
      res.redirect(
        `/api/v1/summary/social/headline_three?${req.originalUrl.split("?")[1]}`
      );
      break;
    case "social_description_one":
      res.redirect(
        `/api/v1/summary/social/description_one?${
          req.originalUrl.split("?")[1]
        }`
      );
      break;
    case "social_description_two":
      res.redirect(
        `/api/v1/summary/social/description_two?${
          req.originalUrl.split("?")[1]
        }`
      );
      break;
    // SEARCH - SUMMARY
    case "search_categories_tablereport":
      res.redirect(
        `/api/v1/summary/search/categories/tablereport?${
          req.originalUrl.split("?")[1]
        }`
      );
      break;
    case "search_brands":
      res.redirect(
        `/api/v1/summary/search/brands?${req.originalUrl.split("?")[1]}`
      );
      break;
    case "search_engines":
      res.redirect(
        `/api/v1/summary/search/engines?${req.originalUrl.split("?")[1]}`
      );
      break;
    case "search_keyword_categories":
      res.redirect(
        `/api/v1/summary/search/keyword-categories?${
          req.originalUrl.split("?")[1]
        }`
      );
      break;
    case "search_keywords":
      res.redirect(
        `/api/v1/summary/search/keywords?${req.originalUrl.split("?")[1]}`
      );
      break;
    // SEARCH - CREATIVE
    case "search_headline_one":
      res.redirect(
        `/api/v1/summary/search/headline_one?${req.originalUrl.split("?")[1]}`
      );
      break;
    case "search_headline_two":
      res.redirect(
        `/api/v1/summary/search/headline_two?${req.originalUrl.split("?")[1]}`
      );
      break;
    case "search_headline_three":
      res.redirect(
        `/api/v1/summary/search/headline_three?${req.originalUrl.split("?")[1]}`
      );
      break;
    case "search_description_one":
      res.redirect(
        `/api/v1/summary/search/description_one?${
          req.originalUrl.split("?")[1]
        }`
      );
      break;
    case "search_description_two":
      res.redirect(
        `/api/v1/summary/search/description_two?${
          req.originalUrl.split("?")[1]
        }`
      );
      break;

    case "dma_report_by_region":
      res.redirect(
        `/api/v1/summary/dma/report?${req.originalUrl.split("?")[1]}`
      );
      break;

    default:
      next();
  }
});

app.listen(APP_SERVER_PORT, _ => {
  console.log(`Listening on ${APP_SERVER_PORT}`);
});
