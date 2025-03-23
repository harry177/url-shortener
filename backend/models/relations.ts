import { Clicks } from "./clickModel";
import { Urls } from "./urlModel";

Clicks.belongsTo(Urls, {
  foreignKey: "shortUrlId",
  as: "new_urls",
});

Urls.hasMany(Clicks, {
  foreignKey: "shortUrlId",
  as: "clicks",
});
