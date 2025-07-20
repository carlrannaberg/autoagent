import { TaskContent } from '../../../src/types/stm-types';

/**
 * Builder pattern for creating TaskContent test data.
 * Provides a fluent API for constructing TaskContent objects with sensible defaults.
 */
export class TaskContentBuilder {
  private taskContent: Partial<TaskContent> = {
    description: 'Default task description',
    technicalDetails: 'Default technical details',
    implementationPlan: 'Default implementation plan',
    acceptanceCriteria: ['Default acceptance criteria']
  };

  withDescription(description: string): this {
    this.taskContent.description = description;
    return this;
  }

  withTechnicalDetails(details: string): this {
    this.taskContent.technicalDetails = details;
    return this;
  }

  withImplementationPlan(plan: string): this {
    this.taskContent.implementationPlan = plan;
    return this;
  }

  withAcceptanceCriteria(criteria: string[]): this {
    this.taskContent.acceptanceCriteria = criteria;
    return this;
  }

  withTestingStrategy(strategy: string): this {
    this.taskContent.testingStrategy = strategy;
    return this;
  }

  withVerificationSteps(steps: string): this {
    this.taskContent.verificationSteps = steps;
    return this;
  }

  withTags(tags: string[]): this {
    this.taskContent.tags = tags;
    return this;
  }

  build(): TaskContent {
    return {
      description: this.taskContent.description!,
      technicalDetails: this.taskContent.technicalDetails!,
      implementationPlan: this.taskContent.implementationPlan!,
      acceptanceCriteria: this.taskContent.acceptanceCriteria!,
      testingStrategy: this.taskContent.testingStrategy,
      verificationSteps: this.taskContent.verificationSteps,
      tags: this.taskContent.tags
    };
  }

  /**
   * Creates a simple TaskContent for basic testing scenarios.
   */
  static simple(): TaskContent {
    return new TaskContentBuilder()
      .withDescription('Fix the login bug that prevents user authentication')
      .withTechnicalDetails('Investigate the authentication middleware and session handling')
      .withImplementationPlan('1. Debug authentication flow\n2. Fix session validation\n3. Test with different user types')
      .withAcceptanceCriteria(['Users can log in successfully', 'Sessions are properly maintained'])
      .build();
  }

  /**
   * Creates a complex TaskContent for comprehensive testing scenarios.
   */
  static complex(): TaskContent {
    return new TaskContentBuilder()
      .withDescription(`
        Implement a new authentication system with the following features:
        - OAuth2 support for multiple providers
        - JWT token management with refresh tokens
        - Multi-factor authentication (TOTP and SMS)
        - Advanced session management with configurable timeouts
      `)
      .withTechnicalDetails(`
        Use industry-standard libraries and security practices:
        - passport.js for OAuth2 integration
        - jsonwebtoken for JWT handling
        - speakeasy for TOTP generation
        - bcrypt for password hashing
        - helmet.js for security headers
      `)
      .withImplementationPlan(`
        1. Set up OAuth2 providers (Google, GitHub, Microsoft)
        2. Implement JWT token service with refresh mechanism
        3. Create TOTP service for multi-factor authentication
        4. Design secure session management
        5. Add rate limiting and brute force protection
        6. Create user management dashboard
        7. Implement comprehensive audit logging
      `)
      .withAcceptanceCriteria([
        'Users can log in with OAuth2 providers (Google, GitHub, Microsoft)',
        'JWT tokens are properly generated and validated',
        'Refresh tokens work correctly and expire appropriately',
        'TOTP MFA can be enabled/disabled per user',
        'SMS MFA works with major providers',
        'Sessions expire after configured inactivity period',
        'Rate limiting prevents brute force attacks',
        'All authentication events are properly logged',
        'User dashboard allows managing authentication settings',
        'All endpoints are properly secured and tested'
      ])
      .withTestingStrategy(`
        - Unit tests for all authentication services
        - Integration tests for OAuth2 flows
        - End-to-end tests for complete user journeys
        - Security testing for common vulnerabilities
        - Performance testing under load
        - Accessibility testing for auth forms
      `)
      .withVerificationSteps(`
        1. Manual testing of OAuth2 flows with all providers
        2. Verify JWT tokens contain correct claims and expire properly
        3. Test MFA setup and authentication flows
        4. Validate session timeout behavior
        5. Confirm rate limiting blocks excessive requests
        6. Review audit logs for completeness
        7. Security audit with penetration testing
      `)
      .withTags(['authentication', 'security', 'oauth2', 'mfa', 'high-priority'])
      .build();
  }

  /**
   * Creates a TaskContent with minimal required fields for testing edge cases.
   */
  static minimal(): TaskContent {
    return new TaskContentBuilder()
      .withDescription('Minimal task for edge case testing')
      .withTechnicalDetails('Simple technical approach')
      .withImplementationPlan('Basic implementation steps')
      .withAcceptanceCriteria(['Task is complete'])
      .build();
  }

  /**
   * Creates a TaskContent with custom overrides for flexible testing.
   */
  static withCustom(overrides: Partial<TaskContent>): TaskContent {
    const base = TaskContentBuilder.simple();
    return {
      ...base,
      ...overrides
    };
  }

  /**
   * Creates a TaskContent specifically for testing validation scenarios.
   */
  static withValidation(): TaskContent {
    return new TaskContentBuilder()
      .withDescription('Task that requires comprehensive validation')
      .withTechnicalDetails('Implementation with multiple validation points')
      .withImplementationPlan('Build with validation at each step')
      .withAcceptanceCriteria(['All validations pass', 'Error handling works correctly'])
      .withTestingStrategy('Focus on edge cases and error conditions')
      .withVerificationSteps('Manual verification of all validation scenarios')
      .withTags(['validation', 'testing'])
      .build();
  }

  /**
   * Creates a TaskContent for testing tag functionality.
   */
  static withTags(tags: string[]): TaskContent {
    return new TaskContentBuilder()
      .withDescription('Task for testing tag functionality')
      .withTechnicalDetails('Implementation that demonstrates tag usage')
      .withImplementationPlan('Create task with specified tags')
      .withAcceptanceCriteria(['Tags are properly applied'])
      .withTags(tags)
      .build();
  }
}