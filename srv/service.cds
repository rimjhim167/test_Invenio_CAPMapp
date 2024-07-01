using { anubhav.db.master } from '../db/datamodel';
// Definition of a service
service MyService @(path: 'MyService'){ //annotations to get the same service name on the server

    function hello(name: String) returns String;

// @readonly
    @Capabilities : { Updatable:false, Deletable: false, Insertable: false }
    entity ReadEmployeeSrv as projection on master.employees;

}