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

export namespace jobs_v3 {
  export interface Options extends GlobalOptions {
    version: 'v3';
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
   * Cloud Talent Solution API
   *
   * Cloud Talent Solution provides the capability to create, read, update, and delete job postings, as well as search jobs based on keywords and filters.
   *
   * @example
   * const {google} = require('googleapis');
   * const jobs = google.jobs('v3');
   *
   * @namespace jobs
   * @type {Function}
   * @version v3
   * @variation v3
   * @param {object=} options Options for Jobs
   */
  export class Jobs {
    context: APIRequestContext;
    projects: Resource$Projects;

    constructor(options: GlobalOptions, google?: GoogleConfigurable) {
      this.context = {
        _options: options || {},
        google,
      };

      this.projects = new Resource$Projects(this.context);
    }
  }

  /**
   * Application related details of a job posting.
   */
  export interface Schema$ApplicationInfo {
    /**
     * Optional but at least one of uris, emails or instruction must be specified.  Use this field to specify email address(es) to which resumes or applications can be sent.  The maximum number of allowed characters for each entry is 255.
     */
    emails?: string[];
    /**
     * Optional but at least one of uris, emails or instruction must be specified.  Use this field to provide instructions, such as &quot;Mail your application to ...&quot;, that a candidate can follow to apply for the job.  This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags.  The maximum number of allowed characters is 3,000.
     */
    instruction?: string;
    /**
     * Optional but at least one of uris, emails or instruction must be specified.  Use this URI field to direct an applicant to a website, for example to link to an online application form.  The maximum number of allowed characters for each entry is 2,000.
     */
    uris?: string[];
  }
  /**
   * Input only.  Batch delete jobs request.
   */
  export interface Schema$BatchDeleteJobsRequest {
    /**
     * Required.  The filter string specifies the jobs to be deleted.  Supported operator: =, AND  The fields eligible for filtering are:  * `companyName` (Required) * `requisitionId` (Required)  Sample Query: companyName = &quot;projects/api-test-project/companies/123&quot; AND requisitionId = &quot;req-1&quot;
     */
    filter?: string;
  }
  /**
   * Represents count of jobs within one bucket.
   */
  export interface Schema$BucketizedCount {
    /**
     * Number of jobs whose numeric field value fall into `range`.
     */
    count?: number;
    /**
     * Bucket range on which histogram was performed for the numeric field, that is, the count represents number of jobs in this range.
     */
    range?: Schema$BucketRange;
  }
  /**
   * Represents starting and ending value of a range in double.
   */
  export interface Schema$BucketRange {
    /**
     * Starting value of the bucket range.
     */
    from?: number;
    /**
     * Ending value of the bucket range.
     */
    to?: number;
  }
  /**
   * An event issued when an end user interacts with the application that implements Cloud Talent Solution. Providing this information improves the quality of search and recommendation for the API clients, enabling the service to perform optimally. The number of events sent must be consistent with other calls, such as job searches, issued to the service by the client.
   */
  export interface Schema$ClientEvent {
    /**
     * Required.  The timestamp of the event.
     */
    createTime?: string;
    /**
     * Required.  A unique identifier, generated by the client application. This `event_id` is used to establish the relationship between different events (see parent_event_id).
     */
    eventId?: string;
    /**
     * Optional.  Extra information about this event. Used for storing information with no matching field in event payload, for example, user application specific context or details.  At most 20 keys are supported. The maximum total size of all keys and values is 2 KB.
     */
    extraInfo?: {[key: string]: string};
    /**
     * A event issued when a job seeker interacts with the application that implements Cloud Talent Solution.
     */
    jobEvent?: Schema$JobEvent;
    /**
     * Optional.  The event_id of an event that resulted in the current event. For example, a Job view event usually follows a parent impression event: A job seeker first does a search where a list of jobs appears (impression). The job seeker then selects a result and views the description of a particular job (Job view).
     */
    parentEventId?: string;
    /**
     * Required.  A unique ID generated in the API responses. It can be found in ResponseMetadata.request_id.
     */
    requestId?: string;
  }
  /**
   * Input only.  Parameters needed for commute search.
   */
  export interface Schema$CommuteFilter {
    /**
     * Optional. If true, jobs without &quot;precise&quot; addresses (street level addresses or GPS coordinates) might also be returned. For city and coarser level addresses, text matching is used. If this field is set to false or is not specified, only jobs that include precise addresses are returned by Commute Search.  Note: If `allow_imprecise_addresses` is set to true, Commute Search is not able to calculate accurate commute times to jobs with city level and coarser address information. Jobs with imprecise addresses will return a `travel_duration` time of 0 regardless of distance from the job seeker.
     */
    allowImpreciseAddresses?: boolean;
    /**
     * Required.  The method of transportation for which to calculate the commute time.
     */
    commuteMethod?: string;
    /**
     * Optional.  The departure time used to calculate traffic impact, represented as google.type.TimeOfDay in local time zone.  Currently traffic model is restricted to hour level resolution.
     */
    departureTime?: Schema$TimeOfDay;
    /**
     * Optional.  Specifies the traffic density to use when calculating commute time.
     */
    roadTraffic?: string;
    /**
     * Required.  The latitude and longitude of the location from which to calculate the commute time.
     */
    startCoordinates?: Schema$LatLng;
    /**
     * Required.  The maximum travel time in seconds. The maximum allowed value is `3600s` (one hour). Format is `123s`.
     */
    travelDuration?: string;
  }
  /**
   * Output only.  Commute details related to this job.
   */
  export interface Schema$CommuteInfo {
    /**
     * Location used as the destination in the commute calculation.
     */
    jobLocation?: Schema$Location;
    /**
     * The number of seconds required to travel to the job location from the query location. A duration of 0 seconds indicates that the job is not reachable within the requested duration, but was returned as part of an expanded query.
     */
    travelDuration?: string;
  }
  /**
   * A Company resource represents a company in the service. A company is the entity that owns job postings, that is, the hiring entity responsible for employing applicants for the job position.
   */
  export interface Schema$Company {
    /**
     * Optional.  The URI to employer&#39;s career site or careers page on the employer&#39;s web site, for example, &quot;https://careers.google.com&quot;.
     */
    careerSiteUri?: string;
    /**
     * Output only. Derived details about the company.
     */
    derivedInfo?: Schema$CompanyDerivedInfo;
    /**
     * Required.  The display name of the company, for example, &quot;Google, LLC&quot;.
     */
    displayName?: string;
    /**
     * Optional.  Equal Employment Opportunity legal disclaimer text to be associated with all jobs, and typically to be displayed in all roles.  The maximum number of allowed characters is 500.
     */
    eeoText?: string;
    /**
     * Required.  Client side company identifier, used to uniquely identify the company.  The maximum number of allowed characters is 255.
     */
    externalId?: string;
    /**
     * Optional.  The street address of the company&#39;s main headquarters, which may be different from the job location. The service attempts to geolocate the provided address, and populates a more specific location wherever possible in DerivedInfo.headquarters_location.
     */
    headquartersAddress?: string;
    /**
     * Optional.  Set to true if it is the hiring agency that post jobs for other employers.  Defaults to false if not provided.
     */
    hiringAgency?: boolean;
    /**
     * Optional.  A URI that hosts the employer&#39;s company logo.
     */
    imageUri?: string;
    /**
     * Optional.  A list of keys of filterable Job.custom_attributes, whose corresponding `string_values` are used in keyword search. Jobs with `string_values` under these specified field keys are returned if any of the values matches the search keyword. Custom field values with parenthesis, brackets and special symbols won&#39;t be properly searchable, and those keyword queries need to be surrounded by quotes.
     */
    keywordSearchableJobCustomAttributes?: string[];
    /**
     * Required during company update.  The resource name for a company. This is generated by the service when a company is created.  The format is &quot;projects/{project_id}/companies/{company_id}&quot;, for example, &quot;projects/api-test-project/companies/foo&quot;.
     */
    name?: string;
    /**
     * Optional.  The employer&#39;s company size.
     */
    size?: string;
    /**
     * Output only. Indicates whether a company is flagged to be suspended from public availability by the service when job content appears suspicious, abusive, or spammy.
     */
    suspended?: boolean;
    /**
     * Optional.  The URI representing the company&#39;s primary web site or home page, for example, &quot;https://www.google.com&quot;.  The maximum number of allowed characters is 255.
     */
    websiteUri?: string;
  }
  /**
   * Derived details about the company.
   */
  export interface Schema$CompanyDerivedInfo {
    /**
     * A structured headquarters location of the company, resolved from Company.hq_location if provided.
     */
    headquartersLocation?: Schema$Location;
  }
  /**
   * A compensation entry that represents one component of compensation, such as base pay, bonus, or other compensation type.  Annualization: One compensation entry can be annualized if - it contains valid amount or range. - and its expected_units_per_year is set or can be derived. Its annualized range is determined as (amount or range) times expected_units_per_year.
   */
  export interface Schema$CompensationEntry {
    /**
     * Optional.  Compensation amount.
     */
    amount?: Schema$Money;
    /**
     * Optional.  Compensation description.  For example, could indicate equity terms or provide additional context to an estimated bonus.
     */
    description?: string;
    /**
     * Optional.  Expected number of units paid each year. If not specified, when Job.employment_types is FULLTIME, a default value is inferred based on unit. Default values: - HOURLY: 2080 - DAILY: 260 - WEEKLY: 52 - MONTHLY: 12 - ANNUAL: 1
     */
    expectedUnitsPerYear?: number;
    /**
     * Optional.  Compensation range.
     */
    range?: Schema$CompensationRange;
    /**
     * Optional.  Compensation type.  Default is CompensationUnit.OTHER_COMPENSATION_TYPE.
     */
    type?: string;
    /**
     * Optional.  Frequency of the specified amount.  Default is CompensationUnit.OTHER_COMPENSATION_UNIT.
     */
    unit?: string;
  }
  /**
   * Input only.  Filter on job compensation type and amount.
   */
  export interface Schema$CompensationFilter {
    /**
     * Optional.  Whether to include jobs whose compensation range is unspecified.
     */
    includeJobsWithUnspecifiedCompensationRange?: boolean;
    /**
     * Optional.  Compensation range.
     */
    range?: Schema$CompensationRange;
    /**
     * Required.  Type of filter.
     */
    type?: string;
    /**
     * Required.  Specify desired `base compensation entry&#39;s` CompensationInfo.CompensationUnit.
     */
    units?: string[];
  }
  /**
   * Input only.  Compensation based histogram request.
   */
  export interface Schema$CompensationHistogramRequest {
    /**
     * Required.  Numeric histogram options, like buckets, whether include min or max value.
     */
    bucketingOption?: Schema$NumericBucketingOption;
    /**
     * Required.  Type of the request, representing which field the histogramming should be performed over. A single request can only specify one histogram of each `CompensationHistogramRequestType`.
     */
    type?: string;
  }
  /**
   * Output only.  Compensation based histogram result.
   */
  export interface Schema$CompensationHistogramResult {
    /**
     * Histogram result.
     */
    result?: Schema$NumericBucketingResult;
    /**
     * Type of the request, corresponding to CompensationHistogramRequest.type.
     */
    type?: string;
  }
  /**
   * Job compensation details.
   */
  export interface Schema$CompensationInfo {
    /**
     * Output only. Annualized base compensation range. Computed as base compensation entry&#39;s CompensationEntry.compensation times CompensationEntry.expected_units_per_year.  See CompensationEntry for explanation on compensation annualization.
     */
    annualizedBaseCompensationRange?: Schema$CompensationRange;
    /**
     * Output only. Annualized total compensation range. Computed as all compensation entries&#39; CompensationEntry.compensation times CompensationEntry.expected_units_per_year.  See CompensationEntry for explanation on compensation annualization.
     */
    annualizedTotalCompensationRange?: Schema$CompensationRange;
    /**
     * Optional.  Job compensation information.  At most one entry can be of type CompensationInfo.CompensationType.BASE, which is referred as ** base compensation entry ** for the job.
     */
    entries?: Schema$CompensationEntry[];
  }
  /**
   * Compensation range.
   */
  export interface Schema$CompensationRange {
    /**
     * Optional.  The maximum amount of compensation. If left empty, the value is set to a maximal compensation value and the currency code is set to match the currency code of min_compensation.
     */
    maxCompensation?: Schema$Money;
    /**
     * Optional.  The minimum amount of compensation. If left empty, the value is set to zero and the currency code is set to match the currency code of max_compensation.
     */
    minCompensation?: Schema$Money;
  }
  /**
   * Output only.  Response of auto-complete query.
   */
  export interface Schema$CompleteQueryResponse {
    /**
     * Results of the matching job/company candidates.
     */
    completionResults?: Schema$CompletionResult[];
    /**
     * Additional information for the API invocation, such as the request tracking id.
     */
    metadata?: Schema$ResponseMetadata;
  }
  /**
   * Output only.  Resource that represents completion results.
   */
  export interface Schema$CompletionResult {
    /**
     * The URI of the company image for CompletionType.COMPANY_NAME.
     */
    imageUri?: string;
    /**
     * The suggestion for the query.
     */
    suggestion?: string;
    /**
     * The completion topic.
     */
    type?: string;
  }
  /**
   * The report event request.
   */
  export interface Schema$CreateClientEventRequest {
    /**
     * Required.  Events issued when end user interacts with customer&#39;s application that uses Cloud Talent Solution.
     */
    clientEvent?: Schema$ClientEvent;
  }
  /**
   * Input only.  The Request of the CreateCompany method.
   */
  export interface Schema$CreateCompanyRequest {
    /**
     * Required.  The company to be created.
     */
    company?: Schema$Company;
  }
  /**
   * Input only.  Create job request.
   */
  export interface Schema$CreateJobRequest {
    /**
     * Required.  The Job to be created.
     */
    job?: Schema$Job;
  }
  /**
   * Custom attribute values that are either filterable or non-filterable.
   */
  export interface Schema$CustomAttribute {
    /**
     * Optional.  If the `filterable` flag is true, custom field values are searchable. If false, values are not searchable.  Default is false.
     */
    filterable?: boolean;
    /**
     * Optional but exactly one of string_values or long_values must be specified.  This field is used to perform number range search. (`EQ`, `GT`, `GE`, `LE`, `LT`) over filterable `long_value`.  Currently at most 1 long_values is supported.
     */
    longValues?: string[];
    /**
     * Optional but exactly one of string_values or long_values must be specified.  This field is used to perform a string match (`CASE_SENSITIVE_MATCH` or `CASE_INSENSITIVE_MATCH`) search. For filterable `string_value`s, a maximum total number of 200 values is allowed, with each `string_value` has a byte size of no more than 255B. For unfilterable `string_values`, the maximum total byte size of unfilterable `string_values` is 50KB.  Empty string is not allowed.
     */
    stringValues?: string[];
  }
  /**
   * Custom attributes histogram request. An error is thrown if neither string_value_histogram or long_value_histogram_bucketing_option has been defined.
   */
  export interface Schema$CustomAttributeHistogramRequest {
    /**
     * Required.  Specifies the custom field key to perform a histogram on. If specified without `long_value_histogram_bucketing_option`, histogram on string values of the given `key` is triggered, otherwise histogram is performed on long values.
     */
    key?: string;
    /**
     * Optional.  Specifies buckets used to perform a range histogram on Job&#39;s filterable long custom field values, or min/max value requirements.
     */
    longValueHistogramBucketingOption?: Schema$NumericBucketingOption;
    /**
     * Optional. If set to true, the response includes the histogram value for each key as a string.
     */
    stringValueHistogram?: boolean;
  }
  /**
   * Output only.  Custom attribute histogram result.
   */
  export interface Schema$CustomAttributeHistogramResult {
    /**
     * Stores the key of custom attribute the histogram is performed on.
     */
    key?: string;
    /**
     * Stores bucketed histogram counting result or min/max values for custom attribute long values associated with `key`.
     */
    longValueHistogramResult?: Schema$NumericBucketingResult;
    /**
     * Stores a map from the values of string custom field associated with `key` to the number of jobs with that value in this histogram result.
     */
    stringValueHistogramResult?: {[key: string]: number};
  }
  /**
   * Device information collected from the job seeker, candidate, or other entity conducting the job search. Providing this information improves the quality of the search results across devices.
   */
  export interface Schema$DeviceInfo {
    /**
     * Optional.  Type of the device.
     */
    deviceType?: string;
    /**
     * Optional.  A device-specific ID. The ID must be a unique identifier that distinguishes the device from other devices.
     */
    id?: string;
  }
  /**
   * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
   */
  export interface Schema$Empty {}
  /**
   * Input only.  Histogram facets to be specified in SearchJobsRequest.
   */
  export interface Schema$HistogramFacets {
    /**
     * Optional.  Specifies compensation field-based histogram requests. Duplicate values of CompensationHistogramRequest.type are not allowed.
     */
    compensationHistogramFacets?: Schema$CompensationHistogramRequest[];
    /**
     * Optional.  Specifies the custom attributes histogram requests. Duplicate values of CustomAttributeHistogramRequest.key are not allowed.
     */
    customAttributeHistogramFacets?: Schema$CustomAttributeHistogramRequest[];
    /**
     * Optional.  Specifies the simple type of histogram facets, for example, `COMPANY_SIZE`, `EMPLOYMENT_TYPE` etc.
     */
    simpleHistogramFacets?: string[];
  }
  /**
   * Output only.  Result of a histogram call. The response contains the histogram map for the search type specified by HistogramResult.field. The response is a map of each filter value to the corresponding count of jobs for that filter.
   */
  export interface Schema$HistogramResult {
    /**
     * The Histogram search filters.
     */
    searchType?: string;
    /**
     * A map from the values of field to the number of jobs with that value in this search result.  Key: search type (filter names, such as the companyName).  Values: the count of jobs that match the filter for this search.
     */
    values?: {[key: string]: number};
  }
  /**
   * Output only.  Histogram results that match HistogramFacets specified in SearchJobsRequest.
   */
  export interface Schema$HistogramResults {
    /**
     * Specifies compensation field-based histogram results that match HistogramFacets.compensation_histogram_requests.
     */
    compensationHistogramResults?: Schema$CompensationHistogramResult[];
    /**
     * Specifies histogram results for custom attributes that match HistogramFacets.custom_attribute_histogram_facets.
     */
    customAttributeHistogramResults?: Schema$CustomAttributeHistogramResult[];
    /**
     * Specifies histogram results that matches HistogramFacets.simple_histogram_facets.
     */
    simpleHistogramResults?: Schema$HistogramResult[];
  }
  /**
   * A Job resource represents a job posting (also referred to as a &quot;job listing&quot; or &quot;job requisition&quot;). A job belongs to a Company, which is the hiring entity responsible for the job.
   */
  export interface Schema$Job {
    /**
     * Optional but strongly recommended for the best service experience.  Location(s) where the employer is looking to hire for this job posting.  Specifying the full street address(es) of the hiring location enables better API results, especially job searches by commute time.  At most 50 locations are allowed for best search performance. If a job has more locations, it is suggested to split it into multiple jobs with unique requisition_ids (e.g. &#39;ReqA&#39; becomes &#39;ReqA-1&#39;, &#39;ReqA-2&#39;, etc.) as multiple jobs with the same company_name, language_code and requisition_id are not allowed. If the original requisition_id must be preserved, a custom field should be used for storage. It is also suggested to group the locations that close to each other in the same job for better search experience.  The maximum number of allowed characters is 500.
     */
    addresses?: string[];
    /**
     * Required. At least one field within ApplicationInfo must be specified.  Job application information.
     */
    applicationInfo?: Schema$ApplicationInfo;
    /**
     * Output only. Display name of the company listing the job.
     */
    companyDisplayName?: string;
    /**
     * Required.  The resource name of the company listing the job, such as &quot;projects/api-test-project/companies/foo&quot;.
     */
    companyName?: string;
    /**
     * Optional.  Job compensation information.
     */
    compensationInfo?: Schema$CompensationInfo;
    /**
     * Optional.  A map of fields to hold both filterable and non-filterable custom job attributes that are not covered by the provided structured fields.  The keys of the map are strings up to 64 bytes and must match the pattern: a-zA-Z*. For example, key0LikeThis or KEY_1_LIKE_THIS.  At most 100 filterable and at most 100 unfilterable keys are supported. For filterable `string_values`, across all keys at most 200 values are allowed, with each string no more than 255 characters. For unfilterable `string_values`, the maximum total size of `string_values` across all keys is 50KB.
     */
    customAttributes?: {[key: string]: Schema$CustomAttribute};
    /**
     * Optional.  The desired education degrees for the job, such as Bachelors, Masters.
     */
    degreeTypes?: string[];
    /**
     * Optional.  The department or functional area within the company with the open position.  The maximum number of allowed characters is 255.
     */
    department?: string;
    /**
     * Output only. Derived details about the job posting.
     */
    derivedInfo?: Schema$JobDerivedInfo;
    /**
     * Required.  The description of the job, which typically includes a multi-paragraph description of the company and related information. Separate fields are provided on the job object for responsibilities, qualifications, and other job characteristics. Use of these separate job fields is recommended.  This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags.  The maximum number of allowed characters is 100,000.
     */
    description?: string;
    /**
     * Optional.  The employment type(s) of a job, for example, full time or part time.
     */
    employmentTypes?: string[];
    /**
     * Optional.  A description of bonus, commission, and other compensation incentives associated with the job not including salary or pay.  The maximum number of allowed characters is 10,000.
     */
    incentives?: string;
    /**
     * Optional.  The benefits included with the job.
     */
    jobBenefits?: string[];
    /**
     * Optional.  The end timestamp of the job. Typically this field is used for contracting engagements. Invalid timestamps are ignored.
     */
    jobEndTime?: string;
    /**
     * Optional.  The experience level associated with the job, such as &quot;Entry Level&quot;.
     */
    jobLevel?: string;
    /**
     * Optional.  The start timestamp of the job in UTC time zone. Typically this field is used for contracting engagements. Invalid timestamps are ignored.
     */
    jobStartTime?: string;
    /**
     * Optional.  The language of the posting. This field is distinct from any requirements for fluency that are associated with the job.  Language codes must be in BCP-47 format, such as &quot;en-US&quot; or &quot;sr-Latn&quot;. For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47){: class=&quot;external&quot; target=&quot;_blank&quot; }.  If this field is unspecified and Job.description is present, detected language code based on Job.description is assigned, otherwise defaults to &#39;en_US&#39;.
     */
    languageCode?: string;
    /**
     * Required during job update.  The resource name for the job. This is generated by the service when a job is created.  The format is &quot;projects/{project_id}/jobs/{job_id}&quot;, for example, &quot;projects/api-test-project/jobs/1234&quot;.  Use of this field in job queries and API calls is preferred over the use of requisition_id since this value is unique.
     */
    name?: string;
    /**
     * Output only. The timestamp when this job posting was created.
     */
    postingCreateTime?: string;
    /**
     * Optional but strongly recommended for the best service experience.  The expiration timestamp of the job. After this timestamp, the job is marked as expired, and it no longer appears in search results. The expired job can&#39;t be deleted or listed by the DeleteJob and ListJobs APIs, but it can be retrieved with the GetJob API or updated with the UpdateJob API. An expired job can be updated and opened again by using a future expiration timestamp. Updating an expired job fails if there is another existing open job with same company_name, language_code and requisition_id.  The expired jobs are retained in our system for 90 days. However, the overall expired job count cannot exceed 3 times the maximum of open jobs count over the past week, otherwise jobs with earlier expire time are cleaned first. Expired jobs are no longer accessible after they are cleaned out.  Invalid timestamps are ignored, and treated as expire time not provided.  Timestamp before the instant request is made is considered valid, the job will be treated as expired immediately.  If this value is not provided at the time of job creation or is invalid, the job posting expires after 30 days from the job&#39;s creation time. For example, if the job was created on 2017/01/01 13:00AM UTC with an unspecified expiration date, the job expires after 2017/01/31 13:00AM UTC.  If this value is not provided on job update, it depends on the field masks set by UpdateJobRequest.update_mask. If the field masks include expiry_time, or the masks are empty meaning that every field is updated, the job posting expires after 30 days from the job&#39;s last update time. Otherwise the expiration date isn&#39;t updated.
     */
    postingExpireTime?: string;
    /**
     * Optional.  The timestamp this job posting was most recently published. The default value is the time the request arrives at the server. Invalid timestamps are ignored.
     */
    postingPublishTime?: string;
    /**
     * Optional.  The job PostingRegion (for example, state, country) throughout which the job is available. If this field is set, a LocationFilter in a search query within the job region finds this job posting if an exact location match isn&#39;t specified. If this field is set to PostingRegion.NATION or PostingRegion.ADMINISTRATIVE_AREA, setting job Job.addresses to the same location level as this field is strongly recommended.
     */
    postingRegion?: string;
    /**
     * Output only. The timestamp when this job posting was last updated.
     */
    postingUpdateTime?: string;
    /**
     * Optional.  Options for job processing.
     */
    processingOptions?: Schema$ProcessingOptions;
    /**
     * Optional.  A promotion value of the job, as determined by the client. The value determines the sort order of the jobs returned when searching for jobs using the featured jobs search call, with higher promotional values being returned first and ties being resolved by relevance sort. Only the jobs with a promotionValue &gt;0 are returned in a FEATURED_JOB_SEARCH.  Default value is 0, and negative values are treated as 0.
     */
    promotionValue?: number;
    /**
     * Optional.  A description of the qualifications required to perform the job. The use of this field is recommended as an alternative to using the more general description field.  This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags.  The maximum number of allowed characters is 10,000.
     */
    qualifications?: string;
    /**
     * Required.  The requisition ID, also referred to as the posting ID, assigned by the client to identify a job. This field is intended to be used by clients for client identification and tracking of postings. A job is not allowed to be created if there is another job with the same [company_name], language_code and requisition_id.  The maximum number of allowed characters is 255.
     */
    requisitionId?: string;
    /**
     * Optional.  A description of job responsibilities. The use of this field is recommended as an alternative to using the more general description field.  This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags.  The maximum number of allowed characters is 10,000.
     */
    responsibilities?: string;
    /**
     * Required.  The title of the job, such as &quot;Software Engineer&quot;  The maximum number of allowed characters is 500.
     */
    title?: string;
    /**
     * Optional.  The visibility of the job.  Defaults to Visibility.ACCOUNT_ONLY if not specified.
     */
    visibility?: string;
  }
  /**
   * Output only.  Derived details about the job posting.
   */
  export interface Schema$JobDerivedInfo {
    /**
     * Job categories derived from Job.title and Job.description.
     */
    jobCategories?: string[];
    /**
     * Structured locations of the job, resolved from Job.addresses.  locations are exactly matched to Job.addresses in the same order.
     */
    locations?: Schema$Location[];
  }
  /**
   * An event issued when a job seeker interacts with the application that implements Cloud Talent Solution.
   */
  export interface Schema$JobEvent {
    /**
     * Required.  The job name(s) associated with this event. For example, if this is an impression event, this field contains the identifiers of all jobs shown to the job seeker. If this was a view event, this field contains the identifier of the viewed job.
     */
    jobs?: string[];
    /**
     * Required.  The type of the event (see JobEventType).
     */
    type?: string;
  }
  /**
   * Input only.  The query required to perform a search query.
   */
  export interface Schema$JobQuery {
    /**
     * Optional.   Allows filtering jobs by commute time with different travel methods (for  example, driving or public transit). Note: This only works with COMMUTE  MODE. When specified, [JobQuery.location_filters] is  ignored.   Currently we don&#39;t support sorting by commute time.
     */
    commuteFilter?: Schema$CommuteFilter;
    /**
     * Optional.  This filter specifies the exact company display name of the jobs to search against.  If a value isn&#39;t specified, jobs within the search results are associated with any company.  If multiple values are specified, jobs within the search results may be associated with any of the specified companies.  At most 20 company display name filters are allowed.
     */
    companyDisplayNames?: string[];
    /**
     * Optional.  This filter specifies the company entities to search against.  If a value isn&#39;t specified, jobs are searched for against all companies.  If multiple values are specified, jobs are searched against the companies specified.  The format is &quot;projects/{project_id}/companies/{company_id}&quot;, for example, &quot;projects/api-test-project/companies/foo&quot;.  At most 20 company filters are allowed.
     */
    companyNames?: string[];
    /**
     * Optional.  This search filter is applied only to Job.compensation_info. For example, if the filter is specified as &quot;Hourly job with per-hour compensation &gt; $15&quot;, only jobs meeting these criteria are searched. If a filter isn&#39;t defined, all open jobs are searched.
     */
    compensationFilter?: Schema$CompensationFilter;
    /**
     * Optional.  This filter specifies a structured syntax to match against the Job.custom_attributes marked as `filterable`.  The syntax for this expression is a subset of SQL syntax.  Supported operators are: `=`, `!=`, `&lt;`, `&lt;=`, `&gt;`, and `&gt;=` where the left of the operator is a custom field key and the right of the operator is a number or a quoted string. You must escape backslash (\\) and quote (\&quot;) characters.  Supported functions are `LOWER([field_name])` to perform a case insensitive match and `EMPTY([field_name])` to filter on the existence of a key.  Boolean expressions (AND/OR/NOT) are supported up to 3 levels of nesting (for example, &quot;((A AND B AND C) OR NOT D) AND E&quot;), a maximum of 100 comparisons or functions are allowed in the expression. The expression must be &lt; 3000 bytes in length.  Sample Query: `(LOWER(driving_license)=&quot;class \&quot;a\&quot;&quot; OR EMPTY(driving_license)) AND driving_years &gt; 10`
     */
    customAttributeFilter?: string;
    /**
     * Optional.  This flag controls the spell-check feature. If false, the service attempts to correct a misspelled query, for example, &quot;enginee&quot; is corrected to &quot;engineer&quot;.  Defaults to false: a spell check is performed.
     */
    disableSpellCheck?: boolean;
    /**
     * Optional.  The employment type filter specifies the employment type of jobs to search against, such as EmploymentType.FULL_TIME.  If a value is not specified, jobs in the search results includes any employment type.  If multiple values are specified, jobs in the search results include any of the specified employment types.
     */
    employmentTypes?: string[];
    /**
     * Optional.  The category filter specifies the categories of jobs to search against. See Category for more information.  If a value is not specified, jobs from any category are searched against.  If multiple values are specified, jobs from any of the specified categories are searched against.
     */
    jobCategories?: string[];
    /**
     * Optional.  This filter specifies the locale of jobs to search against, for example, &quot;en-US&quot;.  If a value isn&#39;t specified, the search results can contain jobs in any locale.   Language codes should be in BCP-47 format, such as &quot;en-US&quot; or &quot;sr-Latn&quot;. For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47).  At most 10 language code filters are allowed.
     */
    languageCodes?: string[];
    /**
     * Optional.  The location filter specifies geo-regions containing the jobs to search against. See LocationFilter for more information.  If a location value isn&#39;t specified, jobs fitting the other search criteria are retrieved regardless of where they&#39;re located.  If multiple values are specified, jobs are retrieved from any of the specified locations. If different values are specified for the LocationFilter.distance_in_miles parameter, the maximum provided distance is used for all locations.  At most 5 location filters are allowed.
     */
    locationFilters?: Schema$LocationFilter[];
    /**
     * Optional.  Jobs published within a range specified by this filter are searched against.
     */
    publishTimeRange?: Schema$TimestampRange;
    /**
     * Optional.  The query string that matches against the job title, description, and location fields.  The maximum number of allowed characters is 255.
     */
    query?: string;
  }
  /**
   * An object representing a latitude/longitude pair. This is expressed as a pair of doubles representing degrees latitude and degrees longitude. Unless specified otherwise, this must conform to the &lt;a href=&quot;http://www.unoosa.org/pdf/icg/2012/template/WGS_84.pdf&quot;&gt;WGS84 standard&lt;/a&gt;. Values must be within normalized ranges.
   */
  export interface Schema$LatLng {
    /**
     * The latitude in degrees. It must be in the range [-90.0, +90.0].
     */
    latitude?: number;
    /**
     * The longitude in degrees. It must be in the range [-180.0, +180.0].
     */
    longitude?: number;
  }
  /**
   * Output only.  The List companies response object.
   */
  export interface Schema$ListCompaniesResponse {
    /**
     * Companies for the current client.
     */
    companies?: Schema$Company[];
    /**
     * Additional information for the API invocation, such as the request tracking id.
     */
    metadata?: Schema$ResponseMetadata;
    /**
     * A token to retrieve the next page of results.
     */
    nextPageToken?: string;
  }
  /**
   * Output only.  List jobs response.
   */
  export interface Schema$ListJobsResponse {
    /**
     * The Jobs for a given company.  The maximum number of items returned is based on the limit field provided in the request.
     */
    jobs?: Schema$Job[];
    /**
     * Additional information for the API invocation, such as the request tracking id.
     */
    metadata?: Schema$ResponseMetadata;
    /**
     * A token to retrieve the next page of results.
     */
    nextPageToken?: string;
  }
  /**
   * Output only.  A resource that represents a location with full geographic information.
   */
  export interface Schema$Location {
    /**
     * An object representing a latitude/longitude pair.
     */
    latLng?: Schema$LatLng;
    /**
     * The type of a location, which corresponds to the address lines field of PostalAddress. For example, &quot;Downtown, Atlanta, GA, USA&quot; has a type of LocationType#NEIGHBORHOOD, and &quot;Kansas City, KS, USA&quot; has a type of LocationType#LOCALITY.
     */
    locationType?: string;
    /**
     * Postal address of the location that includes human readable information, such as postal delivery and payments addresses. Given a postal address, a postal service can deliver items to a premises, P.O. Box, or other delivery location.
     */
    postalAddress?: Schema$PostalAddress;
    /**
     * Radius in miles of the job location. This value is derived from the location bounding box in which a circle with the specified radius centered from LatLng covers the area associated with the job location. For example, currently, &quot;Mountain View, CA, USA&quot; has a radius of 6.17 miles.
     */
    radiusInMiles?: number;
  }
  /**
   * Input only.  Geographic region of the search.
   */
  export interface Schema$LocationFilter {
    /**
     * Optional.  The address name, such as &quot;Mountain View&quot; or &quot;Bay Area&quot;.
     */
    address?: string;
    /**
     * Optional.   The distance_in_miles is applied when the location being searched for is identified as a city or smaller. When the location being searched for is a state or larger, this field is ignored.
     */
    distanceInMiles?: number;
    /**
     * Optional.  The latitude and longitude of the geographic center from which to search. This field&#39;s ignored if `address` is provided.
     */
    latLng?: Schema$LatLng;
    /**
     * Optional.  CLDR region code of the country/region of the address. This is used to address ambiguity of the user-input location, for example, &quot;Liverpool&quot; against &quot;Liverpool, NY, US&quot; or &quot;Liverpool, UK&quot;.  Set this field if all the jobs to search against are from a same region, or jobs are world-wide, but the job seeker is from a specific region.  See http://cldr.unicode.org/ and http://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: &quot;CH&quot; for Switzerland.
     */
    regionCode?: string;
    /**
     * Optional.  Allows the client to return jobs without a set location, specifically, telecommuting jobs (telecomuting is considered by the service as a special location. Job.posting_region indicates if a job permits telecommuting. If this field is set to TelecommutePreference.TELECOMMUTE_ALLOWED, telecommuting jobs are searched, and address and lat_lng are ignored. If not set or set to TelecommutePreference.TELECOMMUTE_EXCLUDED, telecommute job are not searched.  This filter can be used by itself to search exclusively for telecommuting jobs, or it can be combined with another location filter to search for a combination of job locations, such as &quot;Mountain View&quot; or &quot;telecommuting&quot; jobs. However, when used in combination with other location filters, telecommuting jobs can be treated as less relevant than other jobs in the search response.
     */
    telecommutePreference?: string;
  }
  /**
   * Output only.  Job entry with metadata inside SearchJobsResponse.
   */
  export interface Schema$MatchingJob {
    /**
     * Commute information which is generated based on specified  CommuteFilter.
     */
    commuteInfo?: Schema$CommuteInfo;
    /**
     * Job resource that matches the specified SearchJobsRequest.
     */
    job?: Schema$Job;
    /**
     * A summary of the job with core information that&#39;s displayed on the search results listing page.
     */
    jobSummary?: string;
    /**
     * Contains snippets of text from the Job.job_title field most closely matching a search query&#39;s keywords, if available. The matching query keywords are enclosed in HTML bold tags.
     */
    jobTitleSnippet?: string;
    /**
     * Contains snippets of text from the Job.description and similar fields that most closely match a search query&#39;s keywords, if available. All HTML tags in the original fields are stripped when returned in this field, and matching query keywords are enclosed in HTML bold tags.
     */
    searchTextSnippet?: string;
  }
  /**
   * Represents an amount of money with its currency type.
   */
  export interface Schema$Money {
    /**
     * The 3-letter currency code defined in ISO 4217.
     */
    currencyCode?: string;
    /**
     * Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.
     */
    nanos?: number;
    /**
     * The whole units of the amount. For example if `currencyCode` is `&quot;USD&quot;`, then 1 unit is one US dollar.
     */
    units?: string;
  }
  /**
   * Input only.  Use this field to specify bucketing option for the histogram search response.
   */
  export interface Schema$NumericBucketingOption {
    /**
     * Required.  Two adjacent values form a histogram bucket. Values should be in ascending order. For example, if [5, 10, 15] are provided, four buckets are created: (-inf, 5), 5, 10), [10, 15), [15, inf). At most 20 [buckets_bound is supported.
     */
    bucketBounds?: number[];
    /**
     * Optional.  If set to true, the histogram result includes minimum/maximum value of the numeric field.
     */
    requiresMinMax?: boolean;
  }
  /**
   * Output only.  Custom numeric bucketing result.
   */
  export interface Schema$NumericBucketingResult {
    /**
     * Count within each bucket. Its size is the length of NumericBucketingOption.bucket_bounds plus 1.
     */
    counts?: Schema$BucketizedCount[];
    /**
     * Stores the maximum value of the numeric field. Is populated only if [NumericBucketingOption.requires_min_max] is set to true.
     */
    maxValue?: number;
    /**
     * Stores the minimum value of the numeric field. Will be populated only if [NumericBucketingOption.requires_min_max] is set to true.
     */
    minValue?: number;
  }
  /**
   * Represents a postal address, e.g. for postal delivery or payments addresses. Given a postal address, a postal service can deliver items to a premise, P.O. Box or similar. It is not intended to model geographical locations (roads, towns, mountains).  In typical usage an address would be created via user input or from importing existing data, depending on the type of process.  Advice on address input / editing:  - Use an i18n-ready address widget such as    https://github.com/googlei18n/libaddressinput) - Users should not be presented with UI elements for input or editing of   fields outside countries where that field is used.  For more guidance on how to use this schema, please see: https://support.google.com/business/answer/6397478
   */
  export interface Schema$PostalAddress {
    /**
     * Unstructured address lines describing the lower levels of an address.  Because values in address_lines do not have type information and may sometimes contain multiple values in a single field (e.g. &quot;Austin, TX&quot;), it is important that the line order is clear. The order of address lines should be &quot;envelope order&quot; for the country/region of the address. In places where this can vary (e.g. Japan), address_language is used to make it explicit (e.g. &quot;ja&quot; for large-to-small ordering and &quot;ja-Latn&quot; or &quot;en&quot; for small-to-large). This way, the most specific line of an address can be selected based on the language.  The minimum permitted structural representation of an address consists of a region_code with all remaining information placed in the address_lines. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved.  Creating an address only containing a region_code and address_lines, and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).
     */
    addressLines?: string[];
    /**
     * Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. Specifically, for Spain this is the province and not the autonomous community (e.g. &quot;Barcelona&quot; and not &quot;Catalonia&quot;). Many countries don&#39;t use an administrative area in postal addresses. E.g. in Switzerland this should be left unpopulated.
     */
    administrativeArea?: string;
    /**
     * Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address&#39; country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations.  If this value is not known, it should be omitted (rather than specifying a possibly incorrect default).  Examples: &quot;zh-Hant&quot;, &quot;ja&quot;, &quot;ja-Latn&quot;, &quot;en&quot;.
     */
    languageCode?: string;
    /**
     * Optional. Generally refers to the city/town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave locality empty and use address_lines.
     */
    locality?: string;
    /**
     * Optional. The name of the organization at the address.
     */
    organization?: string;
    /**
     * Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (e.g. state/zip validation in the U.S.A.).
     */
    postalCode?: string;
    /**
     * Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain &quot;care of&quot; information.
     */
    recipients?: string[];
    /**
     * Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See http://cldr.unicode.org/ and http://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: &quot;CH&quot; for Switzerland.
     */
    regionCode?: string;
    /**
     * The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision.  All new revisions **must** be backward compatible with old revisions.
     */
    revision?: number;
    /**
     * Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like &quot;CEDEX&quot;, optionally followed by a number (e.g. &quot;CEDEX 7&quot;), or just a number alone, representing the &quot;sector code&quot; (Jamaica), &quot;delivery area indicator&quot; (Malawi) or &quot;post office indicator&quot; (e.g. C??te d&#39;Ivoire).
     */
    sortingCode?: string;
    /**
     * Optional. Sublocality of the address. For example, this can be neighborhoods, boroughs, districts.
     */
    sublocality?: string;
  }
  /**
   * Input only.  Options for job processing.
   */
  export interface Schema$ProcessingOptions {
    /**
     * Optional.  If set to `true`, the service does not attempt to resolve a more precise address for the job.
     */
    disableStreetAddressResolution?: boolean;
    /**
     * Optional.  Option for job HTML content sanitization. Applied fields are:  * description * applicationInfo.instruction * incentives * qualifications * responsibilities  HTML tags in these fields may be stripped if sanitiazation is not disabled.  Defaults to HtmlSanitization.SIMPLE_FORMATTING_ONLY.
     */
    htmlSanitization?: string;
  }
  /**
   * Input only.  Meta information related to the job searcher or entity conducting the job search. This information is used to improve the performance of the service.
   */
  export interface Schema$RequestMetadata {
    /**
     * Optional.  The type of device used by the job seeker at the time of the call to the service.
     */
    deviceInfo?: Schema$DeviceInfo;
    /**
     * Required.  The client-defined scope or source of the service call, which typically is the domain on which the service has been implemented and is currently being run.  For example, if the service is being run by client &lt;em&gt;Foo, Inc.&lt;/em&gt;, on job board www.foo.com and career site www.bar.com, then this field is set to &quot;foo.com&quot; for use on the job board, and &quot;bar.com&quot; for use on the career site.  If this field isn&#39;t available for some reason, send &quot;UNKNOWN&quot;. Any improvements to the model for a particular tenant site rely on this field being set correctly to a domain.  The maximum number of allowed characters is 255.
     */
    domain?: string;
    /**
     * Required.  A unique session identification string. A session is defined as the duration of an end user&#39;s interaction with the service over a certain period. Obfuscate this field for privacy concerns before providing it to the service.  If this field is not available for some reason, send &quot;UNKNOWN&quot;. Note that any improvements to the model for a particular tenant site, rely on this field being set correctly to some unique session_id.  The maximum number of allowed characters is 255.
     */
    sessionId?: string;
    /**
     * Required.  A unique user identification string, as determined by the client. To have the strongest positive impact on search quality make sure the client-level is unique. Obfuscate this field for privacy concerns before providing it to the service.  If this field is not available for some reason, send &quot;UNKNOWN&quot;. Note that any improvements to the model for a particular tenant site, rely on this field being set correctly to a unique user_id.  The maximum number of allowed characters is 255.
     */
    userId?: string;
  }
  /**
   * Output only.  Additional information returned to client, such as debugging information.
   */
  export interface Schema$ResponseMetadata {
    /**
     * A unique id associated with this call. This id is logged for tracking purposes.
     */
    requestId?: string;
  }
  /**
   * Input only.  The Request body of the `SearchJobs` call.
   */
  export interface Schema$SearchJobsRequest {
    /**
     * Optional.  Controls whether to disable exact keyword match on Job.job_title, Job.description, Job.company_display_name, Job.locations, Job.qualifications. When disable keyword match is turned off, a keyword match returns jobs that do not match given category filters when there are matching keywords. For example, the query &quot;program manager,&quot; a result is returned even if the job posting has the title &quot;software developer,&quot; which does not fall into &quot;program manager&quot; ontology, but does have &quot;program manager&quot; appearing in its description.  For queries like &quot;cloud&quot; that does not contain title or location specific ontology, jobs with &quot;cloud&quot; keyword matches are returned regardless of this flag&#39;s value.  Please use Company.keyword_searchable_custom_fields or Company.keyword_searchable_custom_attributes if company specific globally matched custom field/attribute string values is needed. Enabling keyword match improves recall of subsequent search requests.  Defaults to false.
     */
    disableKeywordMatch?: boolean;
    /**
     * Optional.  Controls whether highly similar jobs are returned next to each other in the search results. Jobs are identified as highly similar based on their titles, job categories, and locations. Highly similar results are clustered so that only one representative job of the cluster is displayed to the job seeker higher up in the results, with the other jobs being displayed lower down in the results.  Defaults to DiversificationLevel.SIMPLE if no value is specified.
     */
    diversificationLevel?: string;
    /**
     * Optional.  Controls whether to broaden the search when it produces sparse results. Broadened queries append results to the end of the matching results list.  Defaults to false.
     */
    enableBroadening?: boolean;
    /**
     * Optional.  Histogram requests for jobs matching JobQuery.
     */
    histogramFacets?: Schema$HistogramFacets;
    /**
     * Optional.  Query used to search against jobs, such as keyword, location filters, etc.
     */
    jobQuery?: Schema$JobQuery;
    /**
     * Optional.  The desired job attributes returned for jobs in the search response. Defaults to JobView.SMALL if no value is specified.
     */
    jobView?: string;
    /**
     * Optional.  An integer that specifies the current offset (that is, starting result location, amongst the jobs deemed by the API as relevant) in search results. This field is only considered if page_token is unset.  For example, 0 means to  return results starting from the first matching job, and 10 means to return from the 11th job. This can be used for pagination, (for example, pageSize = 10 and offset = 10 means to return from the second page).
     */
    offset?: number;
    /**
     * Optional.  The criteria determining how search results are sorted. Default is &quot;relevance desc&quot;.  Supported options are:  * &quot;relevance desc&quot;: By relevance descending, as determined by the API algorithms. Relevance thresholding of query results is only available with this ordering. * &quot;posting`_`publish`_`time desc&quot;: By Job.posting_publish_time descending. * &quot;posting`_`update`_`time desc&quot;: By Job.posting_update_time descending. * &quot;title&quot;: By Job.title ascending. * &quot;title desc&quot;: By Job.title descending. * &quot;annualized`_`base`_`compensation&quot;: By job&#39;s CompensationInfo.annualized_base_compensation_range ascending. Jobs whose annualized base compensation is unspecified are put at the end of search results. * &quot;annualized`_`base`_`compensation desc&quot;: By job&#39;s CompensationInfo.annualized_base_compensation_range descending. Jobs whose annualized base compensation is unspecified are put at the end of search results. * &quot;annualized`_`total`_`compensation&quot;: By job&#39;s CompensationInfo.annualized_total_compensation_range ascending. Jobs whose annualized base compensation is unspecified are put at the end of search results. * &quot;annualized`_`total`_`compensation desc&quot;: By job&#39;s CompensationInfo.annualized_total_compensation_range descending. Jobs whose annualized base compensation is unspecified are put at the end of search results.
     */
    orderBy?: string;
    /**
     * Optional.  A limit on the number of jobs returned in the search results. Increasing this value above the default value of 10 can increase search response time. The value can be between 1 and 100.
     */
    pageSize?: number;
    /**
     * Optional.  The token specifying the current offset within search results. See SearchJobsResponse.next_page_token for an explanation of how to obtain the next set of query results.
     */
    pageToken?: string;
    /**
     * Required.  The meta information collected about the job searcher, used to improve the search quality of the service.. The identifiers, (such as `user_id`) are provided by users, and must be unique and consistent.
     */
    requestMetadata?: Schema$RequestMetadata;
    /**
     * Optional.  Controls if the search job request requires the return of a precise count of the first 300 results. Setting this to `true` ensures consistency in the number of results per page. Best practice is to set this value to true if a client allows users to jump directly to a non-sequential search results page.  Enabling this flag may adversely impact performance.  Defaults to false.
     */
    requirePreciseResultSize?: boolean;
    /**
     * Optional.  Mode of a search.  Defaults to SearchMode.JOB_SEARCH.
     */
    searchMode?: string;
  }
  /**
   * Output only.  Response for SearchJob method.
   */
  export interface Schema$SearchJobsResponse {
    /**
     * If query broadening is enabled, we may append additional results from the broadened query. This number indicates how many of the jobs returned in the jobs field are from the broadened query. These results are always at the end of the jobs list. In particular, a value of 0, or if the field isn&#39;t set, all the jobs in the jobs list are from the original (without broadening) query. If this field is non-zero, subsequent requests with offset after this result set should contain all broadened results.
     */
    broadenedQueryJobsCount?: number;
    /**
     * An estimation of the number of jobs that match the specified query.  This number is not guaranteed to be accurate. For accurate results, see enable_precise_result_size.
     */
    estimatedTotalSize?: number;
    /**
     * The histogram results that match specified SearchJobsRequest.histogram_facets.
     */
    histogramResults?: Schema$HistogramResults;
    /**
     * The location filters that the service applied to the specified query. If any filters are lat-lng based, the JobLocation.location_type is JobLocation.LocationType#LOCATION_TYPE_UNSPECIFIED.
     */
    locationFilters?: Schema$Location[];
    /**
     * The Job entities that match the specified SearchJobsRequest.
     */
    matchingJobs?: Schema$MatchingJob[];
    /**
     * Additional information for the API invocation, such as the request tracking id.
     */
    metadata?: Schema$ResponseMetadata;
    /**
     * The token that specifies the starting position of the next page of results. This field is empty if there are no more results.
     */
    nextPageToken?: string;
    /**
     * The spell checking result, and correction.
     */
    spellCorrection?: Schema$SpellingCorrection;
    /**
     * The precise result count, which is available only if the client set enable_precise_result_size to `true`, or if the response is the last page of results. Otherwise, the value is `-1`.
     */
    totalSize?: number;
  }
  /**
   * Output only.  Spell check result.
   */
  export interface Schema$SpellingCorrection {
    /**
     * Indicates if the query was corrected by the spell checker.
     */
    corrected?: boolean;
    /**
     * Correction output consisting of the corrected keyword string.
     */
    correctedText?: string;
  }
  /**
   * Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
   */
  export interface Schema$TimeOfDay {
    /**
     * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose to allow the value &quot;24:00:00&quot; for scenarios like business closing time.
     */
    hours?: number;
    /**
     * Minutes of hour of day. Must be from 0 to 59.
     */
    minutes?: number;
    /**
     * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
     */
    nanos?: number;
    /**
     * Seconds of minutes of the time. Must normally be from 0 to 59. An API may allow the value 60 if it allows leap-seconds.
     */
    seconds?: number;
  }
  /**
   * Message representing a period of time between two timestamps.
   */
  export interface Schema$TimestampRange {
    /**
     * End of the period.
     */
    endTime?: string;
    /**
     * Begin of the period.
     */
    startTime?: string;
  }
  /**
   * Input only.  Request for updating a specified company.
   */
  export interface Schema$UpdateCompanyRequest {
    /**
     * Required.  The company resource to replace the current resource in the system.
     */
    company?: Schema$Company;
    /**
     * Optional but strongly recommended for the best service experience.  If update_mask is provided, only the specified fields in company are updated. Otherwise all the fields are updated.  A field mask to specify the company fields to be updated. Only top level fields of Company are supported.
     */
    updateMask?: string;
  }
  /**
   * Input only.  Update job request.
   */
  export interface Schema$UpdateJobRequest {
    /**
     * Required.  The Job to be updated.
     */
    job?: Schema$Job;
    /**
     * Optional but strongly recommended to be provided for the best service experience.  If update_mask is provided, only the specified fields in job are updated. Otherwise all the fields are updated.  A field mask to restrict the fields that are updated. Only top level fields of Job are supported.
     */
    updateMask?: string;
  }

