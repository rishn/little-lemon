// Import SQLite library to work with a local database in the application.
import * as SQLite from "expo-sqlite";

// Open a database named "little_lemon". If it doesn't exist, it will be created automatically.
const db = SQLite.openDatabase("little_lemon");

// Create a table named "menuitems" if it doesn't already exist.
// This table will store menu information, including id, name, price, description, image, and category.
export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);"
        );
      },
      reject, // Handle transaction failure
      resolve  // Handle transaction success
    );
  });
}

// Fetch all menu items from the "menuitems" table.
// Returns a promise that resolves with the rows from the database.
export async function getMenuItems() {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql("select * from menuitems", [], (_, { rows }) => {
        resolve(rows._array); // Extract the rows as an array.
      });
    });
  });
}

// Save a list of menu items into the "menuitems" table.
// Each menu item is inserted using a bulk SQL query.
export function saveMenuItems(menuItems) {
  db.transaction(tx => {
    tx.executeSql(
      `insert into menuitems (id, name, price, description, image, category) values ${menuItems
        .map(
          item =>
            `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`
        )
        .join(", ")}` // Join all individual insert values into a single query.
    );
  });
}

// Filter menu items based on a search query and active categories.
// The query matches item names, and only items in the specified categories are returned.
export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from menuitems where name like ? and category in ('${activeCategories.join(
          "','"
        )}')`,
        [`%${query}%`], // Bind the search query as a parameter to prevent SQL injection.
        (_, { rows }) => {
          resolve(rows._array); // Resolve with the filtered array of rows.
        }
      );
    }, reject); // Handle any transaction errors.
  });
}
