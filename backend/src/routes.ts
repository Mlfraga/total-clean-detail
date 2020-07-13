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

routes.delete('/auth/logout', AuthenticationMiddleware.logout) // ALL USERS

routes.post('/auth/signup', celebrate(AutheticationController.validate.signUp), AutheticationController.signUp); // ALL USERS

routes.post('/companies', RoleMiddleware.isAdmin, celebrate(CompanyController.validate.store), CompanyController.store); // ADMINS
routes.get('/companies', RoleMiddleware.isAdmin, HeaderMiddleware.Header, CompanyController.index); // ADMINS

routes.get('/units/:companyId', RoleMiddleware.isAdmin, celebrate(UnitController.validate.findByCompany), UnitController.findByCompany); // ADMINS
routes.post('/units', RoleMiddleware.isAdmin, celebrate(UnitController.validate.store), UnitController.store); // ADMINS

routes.get('/users', RoleMiddleware.isAdmin, ProfileController.index); // ADMINS
routes.get('/users/unit/', RoleMiddleware.isManager, ProfileController.findByUnitId); // MANAGERS 
routes.get('/user/filtered', RoleMiddleware.isManagerOrAdmin, ProfileController.findByName); // MANAGERS or ADMINS

routes.get('/services', ServiceController.index); // ALL USERS
routes.post('/services', RoleMiddleware.isAdmin, celebrate(ServiceController.validate.store), ServiceController.store); // ADMINS
routes.put('/services', RoleMiddleware.isAdmin, celebrate(ServiceController.validate.update), ServiceController.update); // ADMINS 
routes.get('/services/search', celebrate(ServiceController.validate.findIfContainsName), ServiceController.findIfContainsName); // ALL USERS 

routes.get('/companyservices', CompanyServiceController.index);
routes.post('/companyservices', RoleMiddleware.isManager, celebrate(CompanyServiceController.validate.store), CompanyServiceController.store); // MANAGERS
routes.get('/companyservices/company', RoleMiddleware.isManagerOrSeller, CompanyServiceController.findByCompanyId); // MANAGERS OR SELLERS
routes.get('/companyservices/sale', RoleMiddleware.isManagerOrSeller, celebrate(CompanyServiceController.validate.findByCompanyIdAndServiceId), CompanyServiceController.findByCompanyIdAndServiceId); // MANAGERS OR SELLERS
routes.put('/companyservices/updateprice', RoleMiddleware.isManager, CompanyServiceController.updatePrice); // MANAGERS

routes.post('/sale', RoleMiddleware.isManagerOrSeller, celebrate(SaleController.validate.store), SaleController.store); // SELLERS OR MANAGERS
routes.get('/sale', SaleController.index); // ALL USERS
routes.get('/salestatus', RoleMiddleware.isAdmin, SaleController.findByStatus); // ADMIN
routes.get('/sale/unit/', RoleMiddleware.isManagerOrSeller, celebrate(SaleController.validate.findByUnit), SaleController.findByUnit); // SELLER OU MANAGERS
routes.get('/sale/seller/', RoleMiddleware.isManagerOrSeller, celebrate(SaleController.validate.findBySeller), SaleController.findBySeller); // SELLER OU MANAGERS
routes.patch('/sale/:id', RoleMiddleware.isAdmin, SaleController.updateStatus) // ADMIN

routes.post('/servicesale', RoleMiddleware.isManagerOrSeller, celebrate(ServiceSaleController.validate.store), ServiceSaleController.store); //SELLER OU MANAGERS
routes.get('/servicesale', ServiceSaleController.index);  // ALL USERS
routes.get('/servicesale/filtered', ServiceSaleController.filterSale); // ALL USERS 

routes.post('/person', RoleMiddleware.isManagerOrSeller, celebrate(PersonController.validate.store), PersonController.store); //SELLER OU MANAGERS

routes.post('/address', RoleMiddleware.isManagerOrSeller, celebrate(AddressController.validate.store), AddressController.store); //SELLER OU MANAGERS

routes.post('/car', RoleMiddleware.isManagerOrSeller, celebrate(CarController.validate.store), CarController.store); //SELLER OU MANAGERS



export default routes;