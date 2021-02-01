import express from 'express';
import { celebrate } from 'celebrate';

import CompanyController from './controllers/CompanyController';
import UnitController from './controllers/UnitController';
import AutheticationController from './controllers/AutheticationController';
import ServiceController from './controllers/ServiceController';
import CompanyServiceController from './controllers/CompanyServiceController'
import PersonController from './controllers/PersonController';
import CarController from './controllers/CarController';
import SaleController from './controllers/SaleController';
import ServiceSaleController from './controllers/ServiceSaleController';
import ProfileController from './controllers/ProfileController';

import AuthenticationMiddleware from './middlewares/AutheticationMiddleware'
import RoleMiddleware from './middlewares/RoleMiddleware'
import HeaderMiddleware from './middlewares/HeaderMiddleware'

const routes = express.Router();


routes.get('/', (_request, response) =>
  response.json({
    name: 'Total-Clean API',
    version: '1.0.0',
    author: 'https://github.com/Mlfraga'
  }),
);

routes.post('/auth/login', celebrate(AutheticationController.validate.login), AutheticationController.login);

routes.post('/auth/refresh', AuthenticationMiddleware.refreshToken)

routes.use(AuthenticationMiddleware.authenticateToken);

routes.delete('/auth/logout', AuthenticationMiddleware.logout)

routes.post('/auth/signup', celebrate(AutheticationController.validate.signUp), AutheticationController.signUp);

routes.post('/companies', RoleMiddleware.isAdmin, celebrate(CompanyController.validate.store), CompanyController.store);
routes.get('/companies', RoleMiddleware.isAdmin, HeaderMiddleware.Header, CompanyController.index);
routes.get('/companies/:companyId', RoleMiddleware.isAdmin, HeaderMiddleware.Header, CompanyController.findById);

routes.get('/units/:companyId', RoleMiddleware.isManagerOrAdmin, celebrate(UnitController.validate.findByCompany), UnitController.findByCompany);
routes.get('/units', RoleMiddleware.isAdmin, celebrate(UnitController.validate.store), UnitController.index);
routes.post('/units', RoleMiddleware.isAdmin, celebrate(UnitController.validate.store), UnitController.store);

routes.get('/users', RoleMiddleware.isAdmin, ProfileController.index);
routes.get('/users/unit/', RoleMiddleware.isManager, ProfileController.findByUnitId);
routes.get('/users/company/', RoleMiddleware.isManager, ProfileController.findByCompanyId);
routes.get('/user/filtered', RoleMiddleware.isManagerOrAdmin, ProfileController.findByName);

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
routes.get('/sales-report-data', celebrate(SaleController.validate.listSalesForReport) ,SaleController.listSalesForReport);
routes.get('/sale', celebrate(SaleController.validate.index) ,SaleController.index);
routes.get('/sale/unit/:unitId', celebrate(SaleController.validate.findByUnit), SaleController.findByUnit);
routes.get('/sale/seller/', RoleMiddleware.isManagerOrSeller, celebrate(SaleController.validate.findBySeller), SaleController.findBySeller);
routes.get('/sale/company/', RoleMiddleware.isManagerOrSeller, celebrate(SaleController.validate.findByCompany), SaleController.findByCompanyAndFinishedStatus);
routes.patch('/sale/status/', RoleMiddleware.isAdmin, SaleController.updateStatus);
routes.post('/sale/getsalebudget', RoleMiddleware.isManagerOrSeller, SaleController.getSaleBudget);
routes.post('/sale/getcompanysalebudget', RoleMiddleware.isManagerOrSeller, SaleController.getCompanySaleBudget);

routes.post('/servicesale', RoleMiddleware.isManagerOrSeller, celebrate(ServiceSaleController.validate.store), ServiceSaleController.store);
routes.get('/servicesale', ServiceSaleController.index);
routes.get('/servicesale/filtered', ServiceSaleController.filterSale);

routes.post('/person', RoleMiddleware.isManagerOrSeller, celebrate(PersonController.validate.store), PersonController.store);

routes.post('/car', RoleMiddleware.isManagerOrSeller, celebrate(CarController.validate.store), CarController.store);

export default routes;
