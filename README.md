# Store API
Store API written in Node.js / Express.js

- clone the repo to your local folder
- run `npm install` to install all dependencies
- run `npm start` This will start the local webserver at [localhost:3000](http://localhost:3000)

Feel free to use the parameters in the url to change the filter options.

Products page:
http://localhost:3000/api/v1/products

Page Number:
http://localhost:3000/api/v1/products?page=1

Procuts shown Limit:
http://localhost:3000/api/v1/products?limit=2

Fields:
http://localhost:3000/api/v1/products?fields=company,rating

Sort by name (A-Z) or price (min-max):
http://localhost:3000/api/v1/products?sort=name,-price

Featured Product:
http://localhost:3000/api/v1/products?featured=false

Company Name:
http://localhost:3000/api/v1/products?company=ikea

Product Name:
http://localhost:3000/api/v1/products?name=wooden

Numeric Filters:
http://localhost:3000/api/v1/products?numericFilters=price>100,rating>=4.6


And feel free to mix an match:
http://localhost:3000/api/v1/products?name=wooden&limit=2
