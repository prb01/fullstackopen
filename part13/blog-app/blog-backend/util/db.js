const { Sequelize } = require("sequelize")
const { DB_URL } = require("./config")
const { Umzug, SequelizeStorage } = require("umzug")

const sequelize = new Sequelize(DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

const umzug = new Umzug({
  migrations: { glob: "migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})

const runMigrations = async () => {
  const migrations = await umzug.up()
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  })
}

const rollbackMigration = async () => {
  const migration = await umzug.down()
  console.log("Migration rolled back", {
    files: migration,
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    // await rollbackMigration()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

module.exports = {
  sequelize,
  connectToDatabase,
  runMigrations,
  rollbackMigration,
}
