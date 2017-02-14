---
layout: post
title: "un mot de passe, revisite ?"
date:  2015-04-16 09:30:13
categories: web
tag : pratique

image: http://www.lvdesign.com.fr/blog/inews/read-password-v2.png
posts-attribution: LVdesign
posts-attribution-link: http://lvdesign.com.fr
---

# Un mot de passe lisible par default !

<img src="{{page.image}}"  alt= "le formulaire de base et le resultat"/>

Récemment à la lecture de l'article "Inlining critical CSS for first-time visits" de [Jeremy Keith](https://adactio.com/journal/8504) sur un test de rapidité de téléchargement de fichier css  base sur le travail de [Scott Jehl](http://scottjehl.com) et du ["filament group"](http://www.filamentgroup.com/lab/performance-rwd.html), j'ai découvert qu'il avait amélioré sa version du password lisible. 
Le mot de passe est maintenant propose lisible par defaut ( à voir sur le site ["The Session"](https://thesession.org/login)). 
Je me suis amusé et empressé de réaliser ma version en Javascript et de recréer la sienne en jQuery.

A mon avis, je ne suis pas sur que cette solution soit meilleur. L'utilisateur voit en clair son password dès qu'il le saisie, sinon il doit cocher pour le rendre illisible. Cela n'amène-t-il pas un problème de sécurité ?

NB : Je rappelle que ce système de lisibilité du mot de passe ne fonctionne que si javascript est activé.

Voir les fichiers sur mon espace Github LVdesign .

###### Et voilà, à vous de choisir.

[les fichiers exemples :](https://github.com/lvdesign/mot-de-passe.git)
 

* password-lisible-demo-jQuery.html, la version de J. Keith
* password-lisible-demo-jQuery-V2.html (new method)
* password-lisible-demo-js.html, ma version light en js. 
* password-lisible-demo-js-V2.html (new method)
