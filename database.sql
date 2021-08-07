CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(255),
	"complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todo"
	("task")
	
VALUES
	('Wash Dishes'), 
	('Go for Walk'),
	('Buy Groceries');