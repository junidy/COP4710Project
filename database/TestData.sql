-- Disable foreign key constaints
SET FOREIGN_KEY_CHECKS = 0;

-- Super Admins
INSERT INTO `users` (`name`, `password`, `phone`, `email`, `university_id`) VALUES 
('John Doe', 'encrypted_password', '321-321-4321', 'john.doe@ucf.edu', NULL),
('Jane Smith', 'encrypted_password', '617-617-7617', 'jane.smith@harvard.edu', NULL);

INSERT INTO `super_admins` (`user_id`) VALUES
(LAST_INSERT_ID() - 1),
(LAST_INSERT_ID());

-- Universities
INSERT INTO `universities` (`name`, `super_admin_id`) VALUES 
('University of Central Florida', '1'),
('Harvard University', '2');

-- Regular Users and Admins
INSERT INTO `users` (`name`, `password`, `phone`, `email`, `university_id`) VALUES 
-- Admins for UCF
('Alex Taylor', '$2b$10$zczwcDZ0XAhOYJF4mWeQ4.ecrfVNe2LC8EN2r2j8CwFh0kufvebki', '3214567890', 'alex.taylor@ucf.edu', '1'),
    -- pw: hunter2
('Chris Jordan', 'encrypted_password', '3216540987', 'chris.jordan@ucf.edu', '1'),
-- Admins for Harvard
('Emily White', '$2b$10$haEgqg80s9wDdXqexPR2WuGDaOxs/F2vS2jAOi70R5QIEsSk8Smhe', '617-890-1234', 'emily.white@harvard.edu', '2'),
    -- pw: correcthorsebatterystaple
('Michael Brown', 'encrypted_password', '6173216543', 'michael.brown@harvard.edu', '2'),
-- Regular Users
('User 1', 'encrypted_password', '0000000001', 'user1@univ.edu', '1'),
('User 2', 'encrypted_password', '0000000002', 'user2@univ.edu', '1'),
('User 3', 'encrypted_password', '0000000003', 'user3@univ.edu', '2'),
('User 4', 'encrypted_password', '0000000004', 'user4@univ.edu', '2'),
('User 5', 'encrypted_password', '0000000005', 'user5@univ.edu', '1'),
('User 6', 'encrypted_password', '0000000006', 'user6@univ.edu', '2');

-- Insert Admins into `admins` table
INSERT INTO `admins` (`user_id`) VALUES
(1), (2), (3), (4);

-- RSOs for UCF and Harvard
INSERT INTO `rsos` (`admin_id`, `name`) VALUES 
('3', 'UCF Tech Club'),
('4', 'UCF Sustainability Initiative'),
('5', 'Harvard Finance Network'),
('6', 'Harvard Environmental Society');

-- Sample Events
INSERT INTO `events` (`creator_id`, `tags`, `title`, `category`, `description`, `start_time`, `end_time`, `location_id`, `contact_name`, `contact_phone`, `contact_email`) VALUES 
('3', '["technology", "innovation"]', 'Tech Expo 2024', 'Technology', 'Join us for the annual Tech Expo where we showcase cutting-edge technology.', '2024-03-15 10:00:00', '2024-03-15 17:00:00', 'Tech Building', 'Alex Taylor', '321-456-7890', 'alex.taylor@ucf.edu'),
('5', '["finance", "networking"]', 'Investment Strategies Workshop', 'Finance', 'An interactive workshop on modern investment strategies.', '2024-04-20 09:00:00', '2024-04-20 12:00:00', 'Finance Hall', 'Emily White', '617-890-1234', 'emily.white@harvard.edu');

-- Feedback for Events
INSERT INTO `feedback` (`event_id`, `user_id`, `comment`, `rating`, `timestamp`) VALUES 
('1', '7', 'Incredible event with lots of learning!', 5, '2024-03-15 18:00:00'),
('1', '8', 'Very informative workshop. Loved it!', 5, '2024-04-20 13:00:00');


-- Reenable foreign key constaints
SET FOREIGN_KEY_CHECKS = 1;