module.exports = function (sequelize, DataTypes) {
  const Passage = sequelize.define('passages', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    section: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    type: {
      type: DataTypes.TEXT
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  // Passage.associate = function (models) {
  //   Passage.hasOne(models.PassageRevision);
  // }

  return Passage;
}