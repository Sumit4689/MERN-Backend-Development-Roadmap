
const parser = (req, res) => {
    let {val1, val2} = req.body

    val1 = Number(val1)
    val2 = Number(val2)

    if(isNaN(val1) || isNaN(val2)){
        res.status(400).json({
            message : "Only numbers are accepted"
        })

        return null
    }

    return {val1, val2}
}

const addition =  (req, res) => {
    const values = parser(req, res)

    if (!values) return

    const {val1, val2} = values

    const addition = val1 + val2

    return res.status(200).json({
        result : `Addition of ${val1} and ${val2} is : ${addition}`
    })
}

const subtraction = (req, res) => {
    const values = parser(req, res)

    if (!values) return

    const {val1, val2} = values

    const subtraction = val1 - val2

    return res.status(200).json({
        result : `subtraction of ${val2} from ${val1} is : ${subtraction}`
    })
}

const multiplication = (req, res) => {
    const values = parser(req, res)

    if (!values) return

    const {val1, val2} = values

    const multiplication = val1 * val2

    return res.status(200).json({
        result : `multiplication of ${val1} and  ${val2} is : ${multiplication}`
    })
}

const division = (req, res) => {
    const values = parser(req, res)

    if (!values) return

    const {val1, val2} = values

    if (val2 === 0){
        return res.status(400).json({
            message: "Denominator can not be zero"
        })
    }

    const division = val1 / val2

    return res.status(200).json({
        result : `division of ${val1} and  ${val2} is : ${division}`
    })
}

module.exports = {addition, subtraction, multiplication, division}