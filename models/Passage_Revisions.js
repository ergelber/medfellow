module.exports = function (sequelize, DataTypes) {
  const PassageRevision = sequelize.define('passage_revisions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW 
    }
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  });

  // PassageRevision.associate = function(models) {
  //   PassageRevision.belongsTo(models.Passage, { 
  //     as: 'passage_id', 
  //     foreignKey: 'passage_revisions_passage_id_fkey',
  //     targetKey: 'id'
  //   });
  // }

  PassageRevision.associate = function (models) {
    PassageRevision.belongsTo(models.passages, {
      as: 'passage_id',
      foreignKey: {
        name: 'passage_revisions_passage_id_fkey',
        field: 'passage_id'
      },
      targetKey: 'id'
    });
  }

  return PassageRevision;
}
