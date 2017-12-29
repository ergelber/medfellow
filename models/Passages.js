module.exports = function (sequelize, DataTypes) {
  const Passage = sequelize.define('passages', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  });

  Passage.associate = function (models) {
    Passage.hasMany(models.passage_revisions);
    Passage.hasMany(models.questions);
  }

  return Passage;
}