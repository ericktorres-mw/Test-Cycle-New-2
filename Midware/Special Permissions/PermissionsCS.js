//You do not have permission for this vendor category
define(["require", "exports", "./Global/Functions"], function (require, exports, Functions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fieldChanged = void 0;
    var PERMISSION_ERROR_MESSAGE = "You do not have permission for this vendor category";
    function fieldChanged(pContext) {
        try {
            var currentRecord = pContext.currentRecord, fieldId = pContext.fieldId;
            if (fieldId == "entity") {
                var permissions = (0, Functions_1.getPermissions)();
                if (!permissions) {
                    alert(PERMISSION_ERROR_MESSAGE);
                    return;
                }
                var vendorId = currentRecord.getValue({ fieldId: fieldId });
                (0, Functions_1.validateVendorPermissions)(permissions, vendorId, alertUser);
            }
        }
        catch (error) {
            (0, Functions_1.handleError)(error);
        }
    }
    exports.fieldChanged = fieldChanged;
    var alertUser = function () { return alert(PERMISSION_ERROR_MESSAGE); };
});
