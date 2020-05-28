/**
 *
 *
 * Ici l'objet store sert à modifier le localStorage. Dans ce projet, le localstorage représente la base de donnée.
 * l'objet store effectue les actions CRUD Create, Read, Update et Delete
 * @module Store
 *
 *
 *
 */
(function (window) {
	("use strict");

	/**
	 *
	 * Crée un store dans le localstorage du client avec une collection de todo vide s'il n'est existe pas déjà.
	 * Store utilise des callbacks car il n'y a pas de base de donée mais si non il faudrait utiliser des appel ajax
	 *
	 * @param {string} name Nom de la base de donnée
	 * @param {function} callback Le callback
	 * @memberOf module:Store
	 *
	 */
	function Store(name, callback) {
		callback = callback || function () {};

		this._dbName = name;

		if (!localStorage[name]) {
			var data = {
				todos: [],
			};

			localStorage[name] = JSON.stringify(data);
		}

		callback.call(this, JSON.parse(localStorage[name]));
	}

	/**
	 * Trouve les todos qui matchent avec la query passée en paramettre
	 *
	 * @param {object} query La query
	 * @param {function} callback Le callback
	 *
	 * @example
	 * db.find({foo: 'bar', hello: 'world'}, function (data) {
	 *	 // retourne tous les todo qui ont comme propriété 'foo' === 'bar' && 'hello' === 'world'
	 * });
	 */
	Store.prototype.find = function (query, callback) {
		if (!callback) {
			return;
		}

		var todos = JSON.parse(localStorage[this._dbName]).todos;

		callback.call(
			this,
			todos.filter(function (todo) {
				for (var q in query) {
					if (query[q] !== todo[q]) {
						return false;
					}
				}
				return true;
			})
		);
	};

	/**
	 * Retourne toutes les todos
	 *
	 * @param {function} callback The callback
	 */
	Store.prototype.findAll = function (callback) {
		callback = callback || function () {};
		callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
	};

	/**
	 * Enregistre une todo dans le localstorage, celle passée en paramettre. Si un id est donnée, la fonction trouve et met à jour la todo,
	 * si non, elle ajoute la todo
	 *
	 * @param {object} updateData la todo à enregistrer
	 * @param {function} callback Le callback
	 * @param {number} id L'id de la todo à mettre à jour
	 */
	Store.prototype.save = function (updateData, callback, id) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;

		callback = callback || function () {};

		// If an ID was actually given, find the item and update each property
		if (id) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					for (var key in updateData) {
						todos[i][key] = updateData[key];
					}
					break;
				}
			}

			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, todos);
		} else {
			// Generate an ID
			var newId = Date.now();
			// Assign an ID
			updateData.id = parseInt(newId);
			todos.push(updateData);
			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, [updateData]);
		}
	};

	/**
	 * Supprime une todo du store
	 *
	 * @param {number} id L'ID de la todo à supprimer
	 * @param {function} callback Le callback
	 */
	Store.prototype.remove = function (id, callback) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;
		/* var todoId;

		for (var i = 0; i < todos.length; i++) {
			if (todos[i].id == id) {
				todoId = todos[i].id;
			}
		}

		for (var i = 0; i < todos.length; i++) {
			if (todos[i].id == todoId) {
				todos.splice(i, 1);
			}
		} */
		var todoPosition;

		for (var i = 0; i < todos.length; i++) {
			if (todos[i].id == id) {
				todoPosition = i;
			}
		}
		todos.splice(todoPosition, 1);

		localStorage[this._dbName] = JSON.stringify(data);
		callback.call(this, todos);
	};

	/**
	 * Supprime tout le localstorage
	 *
	 * @param {function} callback Le callback
	 */
	Store.prototype.drop = function (callback) {
		var data = { todos: [] };
		localStorage[this._dbName] = JSON.stringify(data);
		callback.call(this, data.todos);
	};

	// Export to window
	window.app = window.app || {};
	window.app.Store = Store;
})(window);
