"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _dateFns = require("date-fns");

var _locale = require("date-fns/locale");

var _SaleRepository = _interopRequireDefault(require("../repositories/SaleRepository"));

var _ServiceRepository = _interopRequireDefault(require("../repositories/ServiceRepository"));

var _ServiceSaleRepository = _interopRequireDefault(require("../repositories/ServiceSaleRepository"));

var _mail = _interopRequireDefault(require("../services/mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceSaleController {
  constructor() {
    this.validate = {
      store: {
        body: _celebrate.Joi.object({
          saleId: _celebrate.Joi.number().required(),
          serviceIds: _celebrate.Joi.array().required()
        })
      }
    };
  }

  async index(request, response) {
    const serviceSales = await _ServiceSaleRepository.default.findAll();
    return response.json(serviceSales);
  }

  async store(request, response) {
    const {
      saleId,
      serviceIds
    } = request.body;
    const saleById = await _SaleRepository.default.findById(saleId);
    const serviceSale = [];
    const servicesNames = [];
    let company = undefined;
    let unit = undefined;
    let seller = null;
    let sellerContact = null;
    let requestFormattedDate = null;
    let deliveryFormattedDate = null;
    let availabilityFormattedDate = null;
    let sourceCar = null;
    let costValue = null;
    let companyValue = null;

    if (!saleById) {
      return response.status(404).json({
        error: 'Sale not found.'
      });
    }

    const promises = serviceIds.map(async id => {
      var _data$sale$seller$com, _data$sale$seller$uni;

      const serviceById = await _ServiceRepository.default.findById(id);

      if (!serviceById) {
        return response.status(404).json({
          error: 'Service not found.'
        });
      }

      servicesNames.push(serviceById === null || serviceById === void 0 ? void 0 : serviceById.name);
      const data = await _ServiceSaleRepository.default.create({
        sale: {
          connect: {
            id: saleId
          }
        },
        service: {
          connect: {
            id: id
          }
        }
      });

      if (!data) {
        return null;
      }

      company = data === null || data === void 0 ? void 0 : (_data$sale$seller$com = data.sale.seller.company) === null || _data$sale$seller$com === void 0 ? void 0 : _data$sale$seller$com.name;
      unit = (_data$sale$seller$uni = data.sale.seller.unit) === null || _data$sale$seller$uni === void 0 ? void 0 : _data$sale$seller$uni.name;
      seller = data === null || data === void 0 ? void 0 : data.sale.seller.name;
      sellerContact = data === null || data === void 0 ? void 0 : data.sale.seller.telephone;
      deliveryFormattedDate = (0, _dateFns.format)(data === null || data === void 0 ? void 0 : data.sale.deliveryDate, "'dia' dd 'de' MMMM', às ' HH:mm'h'", {
        locale: _locale.ptBR
      });
      availabilityFormattedDate = (0, _dateFns.format)(data === null || data === void 0 ? void 0 : data.sale.availabilityDate, "'dia' dd 'de' MMMM', às ' HH:mm'h'", {
        locale: _locale.ptBR
      });
      requestFormattedDate = (0, _dateFns.format)(data === null || data === void 0 ? void 0 : data.sale.requestDate, "'dia' dd 'de' MMMM', às ' HH:mm'h'", {
        locale: _locale.ptBR
      });
      sourceCar = data.sale.source;
      costValue = data.sale.costPrice;
      companyValue = data.sale.companyPrice;
      serviceSale.push(data);
      return data;
    });
    const servicesSales = await Promise.all(promises);
    let services = servicesNames.join(', ');
    const subject = `SOLICITAÇÃO PEDIDO ${saleId}.`;
    const text = `SOLICITAÇÃO DO PEDIDO ${saleId}

- DATA E HORA DA SOLICITAÇÃO: ${requestFormattedDate},

- VENDEDOR: ${seller},

- CONTATO VENDEDOR: ${sellerContact},

- CONCESSIONÁRIA: ${company},

- UNIDADE: ${unit},

- DATA E HORA DE DISPONIBILIDADE: ${availabilityFormattedDate},

- DATA E HORA DE ENTREGA: ${deliveryFormattedDate},

- SERVIÇOS:
${services}

- VALOR A RECEBER: ${costValue},

- VALOR COBRADO PELA CONCESSIONÁRIA: ${companyValue},

- ORIGEM: ${sourceCar},

- CLIENTE: ${saleById.person.name},
`;

    let result = _mail.default.sendMailToAdmin(text, subject); // console.log(result);


    return response.json(servicesSales);
  }

  async filterSale(request, response) {
    const {
      serviceId,
      companyId,
      unitId,
      startDeliveryDate,
      endDeliveryDate
    } = request.query;
    const filteredSales = await _ServiceSaleRepository.default.filterSale(Number(serviceId), Number(companyId), Number(unitId), new Date(String(startDeliveryDate)), new Date(String(endDeliveryDate)));
    return response.json(filteredSales);
  }

}

var _default = new ServiceSaleController();

exports.default = _default;