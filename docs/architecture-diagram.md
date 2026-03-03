# Architecture Diagram

Functional structure of the application. Shows screens, entities, and cross-domain interactions.
Use this to answer: "Where does new code belong?" and "How do major parts interact?"

```mermaid
flowchart TD
  subgraph Screens["screens"]
    S_splash["SplashScreen<br/>/"]
    S_onboarding["OnboardingScreen<br/>/onboarding"]
    S_home["HomeScreen<br/>/home"]
    S_catalog["CatalogScreen<br/>/catalog"]
    S_product["ProductDetailScreen<br/>/product/$donutId"]
    S_cart["CartScreen<br/>/cart"]
    S_orderTracking["OrderTrackingScreen<br/>/order/$orderId"]
    S_orders["OrdersScreen<br/>/orders"]
    S_profile["ProfileScreen<br/>/profile"]
  end

  subgraph Widgets["widgets"]
    W_topBar["TopBar"]
    W_categoryFilter["CategoryFilter"]
    W_bakeryPromo["BakeryPromoSection"]
    W_donutList["DonutList"]
    W_orderTracking["OrderTracking"]
  end

  subgraph Features["features"]
    F_searchDonuts["SearchDonuts<br/>(SearchBar, useSearch)"]
    F_likeDonuts["LikeDonuts<br/>(useUpdateDonutLike,<br/>useDonutFavoritesStore)"]
    F_addToCart["AddToCart<br/>(CartAddButton)"]
  end

  subgraph Entities["entities"]
    E_donut["Donut<br/>(DonutCard, DonutList,<br/>queries, types)"]
    E_cart["Cart<br/>(CartItemCard, CartSummary,<br/>useCartStore)"]
    E_bakery["Bakery<br/>(BakeryPromo, queries)"]
    E_category["Category<br/>(queries, types)"]
    E_order["Order<br/>(queries, types)"]
    E_review["Review<br/>(ReviewCard, queries)"]
    E_user["User<br/>(queries, types)"]
  end

  %% Screen → Widget connections
  S_home --> W_topBar
  S_home --> W_categoryFilter
  S_home --> W_bakeryPromo
  S_home --> W_donutList

  S_catalog --> F_searchDonuts
  S_catalog --> W_donutList

  S_orderTracking --> W_orderTracking

  %% Screen → Entity connections (direct)
  S_product --> E_donut
  S_product --> E_review
  S_product --> E_cart

  S_cart --> E_cart

  %% Widget → Feature connections
  W_donutList --> F_likeDonuts

  %% Widget → Entity connections
  W_topBar --> E_user
  W_categoryFilter --> E_category
  W_bakeryPromo --> E_bakery
  W_donutList --> E_donut
  W_orderTracking --> E_order

  %% Feature → Entity connections
  F_likeDonuts --> E_donut
  F_addToCart --> E_cart
```
