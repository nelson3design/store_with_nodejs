

import "dotenv/config"

const dbUser=process.env.DB_USER
const dbPass = process.env.DB_PASS

export default {
    url: `mongodb+srv://${dbUser}:${dbPass}@cluster0.eyt4oly.mongodb.net/?retryWrites=true&w=majority`
}