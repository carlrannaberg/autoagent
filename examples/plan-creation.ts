import { FileManager } from '../src/utils/file-manager';
import { Plan } from '../src/types';

async function createPlanExamples(): Promise<void> {
  const fileManager = new FileManager('./workspace');

  // Create a plan with title-based naming
  const planWithTitle: Plan = {
    issueNumber: 1,
    file: '',
    phases: [
      {
        name: 'Implementation',
        tasks: ['Setup authentication', 'Create login form', 'Add tests']
      }
    ],
    technicalApproach: 'Use JWT tokens for authentication',
    challenges: ['Session management', 'Security considerations']
  };

  const planPath1 = await fileManager.createPlan(
    1, 
    planWithTitle, 
    'Implement User Authentication'
  );
  // eslint-disable-next-line no-console
  console.log('Created plan with title:', planPath1);
  // Output: workspace/plans/1-implement-user-authentication-plan.md

  // Create a plan without title (backward compatibility)
  const planWithoutTitle: Plan = {
    issueNumber: 2,
    file: '',
    phases: [
      {
        name: 'Setup',
        tasks: ['Configure environment', 'Install dependencies']
      }
    ]
  };

  const planPath2 = await fileManager.createPlan(2, planWithoutTitle);
  // eslint-disable-next-line no-console
  console.log('Created plan without title:', planPath2);
  // Output: workspace/plans/2-plan.md
}

createPlanExamples().catch(console.error);