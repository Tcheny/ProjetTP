import { getOne } from './registrer'

module.export = {
    getUser : async (req, res) => {
        const result = await getOne(req.body)
    res.send(result)
    }

}
