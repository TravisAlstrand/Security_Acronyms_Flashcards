const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Flashcard = sequelize.define(
  "Flashcard",
  {
    acronym: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 15],
      },
    },

    definition: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    hint: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Flashcards",
    timestamps: false,
    hooks: {
      beforeValidate(card) {
        if (card.acronym) {
          card.acronym = card.acronym.toUpperCase();
        }
      },
    },
  },
);

module.exports = Flashcard;
