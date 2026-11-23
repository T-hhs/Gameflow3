SELECT * FUSE Gameflow3;
GO

CREATE VIEW Tussenscore_ranglijst AS
SELECT T.groepscode, T.teamnaam, SUM(B.waarde) AS tussenscore
FROM Team T
JOIN Supermarkt S
ON T.groepscode = S.groep
JOIN Bepaling B
ON S.supermarktnr = B.supermarktnr
GROUP BY T.groepscode, T.teamnaam;

GO

CREATE VIEW Eindscore_ranglijst AS
SELECT T.groepscode, T.teamnaam, SUM(B.waarde) AS eindscore
FROM Team T
JOIN Supermarkt S
ON T.groepscode = S.groep
JOIN Bepaling B
ON S.supermarktnr = B.supermarktnr
GROUP BY T.groepscode, T.teamnaam;
