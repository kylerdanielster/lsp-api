CREATE DATABASE lone_star_pairings;

-- Users

CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  last_update TIMESTAMP
);

CREATE TABLE user_profile(
  profile_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  last_update TIMESTAMP,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
);

-- Tournaments

CREATE TABLE tournaments(
  tournament_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by_user_id uuid NOT NULL,
  address_id uuid,
  name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  has_started BOOLEAN,
  game_system INT NOT NULL,
  number_of_rounds INT NOT NULL,
  current_round INT,
  game_system_id INT NOT NULL,
  last_update TIMESTAMP
);

CREATE TABLE address(
  address_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  address_line_1 VARCHAR(100),
  address_line_2 VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(100),
  zipcode VARCHAR (20),
  country VARCHAR(100),
  last_update TIMESTAMP
);

CREATE TABLE game_system(
  id SERIAL PRIMARY KEY,
  game_system VARCHAR(100),
  game_system_id INT NOT NULL
);

-- Primary key is tournament_id and user_id
CREATE TABLE tournament_participants(
  tournament_id uuid NOT NULL,
  user_id uuid NOT NULL,
  army_list TEXT,
  last_update TIMESTAMP,
  PRIMARY KEY(tournament_id, user_id),
    CONSTRAINT fk_tournament
    FOREIGN KEY (tournament_id)
    REFERENCES tournaments(tournament_id)
);

-- Primary key is tournament_id and user_id
CREATE TABLE tournament_admins(
  tournament_id uuid NOT NULL,
  user_id uuid NOT NULL,
  PRIMARY KEY(tournament_id, user_id),
    CONSTRAINT fk_tournament
    FOREIGN KEY (tournament_id)
    REFERENCES tournaments(tournament_id)
);

-- Rounds

CREATE TABLE tournament_round(
  tournament_round_id uudi PRIMARY KEY DEFAULT uuid_generate_v4(),
  tournament_id uuid,
  has_started BOOLEAN,
  is_completed BOOLEAN,
    CONSTRAINT fk_tournament
    FOREIGN KEY (tournament_id)
    REFERENCES tournaments(tournament_id)
);

-- FK tournament_round_id 
CREATE TABLE tournament_round_pairings(
  tournament_round_pairings_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tournament_round_id uuid NOT NULL,
  table_number INT,
  round INT NOT NULL,
  user_id_home uuid NOT NULL,
  user_id_away uuid NOT NULL
  home_score INT NULL,
  away_score INT NULL,
  last_update TIMESTAMP,
   CONSTRAINT fk_tournament_round
    FOREIGN KEY (tournament_round_id)
    REFERENCES tournament_round(tournament_round_id)
);