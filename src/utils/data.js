import { v4 as uuidv4 } from 'uuid';

export const shopData = [
  {
    name: "Swastik Medical Store",
    area: "Badarpur",
    category: "Chemist",
    openingDate: new Date("2022-12-12").getTime(),
    closingDate: new Date("2022-12-16").getTime(),
    id: uuidv4(),
  },
  {
    name: "Singla General Store",
    area: "Thane",
    category: "Grocery",
    openingDate: new Date("2022-10-12").getTime(),
    closingDate: new Date("2022-12-06").getTime(),
    id: uuidv4(),
  },
  {
    name: "Mr B's Cafe",
    area: "Pune",
    category: "Baker",
    openingDate: new Date("2022-10-12").getTime(),
    closingDate: new Date("2022-01-16").getTime(),
    id: uuidv4(),
  },
  {
    name: "Ganpati Chemist",
    area: "Mumbai Suburbun",
    category: "Chemist",
    openingDate: new Date("2022-12-10").getTime(),
    closingDate: new Date("2023-12-16").getTime(),
    id: uuidv4(),
  },
  {
    name: "Krishna Stationery",
    area: "Nashik",
    category: "Stationery",
    openingDate: new Date("2023-01-12").getTime(),
    closingDate: new Date("2023-12-16").getTime(),
    id: uuidv4(),
  },
  {
    name: "P3 Pizza",
    area: "Nagpur",
    category: "Baker",
    openingDate: new Date("2022-10-12").getTime(),
    closingDate: new Date("2022-11-16").getTime(),
    id: uuidv4(),
  },
  {
    name: "Licious Retail Shop",
    area: "Ahmednagar",
    category: "Butcher",
    openingDate: new Date("2022-11-12").getTime(),
    closingDate: new Date("2023-04-16").getTime(),
    id: uuidv4(),
  },
  {
    name: "Bread & Butter",
    area: "Solapur",
    category: "Grocery",
    openingDate: new Date("2022-11-04").getTime(),
    closingDate: new Date("2022-12-30").getTime(),
    id: uuidv4(),
  },
  {
    name: "Classmate Stationery Shop",
    area: "Nashik",
    category: "Stationery",
    openingDate: new Date("2022-12-01").getTime(),
    closingDate: new Date("2022-12-30").getTime(),
    id: uuidv4(),
  },
  {
    name: "Cake and Pastery",
    area: "Badarpur",
    category: "Baker",
    openingDate: new Date("2022-09-12").getTime(),
    closingDate: new Date("2023-12-16").getTime(),
    id: uuidv4(),
  }
];

export const areaDropdownOptions = [
  {
    value: "Badarpur",
    label: "Badarpur",
  },
  {
    value: "Thane",
    label: "Thane",
  },
  {
    value: "Pune",
    label: "Pune",
  },
  {
    value: "Mumbai Suburbun",
    label: "Mumbai Suburbun",
  },
  {
    value: "Nashik",
    label: "Nashik",
  },
  {
    value: "Nagpur",
    label: "Nagpur",
  },
  {
    value: "Ahmednagar",
    label: "Ahmednagar",
  },
  {
    value: "Solapur",
    label: "Solapur",
  },
];

export const categoryDropdownOptions = [
  {
    value: "Chemist",
    label: "Chemist",
  },
  {
    value: "Grocery",
    label: "Grocery",
  },
  {
    value: "Baker",
    label: "Baker",
  },
  {
    value: "Butcher",
    label: "Butcher",
  },
  {
    value: "Stationery",
    label: "Stationery",
  },
]