export class AttributeChoiceValueField extends foundry.data.fields.DataField {
	static get _defaults() {
		return foundry.utils.mergeObject(super._defaults, {
			required: true,
			nullable: true
		});
	}

	_cast(value) {
		if (typeof value !== "string") return value;
		if (["true", "false"].includes(value)) return value === "true";
		if (Number.isNumeric(value)) return Number(value);
		return value;
	}

	_validateType(value, options = {}) {
		const validTypes = ["string", "number", "boolean"];
		if (!value && !validTypes.includes(foundry.utils.getType(value))) {
			throw new Error("must be String, Number, or Boolean");
		}
	}
}

/**
 * The code below was taken from the dnd5e system by Andrew Clayton and is licensed under the MIT license.
 * Original file: https://github.com/foundryvtt/dnd5e/blob/677c6ae127aa885bd4cb9a83f95180a655a8623b/module/data/fields.mjs
 */

/**
 * Special case StringField which represents a formula.
 *
 * @param {FormulaFieldOptions} [options={}]  Options which configure the behavior of the field.
 * @property {boolean} deterministic=false    Is this formula not allowed to have dice values?
 */
export class FormulaField extends foundry.data.fields.StringField {
	/** @inheritdoc */
	static get _defaults() {
		return foundry.utils.mergeObject(super._defaults, {
			deterministic: false
		});
	}

	/* -------------------------------------------- */

	/** @inheritdoc */
	_validateType(value) {
		if (this.options.deterministic) {
			const roll = new Roll(value);
			if (!roll.isDeterministic) {
				throw new Error("must not contain dice terms");
			}
			Roll.safeEval(roll.formula);
		} else {
			Roll.validate(value);
		}
		super._validateType(value);
	}
}

/**
 * A subclass of TypedObjectField that represents a mapping of keys to the provided DataField type.
 *
 * @param {DataField} model                    The class of DataField which should be embedded in this field.
 * @param {MappingFieldOptions} [options={}]   Options which configure the behavior of the field.
 * @property {string[]} [initialKeys]          Keys that will be created if no data is provided.
 * @property {MappingFieldInitialValueBuilder} [initialValue]  Function to calculate the initial value for a key.
 * @property {boolean} [initialKeysOnly=false]  Should the keys in the initialized data be limited to the keys provided
 *                                              by `options.initialKeys`?
 */
export class MappingField extends foundry.data.fields.TypedObjectField {
	constructor(model, options, context) {
		if (!(model instanceof foundry.data.fields.DataField)) {
			throw new Error("MappingField must have a DataField as its contained element");
		}
		// Cleaning and validating the entries, including partial updates and
		// deletion keys, is left to the core field.
		super(model, options, context);

		/**
		 * The embedded DataField definition which is contained in this field.
		 * @type {DataField}
		 */
		this.model = this.element;
	}

	/* -------------------------------------------- */
	/** @inheritdoc */
	static get _defaults() {
		return foundry.utils.mergeObject(super._defaults, {
			initialKeys: null,
			initialValue: null,
			initialKeysOnly: false
		});
	}

	/* -------------------------------------------- */
	/** @inheritdoc */
	getInitialValue(data) {
		let keys = this.initialKeys;
		const initial = super.getInitialValue(data);
		if (!keys || !foundry.utils.isEmpty(initial)) {
			return initial;
		}
		if (!(keys instanceof Array)) {
			keys = Object.keys(keys);
		}
		for (const key of keys) {
			initial[key] = this._getInitialValueForKey(key);
		}
		return initial;
	}

	/* -------------------------------------------- */
	/**
	 * Get the initial value for the provided key.
	 * @param {string} key       Key within the object being built.
	 * @param {object} [object]  Any existing mapping data.
	 * @returns {*}              Initial value based on provided field type.
	 */
	_getInitialValueForKey(key, object) {
		const initial = this.model.getInitialValue();
		return this.initialValue?.(key, initial, object) ?? initial;
	}

	/* -------------------------------------------- */
	/** @override */
	initialize(value, model, options = {}) {
		if (!value) {
			return value;
		}
		const obj = {};
		const initialKeys = (this.initialKeys instanceof Array)
			? this.initialKeys : Object.keys(this.initialKeys ?? {});
		const keys = this.initialKeysOnly ? initialKeys : Object.keys(value);
		for (const key of keys) {
			const data = value[key] ?? this._getInitialValueForKey(key, value);
			obj[key] = this.model.initialize(data, model, options);
		}
		return obj;
	}

	/* -------------------------------------------- */
	/** @inheritdoc */
	_getField(path, options = {}) {
		if (path.length === 0) return this;
		path.pop();
		return this.model._getField(path, options);
	}
}
