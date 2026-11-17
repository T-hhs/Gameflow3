CREATE TABLE Spelleider (
spelleidernr INT NOT NULL,
accountnaam VARCHAR(20) NOT NULL,
wachtwoord VARCHAR(20) NOT NULL,
PRIMARY KEY (spelleidernr));

CREATE TABLE Serious_game (
sg_code VARCHAR(10) NOT NULL,
begeleider INT NOT NULL,
PRIMARY KEY (sg_code),
FOREIGN KEY (begeleider) REFERENCES Spelleider(spelleidernr)
ON UPDATE CASCADE ON DELETE NO ACTION);

CREATE TABLE Team (
groepscode VARCHAR(10) NOT NULL,
teamnaam VARCHAR(30),
wachtwoord VARCHAR(20) NOT NULL,
hint VARCHAR(60),
PRIMARY KEY (groepscode));

CREATE TABLE Supermarkt (
supermarktnr INT NOT NULL,
naam VARCHAR(30) NOT NULL,
informatie VARCHAR(100) NOT NULL,
vaste_lasten DECIMAL(10,2) NOT NULL,
simulatie VARCHAR(10) NOT NULL,
groep VARCHAR(10) NOT NULL UNIQUE,
PRIMARY KEY (supermarktnr),
FOREIGN KEY (simulatie) REFERENCES Serious_game(sg_code)
ON UPDATE NO ACTION ON DELETE NO ACTION,
FOREIGN KEY (groep) REFERENCES Team(groepscode)
ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE Ronde (
rondenr INT NOT NULL,
tijdsduur TIME NOT NULL,
seizoen CHAR(10) NOT NULL,
spel VARCHAR(10) NOT NULL,
PRIMARY KEY (rondenr),
FOREIGN KEY (spel) REFERENCES Serious_game(sg_code)
ON UPDATE NO ACTION ON DELETE NO ACTION,
CHECK (seizoen IN ('Zomer', 'Herfst', 'Winter', 'Lente')));

CREATE TABLE Event (
eventnr INT NOT NULL, 
type VARCHAR(50) NOT NULL,
beschrijving VARCHAR(200) NOT NULL,
PRIMARY KEY (eventnr),
CHECK (type IN ('algemeen', 'speciale_dagen')));

CREATE TABLE KPI (
KPI_code VARCHAR(10) NOT NULL,
beschrijving VARCHAR(200) NOT NULL,
PRIMARY KEY (KPI_code));

CREATE TABLE Doel (
doelcode VARCHAR(20) NOT NULL,
succesfactor VARCHAR(50) NOT NULL,
PRIMARY KEY (doelcode));

CREATE TABLE Keuze (
keuzenr INT NOT NULL, 
invloed VARCHAR(50) NOT NULL,
kosten DECIMAL(10,2) NOT NULL DEFAULT 0,
PRIMARY KEY (keuzenr));

CREATE TABLE Groepskeuze (
keuzenr INT NOT NULL,
groepscode VARCHAR(10) NOT NULL,
PRIMARY KEY (keuzenr, groepscode),
FOREIGN KEY (keuzenr) REFERENCES Keuze(keuzenr)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (groepscode) REFERENCES Team(groepscode)
ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE Doelrichting (
doelcode VARCHAR(20) NOT NULL,
groepscode VARCHAR(10) NOT NULL, 
PRIMARY KEY (doelcode, groepscode),
FOREIGN KEY (doelcode) REFERENCES Doel(doelcode)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (groepscode) REFERENCES Team(groepscode)
ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE Gebeurtenis (
eventnr INT NOT NULL,
rondenr INT NOT NULL,
PRIMARY KEY (eventnr, rondenr),
FOREIGN KEY (eventnr) REFERENCES Event(eventnr)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (rondenr) REFERENCES Ronde(rondenr)
ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE Bepaling (
KPI_code VARCHAR(10) NOT NULL,
supermarktnr INT NOT NULL,
waarde DECIMAL(10,2) NOT NULL DEFAULT 0,
PRIMARY KEY (KPI_code, supermarktnr),
FOREIGN KEY (KPI_code) REFERENCES KPI(KPI_code)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (supermarktnr) REFERENCES Supermarkt(supermarktnr)
ON UPDATE CASCADE ON DELETE CASCADE);