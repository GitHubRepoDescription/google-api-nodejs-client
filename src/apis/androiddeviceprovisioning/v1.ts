/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  OAuth2Client,
  JWT,
  Compute,
  UserRefreshClient,
} from 'google-auth-library';
import {
  GoogleConfigurable,
  createAPIRequest,
  MethodOptions,
  GlobalOptions,
  BodyResponseCallback,
  APIRequestContext,
} from 'googleapis-common';
import {GaxiosPromise} from 'gaxios';

// tslint:disable: no-any
// tslint:disable: class-name
// tslint:disable: variable-name
// tslint:disable: jsdoc-format
// tslint:disable: no-namespace

export namespace androiddeviceprovisioning_v1 {
  export interface Options extends GlobalOptions {
    version: 'v1';
  }

  interface StandardParameters {
    /**
     * V1 error format.
     */
    '$.xgafv'?: string;
    /**
     * OAuth access token.
     */
    access_token?: string;
    /**
     * Data format for response.
     */
    alt?: string;
    /**
     * JSONP
     */
    callback?: string;
    /**
     * Selector specifying which fields to include in a partial response.
     */
    fields?: string;
    /**
     * API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
     */
    key?: string;
    /**
     * OAuth 2.0 token for the current user.
     */
    oauth_token?: string;
    /**
     * Returns response with indentations and line breaks.
     */
    prettyPrint?: boolean;
    /**
     * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
     */
    quotaUser?: string;
    /**
     * Legacy upload protocol for media (e.g. "media", "multipart").
     */
    uploadType?: string;
    /**
     * Upload protocol for media (e.g. "raw", "multipart").
     */
    upload_protocol?: string;
  }

  /**
   * Android Device Provisioning Partner API
   *
   * Automates Android zero-touch enrollment for device resellers, customers, and EMMs.
   *
   * @example
   * const {google} = require('googleapis');
   * const androiddeviceprovisioning = google.androiddeviceprovisioning('v1');
   *
   * @namespace androiddeviceprovisioning
   * @type {Function}
   * @version v1
   * @variation v1
   * @param {object=} options Options for Androiddeviceprovisioning
   */
  export class Androiddeviceprovisioning {
    context: APIRequestContext;
    customers: Resource$Customers;
    operations: Resource$Operations;
    partners: Resource$Partners;

    constructor(options: GlobalOptions, google?: GoogleConfigurable) {
      this.context = {
        _options: options || {},
        google,
      };

      this.customers = new Resource$Customers(this.context);
      this.operations = new Resource$Operations(this.context);
      this.partners = new Resource$Partners(this.context);
    }
  }

