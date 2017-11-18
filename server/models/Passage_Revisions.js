module.exports = function (sequelize, DataTypes) {
  const PassageRevision = sequelize.define('passage_revisions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
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
  });

  // PassageRevision.associate = function(models) {
  //   PassageRevision.belongsTo(models.Passage, { 
  //     as: 'passage_id', 
  //     foreignKey: 'passage_revisions_passage_id_fkey',
  //     targetKey: 'id'
  //   });
  // }

  return PassageRevision;
}
