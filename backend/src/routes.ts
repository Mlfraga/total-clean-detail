import express, { request, Request, Response } from 'express';
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
import { appendFile } from 'fs';

import AuthenticationMiddleware from './middlewares/AutheticationMiddleware'
import RoleMiddleware from './middlewares/RoleMiddleware'
import HeaderMiddleware from './middlewares/HeaderMiddleware'

const routes = express.Router();

routes.post('/auth/login', celebrate(AutheticationController.validate.login), AutheticationController.login);

routes.post('/auth/refresh', AuthenticationMiddleware.refreshToken)

routes.use(AuthenticationMiddleware.authenticateToken);  

routes.delete('/auth/logout', AuthenticationMiddleware.logout) 

routes.post('/auth/signup', celebrate(AutheticationController.validate.signUp), AutheticationController.signUp); 

routes.post('/companies', RoleMiddleware.isAdmin, celebrate(CompanyController.validate.store), CompanyController.store); 
routes.get('/companies', RoleMiddleware.isAdmin, HeaderMiddleware.Header, CompanyController.index); 

routes.get('/units/:companyId', RoleMiddleware.isAdmin, celebrate(UnitController.validate.findByCompany), UnitController.findByCompany); 
routes.post('/units', RoleMiddleware.isAdmin, celebrate(UnitController.validate.store), UnitController.store); 

routes.get('/users', RoleMiddleware.isAdmin, ProfileController.index); 
routes.get('/users/unit/', RoleMiddleware.isManager, ProfileController.findByUnitId);routes.get('/user/filtered', RoleMiddleware.isManagerOrAdmin, ProfileController.findByName);

routes.get('/services', ServiceController.index); 
routes.post('/services', RoleMiddleware.isAdmin, celebrate(ServiceController.validate.store), ServiceController.store); 
routes.put('/services/:id', RoleMiddleware.isAdmin, celebrate(ServiceController.validate.update), ServiceController.update);  
routes.get('/services/search', celebrate(ServiceController.validate.findIfContainsName), ServiceController.findIfContainsName);  

routes.get('/companyservices', CompanyServiceController.index);
routes.post('/companyservices', RoleMiddleware.isManager, celebrate(CompanyServiceController.validate.store), CompanyServiceController.store);
routes.get('/companyservices/company', RoleMiddleware.isManagerOrSeller, CompanyServiceController.findByCompanyId);
routes.get('/companyservices/sale', RoleMiddleware.isManagerOrSeller, celebrate(CompanyServiceController.validate.findByCompanyIdAndServiceId), CompanyServiceController.findByCompanyIdAndServiceId);
routes.put('/companyservices/updateprice', RoleMiddleware.isManager, CompanyServiceController.updatePrice);

routes.post('/sale', RoleMiddleware.isManagerOrSeller, celebrate(SaleController.validate.store), SaleController.store); 
routes.get('/sale', SaleController.index); 
routes.get('/sale/status', RoleMiddleware.isAdmin, SaleController.findByStatus); 
routes.get('/sale/unit/:unitId', celebrate(SaleController.validate.findByUnit), SaleController.findByUnit); 
routes.get('/sale/seller/', RoleMiddleware.isManagerOrSeller, celebrate(SaleController.validate.findBySeller), SaleController.findBySeller); 
routes.patch('/sale/status/:id', RoleMiddleware.isAdmin, SaleController.updateStatus) 

routes.post('/servicesale', RoleMiddleware.isManagerOrSeller, celebrate(ServiceSaleController.validate.store), ServiceSaleController.store); 
routes.get('/servicesale', ServiceSaleController.index);  
routes.get('/servicesale/filtered', ServiceSaleController.filterSale);  

routes.post('/person', RoleMiddleware.isManagerOrSeller, celebrate(PersonController.validate.store), PersonController.store); 

routes.post('/address', RoleMiddleware.isManagerOrSeller, celebrate(AddressController.validate.store), AddressController.store); 

routes.post('/car', RoleMiddleware.isManagerOrSeller, celebrate(CarController.validate.store), CarController.store); 

export default routes;