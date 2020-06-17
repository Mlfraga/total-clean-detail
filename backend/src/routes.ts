import express from 'express';
import { celebrate } from 'celebrate';

import CompanyController from './controllers/CompanyController';
import UnitController from './controllers/UnitController';
import AutheticationController from './controllers/AutheticationController';
import ServiceController from './controllers/ServiceController';
import CompanyServiceController from './controllers/CompanyServiceController'
import PersonController from './controllers/PersonController';
import AddressController from './controllers/AddressController';
import CarController from './controllers/CarController';
import SaleController from './controllers/SaleController';
import ServiceSaleController from './controllers/ServiceSaleController';
import ProfileController from './controllers/ProfileController';

const routes = express.Router();

routes.post('/companies', celebrate(CompanyController.validate.store), CompanyController.store);
routes.get('/companies', CompanyController.index);

routes.get('/units', celebrate(UnitController.validate.findByCompany), UnitController.findByCompany);
routes.post('/units', celebrate(UnitController.validate.store), UnitController.store);

routes.get('/users', ProfileController.findByUnitId);
routes.get('/users/filtered', ProfileController.findByName);

routes.post('/auth/login', celebrate(AutheticationController.validate.login), AutheticationController.login);
routes.post('/auth/signup', celebrate(AutheticationController.validate.signUp), AutheticationController.signUp);

routes.get('/services', ServiceController.index);
routes.post('/services', celebrate(ServiceController.validate.store), ServiceController.store);
routes.put('/services', celebrate(ServiceController.validate.update), ServiceController.update);
routes.get('/services/search', celebrate(ServiceController.validate.findIfContainsName), ServiceController.findIfContainsName);

routes.get('/companyservices', CompanyServiceController.index);
routes.post('/companyservices', celebrate(CompanyServiceController.validate.store), CompanyServiceController.store);
routes.get('/companyservices/company/:id', celebrate(CompanyServiceController.validate.findByCompanyId), CompanyServiceController.findByCompanyId);
routes.get('/companyservices/sale', celebrate(CompanyServiceController.validate.findByCompanyIdAndServiceId), CompanyServiceController.findByCompanyIdAndServiceId);

routes.post('/sale', celebrate(SaleController.validate.store), SaleController.store);
routes.get('/sale', SaleController.index);
routes.patch('/sale/:id', SaleController.setDone)
routes.get('/salestatus', SaleController.findByStatus)

routes.post('/servicesale', celebrate(ServiceSaleController.validate.store), ServiceSaleController.store);
routes.get('/servicesale', ServiceSaleController.index);
routes.get('/servicesale/filtered', ServiceSaleController.filterSale);

routes.post('/person', celebrate(PersonController.validate.store), PersonController.store);

routes.post('/address', celebrate(AddressController.validate.store), AddressController.store);

routes.post('/car', celebrate(CarController.validate.store), CarController.store);



export default routes;