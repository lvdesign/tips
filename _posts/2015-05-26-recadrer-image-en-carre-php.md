---
layout: post
title: "Recadrer une image en carre en php ?"
date:  2015-04-16 09:30:13
categories: web


posts-attribution: LVdesign
posts-attribution-link: http://lvdesign.com.fr
---

#Transform an image downloaded in perfect square !

Voici une petite fonction en php pour transformer une image d’une taille quelconque en format carre. 
J’ai utilise cette function pour mon site recettesoriginales.fr. Les utilisateurs peuvent ainsi associer une image a leur recette de cuisine.
Mon exemple est valable pour des fichiers en .jepg mais évidement elle peut être adapte pour d’autres formats (gif, png et toute forme de JEPG).
la function function images_resize_carre($src, $dest, $carre){};
indique bien sont role. 
L’image lorsqu’elle est chargée, est transformée en carre selon le paramètre défini $carre.
J’ai choisi de centrer l’image par défaut. 
Cela sous entend que lorsque  l’image est chargee, elle sera recadrer en centrant l’image. 
C’est évidement un principe mais il serait facile de créer si besoin est une autre façon de recadrer l’image.

extrait du code

	```
	//photo en paysage
 	if($width >= $height){
	$dim = $height;
	$paysage = true;
	}
	elseif($width <= $height){
	$dim = $height; 
	$portrait = true;
	}
	else{
	$dim=$width;
	}
	
	//photo en portrait   
	if($paysage)
	{
	switch($pos){
	default: 
	$point_x_ref=($width/2)-($dim/2);
	$point_y_ref="0";
	break;
	}
	}
	elseif($portrait)
	{
	switch($pos){
	default: 
	$point_x_ref="0";
	$point_y_ref=($height/2)-($dim/2); 
	break;
	}
	}
	
	```

Pour mon site recettesoriginales.fr, ma fonction est pour plus de commodité insérée après avoir vérifié le format de l’image, sa taille, etc.
Elle supporte la réécriture selon le format chargé.

Voila c’est une fonction simple et pratique. Vous pouvez la tester en local.

[source de base mercier133](http://www.phpsources.org/scripts580-PHP.htm)

######Et voila, a vous de choisir.
[le fichier](https://github.com/lvdesign/carre-image-php.git)


