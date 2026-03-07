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
        notNull: {
          msg: "Acronym value was null",
        },
        notEmpty: {
          msg: "Acronym cannot be empty",
        },
        len: {
          args: [2, 15],
          msg: "Acronym must be between 2 and 15 characters",
        },
      },
    },

    definition: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Definition value was null",
        },
        notEmpty: {
          msg: "Definition cannot be empty",
        },
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
