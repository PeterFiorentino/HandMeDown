# HandMeDown

# Problem Statement: 
Clothes are being made of cheaper materials that do not last as long. As a consumer, purchasing cheaper clothes is appealing, so sustainable clothing has been tossed to the side. 


# Solution:
HandMeDown is a social media engagement project to promote sustainability in the fashion industry and encourage the preservation of lineage through garment, thus incentivizing customers to buy more sustainable clothing so they can preserve them. 

A user can create an original QR code for each individual garment. The code can then be printed to iron-on paper and applied to the inside of the shirt (ideally by the back collar). This unique code will allow users to share where their garment is located, major life events/stories attached to the garment, and follow that garment’s stories as it is passed from user to user. MVP will focus on a target demo of young parents to share the stories of their children’s clothes - items that are usually owned for a short period of time ( 2 months on average ).

![Wireframe](./Assests/hand_me_down_database.jpg)

## Database Tables: 
- **Users**

  | Method | Endpoint     | Description           | Body Data                |
  | ------ | ------------ | --------------------- | ------------------------ |
  | GET    | `/users`     | Get all users         | n/a                      |
  | GET    | `/users/:id` | Get single user by id | n/a                      |
  | POST   | `/users/`    | Add new user          | `avatar_url`, `username`, `password` |
  | PATCH  | `/users/:id` | Edit a user's info    | `avatar_url`, `username`, or `password` |
  | DELETE | `/users/:id` | Delete a user         | n/a                      |

- **Garments**

  | Method | Endpoint  | Description    | Body Data    |
  | ------ | --------- | -------------- | ------------ |
  | GET    | `/garments` | Get all garments | n/a          |
  | GET    |  `/garments/:id ` | Get single garment by id | n/a |
  | POST   | `/garments` | Add new garment  | `garment_name`, `owner_id`, `garment_image`, `location`  |
  | PATCH  | `/garments` | Edit a single garment | `garment_name`, `owner_id`, `garments_image`, or `location` |
  | GET    | `/garments/users/:user_id` | Get all the garments for a single user | n/a |
  

- **History**

  | Method | Endpoint                  | Description                           | Body Data                            |
  | ------ | ------------------------- | ------------------------------------- | ------------------------------------ |
  | GET    | `/history/:id` | Get an individual history post | n/a                                  |
  | POST   | `/history`               | Add a new garment history     | `history_body`, `user_id`, `garment_id`, `timestamp`, `location`  |
  | GET | `/history/:garment_id` | Get all of the history for a garment| n/a |
  | POST   | `/History`               | Add a new garment history     | `history_body`, `user_id`, `garment_id`, `timestamp`, `location`  |
