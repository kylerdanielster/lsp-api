const addressRepository = require('../data/addressRepository');

const logging = require('../middleware/logging');
const NAMESPACE = 'Address';

const getAddressById = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Getting an address by id');
    const results = await addressRepository.getById(req.params.address_id);

    if (results === null) {
      return res.status(400).json({ msg: 'There is no address with that id' });
    }

    return res.json(results);
  } catch (err) {
    logging.error(NAMESPACE, err.message);
    return res.status(500).send('Server Error');
  }
}

const createAddress = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Create an address');

    const address = {
      address_line_1, 
      address_line_2, 
      address_line_3, 
      city, 
      state, 
      zipcode, 
      country
    } = req.body;
      
    results = await addressRepository.create(address);
    
    return res.json(results);

  } catch (err) {
    logging.error(NAMESPACE, err.message);
    return res.status(500).send('Server Error');
  }
}

const updateAddress = async (req, res) => {
  try {
    logging.info(NAMESPACE, 'Update an address');

    const address = {
      address_line_1, 
      address_line_2, 
      address_line_3, 
      city, 
      state, 
      zipcode, 
      country
    } = req.body;
      
    results = await addressRepository.update(req.params.address_id, address);
    
    return res.json(results);

  } catch (err) {
    logging.error(NAMESPACE, err.message);
    return res.status(500).send('Server Error');
  }
}

module.exports = { getAddressById, createAddress, updateAddress }