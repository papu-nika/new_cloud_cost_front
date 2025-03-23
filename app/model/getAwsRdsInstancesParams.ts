/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * Cloud Cost Management API
 * API for managing cloud costs, tracking usage, and organizing services into projects.
 * OpenAPI spec version: 1.0.0
 */
import type { AWSRegion } from './aWSRegion';
import type { AwsRDSEngine } from './awsRDSEngine';

export type GetAwsRdsInstancesParams = {
/**
 * Filter instance by region
 */
region?: AWSRegion;
/**
 * Filter instance by engine
 */
engine?: AwsRDSEngine;
/**
 * Filter instance by type
 */
instancetype?: string;
};
