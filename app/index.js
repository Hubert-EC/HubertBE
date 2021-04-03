const express = require('express')
const  connectDb  = require('./common/connectDb')
const app = express()
const {PORT} = require('./common/config')

connectDb()

const Account = require('./models/account.model')
const Customer =  require('./models/customer.model')
const Package = require('./models/package.model')
const Company = require('./models/deliveryCompany.model')

const create = async () => {
    // const account = new Account()
    // await account.save()
    // const customer = new Customer()
    // await customer.save()
    const package = new Package()
    await package.save()
    // const company = new Company()
    // await company.save()
}

create()
app.listen(PORT, () => console.log(`Listen on port ${PORT}`))