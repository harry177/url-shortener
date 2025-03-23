import { Clicks } from "./clickModel";
import { Urls } from "./urlModel";

Clicks.belongsTo(Urls, {
  foreignKey: 'shortUrlId',
  as: 'url'
});

Urls.hasMany(Clicks, {
  foreignKey: 'shortUrlId',
  as: 'clicks'
});
