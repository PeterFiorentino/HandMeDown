# HandMeDown
A social media engagement project to promote sustainability in the fashion industry and encourage the preservation of lineage through garments.

A user can create an original QR code for each individual garment. The code can then be printed to iron-on paper and applied to the inside of the shirt (ideally by the back collar). This unique code will allow users to share where their garment is located, major life events/stories attached to the garment, and follow that garment’s stories as it is passed from user to user. MVP will focus on a target demo of young parents to share the stories of their children’s clothes - items that are usually owned for a short period of time ( 2 months on average ).


Group Roles: 
Project Manager: Doug
UX/UI: Johanne
Technical Lead: Peter
PR Review Process: Hupaul

Group Norms: 

Our meetings will begin and end on time.

All ideas will be considered and given the merit that they deserve. We will listen to each other, not interrupt, and let everyone have a chance to speak. If necessary, we will use a "sacred talking object of the utmost importance" to moderate discussion.

We will speak respectfully to each other.

We will follow the safe space policy in words and actions.

Grievances SHOULD be brought before the whole group but is NOT MANDATORY. Respect the assigned roles and bring concerns to individuals with respect. There should be continuous open communication within the group.

Whenever possible, document with code comments inputs and outputs so other team members can easily understand your code-blocks.

When we are stuck on a decision, we will discuss and vote. Should there be a tiebreaker, we will flip a coin or rock paper scissors for the final outcome.

Alert the team as early as possible if you suspect you'll miss a deadline. The team will then split the project load as evenly as possible to help.

Alert the team if you're going to be absent or late. You are still responsible for your specific task.

If you completed all of your tasks, offer to aid others in completing their tasks. We should provide assistance to each other in a productive and sympathetic manner.

If stuck on an issue somewhere, limit yourself to 30 minutes before asking for help. Reach out for assistance sooner instead of leaving work to be picked up by others later.


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

WIREFRAMES:

Database Wireframe:
https://drive.google.com/file/d/1dv3laYaXGkBA00WSy0K0tH5r5yHUAko6/view?usp=sharing

Landing Page Wireframe:
https://drive.google.com/file/d/1flf6ns6k8gLZc27aBCHPurbQm5H9D4GT/view?usp=sharing

Landing Page Login Wireframe:
https://drive.google.com/file/d/1JeySDN8VZQag8gZjVc7NqamkZS_86K88/view?usp=sharing

Landing Page Sign Up Wireframe:
https://drive.google.com/file/d/1rm2BXXWwcFdTN3LDlh16AHjORSOAvbT5/view?usp=sharing

Wardrobe Page:
https://drive.google.com/file/d/1yZqMGviAQWr7V2Bg89nH5O3kxxxlhSQw/view?usp=sharing

Filtered Wardrobe Page:
https://drive.google.com/file/d/1c0ROxA5xYgRlxAL0nsHEhWFcQYOrBprJ/view?usp=sharing

Garment Page:
https://drive.google.com/file/d/1DXn6J2yAFJ11JyN4ek7ULjp_9zHpjn1K/view?usp=sharing

Garment Total History Page:
https://drive.google.com/file/d/1aVX3USunVr6AXZd2zfZ3vywQNBtb7rpm/view?usp=sharing