const models = './index.js';

module.exports = function (sequelize, DataTypes) {
  const Question = sequelize.define('questions', {
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
    topic: {
      type: DataTypes.STRING,
      allowNull: false
    },        
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },      
    subcategory: {
      type: DataTypes.STRING,
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

  Question.associate = function (models) {
    // Question.hasOne(models.passages, { 
    //   as: 'passage_id', 
    //   foreignKey: 'questions_passage_id_fkey' 
    // });
    Question.hasMany(models.question_revisions);
  }

  return Question;
}