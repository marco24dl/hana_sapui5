namespace app.schema;

entity Cargos {
  key ID: Integer;
  nombreCargo: String(30)
};

entity Empleados{
    key ID : Integer;
    codigoEmpleado: String(12);
    nombreEmpleado: String(60);
    cargo: Association[1] to Cargos {ID};
}

entity Ingresos{
    key ID: Integer;
    codigo: String(12);
    nombre: String(60);
    cargo: String(30);
    horaIngreso: DateTime;
    horaSalida: DateTime;
}