  export class Resource$Projects {
    context: APIRequestContext;
    clientEvents: Resource$Projects$Clientevents;
    companies: Resource$Projects$Companies;
    jobs: Resource$Projects$Jobs;
    constructor(context: APIRequestContext) {
      this.context = context;
      this.clientEvents = new Resource$Projects$Clientevents(this.context);
      this.companies = new Resource$Projects$Companies(this.context);
      this.jobs = new Resource$Projects$Jobs(this.context);
    }

    /**
     * jobs.projects.complete
     * @desc Completes the specified prefix with keyword suggestions. Intended for use by a job search auto-complete search box.
     * @alias jobs.projects.complete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.companyName Optional.  If provided, restricts completion to specified company.  The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo".
     * @param {string=} params.languageCode Deprecated. Use language_codes instead.  Optional.  The language of the query. This is the BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47).  For CompletionType.JOB_TITLE type, only open jobs with the same language_code are returned.  For CompletionType.COMPANY_NAME type, only companies having open jobs with the same language_code are returned.  For CompletionType.COMBINED type, only open jobs with the same language_code or companies having open jobs with the same language_code are returned.  The maximum number of allowed characters is 255.
     * @param {string=} params.languageCodes Optional.  The list of languages of the query. This is the BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47).  For CompletionType.JOB_TITLE type, only open jobs with the same language_codes are returned.  For CompletionType.COMPANY_NAME type, only companies having open jobs with the same language_codes are returned.  For CompletionType.COMBINED type, only open jobs with the same language_codes or companies having open jobs with the same language_codes are returned.  The maximum number of allowed characters is 255.
     * @param {string} params.name Required.  Resource name of project the completion is performed within.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     * @param {integer=} params.pageSize Required.  Completion result count.  The maximum allowed page size is 10.
     * @param {string=} params.query Required.  The query used to generate suggestions.  The maximum number of allowed characters is 255.
     * @param {string=} params.scope Optional.  The scope of the completion. The defaults is CompletionScope.PUBLIC.
     * @param {string=} params.type Optional.  The completion topic. The default is CompletionType.COMBINED.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    complete(
      params?: Params$Resource$Projects$Complete,
      options?: MethodOptions
    ): GaxiosPromise<Schema$CompleteQueryResponse>;
    complete(
      params: Params$Resource$Projects$Complete,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$CompleteQueryResponse>,
      callback: BodyResponseCallback<Schema$CompleteQueryResponse>
    ): void;
    complete(
      params: Params$Resource$Projects$Complete,
      callback: BodyResponseCallback<Schema$CompleteQueryResponse>
    ): void;
    complete(
      callback: BodyResponseCallback<Schema$CompleteQueryResponse>
    ): void;
    complete(
      paramsOrCallback?:
        | Params$Resource$Projects$Complete
        | BodyResponseCallback<Schema$CompleteQueryResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$CompleteQueryResponse>,
      callback?: BodyResponseCallback<Schema$CompleteQueryResponse>
    ): void | GaxiosPromise<Schema$CompleteQueryResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Complete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Complete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+name}:complete').replace(
              /([^:]\/)\/+/g,
              '$1'
            ),
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
        createAPIRequest<Schema$CompleteQueryResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$CompleteQueryResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Projects$Complete
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Optional.  If provided, restricts completion to specified company.  The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo".
     */
    companyName?: string;
    /**
     * Deprecated. Use language_codes instead.  Optional.  The language of the query. This is the BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47).  For CompletionType.JOB_TITLE type, only open jobs with the same language_code are returned.  For CompletionType.COMPANY_NAME type, only companies having open jobs with the same language_code are returned.  For CompletionType.COMBINED type, only open jobs with the same language_code or companies having open jobs with the same language_code are returned.  The maximum number of allowed characters is 255.
     */
    languageCode?: string;
    /**
     * Optional.  The list of languages of the query. This is the BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47).  For CompletionType.JOB_TITLE type, only open jobs with the same language_codes are returned.  For CompletionType.COMPANY_NAME type, only companies having open jobs with the same language_codes are returned.  For CompletionType.COMBINED type, only open jobs with the same language_codes or companies having open jobs with the same language_codes are returned.  The maximum number of allowed characters is 255.
     */
    languageCodes?: string[];
    /**
     * Required.  Resource name of project the completion is performed within.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     */
    name?: string;
    /**
     * Required.  Completion result count.  The maximum allowed page size is 10.
     */
    pageSize?: number;
    /**
     * Required.  The query used to generate suggestions.  The maximum number of allowed characters is 255.
     */
    query?: string;
    /**
     * Optional.  The scope of the completion. The defaults is CompletionScope.PUBLIC.
     */
    scope?: string;
    /**
     * Optional.  The completion topic. The default is CompletionType.COMBINED.
     */
    type?: string;
  }

