module.exports = function (sequelize, DataTypes) {
  const Answers = sequelize.define('answers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: false
    },
    ordering: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  });

  Answers.associate = function (models) {
    Answers.belongsTo(models.question_revisions, { 
      as: 'revision_id', 
      foreignKey: {
        name: 'answers_revision_id_fk',
        field: 'revision_id'
      }
    });
  }

  return Answers;
}

