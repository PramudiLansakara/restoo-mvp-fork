export default [
  ["mdi-view-dashboard-outline", "Dashboard", "/dashboard", []],
  [
    "mdi-food-apple-outline",
    "Menu",
    "/menu",
    [
      ["mdi-food-drumstick-outline", "Menu", "/menu"],
      ["mdi-format-list-bulleted-square", "Categories", "/menu/categories"]
    ]
  ],
  ["mdi-clipboard-edit-outline", "Orders", "/orders", []],
  ["mdi-tag-outline", "Events", "/events", [
    ["mdi-food-drumstick-outline", "Events", "/events"],
      ["mdi-format-list-bulleted-square", "Specials", "/events/specials"]
  ]],
  ["mdi-table-chair", "Reservations", "/reservations", []],
  ["mdi-table-furniture", "Tables", "/tables", []]

];
