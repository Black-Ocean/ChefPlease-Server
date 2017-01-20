USE black_ocean;

-- insert users into table
INSERT INTO users (name, bio) 
VALUES 
  ("Escoffier", "French chef extraordinaire.  Eat my food!"), 
  ("Gordon", "I'll insult you while you eat and you will like it!"), 
  ("Andy", "Eat with me and your life will change!"), 
  ("Crenn", "SF Based Michelin chef.  Get ready for some amazing French"), 
  ("Thomas Keller", "French Laundry.  Eat my food... If you can handle it"),
  ("Batali", "Batali"),
  ("Grandma", "Grandmama"),
  ("Mom", "Mom"),
  ("Guy Fieri", "Infamous. Huge. Hire me");
  -- ("Flay", "Flay");
  -- ("Fieri", "Fieri");
  -- ("Marco", "Marco");
-- SF CHEFS
-- Escoffier, Andy, Gordon, Crenn, Batali, Thomas Keller
-- Giada, Flay, Fieri, Marco, Grandma, Mom 
-- Anton, Adam, Suhail, Zack, Sam He

INSERT INTO chefs (name, bio, image, id_userID)
VALUES
  ("Escoffier", "French chef extraordinaire.  Eat my food!", "https://s-media-cache-ak0.pinimg.com/originals/7c/dd/dc/7cdddc2635d81453ea69b61d1e89cd14.jpg", 1), 
  ("Andy", "Eat with me and your life will change!", "http://4.bp.blogspot.com/-jAR7aNqWOoo/UozoHuVYJwI/AAAAAAAAFTc/1xbpSOMjwWs/s1600/andy+head+shot.jpg", 2), 
  ("Gordon", "I'll insult you while you eat and you will like it!", "http://cdn-jpg.thedailymeal.net/sites/default/files/styles/tdm_slideshow_large/public/slides/2-gordonramsay.jpg?itok=xPSX4Lbj", 3), 
  ("Crenn", "SF Based Michelin chef.  Get ready for some amazing French", "http://www.shuffle.gelinaz.com/sites/default/files/styles/chef_portrait/public/dominique-crenn2.jpg?itok=OV7G2slr", 4), 
  ("Thomas Keller", "French Laundry.  Eat my food... If you can handle it", "https://pbs.twimg.com/profile_images/560978808103108609/QglJ3j2z.jpeg", 5),
  ("Batali", "I'm a fat italian chef, eat my delicious food", "https://pbs.twimg.com/profile_images/1574379886/Mario_Radish.jpg", 6),
  ("Grandma", "Grandmama's unquestionable cooking", "http://mytravelfoods.com/wp-content/uploads/2010/10/IMG_5859.jpg", 7),
  ("Mom", "Mom", "http://2.everyday-families.com/wp-content/uploads/2013/11/son-hug-mom.jpg", 8),
  ("Guy Fiero", "Infamous. Huge. Hire me.... Please", "http://flowjournal.org/wp-content/uploads/2012/09/Image-1-Guy-Fieri.png", 9);
  -- ("Flay", "Flay");
  -- ("Fieri", "Fieri");
  -- ("Marco", "Marco");
-- NYC CHEFS
-- Alton Brown, Kenji, Bourdain, Julia Child, Jacques Pepin,
-- Grant Achatz, Curtis Duffy, Eric Ripert, David Chang
-- Alice waters, Michael Ruhlman, Michael Pollan, Jiro, Rene Redzepe
 

-- update userID/chefID
UPDATE users SET chefID = 1 WHERE name = "Escoffier";
UPDATE users SET chefID = 2 WHERE name = "Andy";
UPDATE users SET chefID = 3 WHERE name = "Gordon";
UPDATE users SET chefID = 4 WHERE name = "Crenn";
UPDATE users SET chefID = 5 WHERE name = "Thomas Keller";
UPDATE users SET chefID = 6 WHERE name = "Batali";
UPDATE users SET chefID = 7 WHERE name = "Grandma";
UPDATE users SET chefID = 8 WHERE name = "Mom";
UPDATE users SET chefID = 9 WHERE name = "Guy Fieri";

-- update chefs locations, cuisines, restrictions
INSERT INTO chefs_locations (id_chefID, id_locationID) VALUES (1,1);
INSERT INTO chefs_locations (id_chefID, id_locationID) VALUES (2,1);
INSERT INTO chefs_locations (id_chefID, id_locationID) VALUES (3,1);
INSERT INTO chefs_locations (id_chefID, id_locationID) VALUES (4,1);
INSERT INTO chefs_locations (id_chefID, id_locationID) VALUES (5,1);
INSERT INTO chefs_locations (id_chefID, id_locationID) VALUES (6,1);
INSERT INTO chefs_locations (id_chefID, id_locationID) VALUES (7,1);
INSERT INTO chefs_locations (id_chefID, id_locationID) VALUES (8,1);
INSERT INTO chefs_locations (id_chefID, id_locationID) VALUES (9,1);

