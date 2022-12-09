import moment from "moment";

export const shopData = [
  {
    name: "Swastik Medical Store",
    area: "Badarpur",
    category: "Chemist",
    openingDate: moment("2022-12-12"),
    closingDate: moment("2022-12-16"),
  },
  {
    name: "Singla General Store",
    area: "Thane",
    category: "Grocery",
    openingDate: moment("2022-10-12"),
    closingDate: moment("2022-12-06"),
  },
  {
    name: "Mr B's Cafe",
    area: "Pune",
    category: "Baker",
    openingDate: moment("2022-10-12"),
    closingDate: moment("2022-01-16"),
  },
  {
    name: "Ganpati Chemist",
    area: "Mumbai Suburbun",
    category: "Chemist",
    openingDate: moment("2022-12-10"),
    closingDate: moment("2023-12-16"),
  },
  {
    name: "Krishna Stationery",
    area: "Nashik",
    category: "Stationery",
    openingDate: moment("2023-01-12"),
    closingDate: moment("2023-12-16"),
  },
  {
    name: "P3 Pizza",
    area: "Nagpur",
    category: "Baker",
    openingDate: moment("2022-10-12"),
    closingDate: moment("2022-11-16"),
  },
  {
    name: "Licious Retail Shop",
    area: "Ahmednagar",
    category: "Butcher",
    openingDate: moment("2022-11-12"),
    closingDate: moment("2023-04-16"),
  },
  {
    name: "Bread & Butter",
    area: "Solapur",
    category: "Grocery",
    openingDate: moment("2022-11-04"),
    closingDate: moment("2022-12-30"),
  },
  {
    name: "Classmate Stationery Shop",
    area: "Nashik",
    category: "Stationery",
    openingDate: moment("2022-12-01"),
    closingDate: moment("2022-12-30"),
  },
  {
    name: "Cake and Pastery",
    area: "Badarpur",
    category: "Baker",
    openingDate: moment("2022-09-12"),
    closingDate: moment("2023-12-16"),
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