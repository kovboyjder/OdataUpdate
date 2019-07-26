sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";

  return Controller.extend("sap.ui.demo.wt.Detail", {

    onInit: function() {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this); //Get Hold of Router
      oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this); //Attach Router Pattern
    },
    _onObjectMatched: function(oEvent) {
      //Bind the Context to Detail View
      this.getView().bindElement({
        path: "/" + oEvent.getParameter("arguments").employeePath,
        model: "view"
      });
    },

    onBack: function() {
      //Navigation Back
      var oHistory = sap.ui.core.routing.History.getInstance();
      var sPreviousHash = oHistory.getPreviousHash();
      window.history.go(-1);
    },

    onPress: function(){
     	var oView = this.getView();
			var oDialog = oView.byId("dlgUpdate");
			// create dialog lazily
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "sap.ui.demo.wt.update", this);
				oView.addDependent(oDialog);
        
      }
      
      oDialog.bindElement({
        path: this.byId("idProductsTable").getSelectedItem().getBindingContext("view").getPath(),
        model: "view"
      }); 

			oDialog.open();
    },

    /**
		 * Closes the update PosReq dialog
		 * @returns {void}
		 */
		onCancelUpdate: function () {
			const oDialog = this.byId("dlgUpdate");
			if (this.getView().getModel("view").hasPendingChanges()) {
        this.getView().getModel("view").resetChanges([oDialog.getBindingContext("view").getPath()]);			}
			oDialog.close();
    }, 
    
    onUpdate: function(){
      this.getView().getModel("view").submitChanges();
      this.onCancelUpdate();
    }
  });

});