/**
 *
 *
 *blabla template
 * @module Template
 *
 *
 *
 */
(function (window) {
	("use strict");

	var htmlEscapes = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#x27;",
		"`": "&#x60;",
	};

	var escapeHtmlChar = function (chr) {
		return htmlEscapes[chr];
	};

	var reUnescapedHtml = /[&<>"'`]/g;
	var reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

	var escape = function (string) {
		return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
	};

	/**
	 * Sets up defaults for all the Template methods such as a default template
	 *
	 * @constructor
	 * @memberOf module:Template
	 */
	function Template() {
		this.defaultTemplate =
			'<li data-id="{{id}}" class="{{completed}}">' +
			'<div class="view">' +
			'<input class="toggle" type="checkbox" {{checked}}>' +
			"<label>{{title}}</label>" +
			'<button class="destroy"></button>' +
			"</div>" +
			"</li>";
	}

	/**
	 * Crée une <li> HTML string et la retourne.
	 *
	 * NOTE: Normalement, il faut utiliser un moter de template tel que Mustache ou Handlebar, mais, ce projet est un exemple en vanilla JS.
	 *
	 * @param {array} data array de todo à afficher
	 * @returns {string} HTML String <li>
	 *
	 * @example
	 * view.show({
	 *	id: 1,
	 *	title: "Hello World",
	 *	completed: 0,
	 * });
	 */
	Template.prototype.show = function (data) {
		var i, l;
		var view = "";
		//console.log("data", data);

		for (i = 0, l = data.length; i < l; i++) {
			var template = this.defaultTemplate;
			var completed = "";
			var checked = "";

			if (data[i].completed) {
				completed = "completed";
				checked = "checked";
			}

			template = template.replace("{{id}}", data[i].id);
			template = template.replace("{{title}}", escape(data[i].title));
			template = template.replace("{{completed}}", completed);
			template = template.replace("{{checked}}", checked);

			view = view + template;
		}

		return view;
	};

	/**
	 * Affiche le nombre de todos actives
	 *
	 * @param {number} activeTodos Le nombre de todos actives.
	 * @returns {string} String HTML qui contient le nombre
	 */
	Template.prototype.itemCounter = function (activeTodos) {
		var plural = activeTodos === 1 ? "" : "s";

		return "<strong>" + activeTodos + "</strong> todo" + plural + " active" + plural;
	};

	/**
	 *
	 * Met à jour le texte "Suplimer les faites" ou ""
	 *
	 * @param   completedTodos Le nombre de todos completed.
	 * @returns {string} le texte à afficher : "Suplimer les faites" | ""
	 */
	Template.prototype.clearCompletedButton = function (completedTodos) {
		if (completedTodos > 0) {
			return "Supprimer les faites";
		} else {
			return "";
		}
	};

	// Export to window
	window.app = window.app || {};
	window.app.Template = Template;
})(window);
