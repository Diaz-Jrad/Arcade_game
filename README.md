PONG GAME

Développeur : Diaz Gabriel
              Jrad Hamza


Dans le cadre du "mini projet" du cours de Javascript/HTML5, nous nous sommes orientés vers le sujet 2, à savoir le 
développement d'un jeu d'arcade.
Nous nous sommes inspirés du premier jeu sur PC : Pong (jeu de tennis)


But :

Le joueur contrôle la barre verticale de droite grâce à sa souris et doit marquer 10 points pour gagner la partie.
Avant de commencer la partie, le joueur doit sélectionner le niveau de difficulté souhaité. Cela permet d'implémenter 
la vitesse de déplacement de la balle et de l'IA. Les vitesses augmentent avec le niveau.
Une fois le niveau sélectionné, le joueur doit presser la barre d'espace pour lancer le jeu.
Le game play se charge et implémente les caractéristiques décrivant le joueur, l'IA et la balle avant de lancer la partie.
Les éléments du canevas sont rechargés en permanence jusqu'à ce qu'un des joueurs ait atteint 10 points, les coordonnées du 
joueur, de l'IA et de la balle sont sans cesse recalculées et répercutées à l'écran.
Une fois que 10 points ont été atteint, un écran apparaît affichant 'You win' ou 'You lose' selon les résultats de la 
partie. 2 options : Cliquer sur le bouton 'reset' renvoie à l'écran de titre et permet de changer le niveau de difficulté.
Presser la barre d'espace relance la partie en conservant le même niveau de difficulté.


Traitement :

	- Déplacement du joueur :

La position en ordonnée de la souris dans le canevas est répercutée sur le joueur et permet de le déplacer en temps réel.

	- Déplacement de l'IA :

Les mouvements de l'IA, comme ceux du joueur, sont uniquement horizontaux. 
Avant chaque déplacement, la distance entre l'IA et la balle est calculée de la façon suivante : A chaque fois que la balle
entre en contact avec un joueur, un 'point d'impact' est calculé de manière aléatoire sur la longueur de l'IA et sera le 
point sur lequel l'IA touchera la balle au prochain coup.
La distance avec la balle est la distance entre la position en ordonnée de la balle et ce point d'impact.
Si cette distance n'est pas nulle et que le prochain déplacement de l'IA ne le fait pas sortir du canevas, l'IA se déplace 
en direction de la balle.
Sa vitesse de déplacement est celle initialisée lors du choix du niveau de difficulté, multipliée par un entier plus ou 
moins grand en fonction de l'importance de la distance avec la balle. Cela a été implémenté dans le but de faire accélérer 
l'IA et donner une impression de réactivité à la situation.
La vitesse et le point d'impact permettent de rendre faillible l'IA.

Bugs : Lorsque la distance avec la balle est proche de 0, la position de l'IA oscille sans cesse entre 0.5 et -0.5 par 
rapport à la balle. Cela ne fait pas très propre à l'écran. Pour corriger cela, l'IA ne se déplace que si la valeur absolue
de la distance avec la balle est supérieure à 3.
Lorsque l'IA touche un bord horizontal, ses coordonnées se 'bloque' et il ne se déplace plus. Pour corriger cela, lorsque 
le cas se produit, on force l'IA à se déplacer à l'opposé.

	- Déplacement de la balle :

La balle se déplace d'une vitesse horizontale initialisée par le niveau de difficulté et d’une vitesse verticale (angle que 
prend la trajectoire de la balle) implémentée de la façon suivante :	
Au lancement d'une partie, la balle se déplace verticalement. Selon le point d'impact, ce déplacement est implémenté par 
un entier compris entre -3 et 3 (négatif pour la partie supérieure des joueurs et positif pour la partie inférieure).
Plus le point d'impact est proche du bord du joueur, plus l'angle auquel la balle est renvoyée sera important. 
Afin que les parties ne s'éternisent pas, à chaque fois que la balle touche un joueur, la vitesse de déplacement horizontale
de la balle est incrémentée de 5% et la vitesse verticale est multipliée par 1/6 de la vitesse horizontale en valeur absolue.
Lorsque la balle touche un 'mur' horizontal, elle rebondit dans la même direction verticale et dans la direction horizontale
opposée. Lorsqu'elle touche un 'mur' vertical, le joueur ayant renvoyé la balle voit son score incrémenté d'un point puis 
le jeu se réinitialise : La balle et l'IA reprennent leurs positions initiales, la vitesse de la balle revient à celle
définie par le niveau de difficulté et est renvoyée vers le joueur ayant marqué le point.
