# Un-Brin-d--aventure-backend

### Mapping routes

In insomnia, import json file in `/colletion` to start testing api requests.

##### Customers

- [x] get all customers : GET request to `/api/customers`
- [x] get customer by id : GET request to `/api/customers/:id`
- [x] get customer with optional parameters research : GET request to `/api/customers/name/:name?/firstname/:firstname?/city/:city?/email/:email?`
- [x] post a new customer : POST request to `/api/customers/new`
- [x] update an existing customer : PUT request to `/api/customers/update`
- [x] delete a customer : DELETE request to `/api/customers/:id`

##### Purchases

- [x] get all purchases : GET request to `/api/purchases`
- [x] get customer's purchases by id_client : GET request to `/api/purchases/customer/:id_client`
- [x] get purchases by id : GET request to `/api/purchases/:id`
- [x] delete a purchase : DELETE request to `/api/purchases/:id`
- [x] post a new purchase : POST request to `/api/purchases/:id_client`
