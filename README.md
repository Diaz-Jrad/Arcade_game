PONG GAME

D�veloppeur : Diaz Gabriel
              Jrad Hamza


Dans le cadre du "mini projet" du cours de Javascript/HTML5, nous nous sommes orient�s vers le sujet 2, � savoir le 
d�veloppement d'un jeu d'arcade.
Nous nous sommes inspir�s du premier jeu sur PC : Pong (jeu de tennis)


But :

Le joueur contr�le la barre verticale de droite gr�ce � sa souris et doit marquer 10 points pour gagner la partie.
Avant de commencer la partie, le joueur doit s�lectionner le niveau de difficult� souhait�. Cela permet d'impl�menter 
la vitesse de d�placement de la balle et de l'IA. Les vitesses augmentent avec le niveau.
Une fois le niveau s�lectionn�, le joueur doit presser la barre d'espace pour lancer le jeu.
Le game play se charge et impl�mente les caract�ristiques d�crivant le joueur, l'IA et la balle avant de lancer la partie.
Les �l�ments du canevas sont recharg�s en permanence jusqu'� ce qu'un des joueurs ait atteint 10 points, les coordonn�es du 
joueur, de l'IA et de la balle sont sans cesse recalcul�es et r�percut�es � l'�cran.
Une fois que 10 points ont �t� atteint, un �cran appara�t affichant 'You win' ou 'You lose' selon les r�sultats de la 
partie. 2 options : Cliquer sur le bouton 'reset' renvoie � l'�cran de titre et permet de changer le niveau de difficult�.
Presser la barre d'espace relance la partie en conservant le m�me niveau de difficult�.


Traitement :

	- D�placement du joueur :

La position en ordonn�e de la souris dans le canevas est r�percut�e sur le joueur et permet de le d�placer en temps r�el.

	- D�placement de l'IA :

Les mouvements de l'IA, comme ceux du joueur, sont uniquement horizontaux. 
Avant chaque d�placement, la distance entre l'IA et la balle est calcul�e de la fa�on suivante : A chaque fois que la balle
entre en contact avec un joueur, un 'point d'impact' est calcul� de mani�re al�atoire sur la longueur de l'IA et sera le 
point sur lequel l'IA touchera la balle au prochain coup.
La distance avec la balle est la distance entre la position en ordonn�e de la balle et ce point d'impact.
Si cette distance n'est pas nulle et que le prochain d�placement de l'IA ne le fait pas sortir du canevas, l'IA se d�place 
en direction de la balle.
Sa vitesse de d�placement est celle initialis�e lors du choix du niveau de difficult�, multipli�e par un entier plus ou 
moins grand en fonction de l'importance de la distance avec la balle. Cela a �t� impl�ment� dans le but de faire acc�l�rer 
l'IA et donner une impression de r�activit� � la situation.
La vitesse et le point d'impact permettent de rendre faillible l'IA.

Bugs : Lorsque la distance avec la balle est proche de 0, la position de l'IA oscille sans cesse entre 0.5 et -0.5 par 
rapport � la balle. Cela ne fait pas tr�s propre � l'�cran. Pour corriger cela, l'IA ne se d�place que si la valeur absolue
de la distance avec la balle est sup�rieure � 3.
Lorsque l'IA touche un bord horizontal, ses coordonn�es se 'bloque' et il ne se d�place plus. Pour corriger cela, lorsque 
le cas se produit, on force l'IA � se d�placer � l'oppos�.

	- D�placement de la balle :

La balle se d�place d'une vitesse horizontale initialis�e par le niveau de difficult� et d�une vitesse verticale (angle que 
prend la trajectoire de la balle) impl�ment�e de la fa�on suivante :	
Au lancement d'une partie, la balle se d�place verticalement. Selon le point d'impact, ce d�placement est impl�ment� par 
un entier compris entre -3 et 3 (n�gatif pour la partie sup�rieure des joueurs et positif pour la partie inf�rieure).
Plus le point d'impact est proche du bord du joueur, plus l'angle auquel la balle est renvoy�e sera important. 
Afin que les parties ne s'�ternisent pas, � chaque fois que la balle touche un joueur, la vitesse de d�placement horizontale
de la balle est incr�ment�e de 5% et la vitesse verticale est multipli�e par 1/6 de la vitesse horizontale en valeur absolue.
Lorsque la balle touche un 'mur' horizontal, elle rebondit dans la m�me direction verticale et dans la direction horizontale
oppos�e. Lorsqu'elle touche un 'mur' vertical, le joueur ayant renvoy� la balle voit son score incr�ment� d'un point puis 
le jeu se r�initialise : La balle et l'IA reprennent leurs positions initiales, la vitesse de la balle revient � celle
d�finie par le niveau de difficult� et est renvoy�e vers le joueur ayant marqu� le point.
