---
layout: post
title: "site responsive avec ajax"
date:  2015-05-27 09:30:13
categories: web


posts-attribution: LVdesign
posts-attribution-link: http://lvdesign.com.fr
---


#Charger du complement html avec Ajax.

Pour la version mobile de votre site pensez au temps de chargement.
Meme si les réseaux sont plus efficaces, est il nécessaire de télécharger des information qui sont être complémentaires ?
Avec Ajax c’est possible.


Je prends le principe que ce n’est pas seulement le media qui doit conditionner le chargement d’information mais plutôt son intérêt. 
La bande passante est de plus en plus rapide et avec les recents mobiles 
le chargement ne sera au pire que legerement plus lent.
Je vous propose trois solutions dont une est vraiment interessante, celle de Scott Jehl : la version ajax include http://filamentgroup.com, car elle est vraiment «responsable».  


####Ma premiere version est de l’ajax de base pour une utilisation totalement contrôlable et ajustable. 
Aucune librairie nécessaire. Du javascript pour manipuler du DOM de base et en dur.


<!--JS-perso base
System DOM/ajax
base Hijax de Jeremy Keith
-->

le code
    ```
    //window.onload = prepareLinks;
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

    //   remplacer le inline -> onclick="grabFile(this.href); return false;"
    function prepareLinks() {
    'use strict';
    if (!document.getElementById || !document.getElementsByClassName || !document.getElementsByTagName) {
        return;
    }
    if (!document.getElementById('person') || !document.getElementsByTagName('a')) {
        return;
    }
    var list = document.getElementById('person');
    var links = list.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            var url = this.getAttribute("href");
            return !grabFile(url);
        };
    }
    }

    //recupere
    function grabFile(file) {
    var request = getHTTPObject();
    if (request) {
        //displayLoading(document.getElementById("details"));
        request.onreadystatechange = function() {
            //displayResponse(request);
            parseResponse(request);
        };

        request.open("GET", file, true);
        request.send(null);
        return true;
    } else {
        return false;
    }
}


    function parseResponse(request) {
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 304) {
                var details = document.getElementById("details");
                details.innerHTML = request.responseText;
            }
        }
     }


    function getHTTPObject() {
    var xhr = false;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                xhr = false;
            }
        }
    }
    return xhr;
    }

    addLoadEvent(prepareLinks);
```

<p class="p-button" id="person" >
<a href="detail/detailsRecettesOriginales.html"  title="details du projet"  class="plus-details" >Plus de details en images</a></p>
<article class="group portfolios acenter data-plus" id="details"></article>





####Ma deuxième solution est construite avec jQuery, vous connaissez? 
Simple a gérer mais il n’est peut être pas nécessaire de trimballer une bibliothèque pour cette seule action.

<!--jQueryAjax-->
<p class="p-button" id="target"><a href="detail/details-regal.html" title="details du projet"  class="plus-details" >Plus de details en images</a></p>							
<article class="group portfolios acenter action-jq" ></article>


le code

    ```
    $(document).ready(function(){
    //ajax methode
    $('#target a').click( function(){
    var source = this.href;
    $('.action-jq').hide().load( source , 
    function(){
    $(this).fadeIn();
    });
    return false;
    });
    });
    ```

####La troisieme avec cette biblio légère et avec une syntaxe responsable utilisant et manipulant les attributs de data  du html5. 

<!--ajaxInclude
 RRD de Scott Jehl http://filamentgroup.com/lab/ajax_includes_modular_content/
-->			   										

<p class="p-button"><a href="detail/details-azzaro.html" data-after data-interaction class="plus-details" >Plus de details </a><p>

-> jQuery, ajaxInclude.js, ajaxInclude-lv.js

le code

    ```
    $("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude();
    $( "a[data-interaction]" ).bind( "click", function() {
    $( this ).removeAttr( "data-interaction" ).ajaxInclude();
    return false;
    });
    ```

