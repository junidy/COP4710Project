-- Disable foreign key constaints
SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO `super_admins` (`user_id`) VALUES
(1),
(2);

-- Universities
INSERT INTO `universities` (`name`, `super_admin_id`) VALUES 
('University of Central Florida', '1'),
('Harvard University', '2');

-- Super Admins
INSERT INTO `users` (`name`, `password`, `phone`, `email`, `university_id`) VALUES 
('John Doe', 'encrypted_password', '321-321-4321', 'john.doe@ucf.edu', '1'),
('Jane Smith', 'encrypted_password', '617-617-7617', 'jane.smith@harvard.edu', '2');

-- Admins
INSERT INTO `users` (`name`, `password`, `phone`, `email`, `university_id`) VALUES 
-- Admins for UCF
('Alex Taylor', '$2b$10$zczwcDZ0XAhOYJF4mWeQ4.ecrfVNe2LC8EN2r2j8CwFh0kufvebki', '3214567890', 'alex.taylor@ucf.edu', '1'),
    -- pw: hunter2
('Chris Jordan', 'encrypted_password', '3216540987', 'chris.jordan@ucf.edu', '1'),
-- Admins for Harvard
('Emily White', '$2b$10$haEgqg80s9wDdXqexPR2WuGDaOxs/F2vS2jAOi70R5QIEsSk8Smhe', '617-890-1234', 'emily.white@harvard.edu', '2'),
    -- pw: correcthorsebatterystaple
('Michael Brown', 'encrypted_password', '6173216543', 'michael.brown@harvard.edu', '2');

-- Regular Users
-- passwords are "passwordi" where i is 0 through 19
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Robert Miller', '465-931-6353', 'robert.miller19@ucf.edu', 1, '$2b$10$ZhNr6nwLW6f8a2mkWCEdoe.WFPba3bJkuDorx6RtzQNVCpV5GLDlq');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Chris Smith', '806-293-5333', 'chris.smith33@ucf.edu', 1, '$2b$10$9WpFyy0Qiqx3pIANNIhUXeQdZJlrkEI8b0QGc7xFL/SEZYwT1vjEC');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('John Jones', '935-442-8061', 'john.jones6@harvard.edu', 2, '$2b$10$kAeYSaUoSReQWMY30TYmS.mEg1K0eu2D.OmmBdamjtCOavQ393YjC');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Chris Wilson', '325-672-6440', 'chris.wilson46@harvard.edu', 2, '$2b$10$mHXlKvfvhb4N5XtkSe/tRewrZ0VTK7UwL3DIvdlaCWQm5B6vhJGHK');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Samantha Smith', '642-827-7822', 'samantha.smith77@harvard.edu', 2, '$2b$10$y/ZSn.m/reCvtSbNEjgCVOee/aTapR/mKIZkjbQjfSxwWBU0T.X6u');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('John Davis', '735-723-9867', 'john.davis21@ucf.edu', 1, '$2b$10$AWCcmeUmtdyZquMq4zpHOee8aMUvPNr1Nx3xLu9YyJmClxfyJfcr6');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Mike Smith', '800-576-3253', 'mike.smith17@harvard.edu', 2, '$2b$10$oqnU.8Xd.R50j3jakE.eOe7EzJ7vEEryPAf4QPznW0KYjm1axFDKa');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Linda Davis', '984-145-7310', 'linda.davis17@ucf.edu', 1, '$2b$10$wCjRK.oEqApMwSY.dlixCOd2mOxAgjRzHbqCPn5GRi6RXxSVSJKUa');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('James Williams', '580-297-7931', 'james.williams86@ucf.edu', 1, '$2b$10$VITVhLtN5YRkNJ7CqTsoH.TJc8bICdeDtiXcTlaS1DGK4bpJLrDMm');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Chris Williams', '924-766-4329', 'chris.williams72@ucf.edu', 1, '$2b$10$J2.MVoJugm.fRf4dBiSzFOgX9pR7sG/.q1MhbmWBRFZCITlkL17Te');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Jennifer Taylor', '769-737-7075', 'jennifer.taylor35@ucf.edu', 1, '$2b$10$6OW8hJ992OeeMUfE.xWBxuzeAmkJEPbYWWSQEIVarmN1fp7VRSneS');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('John Brown', '192-715-4604', 'john.brown20@ucf.edu', 1, '$2b$10$JTI252HOTDya2/bgLDiK7OGWiAsI6ZaU0AT5PeiM8/szc1rD1GaTS');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('James Jones', '545-820-4826', 'james.jones12@harvard.edu', 2, '$2b$10$uQtSaqnT.iNTau/9XTkNQOhEtmV8jedB5jmf8Tm5FVYuQGY6VNXAC');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Linda Miller', '390-763-7846', 'linda.miller82@ucf.edu', 1, '$2b$10$ZYS8KBCCC2ghX0HOfFIPpOoQqU8t7tIPNUoUZQCwyoYvrALEir2/q');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Laura Wilson', '202-539-4685', 'laura.wilson61@harvard.edu', 2, '$2b$10$D59uSUVkNneTSpj2fdGBQuQM/k2SR5cun3SU.hyFCGE8nSM2f4Bv6');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('John Davis', '538-705-6124', 'john.davis87@ucf.edu', 1, '$2b$10$mSV7m6t22B5x/gtPnIjv1uaZbe3zhG1PyNeVBAaFMOI0Z3BQcrN5W');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Linda Miller', '674-310-1680', 'linda.miller44@harvard.edu', 2, '$2b$10$BqeIRiH1nYg7msA.x7TRbewLMAGUNlw4iKvoyihaCeJhXCyHQ4pdy');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Mike Johnson', '120-750-7828', 'mike.johnson68@ucf.edu', 1, '$2b$10$kKJ2H4cfPdY05mQO5bXAF.q/pYDUYm4UXOcmhW7/AhEiJ/.PZWLMG');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('James Taylor', '536-890-4856', 'james.taylor47@ucf.edu', 1, '$2b$10$2xKofAg6mm5qz6TK/rjO2em1xCkboozY1.OE9JMnONESW8vi2b1wC');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Jane Taylor', '111-606-1929', 'jane.taylor45@ucf.edu', 1, '$2b$10$6aLL1wFBYSa5Q6otAbnyPe4zAOs8C.TNk7ktRERHrXQjHT1R13Mu.');
INSERT INTO users (name, phone, email, university_id, password) VALUES ('Sussus Amongus', '666-432-8421', 'sussus.amongus@ucf.edu', 1, '$2b$10$6aLL1wFBYSa5Q6otAbnyPe4zAOs8C.TNk7ktRERHrXQjHT1R13Mu.');