  /**
   * Request message to claim a device on behalf of a customer.
   */
  export interface Schema$ClaimDeviceRequest {
    /**
     * Required. The ID of the customer for whom the device is being claimed.
     */
    customerId?: string;
    /**
     * Required. The device identifier of the device to claim.
     */
    deviceIdentifier?: Schema$DeviceIdentifier;
    /**
     * Optional. The metadata to attach to the device.
     */
    deviceMetadata?: Schema$DeviceMetadata;
    /**
     * Required. The section type of the device&#39;s provisioning record.
     */
    sectionType?: string;
  }
  /**
   * Response message containing device id of the claim.
   */
  export interface Schema$ClaimDeviceResponse {
    /**
     * The device ID of the claimed device.
     */
    deviceId?: string;
    /**
     * The resource name of the device in the format `partners/[PARTNER_ID]/devices/[DEVICE_ID]`.
     */
    deviceName?: string;
  }
  /**
   * Request to claim devices asynchronously in batch. Claiming a device adds the device to zero-touch enrollment and shows the device in the customer&#39;s view of the portal.
   */
  export interface Schema$ClaimDevicesRequest {
    /**
     * Required. A list of device claims.
     */
    claims?: Schema$PartnerClaim[];
  }
  /**
   * A reseller, vendor, or customer in the zero-touch reseller and customer APIs.
   */
  export interface Schema$Company {
    /**
     * Input only. Optional. Email address of customer&#39;s users in the admin role. Each email address must be associated with a Google Account.
     */
    adminEmails?: string[];
    /**
     * Output only. The ID of the company. Assigned by the server.
     */
    companyId?: string;
    /**
     * Required. The name of the company. For example _XYZ Corp_. Displayed to the company&#39;s employees in the zero-touch enrollment portal.
     */
    companyName?: string;
    /**
     * Output only. The API resource name of the company. The resource name is one of the following formats:  * `partners/[PARTNER_ID]/customers/[CUSTOMER_ID]` * `partners/[PARTNER_ID]/vendors/[VENDOR_ID]` * `partners/[PARTNER_ID]/vendors/[VENDOR_ID]/customers/[CUSTOMER_ID]`  Assigned by the server.
     */
    name?: string;
    /**
     * Input only. Email address of customer&#39;s users in the owner role. At least one `owner_email` is required. Each email address must be associated with a Google Account. Owners share the same access as admins but can also add, delete, and edit your organization&#39;s portal users.
     */
    ownerEmails?: string[];
    /**
     * Output only. Whether any user from the company has accepted the latest Terms of Service (ToS). See TermsStatus.
     */
    termsStatus?: string;
  }
  /**
   * A configuration collects the provisioning options for Android devices. Each configuration combines the following:  * The EMM device policy controller (DPC) installed on the devices. * EMM policies enforced on the devices. * Metadata displayed on the device to help users during setup.  Customers can add as many configurations as they need. However, zero-touch enrollment works best when a customer sets a default configuration that&#39;s applied to any new devices the organization purchases.
   */
  export interface Schema$Configuration {
    /**
     * Required. The name of the organization. Zero-touch enrollment shows this organization name to device users during device provisioning.
     */
    companyName?: string;
    /**
     * Output only. The ID of the configuration. Assigned by the server.
     */
    configurationId?: string;
    /**
     * Required. A short name that describes the configuration&#39;s purpose. For example, _Sales team_ or _Temporary employees_. The zero-touch enrollment portal displays this name to IT admins.
     */
    configurationName?: string;
    /**
     * Required. The email address that device users can contact to get help. Zero-touch enrollment shows this email address to device users before device provisioning. The value is validated on input.
     */
    contactEmail?: string;
    /**
     * Required. The telephone number that device users can call, using another device, to get help. Zero-touch enrollment shows this number to device users before device provisioning. Accepts numerals, spaces, the plus sign, hyphens, and parentheses.
     */
    contactPhone?: string;
    /**
     * A message, containing one or two sentences, to help device users get help or give them more details about what???s happening to their device. Zero-touch enrollment shows this message before the device is provisioned.
     */
    customMessage?: string;
    /**
     * The JSON-formatted EMM provisioning extras that are passed to the DPC.
     */
    dpcExtras?: string;
    /**
     * Required. The resource name of the selected DPC (device policy controller) in the format `customers/[CUSTOMER_ID]/dpcs/x. To list the supported DPCs, call `customers.dpcs.list`.
     */
    dpcResourcePath?: string;
    /**
     * Required. Whether this is the default configuration that zero-touch enrollment applies to any new devices the organization purchases in the future. Only one customer configuration can be the default. Setting this value to `true`, changes the previous default configuration&#39;s `isDefault` value to `false`.
     */
    isDefault?: boolean;
    /**
     * Output only. The API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. Assigned by the server.
     */
    name?: string;
  }
  /**
   * Request message to create a customer.
   */
  export interface Schema$CreateCustomerRequest {
    /**
     * Required. The company data to populate the new customer. Must contain a value for `companyName` and at least one `owner_email` that&#39;s associated with a Google Account. The values for `companyId` and `name` must be empty.
     */
    customer?: Schema$Company;
  }
  /**
   * Request message for customer to assign a configuration to device.
   */
  export interface Schema$CustomerApplyConfigurationRequest {
    /**
     * Required. The configuration applied to the device in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`.
     */
    configuration?: string;
    /**
     * Required. The device the configuration is applied to.
     */
    device?: Schema$DeviceReference;
  }
  /**
   * Response message of customer&#39;s listing configuration.
   */
  export interface Schema$CustomerListConfigurationsResponse {
    /**
     * The configurations.
     */
    configurations?: Schema$Configuration[];
  }
  /**
   * Response message for listing my customers.
   */
  export interface Schema$CustomerListCustomersResponse {
    /**
     * The customer accounts the calling user is a member of.
     */
    customers?: Schema$Company[];
    /**
     * A token used to access the next page of results. Omitted if no further results are available.
     */
    nextPageToken?: string;
  }
  /**
   * Response message of customer&#39;s liting devices.
   */
  export interface Schema$CustomerListDevicesResponse {
    /**
     * The customer&#39;s devices.
     */
    devices?: Schema$Device[];
    /**
     * A token used to access the next page of results. Omitted if no further results are available.
     */
    nextPageToken?: string;
  }
  /**
   * Response message of customer&#39;s listing DPCs.
   */
  export interface Schema$CustomerListDpcsResponse {
    /**
     * The list of DPCs available to the customer that support zero-touch enrollment.
     */
    dpcs?: Schema$Dpc[];
  }
  /**
   * Request message for customer to remove the configuration from device.
   */
  export interface Schema$CustomerRemoveConfigurationRequest {
    /**
     * Required. The device to remove the configuration from.
     */
    device?: Schema$DeviceReference;
  }
  /**
   * Request message for customer to unclaim a device.
   */
  export interface Schema$CustomerUnclaimDeviceRequest {
    /**
     * Required. The device to unclaim.
     */
    device?: Schema$DeviceReference;
  }
  /**
   * An Android device registered for zero-touch enrollment.
   */
  export interface Schema$Device {
    /**
     * Output only. The provisioning claims for a device. Devices claimed for zero-touch enrollment have a claim with the type `SECTION_TYPE_ZERO_TOUCH`. Call `partners.devices.unclaim` or `partners.devices.unclaimAsync` to remove the device from zero-touch enrollment.
     */
    claims?: Schema$DeviceClaim[];
    /**
     * Not available to resellers.
     */
    configuration?: string;
    /**
     * Output only. The ID of the device. Assigned by the server.
     */
    deviceId?: string;
    /**
     * The hardware IDs that identify a manufactured device. To learn more, read [Identifiers](/zero-touch/guides/identifiers).
     */
    deviceIdentifier?: Schema$DeviceIdentifier;
    /**
     * The metadata attached to the device. Structured as key-value pairs. To learn more, read [Device metadata](/zero-touch/guides/metadata).
     */
    deviceMetadata?: Schema$DeviceMetadata;
    /**
     * Output only. The API resource name in the format `partners/[PARTNER_ID]/devices/[DEVICE_ID]`. Assigned by the server.
     */
    name?: string;
  }
  /**
   * A record of a device claimed by a reseller for a customer. Devices claimed for zero-touch enrollment have a claim with the type `SECTION_TYPE_ZERO_TOUCH`. To learn more, read [Claim devices for customers](/zero-touch/guides/how-it-works#claim).
   */
  export interface Schema$DeviceClaim {
    /**
     * The ID of the Customer that purchased the device.
     */
    ownerCompanyId?: string;
    /**
     * The ID of the reseller that claimed the device.
     */
    resellerId?: string;
    /**
     * Output only. The type of claim made on the device.
     */
    sectionType?: string;
    /**
     * The timestamp when the device will exit ???vacation mode???. This value is present iff the device is in &#39;vacation mode&#39;.
     */
    vacationModeExpireTime?: string;
    /**
     * The timestamp when the device was put into ???vacation mode???. This value is present iff the device is in &#39;vacation mode&#39;.
     */
    vacationModeStartTime?: string;
  }
  /**
   * Encapsulates hardware and product IDs to identify a manufactured device. To understand requirements on identifier sets, read [Identifiers](/zero-touch/guides/identifiers).
   */
  export interface Schema$DeviceIdentifier {
    /**
     * The device???s IMEI number. Validated on input.
     */
    imei?: string;
    /**
     * The device manufacturer???s name. Matches the device&#39;s built-in value returned from `android.os.Build.MANUFACTURER`. Allowed values are listed in [manufacturers](/zero-touch/resources/manufacturer-names#manufacturers-names).
     */
    manufacturer?: string;
    /**
     * The device???s MEID number.
     */
    meid?: string;
    /**
     * The device model&#39;s name. Matches the device&#39;s built-in value returned from `android.os.Build.MODEL`. Allowed values are listed in [models](/zero-touch/resources/manufacturer-names#model-names).
     */
    model?: string;
    /**
     * The manufacturer&#39;s serial number for the device. This value might not be unique across different device models.
     */
    serialNumber?: string;
  }
  /**
   * Metadata entries that can be attached to a `Device`. To learn more, read [Device metadata](/zero-touch/guides/metadata).
   */
  export interface Schema$DeviceMetadata {
    /**
     * Metadata entries recorded as key-value pairs.
     */
    entries?: {[key: string]: string};
  }
  /**
   * A `DeviceReference` is an API abstraction that lets you supply a _device_ argument to a method using one of the following identifier types:  * A numeric API resource ID. * Real-world hardware IDs, such as IMEI number, belonging to the manufactured   device.  Methods that operate on devices take a `DeviceReference` as a parameter type because it&#39;s more flexible for the caller. To learn more about device identifiers, read [Identifiers](/zero-touch/guides/identifiers).
   */
  export interface Schema$DeviceReference {
    /**
     * The ID of the device.
     */
    deviceId?: string;
    /**
     * The hardware IDs of the device.
     */
    deviceIdentifier?: Schema$DeviceIdentifier;
  }
  /**
   * Tracks the status of a long-running operation to asynchronously update a batch of reseller metadata attached to devices. To learn more, read [Long???running batch operations](/zero-touch/guides/how-it-works#operations).
   */
  export interface Schema$DevicesLongRunningOperationMetadata {
    /**
     * The number of metadata updates in the operation. This might be different from the number of updates in the request if the API can&#39;t parse some of the updates.
     */
    devicesCount?: number;
    /**
     * The processing status of the operation.
     */
    processingStatus?: string;
    /**
     * The processing progress of the operation. Measured as a number from 0 to 100. A value of 10O doesnt always mean the operation completed???check for the inclusion of a `done` field.
     */
    progress?: number;
  }
  /**
   * Tracks the status of a long-running operation to claim, unclaim, or attach metadata to devices. To learn more, read [Long???running batch operations](/zero-touch/guides/how-it-works#operations).
   */
  export interface Schema$DevicesLongRunningOperationResponse {
    /**
     * The processing status for each device in the operation. One `PerDeviceStatus` per device. The list order matches the items in the original request.
     */
    perDeviceStatus?: Schema$OperationPerDevice[];
    /**
     * A summary of how many items in the operation the server processed successfully. Updated as the operation progresses.
     */
    successCount?: number;
  }
  /**
   * An EMM&#39;s DPC ([device policy controller](http://developer.android.com/work/dpc/build-dpc.html)). Zero-touch enrollment installs a DPC (listed in the `Configuration`) on a device to maintain the customer&#39;s mobile policies. All the DPCs listed by the API support zero-touch enrollment and are available in Google Play.
   */
  export interface Schema$Dpc {
    /**
     * Output only. The title of the DPC app in Google Play. For example, _Google Apps Device Policy_. Useful in an application&#39;s user interface.
     */
    dpcName?: string;
    /**
     * Output only. The API resource name in the format `customers/[CUSTOMER_ID]/dpcs/[DPC_ID]`. Assigned by the server. To maintain a reference to a DPC across customer accounts, persist and match the last path component (`DPC_ID`).
     */
    name?: string;
    /**
     * Output only. The DPC&#39;s Android application ID that looks like a Java package name. Zero-touch enrollment installs the DPC app onto a device using this identifier.
     */
    packageName?: string;
  }
  /**
   * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
   */
  export interface Schema$Empty {}
  /**
   * Request to find devices.
   */
  export interface Schema$FindDevicesByDeviceIdentifierRequest {
    /**
     * Required. The device identifier to search for.
     */
    deviceIdentifier?: Schema$DeviceIdentifier;
    /**
     * Required. The maximum number of devices to show in a page of results. Must be between 1 and 100 inclusive.
     */
    limit?: string;
    /**
     * A token specifying which result page to return.
     */
    pageToken?: string;
  }
  /**
   * Response containing found devices.
   */
  export interface Schema$FindDevicesByDeviceIdentifierResponse {
    /**
     * Found devices.
     */
    devices?: Schema$Device[];
    /**
     * A token used to access the next page of results. Omitted if no further results are available.
     */
    nextPageToken?: string;
    /**
     * The total count of items in the list irrespective of pagination.
     */
    totalSize?: number;
  }
  /**
   * Request to find devices by customers.
   */
  export interface Schema$FindDevicesByOwnerRequest {
    /**
     * Required. The list of customer IDs to search for.
     */
    customerId?: string[];
    /**
     * Required. The maximum number of devices to show in a page of results. Must be between 1 and 100 inclusive.
     */
    limit?: string;
    /**
     * A token specifying which result page to return.
     */
    pageToken?: string;
    /**
     * Required. The section type of the device&#39;s provisioning record.
     */
    sectionType?: string;
  }
  /**
   * Response containing found devices.
   */
  export interface Schema$FindDevicesByOwnerResponse {
    /**
     * The customer&#39;s devices.
     */
    devices?: Schema$Device[];
    /**
     * A token used to access the next page of results. Omitted if no further results are available.
     */
    nextPageToken?: string;
    /**
     * The total count of items in the list irrespective of pagination.
     */
    totalSize?: number;
  }
  /**
   * Response message of all customers related to this partner.
   */
  export interface Schema$ListCustomersResponse {
    /**
     * List of customers related to this reseller partner.
     */
    customers?: Schema$Company[];
    /**
     * A token to retrieve the next page of results. Omitted if no further results are available.
     */
    nextPageToken?: string;
    /**
     * The total count of items in the list irrespective of pagination.
     */
    totalSize?: number;
  }
  /**
   * Response message to list customers of the vendor.
   */
  export interface Schema$ListVendorCustomersResponse {
    /**
     * List of customers of the vendor.
     */
    customers?: Schema$Company[];
    /**
     * A token to retrieve the next page of results. Omitted if no further results are available.
     */
    nextPageToken?: string;
    /**
     * The total count of items in the list irrespective of pagination.
     */
    totalSize?: number;
  }
  /**
   * Response message to list vendors of the partner.
   */
  export interface Schema$ListVendorsResponse {
    /**
     * A token to retrieve the next page of results. Omitted if no further results are available.
     */
    nextPageToken?: string;
    /**
     * The total count of items in the list irrespective of pagination.
     */
    totalSize?: number;
    /**
     * List of vendors of the reseller partner. Fields `name`, `companyId` and `companyName` are populated to the Company object.
     */
    vendors?: Schema$Company[];
  }
  /**
   * This resource represents a long-running operation that is the result of a network API call.
   */
  export interface Schema$Operation {
    /**
     * If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available.
     */
    done?: boolean;
    /**
     * This field will always be not set if the operation is created by `claimAsync`, `unclaimAsync`, or `updateMetadataAsync`. In this case, error information for each device is set in `response.perDeviceStatus.result.status`.
     */
    error?: Schema$Status;
    /**
     * This field will contain a `DevicesLongRunningOperationMetadata` object if the operation is created by `claimAsync`, `unclaimAsync`, or `updateMetadataAsync`.
     */
    metadata?: {[key: string]: any};
    /**
     * The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`.
     */
    name?: string;
    /**
     * This field will contain a `DevicesLongRunningOperationResponse` object if the operation is created by `claimAsync`, `unclaimAsync`, or `updateMetadataAsync`.
     */
    response?: {[key: string]: any};
  }
  /**
   * A task for each device in the operation. Corresponds to each device change in the request.
   */
  export interface Schema$OperationPerDevice {
    /**
     * A copy of the original device-claim request received by the server.
     */
    claim?: Schema$PartnerClaim;
    /**
     * The processing result for each device.
     */
    result?: Schema$PerDeviceStatusInBatch;
    /**
     * A copy of the original device-unclaim request received by the server.
     */
    unclaim?: Schema$PartnerUnclaim;
    /**
     * A copy of the original metadata-update request received by the server.
     */
    updateMetadata?: Schema$UpdateMetadataArguments;
  }
  /**
   * Identifies one claim request.
   */
  export interface Schema$PartnerClaim {
    /**
     * Required. The ID of the customer for whom the device is being claimed.
     */
    customerId?: string;
    /**
     * Required. Device identifier of the device.
     */
    deviceIdentifier?: Schema$DeviceIdentifier;
    /**
     * Required. The metadata to attach to the device at claim.
     */
    deviceMetadata?: Schema$DeviceMetadata;
    /**
     * Required. The section type of the device&#39;s provisioning record.
     */
    sectionType?: string;
  }
  /**
   * Identifies one unclaim request.
   */
  export interface Schema$PartnerUnclaim {
    /**
     * Device ID of the device.
     */
    deviceId?: string;
    /**
     * Device identifier of the device.
     */
    deviceIdentifier?: Schema$DeviceIdentifier;
    /**
     * Required. The section type of the device&#39;s provisioning record.
     */
    sectionType?: string;
    /**
     * The duration of the vacation unlock starting from when the request is processed. (1 day is treated as 24 hours)
     */
    vacationModeDays?: number;
    /**
     * The expiration time of the vacation unlock.
     */
    vacationModeExpireTime?: string;
  }
  /**
   * Captures the processing status for each device in the operation.
   */
  export interface Schema$PerDeviceStatusInBatch {
    /**
     * If processing succeeds, the device ID of the device.
     */
    deviceId?: string;
    /**
     * If processing fails, the error type.
     */
    errorIdentifier?: string;
    /**
     * If processing fails, a developer message explaining what went wrong.
     */
    errorMessage?: string;
    /**
     * The result status of the device after processing.
     */
    status?: string;
  }
  /**
   * The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). The error model is designed to be:  - Simple to use and understand for most users - Flexible enough to meet unexpected needs  # Overview  The `Status` message contains three pieces of data: error code, error message, and error details. The error code should be an enum value of google.rpc.Code, but it may accept additional error codes if needed.  The error message should be a developer-facing English message that helps developers *understand* and *resolve* the error. If a localized user-facing error message is needed, put the localized message in the error details or localize it in the client. The optional error details may contain arbitrary information about the error. There is a predefined set of error detail types in the package `google.rpc` that can be used for common error conditions.  # Language mapping  The `Status` message is the logical representation of the error model, but it is not necessarily the actual wire format. When the `Status` message is exposed in different client libraries and different wire protocols, it can be mapped differently. For example, it will likely be mapped to some exceptions in Java, but more likely mapped to some error codes in C.  # Other uses  The error model and the `Status` message can be used in a variety of environments, either with or without APIs, to provide a consistent developer experience across different environments.  Example uses of this error model include:  - Partial errors. If a service needs to return partial errors to the client,     it may embed the `Status` in the normal response to indicate the partial     errors.  - Workflow errors. A typical workflow has multiple steps. Each step may     have a `Status` message for error reporting.  - Batch operations. If a client uses batch request and batch response, the     `Status` message should be used directly inside batch response, one for     each error sub-response.  - Asynchronous operations. If an API call embeds asynchronous operation     results in its response, the status of those operations should be     represented directly using the `Status` message.  - Logging. If some API errors are stored in logs, the message `Status` could     be used directly after any stripping needed for security/privacy reasons.
   */
  export interface Schema$Status {
    /**
     * The status code, which should be an enum value of google.rpc.Code.
     */
    code?: number;
    /**
     * A list of messages that carry the error details.  There is a common set of message types for APIs to use.
     */
    details?: Array<{[key: string]: any}>;
    /**
     * A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.
     */
    message?: string;
  }
  /**
   * Request message to unclaim a device.
   */
  export interface Schema$UnclaimDeviceRequest {
    /**
     * The device ID returned by `ClaimDevice`.
     */
    deviceId?: string;
    /**
     * The device identifier you used when you claimed this device.
     */
    deviceIdentifier?: Schema$DeviceIdentifier;
    /**
     * Required. The section type of the device&#39;s provisioning record.
     */
    sectionType?: string;
    /**
     * The duration of the vacation unlock starting from when the request is processed. (1 day is treated as 24 hours)
     */
    vacationModeDays?: number;
    /**
     * The expiration time of the vacation unlock.
     */
    vacationModeExpireTime?: string;
  }
  /**
   * Request to unclaim devices asynchronously in batch.
   */
  export interface Schema$UnclaimDevicesRequest {
    /**
     * Required. The list of devices to unclaim.
     */
    unclaims?: Schema$PartnerUnclaim[];
  }
  /**
   * Request to update device metadata in batch.
   */
  export interface Schema$UpdateDeviceMetadataInBatchRequest {
    /**
     * Required. The list of metadata updates.
     */
    updates?: Schema$UpdateMetadataArguments[];
  }
  /**
   * Request to set metadata for a device.
   */
  export interface Schema$UpdateDeviceMetadataRequest {
    /**
     * Required. The metdata to attach to the device.
     */
    deviceMetadata?: Schema$DeviceMetadata;
  }
  /**
   * Identifies metdata updates to one device.
   */
  export interface Schema$UpdateMetadataArguments {
    /**
     * Device ID of the device.
     */
    deviceId?: string;
    /**
     * Device identifier.
     */
    deviceIdentifier?: Schema$DeviceIdentifier;
    /**
     * Required. The metadata to update.
     */
    deviceMetadata?: Schema$DeviceMetadata;
  }

