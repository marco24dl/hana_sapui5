sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator,MessageBox,MessageToast) {
        "use strict";

        return Controller.extend("registros.controller.Main", {
            onInit: function () {

            },
            _onLimpiar: function(){
                var cod=this.getView().byId("txtCodigo");
                var nom=this.getView().byId("txtNombre");
                var car=this.getView().byId("cbCargos");
                var fing= this.getView().byId("fechaIngreso");
                var fsal= this.getView().byId("fechaSalida");

                cod.setValue("");
                nom.setValue("");
                car.setValue("");
                fing.setValue("");
                fsal.setValue("");
            },

            onGuardar: function(){

                var id=parseInt(this.getView().byId("txtCantidad").getText())+1;
                var codigo=this.getView().byId("txtCodigo").getValue();
                var nombre=this.getView().byId("txtNombre").getValue();
                var cargo=this.getView().byId("cbCargos").getSelectedKey();
                

                var fingreso= this.getView().byId("fechaIngreso").getValue()==='' ? '' : this.getView().byId("fechaIngreso").getValue().split(" - ");
                var ingreso=fingreso[0]+'T'+fingreso[1]+'Z';

                var fsalida= this.getView().byId("fechaSalida").getValue()==='' ? '' : this.getView().byId("fechaSalida").getValue().split(" - ");
                var salida=fsalida[0]+'T'+fsalida[1]+'Z';
                
                if(codigo==="" || nombre==="" || cargo==="" || fingreso==="" || fsalida===""){
                    MessageBox.alert("Complete el formulario para registrar");
                }else{

                    var tabla = this.getView().byId("tblIngresos").getBinding("items");
                    var datos = tabla.create({
                        "ID": id,
                        "codigo": codigo,
                        "nombre": nombre,
                        "cargo": cargo,
                        "horaIngreso": ingreso,
                        "horaSalida": salida
                    });
            
                    datos.created().then( ()=>{
                        this._onLimpiar();
                        MessageToast.show("Se registro el ingreso");
                     });
                }

            },

            onListarIngresos: function(){

                var cargo=this.getView().byId("cbCargo").getSelectedKey();
                
                var rango=this.getView().byId("rangoFecha").getValue().split(' - ');
                // var tingreso= this.getView().byId("rangoFecha").getDateValue();
                //var tsalida=this.getView().byId("rangoFecha").getSecondDateValue();
                var ingreso=rango[0]==='' ? '': rango[0]+'T00:00:00Z';
                var salida=rango[1]==='' ? '': rango[1]+'T23:59:59Z';
                var filters=[];

                if(cargo){
                    filters.push(new Filter("cargo",FilterOperator.EQ,cargo));
                }

                if(ingreso!=='' && salida!==''){
                    filters.push(new Filter("horaIngreso",FilterOperator.BT,ingreso,salida));
                }
                
                this.getView().byId("tblIngresos").getBinding("items").filter(filters);
            }
        });
    });
