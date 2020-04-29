let connection = require('../config/connection')

class ProcheIndividu {

	constructor(row) {
		this.row = row
		
	}
	/**
	 * Constante contenant la fictive Clée Primaire de la table
	 */
	static ID() {
		return 'code_position_individu'
	}
	/**
	 * Constante contenant le nom de la table actuelle
	 */
	static TABLE() {
		return 'ProcheIndividu'
	}


	get id () {
		return this.row.id
	}
	get codeProcheIndividu () {
		return this.row.code_proche_individu
	}

	get codeIndividu () {
		return this.row.code_individu
	}

	get lien () {
		return this.row.latitude
	}

	get telephone () {
		return this.row.telephone
	}

	get dateRegister () {
		return this.row.date_register
	}

	static genCodeProcheIndividu() {
		let min = 1000000000
		let max = 9999999999
		let text= "ProcheIndividu-"
        min = Math.ceil(min);
		max = Math.floor(max);
  		let nb  = Math.floor(Math.random() * (max - min +1)) + min
  		let code = text+nb
  		return code
	}

	static create(content, cb) {
		let ID		= ProcheIndividu.ID()
		let TABLE 	= ProcheIndividu.TABLE()
		let codeProcheIndividu 	= content.codeProcheIndividu
		let codeIndividu = content.codeIndividu
		let lien		= content.lien
		let telephone	= content.telephone
		let dateRegister= new Date()
		let sql = 'INSERT INTO '+ TABLE +' SET '+ ID +' = ?, lien = ?, telephone = ?,'
		+' date_register = ?'
		connection.query(sql, [codeProcheIndividu, codeIndividu, lien, telephone, dateRegister],
			(err, result) => {
				if (err) throw err
				let msg = "ProcheIndividu bien ajouté"
				cb(msg)
			})

	}


	/**
	 * trouver une ligne de la table
	 * @param  {string}   field [Champ à viser]
	 * @param  {string or any}   value [valeur du champ à viser]
	 * @param  {Function} cb    [CallBack]
	 * @return {Object Array}         [ligne de la table]
	 */
	static findByOneField(field, value, cb) {
		let TABLE = ProcheIndividu.TABLE()
		let sql = 'SELECT * FROM '+ TABLE +' WHERE '+ field +' = ?'
		connection.query(sql, [value], 
			(err, rows) => {
				if (err) throw err
				cb(rows.map((row) => new ProcheIndividu(row)))
			})
	}

		/**
	 * trouver une ligne de la table
	 * @param  {string}   field1 [premier Champ à viser]
	 * @param  {string or any}   value1 [valeur du premier champ à viser]
	 * @param  {string}   field2 [second Champ à viser]
	 * @param  {string or any}   value2 [valeur du second champ à viser]
	 * @param  {Function} cb    [CallBack]
	 * @return {Object Array}         [ligne de la table]
	 */
	static findByTwoField(field1, value1, field2, value2, cb) {
		let TABLE = ProcheIndividu.TABLE()
		let sql = 'SELECT * FROM '+ TABLE +' WHERE '+ field1 +' = ? AND '+ field2 +' = ?'
		connection.query(sql, [value1, value2], 
			(err, rows) => {
				if (err) throw err
				cb(rows.map((row) => new ProcheIndividu(row)))
			})
	}

	/**
	 * remplacement d'une valeur d'un champ de la table
	 * @param  {string}   IdFieldValue [valeur de l'identifiant, Ex: code_...]
	 * @param  {string}   field   [champ a viser]
	 * @param  {string or any}   value   [valeur du champ à viser]
	 * @param  {Function} cb      [callback]
	 * @return {void}           [confirmation]
	 */
	static replaceByOneField (IdFieldValue, field, value, cb) {
		let TABLE = ProcheIndividu.TABLE()
		let ID = ProcheIndividu.ID()
		let sql = 'UPDATE '+ TABLE +' SET '+ field +' = ? WHERE '+ ID +' = ?'
		connection.query(sql, [value, IdFieldValue], 
			(err, results) => {
				if (err) throw err
				let msg = "mise à jour effectuée avec succès..."
				cb(msg)
			})
	}

	/**
	 * retourner tout le contenu de la table
	 * @param  {Function} cb [callback]
	 * @return {array}      [tableau contenant les lignes de la table]
	 */
	static all(cb) {
		let TABLE = ProcheIndividu.TABLE();
		connection.query('SELECT * FROM '+ TABLE +' ', (err, rows) => {
			if (err) throw err
			cb(rows.map((row) => new ProcheIndividu(row)))
		})
		//connection.end()
	}

	/**
	 * supprimer une ligne de la table
	 * @param  {Object}   row [Objet à viser]
	 * @param  {Function} cb  [CallBack]
	 * @return {void}       [confirmation]
	 */
	static remove(row, cb) {
		let codeProcheIndividu = row.codeProcheIndividu
		let TABLE = ProcheIndividu.TABLE()
		let ID = ProcheIndividu.ID()
		let sql = 'DELETE FROM '+ TABLE +' WHERE '+ ID +' = ?'
		connection.query(sql, [codeProcheIndividu], (err, result) => {
			if (err) throw err
			let msg = "ProcheIndividu supprimé avec succès..."
			cb(msg)
		})
	}
}

module.exports = ProcheIndividu