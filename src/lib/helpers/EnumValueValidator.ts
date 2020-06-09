/**
 * Validates an enum value either the KEY or the ENUM value
 * againts a provided enum type. Returns true if the provided value
 * is valid
 * @param valueToValidate the
 * @param theEnum the enum to validaet against
 */
export function isValidEnumValue(
	valueToValidate: string | number,
	theEnum: { [key: string]: any }
) {
	let intvalueToValidate = parseInt(valueToValidate as string, 10)
	let valid = false

	function iterateover(comparator: (e: any) => boolean) {
		for (const enumMember in theEnum) {
			const enumValue = parseInt(enumMember, 10)
			if (enumValue >= 0) {
				if (comparator(enumValue)) return true
			}
		}
		return false
	}

	if (intvalueToValidate >= 0) {
		valid = iterateover((enumValue: number) => {
			return intvalueToValidate === enumValue
		})
	} else if (typeof valueToValidate == 'string') {
		valid = iterateover((enumValue: number) => {
			return valueToValidate === theEnum[enumValue]
		})
	}
	return valid
}
