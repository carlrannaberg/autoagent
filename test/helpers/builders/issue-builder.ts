import { Issue } from '../../../src/types';

export class IssueBuilder {
  private issue: Partial<Issue> = {
    number: 1,
    title: 'Default Test Issue',
    file: 'issues/1-default-test-issue.md',
    requirements: 'Default requirements',
    acceptanceCriteria: ['Default acceptance criteria']
  };

  withNumber(number: number): this {
    this.issue.number = number;
    return this;
  }

  withTitle(title: string): this {
    this.issue.title = title;
    return this;
  }

  withFile(file: string): this {
    this.issue.file = file;
    return this;
  }

  withRequirements(requirements: string): this {
    this.issue.requirements = requirements;
    return this;
  }

  withAcceptanceCriteria(criteria: string[]): this {
    this.issue.acceptanceCriteria = criteria;
    return this;
  }

  withContext(context: Record<string, any>): this {
    this.issue.context = context;
    return this;
  }

  withTechnicalDetails(details: string): this {
    this.issue.technicalDetails = details;
    return this;
  }

  build(): Issue {
    return {
      number: this.issue.number!,
      title: this.issue.title!,
      file: this.issue.file!,
      requirements: this.issue.requirements!,
      acceptanceCriteria: this.issue.acceptanceCriteria!,
      context: this.issue.context,
      technicalDetails: this.issue.technicalDetails
    };
  }

  static simple(): Issue {
    return new IssueBuilder()
      .withNumber(1)
      .withTitle('Simple Issue')
      .withFile('issues/1-simple-issue.md')
      .withRequirements('Fix the bug')
      .withAcceptanceCriteria(['Bug is fixed'])
      .build();
  }

  static complex(): Issue {
    return new IssueBuilder()
      .withNumber(42)
      .withTitle('Complex Feature Implementation')
      .withFile('issues/42-complex-feature.md')
      .withRequirements(`
        Implement a new authentication system with the following features:
        - OAuth2 support
        - JWT token management
        - Multi-factor authentication
        - Session management
      `)
      .withAcceptanceCriteria([
        'Users can log in with OAuth2 providers',
        'JWT tokens are properly validated',
        'MFA can be enabled/disabled',
        'Sessions expire after inactivity',
        'All endpoints are properly secured'
      ])
      .withContext({
        existingAuth: 'basic',
        userCount: 10000,
        securityLevel: 'high'
      })
      .withTechnicalDetails(`
        Use industry-standard libraries:
        - passport.js for OAuth
        - jsonwebtoken for JWT
        - speakeasy for TOTP
      `)
      .build();
  }

  static withCustom(overrides: Partial<Issue>): Issue {
    return {
      ...IssueBuilder.simple(),
      ...overrides
    };
  }
}