import { App } from "./app/app"
import { AppDataSource } from "./database/data-source"
import "dotenv/config"

AppDataSource.initialize().then(() => {
  new App().app.listen(process.env.API_PORT)
  
  console.log("Connected")
}).catch((err) => {
  console.error(err)
})