module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
    created_at: DataTypes.DATE
  }, {
    tableName: 'contacts',
    timestamps: false
  });

  return Contact;
};
