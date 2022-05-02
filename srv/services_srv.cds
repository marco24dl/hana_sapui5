using app.schema from '../db/schema';
service CatalogService {

 entity Cargos
	as projection on schema.Cargos;

 entity Empleados
	as projection on  schema.Empleados;

entity Ingresos
	as projection on  schema.Ingresos;

}