# Issue 3: API Layer

## Description
Create a REST API layer for task submission and status retrieval. This API will allow external systems to interact with the task processing system programmatically.

## Requirements
Create REST API for task submission.

## Acceptance Criteria
- [ ] POST /api/tasks endpoint accepts task submissions and returns a task ID
- [ ] GET /api/tasks/:id endpoint returns current task status and results
- [ ] API returns appropriate HTTP status codes (200, 201, 404, 500)
- [ ] Request validation is implemented for required fields
- [ ] API documentation is created with endpoint specifications

## Success Criteria
- [ ] POST endpoint for tasks
- [ ] GET endpoint for status
- [ ] Basic error handling
