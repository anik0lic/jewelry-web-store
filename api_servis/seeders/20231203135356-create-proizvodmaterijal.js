'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('proizvodmaterijal',
    [
        {id: "1",proizvod_id:1, materijal_id:2},
        {id: "2",proizvod_id:2, materijal_id:1},
        {id: "3",proizvod_id:3, materijal_id:2},
        {id: "4",proizvod_id:4, materijal_id:1},
        {id: "5",proizvod_id:5, materijal_id:3},
        {id: "6",proizvod_id:6, materijal_id:2},
        {id: "7",proizvod_id:7, materijal_id:1},
        {id: "8",proizvod_id:8, materijal_id:3},
        {id: "9",proizvod_id:9, materijal_id:1},
        {id: "10",proizvod_id:10, materijal_id:3},
        {id: "11",proizvod_id:11, materijal_id:1},
        {id: "12",proizvod_id:12, materijal_id:3},
        {id: "13",proizvod_id:13, materijal_id:2},
        {id: "14",proizvod_id:14, materijal_id:2},
        {id: "15",proizvod_id:15, materijal_id:1},
        {id: "16",proizvod_id:16, materijal_id:3},
        {id: "17",proizvod_id:17, materijal_id:2},
        {id: "18",proizvod_id:18, materijal_id:1},
        {id: "19",proizvod_id:19, materijal_id:2},
        {id: "20",proizvod_id:20, materijal_id:1},
        {id: "21",proizvod_id:21, materijal_id:3},
        {id: "22",proizvod_id:22, materijal_id:2},
        {id: "23",proizvod_id:23, materijal_id:1},
        {id: "24",proizvod_id:24, materijal_id:3},
        {id: "25",proizvod_id:25, materijal_id:1},
        {id: "26",proizvod_id:26, materijal_id:3},
        {id: "27",proizvod_id:27, materijal_id:1},
        {id: "28",proizvod_id:28, materijal_id:3},
        {id: "29",proizvod_id:29, materijal_id:2},
        {id: "30",proizvod_id:30, materijal_id:2},
        {id: "31",proizvod_id:31, materijal_id:1},
        {id: "32",proizvod_id:32, materijal_id:3}
    ]); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProizvodMaterijal', null, {});
  }
};
