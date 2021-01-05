import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      street: Yup.string().required(),
      number: Yup.string()
        .matches(phoneRegEx, 'Number is not valid')
        .min(8)
        .required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Something is wrong, Validation Fails' });
    }

    const userExists = await Recipient.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Recipient already registered.' });
    }
    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await Recipient.create(req.body);

    return res.json({
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });
  }

  async update(req, res) {
    const phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      street: Yup.string(),
      number: Yup.string()
        .matches(phoneRegEx, 'Number is not valid')
        .min(8),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      cep: Yup.string(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const recipient = await Recipient.findByPk(req.body.recipient_id);

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
      avatar_id,
    } = await recipient.update(req.body);

    return res.json({
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
      avatar_id,
    });
  }
}

export default new RecipientController();
