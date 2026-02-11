/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 * @author Midware
 * @developer Ignacio A.
 * @contact contact@midware.net
 */
define(["require", "exports", "N/log", "N/record", "./Global/Functions"], function (require, exports, log, record, Functions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.beforeSubmit = exports.beforeLoad = void 0;
    var PERMISSION_ERROR_MESSAGE = "User does not have permissions to perform this action. Please contact your administrator.";
    var beforeLoad = function (pContext) {
        var newRecord = pContext.newRecord, type = pContext.type, UserEventType = pContext.UserEventType;
        var recordType = newRecord.type;
        var isViewMode = type === UserEventType.VIEW;
        var isEditMode = type === UserEventType.EDIT;
        var isCreateMode = type === UserEventType.CREATE;
        log.debug("[beforeLoad] recordType - isViewMode - isEditMode", "".concat(recordType, " - ").concat(isViewMode, " - ").concat(isEditMode));
        var permissions = (0, Functions_1.getPermissions)();
        log.debug("[beforeLoad] permissions", permissions);
        if (!(0, Functions_1.isValidRecord)(recordType) || (permissions && !permissions.is_vendor_enabled)) {
            return;
        }
        if (!permissions) {
            throw PERMISSION_ERROR_MESSAGE;
        }
        if (recordType === record.Type.VENDOR && (isViewMode || isEditMode)) {
            (0, Functions_1.validateVendorPermissions)(permissions, newRecord.id || null, throwError);
        }
        else if ((recordType === record.Type.VENDOR_BILL || recordType === record.Type.VENDOR_PAYMENT) &&
            (isViewMode || isEditMode || isCreateMode)) {
            var vendorId = newRecord.getValue({ fieldId: "entity" });
            (0, Functions_1.validateVendorPermissions)(permissions, vendorId || null, throwError);
        }
        return;
    };
    exports.beforeLoad = beforeLoad;
    var beforeSubmit = function (pContext) {
        var newRecord = pContext.newRecord, type = pContext.type, UserEventType = pContext.UserEventType;
        var recordType = newRecord.type;
        var isEditMode = type === UserEventType.EDIT;
        var isCreateMode = type === UserEventType.CREATE;
        log.debug("[beforeSubmit] recordType - isCreateMode - isEditMode", "".concat(recordType, " - ").concat(isCreateMode, " - ").concat(isEditMode));
        var permissions = (0, Functions_1.getPermissions)();
        log.debug("[beforeSubmit] permissions", permissions);
        if (!(0, Functions_1.isValidRecord)(recordType) || (permissions && !permissions.is_vendor_enabled)) {
            return;
        }
        if (!permissions) {
            throw PERMISSION_ERROR_MESSAGE;
        }
        if ((recordType === record.Type.VENDOR_BILL || recordType === record.Type.VENDOR_PAYMENT) && (isEditMode || isCreateMode)) {
            var vendorId = newRecord.getValue({ fieldId: "entity" });
            (0, Functions_1.validateVendorPermissions)(permissions, vendorId || null, throwError);
        }
        return;
    };
    exports.beforeSubmit = beforeSubmit;
    var throwError = function () {
        throw new Error(PERMISSION_ERROR_MESSAGE);
        return;
    };
});
