import { App } from "./app/app"
import { AppDataSource } from "./database/data-source"
import "dotenv/config"

AppDataSource.initialize().then(() => {
  new App().app.listen(process.env.PORT || 3333, () => { console.log("Connected.") })
}).catch((error) => { console.error(error) })