  export class Resource$Customers {
    context: APIRequestContext;
    configurations: Resource$Customers$Configurations;
    devices: Resource$Customers$Devices;
    dpcs: Resource$Customers$Dpcs;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.configurations = new Resource$Customers$Configurations(this.context);
      this.devices = new Resource$Customers$Devices(this.context);
      this.dpcs = new Resource$Customers$Dpcs(this.context);
    }

    /**
     * androiddeviceprovisioning.customers.list
     * @desc Lists the user's customer accounts.
     * @alias androiddeviceprovisioning.customers.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {integer=} params.pageSize The maximum number of customers to show in a page of results. A number between 1 and 100 (inclusive).
     * @param {string=} params.pageToken A token specifying which result page to return.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Customers$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$CustomerListCustomersResponse>;
    list(
      params: Params$Resource$Customers$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$CustomerListCustomersResponse>,
      callback: BodyResponseCallback<Schema$CustomerListCustomersResponse>
    ): void;
    list(
      params: Params$Resource$Customers$List,
      callback: BodyResponseCallback<Schema$CustomerListCustomersResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$CustomerListCustomersResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Customers$List
        | BodyResponseCallback<Schema$CustomerListCustomersResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$CustomerListCustomersResponse>,
      callback?: BodyResponseCallback<Schema$CustomerListCustomersResponse>
    ): void | GaxiosPromise<Schema$CustomerListCustomersResponse> {
      let params = (paramsOrCallback || {}) as Params$Resource$Customers$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customers$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/customers').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: [],
        pathParams: [],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$CustomerListCustomersResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$CustomerListCustomersResponse>(
          parameters
        );
      }
    }
  }

  export interface Params$Resource$Customers$List extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The maximum number of customers to show in a page of results. A number between 1 and 100 (inclusive).
     */
    pageSize?: number;
    /**
     * A token specifying which result page to return.
     */
    pageToken?: string;
  }

  export class Resource$Customers$Configurations {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * androiddeviceprovisioning.customers.configurations.create
     * @desc Creates a new configuration. Once created, a customer can apply the configuration to devices.
     * @alias androiddeviceprovisioning.customers.configurations.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required. The customer that manages the configuration. An API resource name in the format `customers/[CUSTOMER_ID]`.
     * @param {().Configuration} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Customers$Configurations$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Configuration>;
    create(
      params: Params$Resource$Customers$Configurations$Create,
      options: MethodOptions | BodyResponseCallback<Schema$Configuration>,
      callback: BodyResponseCallback<Schema$Configuration>
    ): void;
    create(
      params: Params$Resource$Customers$Configurations$Create,
      callback: BodyResponseCallback<Schema$Configuration>
    ): void;
    create(callback: BodyResponseCallback<Schema$Configuration>): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Customers$Configurations$Create
        | BodyResponseCallback<Schema$Configuration>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Configuration>,
      callback?: BodyResponseCallback<Schema$Configuration>
    ): void | GaxiosPromise<Schema$Configuration> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Customers$Configurations$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customers$Configurations$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/configurations').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Configuration>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Configuration>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.customers.configurations.delete
     * @desc Deletes an unused configuration. The API call fails if the customer has devices with the configuration applied.
     * @alias androiddeviceprovisioning.customers.configurations.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required. The configuration to delete. An API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. If the configuration is applied to any devices, the API call fails.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
      params?: Params$Resource$Customers$Configurations$Delete,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    delete(
      params: Params$Resource$Customers$Configurations$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(
      params: Params$Resource$Customers$Configurations$Delete,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$Empty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Customers$Configurations$Delete
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Customers$Configurations$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customers$Configurations$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'DELETE',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.customers.configurations.get
     * @desc Gets the details of a configuration.
     * @alias androiddeviceprovisioning.customers.configurations.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required. The configuration to get. An API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Customers$Configurations$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Configuration>;
    get(
      params: Params$Resource$Customers$Configurations$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Configuration>,
      callback: BodyResponseCallback<Schema$Configuration>
    ): void;
    get(
      params: Params$Resource$Customers$Configurations$Get,
      callback: BodyResponseCallback<Schema$Configuration>
    ): void;
    get(callback: BodyResponseCallback<Schema$Configuration>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Customers$Configurations$Get
        | BodyResponseCallback<Schema$Configuration>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Configuration>,
      callback?: BodyResponseCallback<Schema$Configuration>
    ): void | GaxiosPromise<Schema$Configuration> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Customers$Configurations$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customers$Configurations$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Configuration>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Configuration>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.customers.configurations.list
     * @desc Lists a customer's configurations.
     * @alias androiddeviceprovisioning.customers.configurations.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required. The customer that manages the listed configurations. An API resource name in the format `customers/[CUSTOMER_ID]`.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Customers$Configurations$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$CustomerListConfigurationsResponse>;
    list(
      params: Params$Resource$Customers$Configurations$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$CustomerListConfigurationsResponse>,
      callback: BodyResponseCallback<Schema$CustomerListConfigurationsResponse>
    ): void;
    list(
      params: Params$Resource$Customers$Configurations$List,
      callback: BodyResponseCallback<Schema$CustomerListConfigurationsResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$CustomerListConfigurationsResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Customers$Configurations$List
        | BodyResponseCallback<Schema$CustomerListConfigurationsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$CustomerListConfigurationsResponse>,
      callback?: BodyResponseCallback<Schema$CustomerListConfigurationsResponse>
    ): void | GaxiosPromise<Schema$CustomerListConfigurationsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Customers$Configurations$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customers$Configurations$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/configurations').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$CustomerListConfigurationsResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$CustomerListConfigurationsResponse>(
          parameters
        );
      }
    }

    /**
     * androiddeviceprovisioning.customers.configurations.patch
     * @desc Updates a configuration's field values.
     * @alias androiddeviceprovisioning.customers.configurations.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Output only. The API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. Assigned by the server.
     * @param {string=} params.updateMask Required. The field mask applied to the target `Configuration` before updating the fields. To learn more about using field masks, read [FieldMask](/protocol-buffers/docs/reference/google.protobuf#fieldmask) in the Protocol Buffers documentation.
     * @param {().Configuration} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
      params?: Params$Resource$Customers$Configurations$Patch,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Configuration>;
    patch(
      params: Params$Resource$Customers$Configurations$Patch,
      options: MethodOptions | BodyResponseCallback<Schema$Configuration>,
      callback: BodyResponseCallback<Schema$Configuration>
    ): void;
    patch(
      params: Params$Resource$Customers$Configurations$Patch,
      callback: BodyResponseCallback<Schema$Configuration>
    ): void;
    patch(callback: BodyResponseCallback<Schema$Configuration>): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Customers$Configurations$Patch
        | BodyResponseCallback<Schema$Configuration>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Configuration>,
      callback?: BodyResponseCallback<Schema$Configuration>
    ): void | GaxiosPromise<Schema$Configuration> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Customers$Configurations$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customers$Configurations$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'PATCH',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Configuration>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Configuration>(parameters);
      }
    }
  }

  export interface Params$Resource$Customers$Configurations$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The customer that manages the configuration. An API resource name in the format `customers/[CUSTOMER_ID]`.
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$Configuration;
  }
  export interface Params$Resource$Customers$Configurations$Delete
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The configuration to delete. An API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. If the configuration is applied to any devices, the API call fails.
     */
    name?: string;
  }
  export interface Params$Resource$Customers$Configurations$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The configuration to get. An API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`.
     */
    name?: string;
  }
  export interface Params$Resource$Customers$Configurations$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The customer that manages the listed configurations. An API resource name in the format `customers/[CUSTOMER_ID]`.
     */
    parent?: string;
  }
  export interface Params$Resource$Customers$Configurations$Patch
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Output only. The API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. Assigned by the server.
     */
    name?: string;
    /**
     * Required. The field mask applied to the target `Configuration` before updating the fields. To learn more about using field masks, read [FieldMask](/protocol-buffers/docs/reference/google.protobuf#fieldmask) in the Protocol Buffers documentation.
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$Configuration;
  }

  export class Resource$Customers$Devices {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * androiddeviceprovisioning.customers.devices.applyConfiguration
     * @desc Applies a Configuration to the device to register the device for zero-touch enrollment. After applying a configuration to a device, the device automatically provisions itself on first boot, or next factory reset.
     * @alias androiddeviceprovisioning.customers.devices.applyConfiguration
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required. The customer managing the device. An API resource name in the format `customers/[CUSTOMER_ID]`.
     * @param {().CustomerApplyConfigurationRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    applyConfiguration(
      params?: Params$Resource$Customers$Devices$Applyconfiguration,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    applyConfiguration(
      params: Params$Resource$Customers$Devices$Applyconfiguration,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    applyConfiguration(
      params: Params$Resource$Customers$Devices$Applyconfiguration,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    applyConfiguration(callback: BodyResponseCallback<Schema$Empty>): void;
    applyConfiguration(
      paramsOrCallback?:
        | Params$Resource$Customers$Devices$Applyconfiguration
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Customers$Devices$Applyconfiguration;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customers$Devices$Applyconfiguration;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/devices:applyConfiguration').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.customers.devices.get
     * @desc Gets the details of a device.
     * @alias androiddeviceprovisioning.customers.devices.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required. The device to get. An API resource name in the format `customers/[CUSTOMER_ID]/devices/[DEVICE_ID]`.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Customers$Devices$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Device>;
    get(
      params: Params$Resource$Customers$Devices$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Device>,
      callback: BodyResponseCallback<Schema$Device>
    ): void;
    get(
      params: Params$Resource$Customers$Devices$Get,
      callback: BodyResponseCallback<Schema$Device>
    ): void;
    get(callback: BodyResponseCallback<Schema$Device>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Customers$Devices$Get
        | BodyResponseCallback<Schema$Device>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Device>,
      callback?: BodyResponseCallback<Schema$Device>
    ): void | GaxiosPromise<Schema$Device> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Customers$Devices$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customers$Devices$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Device>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Device>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.customers.devices.list
     * @desc Lists a customer's devices.
     * @alias androiddeviceprovisioning.customers.devices.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.pageSize The maximum number of devices to show in a page of results. Must be between 1 and 100 inclusive.
     * @param {string=} params.pageToken A token specifying which result page to return.
     * @param {string} params.parent Required. The customer managing the devices. An API resource name in the format `customers/[CUSTOMER_ID]`.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Customers$Devices$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$CustomerListDevicesResponse>;
    list(
      params: Params$Resource$Customers$Devices$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$CustomerListDevicesResponse>,
      callback: BodyResponseCallback<Schema$CustomerListDevicesResponse>
    ): void;
    list(
      params: Params$Resource$Customers$Devices$List,
      callback: BodyResponseCallback<Schema$CustomerListDevicesResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$CustomerListDevicesResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Customers$Devices$List
        | BodyResponseCallback<Schema$CustomerListDevicesResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$CustomerListDevicesResponse>,
      callback?: BodyResponseCallback<Schema$CustomerListDevicesResponse>
    ): void | GaxiosPromise<Schema$CustomerListDevicesResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Customers$Devices$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customers$Devices$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/devices').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$CustomerListDevicesResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$CustomerListDevicesResponse>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.customers.devices.removeConfiguration
     * @desc Removes a configuration from device.
     * @alias androiddeviceprovisioning.customers.devices.removeConfiguration
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required. The customer managing the device in the format `customers/[CUSTOMER_ID]`.
     * @param {().CustomerRemoveConfigurationRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    removeConfiguration(
      params?: Params$Resource$Customers$Devices$Removeconfiguration,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    removeConfiguration(
      params: Params$Resource$Customers$Devices$Removeconfiguration,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    removeConfiguration(
      params: Params$Resource$Customers$Devices$Removeconfiguration,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    removeConfiguration(callback: BodyResponseCallback<Schema$Empty>): void;
    removeConfiguration(
      paramsOrCallback?:
        | Params$Resource$Customers$Devices$Removeconfiguration
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Customers$Devices$Removeconfiguration;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customers$Devices$Removeconfiguration;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/{+parent}/devices:removeConfiguration'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.customers.devices.unclaim
     * @desc Unclaims a device from a customer and removes it from zero-touch enrollment.  After removing a device, a customer must contact their reseller to register the device into zero-touch enrollment again.
     * @alias androiddeviceprovisioning.customers.devices.unclaim
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required. The customer managing the device. An API resource name in the format `customers/[CUSTOMER_ID]`.
     * @param {().CustomerUnclaimDeviceRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    unclaim(
      params?: Params$Resource$Customers$Devices$Unclaim,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    unclaim(
      params: Params$Resource$Customers$Devices$Unclaim,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    unclaim(
      params: Params$Resource$Customers$Devices$Unclaim,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    unclaim(callback: BodyResponseCallback<Schema$Empty>): void;
    unclaim(
      paramsOrCallback?:
        | Params$Resource$Customers$Devices$Unclaim
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Customers$Devices$Unclaim;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customers$Devices$Unclaim;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/devices:unclaim').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }
  }

  export interface Params$Resource$Customers$Devices$Applyconfiguration
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The customer managing the device. An API resource name in the format `customers/[CUSTOMER_ID]`.
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$CustomerApplyConfigurationRequest;
  }
  export interface Params$Resource$Customers$Devices$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The device to get. An API resource name in the format `customers/[CUSTOMER_ID]/devices/[DEVICE_ID]`.
     */
    name?: string;
  }
  export interface Params$Resource$Customers$Devices$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The maximum number of devices to show in a page of results. Must be between 1 and 100 inclusive.
     */
    pageSize?: string;
    /**
     * A token specifying which result page to return.
     */
    pageToken?: string;
    /**
     * Required. The customer managing the devices. An API resource name in the format `customers/[CUSTOMER_ID]`.
     */
    parent?: string;
  }
  export interface Params$Resource$Customers$Devices$Removeconfiguration
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The customer managing the device in the format `customers/[CUSTOMER_ID]`.
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$CustomerRemoveConfigurationRequest;
  }
  export interface Params$Resource$Customers$Devices$Unclaim
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The customer managing the device. An API resource name in the format `customers/[CUSTOMER_ID]`.
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$CustomerUnclaimDeviceRequest;
  }

  export class Resource$Customers$Dpcs {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * androiddeviceprovisioning.customers.dpcs.list
     * @desc Lists the DPCs (device policy controllers) that support zero-touch enrollment.
     * @alias androiddeviceprovisioning.customers.dpcs.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required. The customer that can use the DPCs in configurations. An API resource name in the format `customers/[CUSTOMER_ID]`.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Customers$Dpcs$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$CustomerListDpcsResponse>;
    list(
      params: Params$Resource$Customers$Dpcs$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$CustomerListDpcsResponse>,
      callback: BodyResponseCallback<Schema$CustomerListDpcsResponse>
    ): void;
    list(
      params: Params$Resource$Customers$Dpcs$List,
      callback: BodyResponseCallback<Schema$CustomerListDpcsResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$CustomerListDpcsResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Customers$Dpcs$List
        | BodyResponseCallback<Schema$CustomerListDpcsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$CustomerListDpcsResponse>,
      callback?: BodyResponseCallback<Schema$CustomerListDpcsResponse>
    ): void | GaxiosPromise<Schema$CustomerListDpcsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Customers$Dpcs$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Customers$Dpcs$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/dpcs').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$CustomerListDpcsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$CustomerListDpcsResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Customers$Dpcs$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The customer that can use the DPCs in configurations. An API resource name in the format `customers/[CUSTOMER_ID]`.
     */
    parent?: string;
  }

  export class Resource$Operations {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * androiddeviceprovisioning.operations.get
     * @desc Gets the latest state of a long-running operation.  Clients can use this method to poll the operation result at intervals as recommended by the API service.
     * @alias androiddeviceprovisioning.operations.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The name of the operation resource.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Operations$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Operation>;
    get(
      params: Params$Resource$Operations$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Operation>,
      callback: BodyResponseCallback<Schema$Operation>
    ): void;
    get(
      params: Params$Resource$Operations$Get,
      callback: BodyResponseCallback<Schema$Operation>
    ): void;
    get(callback: BodyResponseCallback<Schema$Operation>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Operations$Get
        | BodyResponseCallback<Schema$Operation>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Operation>,
      callback?: BodyResponseCallback<Schema$Operation>
    ): void | GaxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback || {}) as Params$Resource$Operations$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Operations$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }
  }

  export interface Params$Resource$Operations$Get extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The name of the operation resource.
     */
    name?: string;
  }

  export class Resource$Partners {
    context: APIRequestContext;
    customers: Resource$Partners$Customers;
    devices: Resource$Partners$Devices;
    vendors: Resource$Partners$Vendors;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.customers = new Resource$Partners$Customers(this.context);
      this.devices = new Resource$Partners$Devices(this.context);
      this.vendors = new Resource$Partners$Vendors(this.context);
    }
  }

  export class Resource$Partners$Customers {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * androiddeviceprovisioning.partners.customers.create
     * @desc Creates a customer for zero-touch enrollment. After the method returns successfully, admin and owner roles can manage devices and EMM configs by calling API methods or using their zero-touch enrollment portal. The customer receives an email that welcomes them to zero-touch enrollment and explains how to sign into the portal.
     * @alias androiddeviceprovisioning.partners.customers.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required. The parent resource ID in the format `partners/[PARTNER_ID]` that identifies the reseller.
     * @param {().CreateCustomerRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Partners$Customers$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Company>;
    create(
      params: Params$Resource$Partners$Customers$Create,
      options: MethodOptions | BodyResponseCallback<Schema$Company>,
      callback: BodyResponseCallback<Schema$Company>
    ): void;
    create(
      params: Params$Resource$Partners$Customers$Create,
      callback: BodyResponseCallback<Schema$Company>
    ): void;
    create(callback: BodyResponseCallback<Schema$Company>): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Partners$Customers$Create
        | BodyResponseCallback<Schema$Company>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Company>,
      callback?: BodyResponseCallback<Schema$Company>
    ): void | GaxiosPromise<Schema$Company> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Customers$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Customers$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/customers').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Company>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Company>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.partners.customers.list
     * @desc Lists the customers that are enrolled to the reseller identified by the `partnerId` argument. This list includes customers that the reseller created and customers that enrolled themselves using the portal.
     * @alias androiddeviceprovisioning.partners.customers.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {integer=} params.pageSize The maximum number of results to be returned. If not specified or 0, all the records are returned.
     * @param {string=} params.pageToken A token identifying a page of results returned by the server.
     * @param {string} params.partnerId Required. The ID of the reseller partner.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Partners$Customers$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListCustomersResponse>;
    list(
      params: Params$Resource$Partners$Customers$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListCustomersResponse>,
      callback: BodyResponseCallback<Schema$ListCustomersResponse>
    ): void;
    list(
      params: Params$Resource$Partners$Customers$List,
      callback: BodyResponseCallback<Schema$ListCustomersResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListCustomersResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Partners$Customers$List
        | BodyResponseCallback<Schema$ListCustomersResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListCustomersResponse>,
      callback?: BodyResponseCallback<Schema$ListCustomersResponse>
    ): void | GaxiosPromise<Schema$ListCustomersResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Customers$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Customers$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/partners/{+partnerId}/customers').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['partnerId'],
        pathParams: ['partnerId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListCustomersResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListCustomersResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Partners$Customers$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The parent resource ID in the format `partners/[PARTNER_ID]` that identifies the reseller.
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$CreateCustomerRequest;
  }
  export interface Params$Resource$Partners$Customers$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The maximum number of results to be returned. If not specified or 0, all the records are returned.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results returned by the server.
     */
    pageToken?: string;
    /**
     * Required. The ID of the reseller partner.
     */
    partnerId?: string;
  }

  export class Resource$Partners$Devices {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * androiddeviceprovisioning.partners.devices.claim
     * @desc Claims a device for a customer and adds it to zero-touch enrollment. If the device is already claimed by another customer, the call returns an error.
     * @alias androiddeviceprovisioning.partners.devices.claim
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.partnerId Required. The ID of the reseller partner.
     * @param {().ClaimDeviceRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    claim(
      params?: Params$Resource$Partners$Devices$Claim,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ClaimDeviceResponse>;
    claim(
      params: Params$Resource$Partners$Devices$Claim,
      options: MethodOptions | BodyResponseCallback<Schema$ClaimDeviceResponse>,
      callback: BodyResponseCallback<Schema$ClaimDeviceResponse>
    ): void;
    claim(
      params: Params$Resource$Partners$Devices$Claim,
      callback: BodyResponseCallback<Schema$ClaimDeviceResponse>
    ): void;
    claim(callback: BodyResponseCallback<Schema$ClaimDeviceResponse>): void;
    claim(
      paramsOrCallback?:
        | Params$Resource$Partners$Devices$Claim
        | BodyResponseCallback<Schema$ClaimDeviceResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ClaimDeviceResponse>,
      callback?: BodyResponseCallback<Schema$ClaimDeviceResponse>
    ): void | GaxiosPromise<Schema$ClaimDeviceResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Devices$Claim;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Devices$Claim;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/partners/{+partnerId}/devices:claim').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['partnerId'],
        pathParams: ['partnerId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ClaimDeviceResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ClaimDeviceResponse>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.partners.devices.claimAsync
     * @desc Claims a batch of devices for a customer asynchronously. Adds the devices to zero-touch enrollment. To learn more, read [Long???running batch operations](/zero-touch/guides/how-it-works#operations).
     * @alias androiddeviceprovisioning.partners.devices.claimAsync
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.partnerId Required. The ID of the reseller partner.
     * @param {().ClaimDevicesRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    claimAsync(
      params?: Params$Resource$Partners$Devices$Claimasync,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Operation>;
    claimAsync(
      params: Params$Resource$Partners$Devices$Claimasync,
      options: MethodOptions | BodyResponseCallback<Schema$Operation>,
      callback: BodyResponseCallback<Schema$Operation>
    ): void;
    claimAsync(
      params: Params$Resource$Partners$Devices$Claimasync,
      callback: BodyResponseCallback<Schema$Operation>
    ): void;
    claimAsync(callback: BodyResponseCallback<Schema$Operation>): void;
    claimAsync(
      paramsOrCallback?:
        | Params$Resource$Partners$Devices$Claimasync
        | BodyResponseCallback<Schema$Operation>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Operation>,
      callback?: BodyResponseCallback<Schema$Operation>
    ): void | GaxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Devices$Claimasync;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Devices$Claimasync;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/partners/{+partnerId}/devices:claimAsync'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['partnerId'],
        pathParams: ['partnerId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.partners.devices.findByIdentifier
     * @desc Finds devices by hardware identifiers, such as IMEI.
     * @alias androiddeviceprovisioning.partners.devices.findByIdentifier
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.partnerId Required. The ID of the reseller partner.
     * @param {().FindDevicesByDeviceIdentifierRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    findByIdentifier(
      params?: Params$Resource$Partners$Devices$Findbyidentifier,
      options?: MethodOptions
    ): GaxiosPromise<Schema$FindDevicesByDeviceIdentifierResponse>;
    findByIdentifier(
      params: Params$Resource$Partners$Devices$Findbyidentifier,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$FindDevicesByDeviceIdentifierResponse>,
      callback: BodyResponseCallback<
        Schema$FindDevicesByDeviceIdentifierResponse
      >
    ): void;
    findByIdentifier(
      params: Params$Resource$Partners$Devices$Findbyidentifier,
      callback: BodyResponseCallback<
        Schema$FindDevicesByDeviceIdentifierResponse
      >
    ): void;
    findByIdentifier(
      callback: BodyResponseCallback<
        Schema$FindDevicesByDeviceIdentifierResponse
      >
    ): void;
    findByIdentifier(
      paramsOrCallback?:
        | Params$Resource$Partners$Devices$Findbyidentifier
        | BodyResponseCallback<Schema$FindDevicesByDeviceIdentifierResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$FindDevicesByDeviceIdentifierResponse>,
      callback?: BodyResponseCallback<
        Schema$FindDevicesByDeviceIdentifierResponse
      >
    ): void | GaxiosPromise<Schema$FindDevicesByDeviceIdentifierResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Devices$Findbyidentifier;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Devices$Findbyidentifier;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/partners/{+partnerId}/devices:findByIdentifier'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['partnerId'],
        pathParams: ['partnerId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$FindDevicesByDeviceIdentifierResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$FindDevicesByDeviceIdentifierResponse>(
          parameters
        );
      }
    }

    /**
     * androiddeviceprovisioning.partners.devices.findByOwner
     * @desc Finds devices claimed for customers. The results only contain devices registered to the reseller that's identified by the `partnerId` argument. The customer's devices purchased from other resellers don't appear in the results.
     * @alias androiddeviceprovisioning.partners.devices.findByOwner
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.partnerId Required. The ID of the reseller partner.
     * @param {().FindDevicesByOwnerRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    findByOwner(
      params?: Params$Resource$Partners$Devices$Findbyowner,
      options?: MethodOptions
    ): GaxiosPromise<Schema$FindDevicesByOwnerResponse>;
    findByOwner(
      params: Params$Resource$Partners$Devices$Findbyowner,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$FindDevicesByOwnerResponse>,
      callback: BodyResponseCallback<Schema$FindDevicesByOwnerResponse>
    ): void;
    findByOwner(
      params: Params$Resource$Partners$Devices$Findbyowner,
      callback: BodyResponseCallback<Schema$FindDevicesByOwnerResponse>
    ): void;
    findByOwner(
      callback: BodyResponseCallback<Schema$FindDevicesByOwnerResponse>
    ): void;
    findByOwner(
      paramsOrCallback?:
        | Params$Resource$Partners$Devices$Findbyowner
        | BodyResponseCallback<Schema$FindDevicesByOwnerResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$FindDevicesByOwnerResponse>,
      callback?: BodyResponseCallback<Schema$FindDevicesByOwnerResponse>
    ): void | GaxiosPromise<Schema$FindDevicesByOwnerResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Devices$Findbyowner;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Devices$Findbyowner;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/partners/{+partnerId}/devices:findByOwner'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['partnerId'],
        pathParams: ['partnerId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$FindDevicesByOwnerResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$FindDevicesByOwnerResponse>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.partners.devices.get
     * @desc Gets a device.
     * @alias androiddeviceprovisioning.partners.devices.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required. The device API resource name in the format `partners/[PARTNER_ID]/devices/[DEVICE_ID]`.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Partners$Devices$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Device>;
    get(
      params: Params$Resource$Partners$Devices$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Device>,
      callback: BodyResponseCallback<Schema$Device>
    ): void;
    get(
      params: Params$Resource$Partners$Devices$Get,
      callback: BodyResponseCallback<Schema$Device>
    ): void;
    get(callback: BodyResponseCallback<Schema$Device>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Partners$Devices$Get
        | BodyResponseCallback<Schema$Device>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Device>,
      callback?: BodyResponseCallback<Schema$Device>
    ): void | GaxiosPromise<Schema$Device> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Devices$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Devices$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+name}').replace(/([^:]\/)\/+/g, '$1'),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Device>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Device>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.partners.devices.metadata
     * @desc Updates reseller metadata associated with the device.
     * @alias androiddeviceprovisioning.partners.devices.metadata
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.deviceId Required. The ID of the device.
     * @param {string} params.metadataOwnerId Required. The owner of the newly set metadata. Set this to the partner ID.
     * @param {().UpdateDeviceMetadataRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    metadata(
      params?: Params$Resource$Partners$Devices$Metadata,
      options?: MethodOptions
    ): GaxiosPromise<Schema$DeviceMetadata>;
    metadata(
      params: Params$Resource$Partners$Devices$Metadata,
      options: MethodOptions | BodyResponseCallback<Schema$DeviceMetadata>,
      callback: BodyResponseCallback<Schema$DeviceMetadata>
    ): void;
    metadata(
      params: Params$Resource$Partners$Devices$Metadata,
      callback: BodyResponseCallback<Schema$DeviceMetadata>
    ): void;
    metadata(callback: BodyResponseCallback<Schema$DeviceMetadata>): void;
    metadata(
      paramsOrCallback?:
        | Params$Resource$Partners$Devices$Metadata
        | BodyResponseCallback<Schema$DeviceMetadata>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$DeviceMetadata>,
      callback?: BodyResponseCallback<Schema$DeviceMetadata>
    ): void | GaxiosPromise<Schema$DeviceMetadata> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Devices$Metadata;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Devices$Metadata;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl +
              '/v1/partners/{+metadataOwnerId}/devices/{+deviceId}/metadata'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['metadataOwnerId', 'deviceId'],
        pathParams: ['deviceId', 'metadataOwnerId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$DeviceMetadata>(parameters, callback);
      } else {
        return createAPIRequest<Schema$DeviceMetadata>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.partners.devices.unclaim
     * @desc Unclaims a device from a customer and removes it from zero-touch enrollment.
     * @alias androiddeviceprovisioning.partners.devices.unclaim
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.partnerId Required. The ID of the reseller partner.
     * @param {().UnclaimDeviceRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    unclaim(
      params?: Params$Resource$Partners$Devices$Unclaim,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    unclaim(
      params: Params$Resource$Partners$Devices$Unclaim,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    unclaim(
      params: Params$Resource$Partners$Devices$Unclaim,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    unclaim(callback: BodyResponseCallback<Schema$Empty>): void;
    unclaim(
      paramsOrCallback?:
        | Params$Resource$Partners$Devices$Unclaim
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Devices$Unclaim;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Devices$Unclaim;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/partners/{+partnerId}/devices:unclaim'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['partnerId'],
        pathParams: ['partnerId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Empty>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Empty>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.partners.devices.unclaimAsync
     * @desc Unclaims a batch of devices for a customer asynchronously. Removes the devices from zero-touch enrollment. To learn more, read [Long???running batch operations](/zero-touch/guides/how-it-works#operations).
     * @alias androiddeviceprovisioning.partners.devices.unclaimAsync
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.partnerId Required. The reseller partner ID.
     * @param {().UnclaimDevicesRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    unclaimAsync(
      params?: Params$Resource$Partners$Devices$Unclaimasync,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Operation>;
    unclaimAsync(
      params: Params$Resource$Partners$Devices$Unclaimasync,
      options: MethodOptions | BodyResponseCallback<Schema$Operation>,
      callback: BodyResponseCallback<Schema$Operation>
    ): void;
    unclaimAsync(
      params: Params$Resource$Partners$Devices$Unclaimasync,
      callback: BodyResponseCallback<Schema$Operation>
    ): void;
    unclaimAsync(callback: BodyResponseCallback<Schema$Operation>): void;
    unclaimAsync(
      paramsOrCallback?:
        | Params$Resource$Partners$Devices$Unclaimasync
        | BodyResponseCallback<Schema$Operation>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Operation>,
      callback?: BodyResponseCallback<Schema$Operation>
    ): void | GaxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Devices$Unclaimasync;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Devices$Unclaimasync;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/partners/{+partnerId}/devices:unclaimAsync'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['partnerId'],
        pathParams: ['partnerId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }

    /**
     * androiddeviceprovisioning.partners.devices.updateMetadataAsync
     * @desc Updates the reseller metadata attached to a batch of devices. This method updates devices asynchronously and returns an `Operation` that can be used to track progress. Read [Long???running batch operations](/zero-touch/guides/how-it-works#operations).
     * @alias androiddeviceprovisioning.partners.devices.updateMetadataAsync
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.partnerId Required. The reseller partner ID.
     * @param {().UpdateDeviceMetadataInBatchRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    updateMetadataAsync(
      params?: Params$Resource$Partners$Devices$Updatemetadataasync,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Operation>;
    updateMetadataAsync(
      params: Params$Resource$Partners$Devices$Updatemetadataasync,
      options: MethodOptions | BodyResponseCallback<Schema$Operation>,
      callback: BodyResponseCallback<Schema$Operation>
    ): void;
    updateMetadataAsync(
      params: Params$Resource$Partners$Devices$Updatemetadataasync,
      callback: BodyResponseCallback<Schema$Operation>
    ): void;
    updateMetadataAsync(callback: BodyResponseCallback<Schema$Operation>): void;
    updateMetadataAsync(
      paramsOrCallback?:
        | Params$Resource$Partners$Devices$Updatemetadataasync
        | BodyResponseCallback<Schema$Operation>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$Operation>,
      callback?: BodyResponseCallback<Schema$Operation>
    ): void | GaxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Devices$Updatemetadataasync;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Devices$Updatemetadataasync;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (
              rootUrl + '/v1/partners/{+partnerId}/devices:updateMetadataAsync'
            ).replace(/([^:]\/)\/+/g, '$1'),
            method: 'POST',
          },
          options
        ),
        params,
        requiredParams: ['partnerId'],
        pathParams: ['partnerId'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }
  }

  export interface Params$Resource$Partners$Devices$Claim
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the reseller partner.
     */
    partnerId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$ClaimDeviceRequest;
  }
  export interface Params$Resource$Partners$Devices$Claimasync
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the reseller partner.
     */
    partnerId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$ClaimDevicesRequest;
  }
  export interface Params$Resource$Partners$Devices$Findbyidentifier
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the reseller partner.
     */
    partnerId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$FindDevicesByDeviceIdentifierRequest;
  }
  export interface Params$Resource$Partners$Devices$Findbyowner
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the reseller partner.
     */
    partnerId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$FindDevicesByOwnerRequest;
  }
  export interface Params$Resource$Partners$Devices$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The device API resource name in the format `partners/[PARTNER_ID]/devices/[DEVICE_ID]`.
     */
    name?: string;
  }
  export interface Params$Resource$Partners$Devices$Metadata
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the device.
     */
    deviceId?: string;
    /**
     * Required. The owner of the newly set metadata. Set this to the partner ID.
     */
    metadataOwnerId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$UpdateDeviceMetadataRequest;
  }
  export interface Params$Resource$Partners$Devices$Unclaim
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The ID of the reseller partner.
     */
    partnerId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$UnclaimDeviceRequest;
  }
  export interface Params$Resource$Partners$Devices$Unclaimasync
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The reseller partner ID.
     */
    partnerId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$UnclaimDevicesRequest;
  }
  export interface Params$Resource$Partners$Devices$Updatemetadataasync
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required. The reseller partner ID.
     */
    partnerId?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$UpdateDeviceMetadataInBatchRequest;
  }

  export class Resource$Partners$Vendors {
    context: APIRequestContext;
    customers: Resource$Partners$Vendors$Customers;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.customers = new Resource$Partners$Vendors$Customers(this.context);
    }

    /**
     * androiddeviceprovisioning.partners.vendors.list
     * @desc Lists the vendors of the partner.
     * @alias androiddeviceprovisioning.partners.vendors.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {integer=} params.pageSize The maximum number of results to be returned.
     * @param {string=} params.pageToken A token identifying a page of results returned by the server.
     * @param {string} params.parent Required. The resource name in the format `partners/[PARTNER_ID]`.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Partners$Vendors$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListVendorsResponse>;
    list(
      params: Params$Resource$Partners$Vendors$List,
      options: MethodOptions | BodyResponseCallback<Schema$ListVendorsResponse>,
      callback: BodyResponseCallback<Schema$ListVendorsResponse>
    ): void;
    list(
      params: Params$Resource$Partners$Vendors$List,
      callback: BodyResponseCallback<Schema$ListVendorsResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListVendorsResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Partners$Vendors$List
        | BodyResponseCallback<Schema$ListVendorsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListVendorsResponse>,
      callback?: BodyResponseCallback<Schema$ListVendorsResponse>
    ): void | GaxiosPromise<Schema$ListVendorsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Vendors$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Vendors$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/vendors').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListVendorsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListVendorsResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Partners$Vendors$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The maximum number of results to be returned.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results returned by the server.
     */
    pageToken?: string;
    /**
     * Required. The resource name in the format `partners/[PARTNER_ID]`.
     */
    parent?: string;
  }

  export class Resource$Partners$Vendors$Customers {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * androiddeviceprovisioning.partners.vendors.customers.list
     * @desc Lists the customers of the vendor.
     * @alias androiddeviceprovisioning.partners.vendors.customers.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {integer=} params.pageSize The maximum number of results to be returned.
     * @param {string=} params.pageToken A token identifying a page of results returned by the server.
     * @param {string} params.parent Required. The resource name in the format `partners/[PARTNER_ID]/vendors/[VENDOR_ID]`.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Partners$Vendors$Customers$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListVendorCustomersResponse>;
    list(
      params: Params$Resource$Partners$Vendors$Customers$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListVendorCustomersResponse>,
      callback: BodyResponseCallback<Schema$ListVendorCustomersResponse>
    ): void;
    list(
      params: Params$Resource$Partners$Vendors$Customers$List,
      callback: BodyResponseCallback<Schema$ListVendorCustomersResponse>
    ): void;
    list(
      callback: BodyResponseCallback<Schema$ListVendorCustomersResponse>
    ): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Partners$Vendors$Customers$List
        | BodyResponseCallback<Schema$ListVendorCustomersResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListVendorCustomersResponse>,
      callback?: BodyResponseCallback<Schema$ListVendorCustomersResponse>
    ): void | GaxiosPromise<Schema$ListVendorCustomersResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Partners$Vendors$Customers$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Partners$Vendors$Customers$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
        options.rootUrl || 'https://androiddeviceprovisioning.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v1/{+parent}/customers').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
            method: 'GET',
          },
          options
        ),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context: this.context,
      };
      if (callback) {
        createAPIRequest<Schema$ListVendorCustomersResponse>(
          parameters,
          callback
        );
      } else {
        return createAPIRequest<Schema$ListVendorCustomersResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Partners$Vendors$Customers$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * The maximum number of results to be returned.
     */
    pageSize?: number;
    /**
     * A token identifying a page of results returned by the server.
     */
    pageToken?: string;
    /**
     * Required. The resource name in the format `partners/[PARTNER_ID]/vendors/[VENDOR_ID]`.
     */
    parent?: string;
  }
}
