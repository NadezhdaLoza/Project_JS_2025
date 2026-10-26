const Router = require("express").Router;
const ProductController = require('../controllers/product-controller');
const IndividualController = require('../controllers/individual-controller');
const OrganizationController = require('../controllers/organization-controller');
const DepartmentController = require('../controllers/department-controller');
const ProxyHeaderController = require('../controllers/proxy-header-controller');
const ProxyBodyController = require('../controllers/proxy-body-controller');
const PrikazHeaderController = require('../controllers/prikaz-header-controller');
const PrikazBodyController = require('../controllers/prikaz-body-controller');

const router = new Router();

router.get('/products', ProductController.getAllRecords);
router.get('/individuals', IndividualController.getAllRecords);
router.get('/organizations', OrganizationController.getAllRecords);
router.get('/departments', DepartmentController.getAllRecords);
router.get('/proxyheaders', ProxyHeaderController.getAllRecords);
router.get('/proxyheaders/:id', ProxyHeaderController.getOneRecord);
router.get('/proxybodies/:proxyHeaderId', ProxyBodyController.getAllRecords);
router.get('/prikazheaders', PrikazHeaderController.getAllRecords);
router.get('/prikazheaders/:id', PrikazHeaderController.getOneRecord);
router.get('/prikazbodies/:HeaderId', PrikazBodyController.getAllRecords);


router.post('/products', ProductController.createRecord);
router.post('/individuals', IndividualController.createRecord);
router.post('/organizations', OrganizationController.createRecord);
router.post('/departments', DepartmentController.createRecord);
router.post('/proxyheaders', ProxyHeaderController.createRecord);
router.post('/proxybodies', ProxyBodyController.createRecord);
router.post('/prikazheaders', PrikazHeaderController.createRecord);
router.post('/prikazbodies', PrikazBodyController.createRecord);


router.put('/products', ProductController.updateRecord);
router.put('/individuals', IndividualController.updateRecord);
router.put('/organizations', OrganizationController.updateRecord);
router.put('/departments', DepartmentController.updateRecord);
router.put('/proxyheaders', ProxyHeaderController.updateRecord);
router.put('/proxybodies', ProxyBodyController.updateRecord);
router.put('/prikazheaders', PrikazHeaderController.updateRecord);
router.put('/prikazbodies', PrikazBodyController.updateRecord);


router.delete('/products/:id', ProductController.removeRecord);
router.delete('/individuals/:id', IndividualController.removeRecord);
router.delete('/organizations/:id', OrganizationController.removeRecord);
router.delete('/departments/:id', DepartmentController.removeRecord);
router.delete('/proxyheaders/:id', ProxyHeaderController.removeRecord);
router.delete('/proxybodies/:id', ProxyBodyController.removeRecord);
router.delete('/prikazheaders/:id', PrikazHeaderController.removeRecord);
router.delete('/prikazbodies/:id', PrikazBodyController.removeRecord);

module.exports = router;