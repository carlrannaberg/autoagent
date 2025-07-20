/**
 * Task content structure for STM (Simple Task Master) integration.
 * Defines the standard data structure passed to STM when creating tasks.
 */

/**
 * Content structure for creating tasks in STM.
 * This interface standardizes how AutoAgent task data is structured
 * before being passed to STM's task creation API.
 */
export interface TaskContent {
  /** 
   * Primary description of what needs to be done.
   * Maps to STM's description section as "Why & what" content.
   */
  description: string;

  /** 
   * Technical implementation details and approach.
   * Maps to STM's details section as "How" content.
   */
  technicalDetails: string;

  /** 
   * Step-by-step implementation plan.
   * Included in STM's details section as part of "How" content.
   */
  implementationPlan: string;

  /** 
   * List of criteria that must be met for task completion.
   * Maps to STM's description section as acceptance criteria checklist.
   */
  acceptanceCriteria: string[];

  /** 
   * Optional testing strategy and approach.
   * Maps to STM's validation section as "Testing Strategy" content.
   */
  testingStrategy?: string;

  /** 
   * Optional verification steps for task completion.
   * Maps to STM's validation section as "Verification Steps" content.
   */
  verificationSteps?: string;

  /** 
   * Optional tags for categorization and filtering.
   * Added to STM task tags along with 'autoagent' prefix.
   */
  tags?: string[];
}