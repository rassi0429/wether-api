import axios from "axios"
import express from "express"
const app = express()
app.listen(3000,() => console.log("OK"))

const API_KEY = process.env.WEATHER_API_KEY
if(!API_KEY) throw new Error("API KEY NOT PROVIDED")

let cache = {}

async function getWeatherInfo() {
    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=35.37568&lon=139.5783&appid="+API_KEY)
    cache = data
    console.log("Weather Cache Updated!")
}
await getWeatherInfo()
setInterval(() => getWeatherInfo(), 15 * 60 * 1000)

app.get("/", (req,res) => {
    res.send(cache)
})