-- name
-- challenge (instruction)
-- address (where to go to do it)

CREATE TABLE challenges (
    id SERIAL PRIMARY KEY,
    name TEXT,
    challenge TEXT,
    address TEXT
);

INSERT INTO challenges (name, challenge, address) VALUES ('Human Harbour Bridge', 'Make a human bridge and take a photo with the Sydney Harbour Bridge in the background.', '1 Bennelong Point, Sydney NSW 2000');
INSERT INTO challenges (name, challenge, address) VALUES ('Botanic Gardens', 'Take a photo of the weirdest looking plant you can find in the Royal Botanic Gardens.', '4A Macquarie St, Sydney NSW 2000');
