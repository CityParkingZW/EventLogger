const db = require("../config/db");

const Service = {
  getAll: async () => {
    const result = await db.query("SELECT * FROM services");
    return result.recordset;
  },

  getById: async (id) => {
    const result = await db.query(
      "SELECT * FROM services WHERE service_id = @id",
      {
        id: { type: db.sql.Int, value: id },
      }
    );
    return result.recordset[0];
  },

  create: async (service) => {
    const result = await db.query(
      `
      INSERT INTO services (service_name, description)
      OUTPUT INSERTED.*
      VALUES (@service_name, @description)
    `,
      {
        service_name: { type: db.sql.VarChar, value: service.service_name },
        description: { type: db.sql.Text, value: service.description },
      }
    );
    return result.recordset[0];
  },

  update: async (id, service) => {
    const result = await db.query(
      `
      UPDATE services
      SET service_name = @service_name,
          description = @description
      OUTPUT INSERTED.*
      WHERE service_id = @id
    `,
      {
        id: { type: db.sql.Int, value: id },
        service_name: { type: db.sql.VarChar, value: service.service_name },
        description: { type: db.sql.Text, value: service.description },
      }
    );
    return result.recordset[0];
  },

  delete: async (id) => {
    await db.query("DELETE FROM services WHERE service_id = @id", {
      id: { type: db.sql.Int, value: id },
    });
  },
};

module.exports = Service;
