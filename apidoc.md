# page 1

>list of categories
* http://localhost:9310/categories
* https://nodetestapilicious.onrender.com/categories
>list of Best Sellers
* http://localhost:9310/bestsellers
* https://nodetestapilicious.onrender.com/bestsellers
>list of Boneless Cuts
* http://localhost:9310/bonelesscuts
* https://nodetestapilicious.onrender.com/bonelesscuts

# page 2

> Items wrt to category
* http://localhost:9310/CategoryDetail/5
* https://nodetestapilicious.onrender.com/CategoryDetail/5
> Items wrt to category and Category Type
* http://localhost:9310/CategoryDetail/1?catType=Today%27s%20Deals
* https://nodetestapilicious.onrender.com/CategoryDetail/1?catType=Today%27s%20Deals

# page 3
> Details of the item
* http://localhost:9310/detail/5
* https://nodetestapilicious.onrender.com/detail/5


# page 4

>Item Details
* http://localhost:9310/item  (POST)
* https://nodetestapilicious.onrender.com/item (POST)
{
    "id" : [3,4,53]
}

>Place Order
* http://localhost:9310/placeOrder (POST)
* https://nodetestapilicious.onrender.com/placeOrder (POST)
{
        "order_id": "5",
        "name": "Sai",
        "email": "Sai@gmail.com",
        "address": "Hno 23,Sector 1",
        "phone": 768768686,
        "cost": 787,
        "status": "Pending",
        "Items": [
            3,
            5,
            7
        ]
    }

# page 5

>List of Orders
* http://localhost:9310/orders
* https://nodetestapilicious.onrender.com/orders

>Order wrt to email
* http://localhost:9310/orders?email=sai@gmail.com
* https://nodetestapilicious.onrender.com/orders?email=sai@gmail.com

>Update payment details -not working 
* http://localhost:9310/updateOrder/5 (PUT)
* https://nodetestapilicious.onrender.com/updateOrder/5 (PUT)

>Delete orders (DELETE)
* http://localhost:9310/deleteOrder/63cf888492db6febb2069463
* https://nodetestapilicious.onrender.com/deleteOrder/63cfac5fec326a10dd74bea4
