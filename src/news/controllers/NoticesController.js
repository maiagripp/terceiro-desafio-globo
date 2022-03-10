class NoticesController {
  async list(request, response) {
    const { search } = request.params;
    const contacts = await NoticesRepository.findAll();

    response.json(contacts);
  }

  async show(request, response) {
  }

  async store(request, response) {
  }
}

module.exports = NoticesController;
