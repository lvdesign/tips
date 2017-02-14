---
layout: post
title: "Build easy form with php"
date:  2015-08-07 09:30:13
categories: web
tag : php

posts-attribution: LVdesign
posts-attribution-link: http://lvdesign.com.fr
---


# Créer et gérer facilement des formulaires en .php

Pour une rapide mise en forme de formulaire et pour récuperer facilement les données, 

voici deux petites fonctions pratiques, "bootsratiser" pour ceux qui aime.

La base de cette fonction est issue du livre de [Larry Ullman](http://www.larryullman.com/) "effortless E-commerce". 

Je l'ai un petit peu accessoirisé et j'ai realisé la seconde partie pour me faciliter
 
la récuperation de données pour les pages Update du site [recettesoriginales.fr](http://www.recettesoriginales.fr).

Voilà, cela peut toujours être utile. 


Pour tester en live voici le lien :

[la page test](http://www.lvdesign.com.fr/form-php/)
[les fichiers du test ](https://github.com/lvdesign/form-php.git)

    * function create_form_input();
    * function make_Text_Input();

~~~

    function create_form_input($name, $type, $label='', $errors=array(), $options=array() ){
	$value = false;
	
	if(isset($_POST[$name])) $value = $_POST[$name];
		if($value && get_magic_quotes_gpc()) $value = stripslashes($value);
		
		echo'<div class="form-group';
			if (array_key_exists($name,$errors)) echo ' has-error'; 
			echo '">';
			//label
			if(!empty($label)) echo'<label for="' .$name. '" class="control-label">' .$label. '</label>';
		
				//INPUT form text, password, email
				if( ($type ==='text') || ($type ==='password') || ($type ==='email')){
						echo'<input type="' .$type. '" name="' .$name. '" id="' .$name. '" class="form-control"';
					
					if ($value) echo ' value="' .htmlspecialchars($value). '"';
					
					//option as placeholder
					if(!empty($options) && is_array($options)){
						foreach($options as $k => $v){
							echo " $k=\"$v\" ";
							}
						}
					echo '>';
			//erreurShow
			if(array_key_exists($name,$errors)) echo'<span class="help-block">'.$errors[$name].'</span>';
		//textarea
		} elseif($type ==='textarea'){
				if(array_key_exists($name, $errors)) echo '<span class="help-block">' .$errors[$name]. '</span>';
				echo'<textarea name="'.$name.'" id="'.$name.' " class="form-control" required ';
					if(!empty($options) && is_array($options)){
						foreach($options as $k => $v){
							echo " $k=\"$v\" ";
							}
						}
					echo '>';
			if ($value) echo $value;
				echo'</textarea>';
	}//endIF
	echo '</div>';
    }//funct	

    //retrouver les données
    function make_Text_Input($name, $type, $label='', $value, $errors =array(), $options= array() ){

    if(isset($_GET[$name])) $value = $_GET[$name];
		if( $value && get_magic_quotes_gpc()) $value = stripslashes($value);
		
		echo'<div class="form-group';
			if (array_key_exists($name,$errors)) echo ' has-error'; 
			echo '">';
			//label
			if(!empty($label)) echo'<label for="' .$name. '" class="control-label">' .$label. '</label>';
		//INPUT form text, password, email
				if(($type ==='text') || ($type ==='password') || ($type==='email')){
						echo'<input type="' .$type. '" name="' .$name. '" id="' .$name. '" class="form-control"';
					
					if($value) echo ' value="' .htmlspecialchars($value). '"';
					
					//option as placeholder
					if(!empty($options) && is_array($options)){
						foreach($options as $k => $v){
							echo " $k=\"$v\" ";
							}
						}
					echo '>';
			//erreurShow
			if(array_key_exists($name,$errors)) echo'<span class="help-block">'.$errors[$name].'</span>';
		
			//TEXTAREA
			} elseif($type ==='textarea'){
					if(array_key_exists($name, $errors)) echo '<span class="help-block">' .$errors[$name]. '</span>';
					echo'<textarea name="'.$name.'" id="'.$name.'" class="form-control" ';
						if(!empty($options) && is_array($options)){
							foreach($options as $k => $v){
								echo " $k=\"$v\" ";
								}
							}
						echo '>';
							 if ($value) echo $value ;
					echo'</textarea>';									
		}//endIF
    echo '</div>';
    }//funct
    
 ~~~

