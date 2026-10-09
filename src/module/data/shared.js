import { FormulaField, MappingField } from "./fields.js";

/**
 * Creates the base actor resources.
 * @returns {*}
 */
export function createActorResources() {
	return new foundry.data.fields.SchemaField({
		forward: new foundry.data.fields.SchemaField({
			value: new foundry.data.fields.NumberField({
				initial: 0,
				integer: true
			})
		}),
		ongoing: new foundry.data.fields.SchemaField({
			value: new foundry.data.fields.NumberField({
				initial: 0,
				integer: true
			})
		}),
		hold: new foundry.data.fields.SchemaField({
			value: new foundry.data.fields.NumberField({
				initial: 0,
				integer: true
			})
		}),
		rollFormula: new FormulaField({ initial: "" })
	});
}

/**
 * Creates the base item resources.
 * @returns {*}
 */
export function createItemResources() {
	return {
		uses: new foundry.data.fields.NumberField({
			initial: 0,
			integer: true
		})
	};
}

/**
 * Creates the list of modifiers that an item or playbook choice applies to
 * its actor when granted.
 * @returns {*}
 */
export function createModifiers() {
	return new foundry.data.fields.ArrayField(
		new foundry.data.fields.SchemaField({
			// The stat or attribute to change, by its sheet config (TOML) name:
			// "stats.cool", "attributes.harm" or "attributes.harm.max".
			key: new foundry.data.fields.StringField({ initial: "" }),
			mode: new foundry.data.fields.StringField({ initial: "add", choices: ["add", "set"] }),
			value: new foundry.data.fields.NumberField({ initial: 1, nullable: false })
		})
	);
}

/**
 * Creates the base move data that is shared between Moves and NPC Moves.
 * @returns {*}
 */
export function createMoveData() {
	return {
		moveType: new foundry.data.fields.StringField({ initial: "" }),
		rollFormula: new FormulaField({ initial: "" }),
		moveResults: new MappingField(
			new foundry.data.fields.SchemaField({
				key: new foundry.data.fields.StringField({ initial: "" }),
				label: new foundry.data.fields.StringField({ initial: "" }),
				value: new foundry.data.fields.HTMLField()
			})
		)
	};
}