  export class Resource$Projects$Clientevents {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * jobs.projects.clientEvents.create
     * @desc Report events issued when end user interacts with customer's application that uses Cloud Talent Solution. You may inspect the created events in [self service tools](https://console.cloud.google.com/talent-solution/overview). [Learn more](https://cloud.google.com/talent-solution/docs/management-tools) about self service tools.
     * @alias jobs.projects.clientEvents.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Parent project name.
     * @param {().CreateClientEventRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Projects$Clientevents$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ClientEvent>;
    create(
      params: Params$Resource$Projects$Clientevents$Create,
      options: MethodOptions | BodyResponseCallback<Schema$ClientEvent>,
      callback: BodyResponseCallback<Schema$ClientEvent>
    ): void;
    create(
      params: Params$Resource$Projects$Clientevents$Create,
      callback: BodyResponseCallback<Schema$ClientEvent>
    ): void;
    create(callback: BodyResponseCallback<Schema$ClientEvent>): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Projects$Clientevents$Create
        | BodyResponseCallback<Schema$ClientEvent>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ClientEvent>,
      callback?: BodyResponseCallback<Schema$ClientEvent>
    ): void | GaxiosPromise<Schema$ClientEvent> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Clientevents$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Clientevents$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+parent}/clientEvents').replace(
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
        createAPIRequest<Schema$ClientEvent>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ClientEvent>(parameters);
      }
    }
  }

  export interface Params$Resource$Projects$Clientevents$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Parent project name.
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$CreateClientEventRequest;
  }

  export class Resource$Projects$Companies {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * jobs.projects.companies.create
     * @desc Creates a new company entity.
     * @alias jobs.projects.companies.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required.  Resource name of the project under which the company is created.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     * @param {().CreateCompanyRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Projects$Companies$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Company>;
    create(
      params: Params$Resource$Projects$Companies$Create,
      options: MethodOptions | BodyResponseCallback<Schema$Company>,
      callback: BodyResponseCallback<Schema$Company>
    ): void;
    create(
      params: Params$Resource$Projects$Companies$Create,
      callback: BodyResponseCallback<Schema$Company>
    ): void;
    create(callback: BodyResponseCallback<Schema$Company>): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Projects$Companies$Create
        | BodyResponseCallback<Schema$Company>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Company>,
      callback?: BodyResponseCallback<Schema$Company>
    ): void | GaxiosPromise<Schema$Company> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Companies$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Companies$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+parent}/companies').replace(
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
     * jobs.projects.companies.delete
     * @desc Deletes specified company. Prerequisite: The company has no jobs associated with it.
     * @alias jobs.projects.companies.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required.  The resource name of the company to be deleted.  The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo".
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
      params?: Params$Resource$Projects$Companies$Delete,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    delete(
      params: Params$Resource$Projects$Companies$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(
      params: Params$Resource$Projects$Companies$Delete,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$Empty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Projects$Companies$Delete
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Companies$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Companies$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+name}').replace(/([^:]\/)\/+/g, '$1'),
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
     * jobs.projects.companies.get
     * @desc Retrieves specified company.
     * @alias jobs.projects.companies.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required.  The resource name of the company to be retrieved.  The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo".
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Projects$Companies$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Company>;
    get(
      params: Params$Resource$Projects$Companies$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Company>,
      callback: BodyResponseCallback<Schema$Company>
    ): void;
    get(
      params: Params$Resource$Projects$Companies$Get,
      callback: BodyResponseCallback<Schema$Company>
    ): void;
    get(callback: BodyResponseCallback<Schema$Company>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Projects$Companies$Get
        | BodyResponseCallback<Schema$Company>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Company>,
      callback?: BodyResponseCallback<Schema$Company>
    ): void | GaxiosPromise<Schema$Company> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Companies$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Companies$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+name}').replace(/([^:]\/)\/+/g, '$1'),
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
        createAPIRequest<Schema$Company>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Company>(parameters);
      }
    }

    /**
     * jobs.projects.companies.list
     * @desc Lists all companies associated with the service account.
     * @alias jobs.projects.companies.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {integer=} params.pageSize Optional.  The maximum number of companies to be returned, at most 100. Default is 100 if a non-positive number is provided.
     * @param {string=} params.pageToken Optional.  The starting indicator from which to return results.
     * @param {string} params.parent Required.  Resource name of the project under which the company is created.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     * @param {boolean=} params.requireOpenJobs Optional.  Set to true if the companies requested must have open jobs.  Defaults to false.  If true, at most page_size of companies are fetched, among which only those with open jobs are returned.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Projects$Companies$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListCompaniesResponse>;
    list(
      params: Params$Resource$Projects$Companies$List,
      options:
        | MethodOptions
        | BodyResponseCallback<Schema$ListCompaniesResponse>,
      callback: BodyResponseCallback<Schema$ListCompaniesResponse>
    ): void;
    list(
      params: Params$Resource$Projects$Companies$List,
      callback: BodyResponseCallback<Schema$ListCompaniesResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListCompaniesResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Projects$Companies$List
        | BodyResponseCallback<Schema$ListCompaniesResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListCompaniesResponse>,
      callback?: BodyResponseCallback<Schema$ListCompaniesResponse>
    ): void | GaxiosPromise<Schema$ListCompaniesResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Companies$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Companies$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+parent}/companies').replace(
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
        createAPIRequest<Schema$ListCompaniesResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListCompaniesResponse>(parameters);
      }
    }

    /**
     * jobs.projects.companies.patch
     * @desc Updates specified company. Company names can't be updated. To update a company name, delete the company and all jobs associated with it, and only then re-create them.
     * @alias jobs.projects.companies.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required during company update.  The resource name for a company. This is generated by the service when a company is created.  The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo".
     * @param {().UpdateCompanyRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
      params?: Params$Resource$Projects$Companies$Patch,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Company>;
    patch(
      params: Params$Resource$Projects$Companies$Patch,
      options: MethodOptions | BodyResponseCallback<Schema$Company>,
      callback: BodyResponseCallback<Schema$Company>
    ): void;
    patch(
      params: Params$Resource$Projects$Companies$Patch,
      callback: BodyResponseCallback<Schema$Company>
    ): void;
    patch(callback: BodyResponseCallback<Schema$Company>): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Projects$Companies$Patch
        | BodyResponseCallback<Schema$Company>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Company>,
      callback?: BodyResponseCallback<Schema$Company>
    ): void | GaxiosPromise<Schema$Company> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Companies$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Companies$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+name}').replace(/([^:]\/)\/+/g, '$1'),
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
        createAPIRequest<Schema$Company>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Company>(parameters);
      }
    }
  }

  export interface Params$Resource$Projects$Companies$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required.  Resource name of the project under which the company is created.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$CreateCompanyRequest;
  }
  export interface Params$Resource$Projects$Companies$Delete
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required.  The resource name of the company to be deleted.  The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo".
     */
    name?: string;
  }
  export interface Params$Resource$Projects$Companies$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required.  The resource name of the company to be retrieved.  The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo".
     */
    name?: string;
  }
  export interface Params$Resource$Projects$Companies$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Optional.  The maximum number of companies to be returned, at most 100. Default is 100 if a non-positive number is provided.
     */
    pageSize?: number;
    /**
     * Optional.  The starting indicator from which to return results.
     */
    pageToken?: string;
    /**
     * Required.  Resource name of the project under which the company is created.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     */
    parent?: string;
    /**
     * Optional.  Set to true if the companies requested must have open jobs.  Defaults to false.  If true, at most page_size of companies are fetched, among which only those with open jobs are returned.
     */
    requireOpenJobs?: boolean;
  }
  export interface Params$Resource$Projects$Companies$Patch
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required during company update.  The resource name for a company. This is generated by the service when a company is created.  The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo".
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$UpdateCompanyRequest;
  }

  export class Resource$Projects$Jobs {
    context: APIRequestContext;
    constructor(context: APIRequestContext) {
      this.context = context;
    }

    /**
     * jobs.projects.jobs.batchDelete
     * @desc Deletes a list of Jobs by filter.
     * @alias jobs.projects.jobs.batchDelete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required.  The resource name of the project under which the job is created.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     * @param {().BatchDeleteJobsRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    batchDelete(
      params?: Params$Resource$Projects$Jobs$Batchdelete,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    batchDelete(
      params: Params$Resource$Projects$Jobs$Batchdelete,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    batchDelete(
      params: Params$Resource$Projects$Jobs$Batchdelete,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    batchDelete(callback: BodyResponseCallback<Schema$Empty>): void;
    batchDelete(
      paramsOrCallback?:
        | Params$Resource$Projects$Jobs$Batchdelete
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Jobs$Batchdelete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Jobs$Batchdelete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+parent}/jobs:batchDelete').replace(
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
     * jobs.projects.jobs.create
     * @desc Creates a new job.  Typically, the job becomes searchable within 10 seconds, but it may take up to 5 minutes.
     * @alias jobs.projects.jobs.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required.  The resource name of the project under which the job is created.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     * @param {().CreateJobRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
      params?: Params$Resource$Projects$Jobs$Create,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Job>;
    create(
      params: Params$Resource$Projects$Jobs$Create,
      options: MethodOptions | BodyResponseCallback<Schema$Job>,
      callback: BodyResponseCallback<Schema$Job>
    ): void;
    create(
      params: Params$Resource$Projects$Jobs$Create,
      callback: BodyResponseCallback<Schema$Job>
    ): void;
    create(callback: BodyResponseCallback<Schema$Job>): void;
    create(
      paramsOrCallback?:
        | Params$Resource$Projects$Jobs$Create
        | BodyResponseCallback<Schema$Job>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Job>,
      callback?: BodyResponseCallback<Schema$Job>
    ): void | GaxiosPromise<Schema$Job> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Jobs$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Jobs$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+parent}/jobs').replace(/([^:]\/)\/+/g, '$1'),
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
        createAPIRequest<Schema$Job>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Job>(parameters);
      }
    }

    /**
     * jobs.projects.jobs.delete
     * @desc Deletes the specified job.  Typically, the job becomes unsearchable within 10 seconds, but it may take up to 5 minutes.
     * @alias jobs.projects.jobs.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required.  The resource name of the job to be deleted.  The format is "projects/{project_id}/jobs/{job_id}", for example, "projects/api-test-project/jobs/1234".
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
      params?: Params$Resource$Projects$Jobs$Delete,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Empty>;
    delete(
      params: Params$Resource$Projects$Jobs$Delete,
      options: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(
      params: Params$Resource$Projects$Jobs$Delete,
      callback: BodyResponseCallback<Schema$Empty>
    ): void;
    delete(callback: BodyResponseCallback<Schema$Empty>): void;
    delete(
      paramsOrCallback?:
        | Params$Resource$Projects$Jobs$Delete
        | BodyResponseCallback<Schema$Empty>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Empty>,
      callback?: BodyResponseCallback<Schema$Empty>
    ): void | GaxiosPromise<Schema$Empty> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Jobs$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Jobs$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+name}').replace(/([^:]\/)\/+/g, '$1'),
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
     * jobs.projects.jobs.get
     * @desc Retrieves the specified job, whose status is OPEN or recently EXPIRED within the last 90 days.
     * @alias jobs.projects.jobs.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required.  The resource name of the job to retrieve.  The format is "projects/{project_id}/jobs/{job_id}", for example, "projects/api-test-project/jobs/1234".
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(
      params?: Params$Resource$Projects$Jobs$Get,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Job>;
    get(
      params: Params$Resource$Projects$Jobs$Get,
      options: MethodOptions | BodyResponseCallback<Schema$Job>,
      callback: BodyResponseCallback<Schema$Job>
    ): void;
    get(
      params: Params$Resource$Projects$Jobs$Get,
      callback: BodyResponseCallback<Schema$Job>
    ): void;
    get(callback: BodyResponseCallback<Schema$Job>): void;
    get(
      paramsOrCallback?:
        | Params$Resource$Projects$Jobs$Get
        | BodyResponseCallback<Schema$Job>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Job>,
      callback?: BodyResponseCallback<Schema$Job>
    ): void | GaxiosPromise<Schema$Job> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Jobs$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Jobs$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+name}').replace(/([^:]\/)\/+/g, '$1'),
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
        createAPIRequest<Schema$Job>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Job>(parameters);
      }
    }

    /**
     * jobs.projects.jobs.list
     * @desc Lists jobs by filter.
     * @alias jobs.projects.jobs.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.filter Required.  The filter string specifies the jobs to be enumerated.  Supported operator: =, AND  The fields eligible for filtering are:  * `companyName` (Required) * `requisitionId` (Optional)  Sample Query:  * companyName = "projects/api-test-project/companies/123" * companyName = "projects/api-test-project/companies/123" AND requisitionId = "req-1"
     * @param {string=} params.jobView Optional.  The desired job attributes returned for jobs in the search response. Defaults to JobView.JOB_VIEW_FULL if no value is specified.
     * @param {integer=} params.pageSize Optional.  The maximum number of jobs to be returned per page of results.  If job_view is set to JobView.JOB_VIEW_ID_ONLY, the maximum allowed page size is 1000. Otherwise, the maximum allowed page size is 100.  Default is 100 if empty or a number < 1 is specified.
     * @param {string=} params.pageToken Optional.  The starting point of a query result.
     * @param {string} params.parent Required.  The resource name of the project under which the job is created.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
      params?: Params$Resource$Projects$Jobs$List,
      options?: MethodOptions
    ): GaxiosPromise<Schema$ListJobsResponse>;
    list(
      params: Params$Resource$Projects$Jobs$List,
      options: MethodOptions | BodyResponseCallback<Schema$ListJobsResponse>,
      callback: BodyResponseCallback<Schema$ListJobsResponse>
    ): void;
    list(
      params: Params$Resource$Projects$Jobs$List,
      callback: BodyResponseCallback<Schema$ListJobsResponse>
    ): void;
    list(callback: BodyResponseCallback<Schema$ListJobsResponse>): void;
    list(
      paramsOrCallback?:
        | Params$Resource$Projects$Jobs$List
        | BodyResponseCallback<Schema$ListJobsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$ListJobsResponse>,
      callback?: BodyResponseCallback<Schema$ListJobsResponse>
    ): void | GaxiosPromise<Schema$ListJobsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Jobs$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Jobs$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+parent}/jobs').replace(/([^:]\/)\/+/g, '$1'),
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
        createAPIRequest<Schema$ListJobsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListJobsResponse>(parameters);
      }
    }

    /**
     * jobs.projects.jobs.patch
     * @desc Updates specified job.  Typically, updated contents become visible in search results within 10 seconds, but it may take up to 5 minutes.
     * @alias jobs.projects.jobs.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required during job update.  The resource name for the job. This is generated by the service when a job is created.  The format is "projects/{project_id}/jobs/{job_id}", for example, "projects/api-test-project/jobs/1234".  Use of this field in job queries and API calls is preferred over the use of requisition_id since this value is unique.
     * @param {().UpdateJobRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
      params?: Params$Resource$Projects$Jobs$Patch,
      options?: MethodOptions
    ): GaxiosPromise<Schema$Job>;
    patch(
      params: Params$Resource$Projects$Jobs$Patch,
      options: MethodOptions | BodyResponseCallback<Schema$Job>,
      callback: BodyResponseCallback<Schema$Job>
    ): void;
    patch(
      params: Params$Resource$Projects$Jobs$Patch,
      callback: BodyResponseCallback<Schema$Job>
    ): void;
    patch(callback: BodyResponseCallback<Schema$Job>): void;
    patch(
      paramsOrCallback?:
        | Params$Resource$Projects$Jobs$Patch
        | BodyResponseCallback<Schema$Job>,
      optionsOrCallback?: MethodOptions | BodyResponseCallback<Schema$Job>,
      callback?: BodyResponseCallback<Schema$Job>
    ): void | GaxiosPromise<Schema$Job> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Jobs$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Jobs$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+name}').replace(/([^:]\/)\/+/g, '$1'),
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
        createAPIRequest<Schema$Job>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Job>(parameters);
      }
    }

    /**
     * jobs.projects.jobs.search
     * @desc Searches for jobs using the provided SearchJobsRequest.  This call constrains the visibility of jobs present in the database, and only returns jobs that the caller has permission to search against.
     * @alias jobs.projects.jobs.search
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required.  The resource name of the project to search within.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     * @param {().SearchJobsRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    search(
      params?: Params$Resource$Projects$Jobs$Search,
      options?: MethodOptions
    ): GaxiosPromise<Schema$SearchJobsResponse>;
    search(
      params: Params$Resource$Projects$Jobs$Search,
      options: MethodOptions | BodyResponseCallback<Schema$SearchJobsResponse>,
      callback: BodyResponseCallback<Schema$SearchJobsResponse>
    ): void;
    search(
      params: Params$Resource$Projects$Jobs$Search,
      callback: BodyResponseCallback<Schema$SearchJobsResponse>
    ): void;
    search(callback: BodyResponseCallback<Schema$SearchJobsResponse>): void;
    search(
      paramsOrCallback?:
        | Params$Resource$Projects$Jobs$Search
        | BodyResponseCallback<Schema$SearchJobsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$SearchJobsResponse>,
      callback?: BodyResponseCallback<Schema$SearchJobsResponse>
    ): void | GaxiosPromise<Schema$SearchJobsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Jobs$Search;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Jobs$Search;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+parent}/jobs:search').replace(
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
        createAPIRequest<Schema$SearchJobsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$SearchJobsResponse>(parameters);
      }
    }

    /**
     * jobs.projects.jobs.searchForAlert
     * @desc Searches for jobs using the provided SearchJobsRequest.  This API call is intended for the use case of targeting passive job seekers (for example, job seekers who have signed up to receive email alerts about potential job opportunities), and has different algorithmic adjustments that are targeted to passive job seekers.  This call constrains the visibility of jobs present in the database, and only returns jobs the caller has permission to search against.
     * @alias jobs.projects.jobs.searchForAlert
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required.  The resource name of the project to search within.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     * @param {().SearchJobsRequest} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    searchForAlert(
      params?: Params$Resource$Projects$Jobs$Searchforalert,
      options?: MethodOptions
    ): GaxiosPromise<Schema$SearchJobsResponse>;
    searchForAlert(
      params: Params$Resource$Projects$Jobs$Searchforalert,
      options: MethodOptions | BodyResponseCallback<Schema$SearchJobsResponse>,
      callback: BodyResponseCallback<Schema$SearchJobsResponse>
    ): void;
    searchForAlert(
      params: Params$Resource$Projects$Jobs$Searchforalert,
      callback: BodyResponseCallback<Schema$SearchJobsResponse>
    ): void;
    searchForAlert(
      callback: BodyResponseCallback<Schema$SearchJobsResponse>
    ): void;
    searchForAlert(
      paramsOrCallback?:
        | Params$Resource$Projects$Jobs$Searchforalert
        | BodyResponseCallback<Schema$SearchJobsResponse>,
      optionsOrCallback?:
        | MethodOptions
        | BodyResponseCallback<Schema$SearchJobsResponse>,
      callback?: BodyResponseCallback<Schema$SearchJobsResponse>
    ): void | GaxiosPromise<Schema$SearchJobsResponse> {
      let params = (paramsOrCallback ||
        {}) as Params$Resource$Projects$Jobs$Searchforalert;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Projects$Jobs$Searchforalert;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl = options.rootUrl || 'https://jobs.googleapis.com/';
      const parameters = {
        options: Object.assign(
          {
            url: (rootUrl + '/v3/{+parent}/jobs:searchForAlert').replace(
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
        createAPIRequest<Schema$SearchJobsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$SearchJobsResponse>(parameters);
      }
    }
  }

  export interface Params$Resource$Projects$Jobs$Batchdelete
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required.  The resource name of the project under which the job is created.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$BatchDeleteJobsRequest;
  }
  export interface Params$Resource$Projects$Jobs$Create
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required.  The resource name of the project under which the job is created.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$CreateJobRequest;
  }
  export interface Params$Resource$Projects$Jobs$Delete
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required.  The resource name of the job to be deleted.  The format is "projects/{project_id}/jobs/{job_id}", for example, "projects/api-test-project/jobs/1234".
     */
    name?: string;
  }
  export interface Params$Resource$Projects$Jobs$Get
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required.  The resource name of the job to retrieve.  The format is "projects/{project_id}/jobs/{job_id}", for example, "projects/api-test-project/jobs/1234".
     */
    name?: string;
  }
  export interface Params$Resource$Projects$Jobs$List
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required.  The filter string specifies the jobs to be enumerated.  Supported operator: =, AND  The fields eligible for filtering are:  * `companyName` (Required) * `requisitionId` (Optional)  Sample Query:  * companyName = "projects/api-test-project/companies/123" * companyName = "projects/api-test-project/companies/123" AND requisitionId = "req-1"
     */
    filter?: string;
    /**
     * Optional.  The desired job attributes returned for jobs in the search response. Defaults to JobView.JOB_VIEW_FULL if no value is specified.
     */
    jobView?: string;
    /**
     * Optional.  The maximum number of jobs to be returned per page of results.  If job_view is set to JobView.JOB_VIEW_ID_ONLY, the maximum allowed page size is 1000. Otherwise, the maximum allowed page size is 100.  Default is 100 if empty or a number < 1 is specified.
     */
    pageSize?: number;
    /**
     * Optional.  The starting point of a query result.
     */
    pageToken?: string;
    /**
     * Required.  The resource name of the project under which the job is created.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     */
    parent?: string;
  }
  export interface Params$Resource$Projects$Jobs$Patch
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required during job update.  The resource name for the job. This is generated by the service when a job is created.  The format is "projects/{project_id}/jobs/{job_id}", for example, "projects/api-test-project/jobs/1234".  Use of this field in job queries and API calls is preferred over the use of requisition_id since this value is unique.
     */
    name?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$UpdateJobRequest;
  }
  export interface Params$Resource$Projects$Jobs$Search
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required.  The resource name of the project to search within.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$SearchJobsRequest;
  }
  export interface Params$Resource$Projects$Jobs$Searchforalert
    extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient;

    /**
     * Required.  The resource name of the project to search within.  The format is "projects/{project_id}", for example, "projects/api-test-project".
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$SearchJobsRequest;
  }
}
