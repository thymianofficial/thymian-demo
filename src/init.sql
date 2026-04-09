CREATE TABLE IF NOT EXISTS rocket_type (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS role (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS astronaut (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role_id INTEGER NOT NULL,

    FOREIGN KEY(role_id) REFERENCES role(id)
);

CREATE TABLE IF NOT EXISTS launch (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mission_name TEXT NOT NULL,
    launch_date TEXT NOT NULL,
    rocket_type_id INTEGER NOT NULL,
    is_manned INTEGER NOT NULL DEFAULT 0,
    created_by INTEGER NOT NULL,

    FOREIGN KEY (rocket_type_id) REFERENCES rocket_type(id),
    FOREIGN KEY (created_by) REFERENCES astronaut(id)
);

CREATE TABLE IF NOT EXISTS crew_member (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    astronaut_id INTEGER NOT NULL,
    launch_id INTEGER NOT NULL,

    FOREIGN KEY (astronaut_id) REFERENCES astronaut(id),
    FOREIGN KEY (launch_id) REFERENCES launch(id)
);

-- Insert rocket types
INSERT INTO rocket_type (name) VALUES ('Falcon 9');
INSERT INTO rocket_type (name) VALUES ('Atlas V');
INSERT INTO rocket_type (name) VALUES ('Soyuz');
INSERT INTO rocket_type (name) VALUES ('Ariane 5');
INSERT INTO rocket_type (name) VALUES ('Delta IV Heavy');

-- Insert roles
INSERT INTO role (name) VALUES ('Commander');
INSERT INTO role (name) VALUES ('Pilot');
INSERT INTO role (name) VALUES ('Specialist');
INSERT INTO role (name) VALUES ('PayloadMaster');

-- Insert 10 astronauts
INSERT INTO astronaut (name, email, password, role_id) VALUES ('Sarah Mitchell', 'sarah.mitchell@space.org', 'starlight', 1);
INSERT INTO astronaut (name, email, password, role_id) VALUES ('John Chen', 'john.chen@space.org', 'moonbeam', 2);
INSERT INTO astronaut (name, email, password, role_id) VALUES ('Maria Rodriguez', 'maria.rodriguez@space.org', 'horizon', 3);
INSERT INTO astronaut (name, email, password, role_id) VALUES ('James Wilson', 'james.wilson@space.org', 'explorer', 4);
INSERT INTO astronaut (name, email, password, role_id) VALUES ('Emily Nakamura', 'emily.nakamura@space.org', 'cosmos', 1);
INSERT INTO astronaut (name, email, password, role_id) VALUES ('David Okafor', 'david.okafor@space.org', 'nebula', 2);
INSERT INTO astronaut (name, email, password, role_id) VALUES ('Lisa Andersson', 'lisa.andersson@space.org', 'galaxy', 3);
INSERT INTO astronaut (name, email, password, role_id) VALUES ('Michael Brown', 'michael.brown@space.org', 'orbit', 3);
INSERT INTO astronaut (name, email, password, role_id) VALUES ('Anna Petrov', 'anna.petrov@space.org', 'satellite', 4);
INSERT INTO astronaut (name, email, password, role_id) VALUES ('Robert Kim', 'robert.kim@space.org', 'rocket', 2);

-- Insert 10 launches (2 unmanned, 8 manned)
INSERT INTO launch (mission_name, launch_date, rocket_type_id, is_manned, created_by) VALUES ('Artemis III', '2025-03-15T09:30:00Z', 1, 1, 1);
INSERT INTO launch (mission_name, launch_date, rocket_type_id, is_manned, created_by) VALUES ('ISS Expedition 72', '2025-04-22T14:45:00Z', 3, 1, 5);
INSERT INTO launch (mission_name, launch_date, rocket_type_id, is_manned, created_by) VALUES ('Lunar Gateway Assembly', '2025-06-10T11:20:00Z', 4, 1, 1);
INSERT INTO launch (mission_name, launch_date, rocket_type_id, is_manned, created_by) VALUES ('Mars Preparation Mission', '2025-07-05T08:15:00Z', 5, 1, 5);
INSERT INTO launch (mission_name, launch_date, rocket_type_id, is_manned, created_by) VALUES ('Hubble Servicing Mission', '2025-08-18T13:00:00Z', 1, 1, 1);
INSERT INTO launch (mission_name, launch_date, rocket_type_id, is_manned, created_by) VALUES ('Commercial Station Crew-1', '2025-09-30T10:45:00Z', 1, 1, 5);
INSERT INTO launch (mission_name, launch_date, rocket_type_id, is_manned, created_by) VALUES ('Lunar South Pole Survey', '2025-10-25T07:30:00Z', 5, 1, 1);
INSERT INTO launch (mission_name, launch_date, rocket_type_id, is_manned, created_by) VALUES ('ISS Expedition 73', '2025-11-12T15:20:00Z', 3, 1, 5);
INSERT INTO launch (mission_name, launch_date, rocket_type_id, is_manned, created_by) VALUES ('Cargo Resupply CRS-40', '2025-05-08T16:30:00Z', 1, 0, 1);
INSERT INTO launch (mission_name, launch_date, rocket_type_id, is_manned, created_by) VALUES ('Weather Satellite Deploy', '2025-12-03T12:00:00Z', 2, 0, 5);

-- Insert crew members for manned launches
-- Launch 1: Artemis III (4 crew members)
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (1, 1);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (2, 1);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (3, 1);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (4, 1);

-- Launch 2: ISS Expedition 72 (3 crew members)
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (5, 2);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (6, 2);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (7, 2);

-- Launch 3: Lunar Gateway Assembly (4 crew members)
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (1, 3);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (8, 3);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (9, 3);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (10, 3);

-- Launch 4: Mars Preparation Mission (2 crew members)
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (5, 4);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (6, 4);

-- Launch 5: Hubble Servicing Mission (3 crew members)
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (1, 5);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (3, 5);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (8, 5);

-- Launch 6: Commercial Station Crew-1 (4 crew members)
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (5, 6);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (7, 6);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (9, 6);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (10, 6);

-- Launch 7: Lunar South Pole Survey (2 crew members)
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (1, 7);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (2, 7);

-- Launch 8: ISS Expedition 73 (3 crew members)
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (5, 8);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (6, 8);
INSERT INTO crew_member (astronaut_id, launch_id) VALUES (4, 8);

-- Note: Launches 9 and 10 are unmanned and have no crew members


