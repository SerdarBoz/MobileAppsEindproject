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
      postalCode    TEXT NOT NULL,
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