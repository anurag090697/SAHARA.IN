<!-- @format -->

# SAHARA.IN


SAHARA.IN is a React-based e-commerce application that provides users with a seamless shopping experience. The app includes features for user authentication, product search, detailed product views, shopping cart management, and wishlist management, all backed by Firebase for real-time data synchronization.


## Features

- User Authentication (Sign Up, Log In)
- Product Search
- Detailed Product View
- Add to Cart
- Add to Wishlist
- Real-time Cart and Wishlist Synchronization with Firebase
- Responsive Design

## Technologies Used

- React
- Redux Toolkit
- Firebase (Authentication, Realtime Database)
- React Router
- Tailwind CSS
- Context API


## Usage

### User Authentication

- **Sign Up**: Navigate to `/signup` to create a new account.
- **Log In**: Navigate to `/login` to log into your account.

### Product Search

- Use the search bar to find products. The results will be displayed on the `/searchresults` page.

### Viewing Product Details

- Click on a product to view its details on the `/productdetailed/:asin` page.
- Click on the speaker icon to hear discription of product(if available)

### Managing Cart

- Add items to your cart from the product details page.
- View your cart at `/cart`.
- Remove items from your cart by clicking the "Remove" button next to the item.


### Managing Wishlist

- Add items to your wishlist from the product details page.
- View your wishlist at `/wishlist`.
- Remove items from your wishlist by clicking the "Remove" button next to the item.

## Components

### Header

Located in `./components/Header.jsx`. Contains the navigation bar and search functionality.

### Footer

Located in `./components/Footer.jsx`. Contains footer information.

### Home

Located in `./components/Home.jsx`. The main landing page of the app.

### SignUp

Located in `./components/SignUp.jsx`. Contains the sign-up form.

### LogIn

Located in `./components/LogIn.jsx`. Contains the log-in form.

### SearchResults

Located in `./components/SearchResults.jsx`. Displays search results.

### ProductDetailed

Located in `./components/ProductDetailed.jsx`. Displays detailed information about a product.

### Cart

Located in `./components/Cart.jsx`. Displays items in the user's cart.

### Wishlist

Located in `./components/Wishlisht.jsx`. Displays items in the user's wishlist.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## HOSTED LINK

[CLICK HERE](https://sahara-in.vercel.app/)
