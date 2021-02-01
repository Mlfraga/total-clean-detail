"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _celebrate = require("celebrate");

var _CompanyController = _interopRequireDefault(require("./controllers/CompanyController"));

var _UnitController = _interopRequireDefault(require("./controllers/UnitController"));

var _AutheticationController = _interopRequireDefault(require("./controllers/AutheticationController"));

var _ServiceController = _interopRequireDefault(require("./controllers/ServiceController"));

var _CompanyServiceController = _interopRequireDefault(require("./controllers/CompanyServiceController"));

var _PersonController = _interopRequireDefault(require("./controllers/PersonController"));

var _CarController = _interopRequireDefault(require("./controllers/CarController"));

var _SaleController = _interopRequireDefault(require("./controllers/SaleController"));

var _ServiceSaleController = _interopRequireDefault(require("./controllers/ServiceSaleController"));

var _ProfileController = _interopRequireDefault(require("./controllers/ProfileController"));

var _AutheticationMiddleware = _interopRequireDefault(require("./middlewares/AutheticationMiddleware"));

var _RoleMiddleware = _interopRequireDefault(require("./middlewares/RoleMiddleware"));

var _HeaderMiddleware = _interopRequireDefault(require("./middlewares/HeaderMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = _express.default.Router();

routes.get('/', (_request, response) => response.json({
  name: 'Total-Clean API',
  version: '1.0.0',
  author: 'https://github.com/Mlfraga'
}));
routes.post('/auth/login', (0, _celebrate.celebrate)(_AutheticationController.default.validate.login), _AutheticationController.default.login);
routes.post('/auth/refresh', _AutheticationMiddleware.default.refreshToken);
routes.use(_AutheticationMiddleware.default.authenticateToken);
routes.delete('/auth/logout', _AutheticationMiddleware.default.logout);
routes.post('/auth/signup', (0, _celebrate.celebrate)(_AutheticationController.default.validate.signUp), _AutheticationController.default.signUp);
routes.post('/companies', _RoleMiddleware.default.isAdmin, (0, _celebrate.celebrate)(_CompanyController.default.validate.store), _CompanyController.default.store);
routes.get('/companies', _RoleMiddleware.default.isAdmin, _HeaderMiddleware.default.Header, _CompanyController.default.index);
routes.get('/companies/:companyId', _RoleMiddleware.default.isAdmin, _HeaderMiddleware.default.Header, _CompanyController.default.findById);
routes.get('/units/:companyId', _RoleMiddleware.default.isManagerOrAdmin, (0, _celebrate.celebrate)(_UnitController.default.validate.findByCompany), _UnitController.default.findByCompany);
routes.get('/units', _RoleMiddleware.default.isAdmin, (0, _celebrate.celebrate)(_UnitController.default.validate.store), _UnitController.default.index);
routes.post('/units', _RoleMiddleware.default.isAdmin, (0, _celebrate.celebrate)(_UnitController.default.validate.store), _UnitController.default.store);
routes.get('/users', _RoleMiddleware.default.isAdmin, _ProfileController.default.index);
routes.get('/users/unit/', _RoleMiddleware.default.isManager, _ProfileController.default.findByUnitId);
routes.get('/users/company/', _RoleMiddleware.default.isManager, _ProfileController.default.findByCompanyId);
routes.get('/user/filtered', _RoleMiddleware.default.isManagerOrAdmin, _ProfileController.default.findByName);
routes.get('/services', _ServiceController.default.index);
routes.post('/services', _RoleMiddleware.default.isAdmin, (0, _celebrate.celebrate)(_ServiceController.default.validate.store), _ServiceController.default.store);
routes.put('/services/:id', _RoleMiddleware.default.isAdmin, (0, _celebrate.celebrate)(_ServiceController.default.validate.update), _ServiceController.default.update);
routes.get('/services/search', (0, _celebrate.celebrate)(_ServiceController.default.validate.findIfContainsName), _ServiceController.default.findIfContainsName);
routes.get('/companyservices', _CompanyServiceController.default.index);
routes.post('/companyservices', _RoleMiddleware.default.isManager, (0, _celebrate.celebrate)(_CompanyServiceController.default.validate.store), _CompanyServiceController.default.store);
routes.get('/companyservices/company', _RoleMiddleware.default.isManagerOrSeller, _CompanyServiceController.default.findByCompanyId);
routes.get('/companyservices/sale', _RoleMiddleware.default.isManagerOrSeller, (0, _celebrate.celebrate)(_CompanyServiceController.default.validate.findByCompanyIdAndServiceId), _CompanyServiceController.default.findByCompanyIdAndServiceId);
routes.put('/companyservices/updateprice', _RoleMiddleware.default.isManager, _CompanyServiceController.default.updatePrice);
routes.post('/sale', _RoleMiddleware.default.isManagerOrSeller, (0, _celebrate.celebrate)(_SaleController.default.validate.store), _SaleController.default.store);
routes.get('/sales-report-data', (0, _celebrate.celebrate)(_SaleController.default.validate.listSalesForReport), _SaleController.default.listSalesForReport);
routes.get('/sale', (0, _celebrate.celebrate)(_SaleController.default.validate.index), _SaleController.default.index);
routes.get('/sale/unit/:unitId', (0, _celebrate.celebrate)(_SaleController.default.validate.findByUnit), _SaleController.default.findByUnit);
routes.get('/sale/seller/', _RoleMiddleware.default.isManagerOrSeller, (0, _celebrate.celebrate)(_SaleController.default.validate.findBySeller), _SaleController.default.findBySeller);
routes.get('/sale/company/', _RoleMiddleware.default.isManagerOrSeller, (0, _celebrate.celebrate)(_SaleController.default.validate.findByCompany), _SaleController.default.findByCompanyAndFinishedStatus);
routes.patch('/sale/status/', _RoleMiddleware.default.isAdmin, _SaleController.default.updateStatus);
routes.post('/sale/getsalebudget', _RoleMiddleware.default.isManagerOrSeller, _SaleController.default.getSaleBudget);
routes.post('/sale/getcompanysalebudget', _RoleMiddleware.default.isManagerOrSeller, _SaleController.default.getCompanySaleBudget);
routes.post('/servicesale', _RoleMiddleware.default.isManagerOrSeller, (0, _celebrate.celebrate)(_ServiceSaleController.default.validate.store), _ServiceSaleController.default.store);
routes.get('/servicesale', _ServiceSaleController.default.index);
routes.get('/servicesale/filtered', _ServiceSaleController.default.filterSale);
routes.post('/person', _RoleMiddleware.default.isManagerOrSeller, (0, _celebrate.celebrate)(_PersonController.default.validate.store), _PersonController.default.store);
routes.post('/car', _RoleMiddleware.default.isManagerOrSeller, (0, _celebrate.celebrate)(_CarController.default.validate.store), _CarController.default.store);
var _default = routes;
exports.default = _default;