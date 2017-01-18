USE black_ocean;

-- insert users into table
INSERT INTO users (name, bio, avgRating) 
VALUES 
  ("Escoffier", "French chef extraordinaire.  Eat my food!", 5.0), 
  ("Andy", "Eat with me and your life will change!", 4.0), 
  ("Gordon", "I'll insult you while you eat and you will like it!", 4.0), 
  ("Crenn", "SF Based Michelin chef.  Get ready for some amazing French", 4.0), 
  ("Thomas Keller", "French Laundry.  Eat my food... If you can handle it", 5.0),
  ("Batali", "I'm a fat italian chef, eat my delicious food", 4.0);
-- SF CHEFS
-- Escoffier, Andy, Gordon, Crenn, Batali, Thomas Keller
-- Giada, Flay, Fieri, Marco, Grandma, Mom 
-- Anton, Adam, Suhail, Zack, Sam He

INSERT INTO chefs (name, bio, image, avgRating, id_userID)
VALUES
  ("Escoffier", "French chef extraordinaire.  Eat my food!", "https://s-media-cache-ak0.pinimg.com/originals/7c/dd/dc/7cdddc2635d81453ea69b61d1e89cd14.jpg", 5.0, 1), 
  ("Andy", "Eat with me and your life will change!", "http://4.bp.blogspot.com/-jAR7aNqWOoo/UozoHuVYJwI/AAAAAAAAFTc/1xbpSOMjwWs/s1600/andy+head+shot.jpg", 4.0, 2), 
  ("Gordon", "I'll insult you while you eat and you will like it!", "http://cdn-jpg.thedailymeal.net/sites/default/files/styles/tdm_slideshow_large/public/slides/2-gordonramsay.jpg?itok=xPSX4Lbj", 4.0, 3), 
  ("Crenn", "SF Based Michelin chef.  Get ready for some amazing French", "http://www.shuffle.gelinaz.com/sites/default/files/styles/chef_portrait/public/dominique-crenn2.jpg?itok=OV7G2slr", 4.0, 4), 
  ("Thomas Keller", "French Laundry.  Eat my food... If you can handle it", "https://pbs.twimg.com/profile_images/560978808103108609/QglJ3j2z.jpeg", 5.0, 5),
  ("Batali", "I'm a fat italian chef, eat my delicious food", "https://pbs.twimg.com/profile_images/1574379886/Mario_Radish.jpg", 4.0, 6);

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

-- update chefs locations, cuisines, restrictions

-- insert dishes for chefs
-- insert events for users and chefs
