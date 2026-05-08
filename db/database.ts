import * as SQLite from "expo-sqlite";
import { WorkOrder } from "@/types/WorkOrder";
import { User } from "@/types/User";

const db = SQLite.openDatabaseSync("electroman.db");

export function initDatabase() {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS Users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName     TEXT NOT NULL,
      lastName      TEXT NOT NULL,
      username      TEXT NOT NULL UNIQUE,
      password      TEXT NOT NULL,
      birthdate     TEXT NOT NULL,
      municipality  TEXT NOT NULL,
      postalcode    TEXT NOT NULL,
      street        TEXT NOT NULL,
      houseNumber   TEXT NOT NULL,
      box           TEXT
    );

    CREATE TABLE IF NOT EXISTS WorkOrders (
      id                          INTEGER PRIMARY KEY AUTOINCREMENT,
      city                        TEXT NOT NULL,
      device                      TEXT NOT NULL,
      problemCode                 TEXT NOT NULL,
      customerName                TEXT NOT NULL,
      processed                   INTEGER NOT NULL DEFAULT 0,
      detailedProblemDescription  TEXT NOT NULL,
      repairInformation           TEXT
    );
  `)
}

export function seedDatabase() {
  db.execSync(`DELETE FROM Users;`);
  db.execSync(`DELETE FROM WorkOrders;`);

  db.runSync(
    `INSERT INTO Users (firstName, lastName, username, password, birthdate, municipality, postalcode, street, houseNumber, box) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      "Serdar",
      "Bozkurt",
      "test",
      "test",
      "1997-03-04",
      "Beringen",
      "3580",
      "Main Street",
      "123",
      ""
    ]
  );

  const workOrders = [
    ["Antwerp", "Washing Machine", "E01", "John Doe", 0, "The washing machine is not spinning.", ""],
    ["Brussels", "Refrigerator", "E02", "Jane Smith", 0, "The refrigerator is making a loud noise.", ""],
    ["Ghent", "Oven", "E03", "Alice Johnson", 0, "The oven is not heating up.", ""],
    ["Liège", "Dishwasher", "E04", "Bob Brown", 0, "The dishwasher is leaking water.", ""],
    ["Charleroi", "Microwave", "E05", "Charlie Davis", 0, "The microwave is not turning on.", ""]
  ];

  workOrders.forEach((workOrder) => {
    db.runSync(
      `INSERT INTO WorkOrders (city, device, problemCode, customerName, processed, detailedProblemDescription, repairInformation) 
      VALUES (?, ?, ?, ?, 0, ?, ?);`,
      workOrder
    );
  });
}

export function getUserByCredentials(username: string, password: string): User | null {
  const result = db.getFirstSync<any>(
    `SELECT * FROM Users WHERE username = ? AND password = ?;`,
    [username, password]
  );

  if (!result) return null;

  return {
    ...result,
    birthdate: new Date(result.birthdate),
  };
}

export function getUserById(id: number): User | null {
  const result = db.getFirstSync<any>(
    `SELECT * FROM Users WHERE id = ?;`,
    [id]
  );
  return result ?? null;
}

export function createUser(user: Omit<User, 'id'>): void {
  db.runSync(
    `INSERT INTO Users (firstName, lastName, username, password, birthdate, municipality, postalCode, street, houseNumber, box) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      user.firstName,
      user.lastName,
      user.username,
      user.password,
      user.birthdate.toISOString(),
      user.municipality,
      user.postalcode,
      user.street,
      user.houseNumber,
      user.box ?? ""
    ]
  );
}