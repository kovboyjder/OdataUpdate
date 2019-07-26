sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";

  return Controller.extend("sap.ui.demo.wt.App", {
    onPress: function(oEvent) {
      var oItem = oEvent.getSource(); //Get the Selected Item
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this); //Get Hold of Router
      //Navigate to Detail Page with Selected Item Binding Context
      oRouter.navTo("detail", {
        employeePath: oItem.getBindingContext("view").getPath().substr(1)
      });
    }
  });

});