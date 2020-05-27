export const getValidatorText = () => {
	const required = () => {
		return 'This field is required'
	}

	const minLength = (min: number) => {
		let plural = 'no characters'
		if (min == 1) {
			plural = 'one character'
		} else if (min > 1) {
			plural = `${min} characters`
		}

		return `This field must be at least ${plural}`
	}

	const maxLength = (max: number) => {
		let plural = 'no characters'
		if (max == 1) {
			plural = 'one character'
		} else if (max > 1) {
			plural = `${max} characters`
		}

		return `This field can be at most ${plural}`
	}

	const numeric = () => {
		return 'This field must be numeric'
	}

	return { required, minLength, maxLength, numeric }
}
