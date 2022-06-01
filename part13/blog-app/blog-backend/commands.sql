CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO
  blogs (author, url, title)
VALUES
  (
    'Bob Loblaw',
    'https://www.boblawlawblog.com',
    'Bob Loblaw Law Blog'
  );

INSERT INTO
  blogs (author, url, title)
VALUES
  (
    'Gary Vaynerchuk',
    'http://garyvaynerchuk.com/',
    'Meet Gary Vaynerchuk'
  );