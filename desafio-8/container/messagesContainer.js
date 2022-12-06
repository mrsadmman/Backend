const { option } = require("../db/config/sqlite");
const knex = require("knex")(option);

class Messages {
    constructor(table) {
        this.table = table;
    }

    async getAll() {
        try {
            const messagesList = await knex(this.table).select("*");
            if (messagesList.length > 0) {
                return messagesList;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async save(obj) {
        try {
            await knex(this.table).insert(obj)
            console.log('registro creado:', obj);
        } catch (error) {
            console.log(error);

        }
    }

}


module.exports = Messages;