-- Insert Admins into `admins` table
INSERT INTO `admins` (`user_id`) VALUES
(1), (2), (3), (4), (5), (6);

-- RSOs for UCF and Harvard
INSERT INTO `rsos` (`admin_id`, `name`) VALUES 
('3', 'UCF Tech Club'),
('4', 'UCF Sustainability Initiative'),
('5', 'Harvard Finance Network'),
('6', 'Harvard Environmental Society');

INSERT INTO `events` (`creator_id`, `tags`, `title`, `category`, `description`, `start_time`, `end_time`, `location_id`, `contact_name`, `contact_phone`, `contact_email`) VALUES 
('3', '["technology", "innovation"]', 'Tech Expo 2024', 'Technology', 'Join us for the annual Tech Expo where we showcase cutting-edge technology.', '2024-03-15 10:00:00', '2024-03-15 17:00:00', 'Tech Building', 'Alex Taylor', '321-456-7890', 'alex.taylor@ucf.edu'),
('5', '["finance", "networking"]', 'Investment Strategies Workshop', 'Finance', 'An interactive workshop on modern investment strategies.', '2024-04-20 09:00:00', '2024-04-20 12:00:00', 'Finance Hall', 'Emily White', '617-890-1234', 'emily.white@harvard.edu'),
('4', '["environment", "sustainability"]', 'Green Earth Day', 'Environmental', 'A day to learn about sustainable practices and environmental responsibility.', '2024-04-22 09:00:00', '2024-04-22 16:00:00', 'Green Center', 'Chris Jordan', '321-654-0987', 'chris.jordan@ucf.edu'),
('6', '["debate", "politics"]', 'Political Debate on Climate Policy', 'Debate', 'Join the spirited debate on climate change policies.', '2024-05-05 18:00:00', '2024-05-05 20:00:00', 'Debate Hall', 'Michael Brown', '617-321-6543', 'michael.brown@harvard.edu'),
('3', '["AI", "research"]', 'AI Innovations Conference', 'Technology', 'Explore the latest innovations in Artificial Intelligence and machine learning.', '2024-06-01 10:00:00', '2024-06-01 17:00:00', 'Innovation Lab', 'Alex Taylor', '321-456-7890', 'alex.taylor@ucf.edu');

-- Feedback for the new events
INSERT INTO `feedback` (`event_id`, `user_id`, `comment`, `rating`, `timestamp`) VALUES 
(1, '7', 'Incredible event with lots of learning!', 5, '2024-03-15 18:00:00'),
(2, '8', 'Very informative workshop. Loved it!', 5, '2024-04-20 13:00:00'),
(3, '9', 'A well-organized event that opened my eyes to environmental issues.', 4, '2024-04-22 17:00:00'),
(3, '10', 'Great talks but needed more interactive sessions.', 3, '2024-04-22 17:15:00'),
(4, '11', 'Excellent debate! Very engaging and informative.', 5, '2024-05-05 21:00:00'),
(4, '12', 'The debate was a bit one-sided but still very thought-provoking.', 4, '2024-05-05 21:10:00'),
(5, '13', 'The conference was fantastic with many experts from the field.', 5, '2024-06-01 18:00:00'),
(5, '14', 'Loved the practical demonstrations of AI applications.', 5, '2024-06-01 18:20:00');

-- Reenable foreign key constaints
SET FOREIGN_KEY_CHECKS = 1;