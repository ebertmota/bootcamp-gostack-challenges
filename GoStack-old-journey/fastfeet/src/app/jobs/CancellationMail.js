import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { deliveryman, order, recipient } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Encomenda Cancelada !',
      template: 'cancellationMail',
      context: {
        name: deliveryman.name,
        product: order.product,
        recipientName: recipient.name,
        email: recipient.email,
        number: recipient.number,
        city: recipient.city,
        state: recipient.state,
        street: recipient.street,
      },
    });
  }
}

export default new CancellationMail();
