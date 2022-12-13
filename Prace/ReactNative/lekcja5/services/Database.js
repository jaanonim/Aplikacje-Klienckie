import * as SQLite from "expo-sqlite";

export default class Database {
    static instance = null;
    static getInstance() {
        if (!Database.instance) Database.instance = new Database();
        return Database.instance;
    }

    constructor() {
        this.isSetup = false;
    }

    setup() {
        return new Promise((res) => {
            this.db = SQLite.openDatabase("database_M_M_4i2a.db");
            this.tableName = "Data";
            this.db.transaction((t) =>
                t.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${this.tableName} (id integer primary key not null, h integer, m integer, days text);`,
                    () => {
                        this.isSetup = true;
                        res();
                    },
                    () => {
                        this.isSetup = true;
                        res();
                    }
                )
            );
        });
    }

    clear() {
        return new Promise((res) => {
            this.db.transaction((t) =>
                t.executeSql(
                    `DROP TABLE ${this.tableName};`,
                    () => {
                        this.isSetup = false;
                        res();
                    },
                    () => {
                        this.isSetup = false;
                        res();
                    }
                )
            );
        });
    }

    async insert(data) {
        if (!this.isSetup) await this.setup();
        return await new Promise((resolve, reject) =>
            this.db.transaction((t) => {
                t.executeSql(
                    `INSERT INTO ${this.tableName} (${Object.keys(data).join(
                        ", "
                    )}) values (${Object.values(data)
                        .map((s) => "'" + s + "'")
                        .join(", ")})`,
                    (tx, results) => {
                        resolve(results.insertId);
                    },
                    (tx, results) => {
                        resolve(results.insertId);
                    }
                );
            })
        );
    }

    async update(id, data) {
        if (!this.isSetup) await this.setup();
        return await new Promise((resolve, reject) => {
            const sql = `UPDATE ${this.tableName} SET ${Object.keys(data)
                .map((k) => k + "='" + data[k] + "'")
                .join(" ")} WHERE id=${id}`;
            this.db.transaction((t) => {
                t.executeSql(
                    sql,
                    (tx, results) => {
                        resolve(results.insertId);
                    },
                    (tx, results) => {
                        resolve(results.insertId);
                    }
                );
            });
        });
    }

    async get() {
        if (!this.isSetup) await this.setup();
        return await new Promise((resolve, reject) =>
            this.db.transaction((tx) => {
                tx.executeSql(
                    `SELECT * FROM ${this.tableName}`,
                    [],
                    (tx, results) => {
                        resolve(results.rows._array);
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            })
        );
    }

    async delete(id) {
        if (!this.isSetup) await this.setup();
        this.db.transaction((tx) => {
            tx.executeSql(`DELETE FROM ${this.tableName} WHERE (id = ${id});`);
        });
    }
}
