/*global NodeList */
/**
 *
 * Le helper crée des variables globales utiles qui pouront être utilisées dans toute l'application
 *
 * @module Helpers
 * @memberOf module:Helpers
 *
 *
 */
(function (window) {
	("use strict");

	/**
	 * Crée un racourci querySelector. Vous pourrez sélectionner un élément en faisant : qs(".nom-de-la-classe")
	 *
	 * @param {object} selector  Le sélecteur
	 * @param {object} scope  Le container où querysélectionner l'élément
	 * @returns l'élément du DOM demandé
	 * @memberOf module:Helpers
	 *
	 *
	 */
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};
	/**
	 * Crée un racourci querySelectorAll. la même chose pour sélectionner tous les éléments d'une classe.
	 *
	 * @param {object} selector  Le sélecteur
	 * @param {object} scope  Le container où querysélectionner les éléments
	 * @returns Les éléments du DOM demandés
	 *
	 *
	 */
	window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};

	/**
	 * Ajoute un eventListener sur l'élément demandé
	 *
	 * @param {string} target  Le sélecteur
	 * @param {string} type  Le type d'évènement ex : 'click', 'keyup' ...
	 * @param {function} callback  Le callback
	 * @param {boolean} useCapture
	 *
	 */
	window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};

	/**
	 * Attache un callback à un evenement sur tous les éléments demandés
	 *
	 * @param {string} target  Le sélecteur
	 * @param {string} selector  Selecteur présent à l'intérieur du premier sélecteur
	 * @param {string} type  Le type d'évènement ex : 'click', 'keyup' ...
	 * @param {function} handler  Le callback de l'évènement
	 *
	 */
	window.$delegate = function (target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = window.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}

		// https://developer.mozilla.org/en-US/docs/Web/Events/blur
		var useCapture = type === "blur" || type === "focus";

		window.$on(target, type, dispatchEvent, useCapture);
	};

	/**
	 * Trouve le parent de l'élément passé en paramettre et le renvoie
	 *
	 * @param {string} element Le sélecteur
	 * @param {string} tagName Le selecteur du parent que l'on veux récupérer
	 * @exemple $parent(qs('a'), 'div');
	 * @returns renvoie l'élément parent
	 *
	 */
	window.$parent = function (element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return window.$parent(element.parentNode, tagName);
	};

	// Allow for looping on nodes by chaining:
	// qsa('.foo').forEach(function () {})
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
