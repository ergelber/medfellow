module.exports = function (sequelize, DataTypes) {
  const QuestionRevision = sequelize.define('question_revisions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },   
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    long_explanation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    short_explanation: {
      type: DataTypes.TEXT,
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

  QuestionRevision.associate = function (models) {
    QuestionRevision.belongsTo(models.questions, { 
      as: 'question_id', 
      foreignKey: {
        name: 'question_revisions_question_id_fkey',
        field: 'question_id'
      },
      targetKey: 'id'
    });
    QuestionRevision.hasMany(models.answers, {
      as: 'answers',
      foreignKey: 'revision_id'
    })
  }

  return QuestionRevision;
}