INSERT INTO chefs_cuisines (id_chefID, id_cuisineID) VALUES 
  (1,1),
  (2,1), (2,2), (2,3),
  (3,1), (3,2), (3,3),
  (4,1), (4,3),
  (5,1), (5,2), (5,3),
  (6,2), (6,3),
  (7,1), (7,5), (7,6), (7,7),
  (8,1), (8,3), (8,4), (8,5), (8,6), (8,7),
  (9,1), (9,2), (9,3), (9,4), (9,5);

INSERT INTO chefs_restrictions (id_chefID, id_restrictionID) VALUES
  (1,1), (1,2), (1,3), (1,4), (1,5), (1,6), (1,7), (1,8), (1,9), (1,10), (1,11), (1,12), (1,13),
  (2,1), (2,2), (2,3), (2,4), (2,5), (2,6), (2,7), (2,8), (2,9), (2,10), (2,11), (2,12), (2,13),
  (3,1), (3,2), (3,3), (3,4), (3,5), (3,6), (3,7), (3,8), (3,9), (3,10), (3,11), (3,12), (3,13),
  (4,1), (4,2), (4,3), (4,4), (4,5), (4,6), (4,7), (4,8), (4,9), (4,10), (4,11), (4,12), (4,13),
  (5,1), (5,2), (5,3), (5,4), (5,5), (5,6), (5,7), (5,8), (5,9), (5,10), (5,11), (5,12), (5,13),
  (6,1), (6,2), (6,3), (6,4), (6,5), (6,6), (6,7), (6,8), (6,9), (6,10), (6,11), (6,12), (6,13),
  (7,1), (7,2), (7,3), (7,4), (7,5), (7,6), (7,7), (7,8), (7,9), (7,10), (7,11), (7,12), (7,13),
  (8,1), (8,2), (8,3), (8,4), (8,5), (8,6), (8,7), (8,8), (8,9), (8,10), (8,11), (8,12), (8,13);

-- insert dishes for chefs
INSERT INTO dishes (name, text, image, price, id_chefID) VALUES
  ("French Duck", "Decadent and Delicious!", "https://4.bp.blogspot.com/-X4BlTVey3LU/Uf0QNEQUzlI/AAAAAAAAHjo/QNppm0mg5Lg/s400/Roast+duck+breast+Phtotograph+courtesy+of+Ren%C3%A9e+S.+Suen++++++++++++++++5168016385_4b051fe8c7.jpg",69,1), 
  ("French Macaron", "Delicious Dessert!", "http://3.bp.blogspot.com/-4VKRNWwFO7w/Ufrn8IhzG-I/AAAAAAAAAcE/iApSyaJ1koQ/s1600/macarons.jpg", 15,1), 
  ("Seared Foie Gras", "You know what it is", "http://www.seriouseats.com/images/20101214-foie-16-cooked.jpg", 50, 1), 
  ("Escargot", "An acquired taste", "https://s-media-cache-ak0.pinimg.com/originals/25/47/a1/2547a1e9396405ef3b2431916539d011.jpg", 20, 1),
  ("Bone-in Ribeye", "Dry aged to perfection. Medium Rare", "http://cdn.chewsy.com/menuitems/51457/c496532e-c31f-4ca4-81ea-1399bf89d342-640x640.JPG", 80, 2), 
  ("BBQ Lamb Ribs", "That gamy taste will get you", "http://umairah.com/wp-content/uploads/2014/12/Lamb-Ribs_1024x1024.jpg", 25, 2), 
  ("Brussel Sprout Salad", "Eat your veggies", "http://cdn.pinchofyum.com/wp-content/uploads/2012/05/salad2.jpg", 15, 2),
  ("Sourdough Bread Board", "Fresh warm bread with jam, butter, and honey", "https://s-media-cache-ak0.pinimg.com/236x/42/53/55/425355a9a7fb33023b35a32238ebae94.jpg", 8, 2);

-- insert into dishes_cuisines and dishes_restrictions
INSERT INTO dishes_cuisines (id_dishID, id_cuisineID) VALUES
  (1, 1), (2, 1), (3, 1), (4, 1),
  (5, 3), (6, 3), (7, 3), (8, 3);

INSERT INTO dishes_restrictions (id_dishID, id_restrictionID) VALUES
  (7, 10), (8, 10);

-- insert events for users and chefs
INSERT INTO events (name, location, text) VALUES
  ("Traditional French Birthday", "Thomas Keller's Crib", "It's going to be good. Don't sleep"),
  ("BBQ Grill Out", "My Crib", "Hide yo wife. Hide Yo Kids. Bro-Grill...");

INSERT INTO chefs_events (id_chefID, id_events) VALUES
  (1, 1);

INSERT INTO users_events (id_users, id_events) VALUES
  (1, 1), (5, 1);

INSERT INTO events_dishes (id_eventID, id_dishID, quantities) VALUES
  (1, 1, 2), (1, 2, 2), (1, 3, 2), (1, 4, 2);

