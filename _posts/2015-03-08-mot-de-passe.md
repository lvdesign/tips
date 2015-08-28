---
layout: post
title: "un mot de passe ?"
date:   2015-03-08 09:30:13
categories: web

image: http://www.lvdesign.com.fr/blog/inews/lv-password-reader.png
posts-attribution: LVdesign
posts-attribution-link: http://lvdesign.com.fr
comments : false
---

#Pourquoi un mot de passe devrait être illisible ? 

Ok, un mot de passe est toujours une somme de points car il doit être protégé. C'est tout à fait normal.
Mais vous avez peut être parfois un doute en remplissant le champs du mot de passe. 
Et alors, une petite phrase assassine vous dit _"Votre mot de passe n'est pas valide"_. 
Et oui, où est l'erreur ? est-ce le mauvais password ou bien vous vous êtes emmêlé les doigts sur votre clavier.

Alors pour les utilisateurs de votre site, je vous propose une solution aperçu sur le net [http://huffduffer.com/signup/] (le sign-up de huffduffer de Jeremy Keith.). Elle va simplifier la vie.

Tout d'abord un formulaire. Vous voyez qu'il est basique. Rien n'indique que vous allez rendre lisible le champs "password", il est bien de type="password". Ce sera bien des points noirs qui rempliront le champs mais si javascript est désactivé, le formulaire restera tout simplement
sous cette forme.

######-> script testé avec Safari, FF, Opera, Google Chrome.

Voici le formulaire et l'on peut voir le resultat :

<img src="{{page.image}}"  alt= "le formulaire de base et le resultat"/>


## Version avec jQuery de Jeremy Keith
Le script utilise la librairie jQuery pour créer à la volée la transformation 
de votre champs de type="password " au type="text".


<pre>
jQuery(function($) {
    $('input:password').each(function() {
        var psw_field = this;
        var id = $(psw_field).attr('id');
        $(psw_field).after('&lt;input type="text"&gt;');
        var text_field = $(psw_field).next();
        $(text_field).val($(psw_field).val());
        $(text_field).css('display', 'none');
        $(text_field).after('&lt;span class="pswToggle"&gt; &lt;input type="checkbox" id="' + id + '-checkbox"&gt;<label for="' + id + '-checkbox ">Voir le mot de passe</label></span>');
        var checkbox = $('#' + id + '-checkbox');
        $(checkbox).click(function() {
            $(psw_field).toggle();
            $(text_field).toggle();
        });
        $(psw_field).keyup(function() {
            $(text_field).val($(psw_field).val());
        });
        $(text_field).keyup(function() {
            $(psw_field).val($(text_field).val());
        });
    });
});
</pre>



##Ma version en DOM-Javascript
Le script utilise seulement le dom et javascript pour créer à la volée la transformation 
de votre champs de type="password " au type="text". 
C'est pratique car vous n'êtes pas obliger d'utilisez une Librairie ou même Jquery.

<pre>
//chargement script
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

//methode InserAfter node
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// Vérification, création et action DOM
function prepareInputTextField() {

        'use strict';
        if (!document.createElement) return false;
        if (!document.createTextNode) return false;
        if (!document.getElementById) return false;

        if (!document.getElementById('password')) return false;
        var psw = document.getElementById('password');

        var newInput = document.createElement("input");
        newInput.setAttribute("type", "text");
        newInput.setAttribute("style", "display:none");
        insertAfter(newInput, psw);
        var id = "password";
        var text_field = document.createElement("div");
        text_field.innerHTML = "<span class="pswToggle"><input type="checkbox" id="' + id + '-checkbox"><label for="' + id + '-checkbox ">Voir le mot de passe ? </label></span>";
        insertAfter(text_field, newInput);
        var check = document.getElementById("password-checkbox");
        //affiche
        check.onclick = function() {
            if (this.checked != false) {
                document.getElementById('password-checkbox').setAttribute('checked', 'checked');
                var text_psw = document.getElementById('password').value;
                newInput.style.display = "inline";
                newInput.value = text_psw;
                psw.style.display = "none";
            } else {
                document.getElementById('password-checkbox').removeAttribute('checked');
                newInput.value = null;
                newInput.style.display = "none";
                psw.style.display = "inline";
            }
        }
    } //endprepareInputField

addLoadEvent(prepareInputTextField);
</pre>



###### Et voila, a vous de choisir.
[exemple](https://github.com/lvdesign/mot-de-passe.git)
les fichiers : 
    
* password-lisible-demo-jQuery.html, la version de J. Keith
* password-lisible-demo-js.html, ma version light en js 
