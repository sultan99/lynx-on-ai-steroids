# Architecture Diagram

Functional structure of the application. Shows screens, entities, and cross-domain interactions.
Use this to answer: "Where does new code belong?" and "How do major parts interact?"

```mermaid
flowchart TD
  subgraph Routes["app/routes"]
    R_home["/home"]
    R_profile["/profile"]
    R_bookmarks["/bookmarks"]
    R_cart["/cart"]
    R_orders["/orders"]
  end

  subgraph Screens["screens"]
    S_home["HomeScreen"]
    S_profile["ProfileScreen"]
    S_bookmarks["BookmarksScreen"]
    S_cart["CartScreen"]
    S_orders["OrdersScreen"]
  end

  subgraph Entities["entities"]
    E_donut["Donut\n(DonutCard, queries, types)"]
    E_bakery["Bakery\n(BakeryPromo, queries, types)"]
  end

  R_home --> S_home
  R_profile --> S_profile
  R_bookmarks --> S_bookmarks
  R_cart --> S_cart
  R_orders --> S_orders

  S_profile --> E_donut
  S_profile --> E_bakery
```
