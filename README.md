# ReactJS Ecommerce Site

This is a full stack e-commerce site built using Vite React, Tailwind CSS, Express REST API alongside a MySQL database.

## Features

-   Fully responsive design
-   Paginated product listing page with product counter, category decription, alphabetical filtering (A-Z and Z-A) and price sorting (ascending and descending)
-   Individual product pages with product description, add to cart button, quantity selector and related products
-   Cart system with local storage
-   Add to cart notification
-   Fully responsive design
-   Lazy loading of images
-   Announcement bar at the top of the page
-   Static footer containing a set of links

## Screenshots

<!-- Desktop screenshots -->
<img src="./screenshots/category-page.png" alt="A screenshot displaying the design's header, category title and description and product grid with filtering and sort by features" width="800px">

<!-- Mobile screenshots -->
<img src="./screenshots/mobile-category-page.png" alt="A screenshot of the mobile responsive design showing that the mobile nav menu is closed" width="400px">

## Installation

```bash
# Clone this repository
$ git clone https://github.com/MatthewBleUK/ecommerce-site.git

# Go into the repository
$ cd ecommerce-site

# Install the front-end dependencies
$ npm install

# Install the back-end dependencies (this is separated for modularity)
$ cd ./src/api
$ npm install

# Create the MySQL database and tables with the products.sql file inside the api directory

# Set up back-end environment file (needs to be inside the api directory)
$ nano .env

PORT=3002
DATABASE_HOST="localhost"
DATABASE_USER="root"
DATABASE_PASSWORD=""
DATABASE_NAME="ecommerce"
DATABASE_CONNECTION_LIMIT=10

# Run the app
$ cd ../../
$ npm start
```

## License

This project is released under the GNU General Public License v3.
