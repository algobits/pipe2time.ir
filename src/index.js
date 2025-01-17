const crawlTimeIr = require("./pipe2time.ir")
const buildICS = require("./pipe2calendar")

const inquirer = require("inquirer")
const questions = [
	{
		type: "input",
		name: "years",
		message: "Enter your needed years? (separate by ',')",
	},
	
]

inquirer.prompt(questions).then(async ({ years }) => {
	const yParse = years.split(",")
	yParse.map(year => {
		if (!(+year <= 1500 && +year >= 1280)) {
			throw new Error({
				code: "YEAR_VALIDATION",
				message: `Input year does not in range of support. year must greater than 1280 and less than 1500, input year => ${year}`,
			})
		}
	})
	if (yParse.length) await crawlTimeIr(yParse, true)
	yParse.map(year => buildICS(year))
})
